import { useState, useEffect } from 'react';
import { Switch } from '@/components/common/ui/switch';
import { setupPushNotifications } from '@/utils/fcm'; // FCM 설정 함수 임포트 (필요한 경우)
import { postFcmToken } from '@/services/fcm/postFcmToken'; // FCM 토큰 서버 전송 함수 (필요한 경우)

interface FcmToggleProps {}

const FcmToggle = ({}: FcmToggleProps) => {
  const [enabled, setEnabled] = useState(false);

  // 컴포넌트 마운트 시 현재 알림 권한 상태 확인
  useEffect(() => {
    if ('Notification' in window) {
      setEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      // 토글이 켜질 때 알림 권한 요청
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setEnabled(granted);

        if (granted) {
          // FCM 설정 및 토큰 서버 전송
          try {
            const notificationResult = await setupPushNotifications();
            if (notificationResult) {
              const { token, platformType } = notificationResult;
              await postFcmToken({ token, platformType });
            }
          } catch (error) {
            console.error('FCM 설정 오류:', error);
          }
        }
      }
    } else {
      // 토글이 꺼질 때 (알림 비활성화)
      setEnabled(false);
      // FCM 토큰 삭제 또는 비활성화 로직 추가
    }
  };

  return (
    <div className='w-full border-b border-solid border-gray4/30'>
      <div className='flex h-12 items-center justify-between px-5'>
        <p className='text-gray1 font-body'>푸시알림 설정</p>
        <Switch
          checked={enabled}
          onCheckedChange={handleToggle}
          className='border data-[state=checked]:border-sub2 data-[state=checked]:bg-main'
        />
      </div>
    </div>
  );
};

export default FcmToggle;
