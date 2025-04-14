import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '@/services/user/deleteUser';

export const useLeave = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleBack = () => {
    navigate(`/my-page/account-manage`);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDone = async () => {
    try {
      await deleteUser();
      localStorage.removeItem('access_token');
      navigate('/');
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
    }
  };

  return {
    isChecked,
    handleBack,
    handleCheckboxChange,
    handleDone,
  };
};
