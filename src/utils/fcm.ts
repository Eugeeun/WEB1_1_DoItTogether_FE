import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Firebase Messaging 지원 여부 확인 후 초기화
let messaging: Messaging | null = null;

(async () => {
  if (typeof window !== 'undefined' && (await isSupported())) {
    messaging = getMessaging(app);
  } else {
    console.warn('Firebase Messaging is not supported in this environment.');
  }
})();

export const requestForToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.warn('Messaging instance is not available.');
    return null;
  }

  try {
    const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token:', err);
    return null;
  }
};

// 기기 유형 확인
const getPlatformType = (): string => {
  if (typeof window === 'undefined') return 'UNKNOWN'; // SSR 방지

  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/i.test(userAgent)) return 'ANDROID';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'IOS';
  return 'PC';
};

export const setupPushNotifications = async (): Promise<{
  token: string;
  platformType: string;
} | null> => {
  if (typeof window === 'undefined') {
    console.warn('Push notifications cannot be set up in a server environment.');
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await requestForToken();
    const platformType = getPlatformType();
    if (token) return { token, platformType };
  }
  return null;
};
