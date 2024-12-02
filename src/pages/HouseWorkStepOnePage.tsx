import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/button/Button/Button';
import OpenSheetBtn from '@/components/common/button/OpenSheetBtn/OpenSheetBtn';
import OpenSheetBtnWithLabel from '@/components/common/button/OpenSheetBtn/OpenSheetBtnWithLabel';
import HeaderWithTitle from '@/components/housework/HeaderWithTitle/HeaderWithTitle';
import HouseWorkSheet from '@/components/housework/HouseWorkSheet/HouseWorkSheet';
import DueDateSheet from '@/components/housework/DueDateSheet/DueDateSheet';
import TimeControl from '@/components/housework/TimeControl/TimeControl';

interface SelectedTime {
  hour: string;
  minute: string;
  dayPart: 'AM' | 'PM';
}

const HouseWorkStepOnePage = () => {
  const navigate = useNavigate();
  const [houseWork] = useState(null);
  const [dueDate] = useState<Date | null>(null);
  // const [houseWork, setHouseWork] = useState(null);
  // const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isHouseWorkSheetOpen, setHouseWorkSheetOpen] = useState(false);
  const [isDueDateSheetOpen, setDueDateSheetOpen] = useState(false);
  const [time, setTime] = useState<SelectedTime | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleHouseWorkClick = () => {
    setHouseWorkSheetOpen(true);
  };
  const handleDueDateClick = () => {
    setDueDateSheetOpen(true);
  };
  const handleNextClick = () => {
    navigate('/add-housework/step2');
  };

  const handleTimeChange = (newTime: SelectedTime | null) => {
    setTime(newTime);
    console.log(time);
  };

  return (
    <div className='flex h-screen flex-col gap-6 px-5'>
      <HeaderWithTitle title='새로운 집안일을 추가해보세요(1/2)' handleClick={handleBackClick} />
      <section className='flex flex-1 flex-col gap-6' aria-label='집안일 추가 컨텐츠'>
        {houseWork ? (
          <OpenSheetBtnWithLabel
            title='집안일'
            selected='houseWork'
            handleClick={handleHouseWorkClick}
          />
        ) : (
          <OpenSheetBtn
            text='어떤 집안일인가요?'
            handleClick={handleHouseWorkClick}
            type='housework'
          />
        )}
        {dueDate ? (
          <OpenSheetBtnWithLabel title='날짜' selected='dueDate' handleClick={handleDueDateClick} />
        ) : (
          <OpenSheetBtn
            text='언제 해야 하나요?'
            handleClick={handleDueDateClick}
            type='housework'
          />
        )}
        <TimeControl onTimeChange={handleTimeChange} />
      </section>
      <Button variant='full' size='large' label='다음' handleClick={handleNextClick} />

      <HouseWorkSheet isOpen={isHouseWorkSheetOpen} setOpen={setHouseWorkSheetOpen} />
      <DueDateSheet isOpen={isDueDateSheetOpen} setOpen={setDueDateSheetOpen} />
    </div>
  );
};

export default HouseWorkStepOnePage;
