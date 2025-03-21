import { Switch } from '@/components/common/ui/switch';
import { useNotification } from '@/hooks/useNotification';

interface FcmToggleProps {}

const FcmToggle = ({}: FcmToggleProps) => {
  const { isEnabled, permissionStatus, requestPermission, setupFCM } = useNotification();

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      // 토글이 켜질 때 알림 권한 요청
      if (permissionStatus === 'default') {
        await requestPermission();
        await setupFCM();
      } else if (permissionStatus === 'granted') {
        await setupFCM();
      } else if (permissionStatus === 'denied') {
        alert('알림을 받으려면 브라우저 설정에서 알림 권한을 허용해주세요.');
      }
    } else {
      // 토글이 꺼질 때 (알림 비활성화)
      // FCM 토큰 삭제
    }
  };
  return (
    <div className='w-full border-b border-solid border-gray4/30'>
      <div className='flex h-12 items-center justify-between px-5'>
        <p className='text-gray1 font-body'>푸시알림 설정</p>
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          className='border data-[state=checked]:border-sub2 data-[state=checked]:bg-main'
        />
      </div>
    </div>
  );
};

export default FcmToggle;
