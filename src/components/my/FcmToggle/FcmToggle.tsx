import { Switch } from '@/components/common/ui/switch';
import { useNotification } from '@/hooks/useNotification';
import { useState } from 'react';

interface FcmToggleProps {}

const FcmToggle = ({}: FcmToggleProps) => {
  const { fcmEnabled, toggleFCM } = useNotification();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      const success = await toggleFCM(checked);

      if (!success && checked) {
        alert('알림을 받으려면 브라우저 설정에서 알림 권한을 허용해주세요.');
      }
    } catch (error) {
      console.error('FCM 토글 처리 중 오류:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className='w-full border-b border-solid border-gray4/30'>
      <div className='flex h-12 items-center justify-between px-5'>
        <p className='text-gray1 font-body'>푸시알림 설정</p>
        <Switch
          checked={fcmEnabled}
          onCheckedChange={handleToggle}
          className='border data-[state=checked]:border-sub2 data-[state=checked]:bg-main'
        />
      </div>
    </div>
  );
};

export default FcmToggle;
