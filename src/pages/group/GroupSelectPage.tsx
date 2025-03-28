import Button from '@/components/common/button/Button/Button';
import GroupSelectTitle from '@/components/groupSelect/GroupSelectTitle/GroupSelectTitle';
import MetaTags from '@/components/common/metaTags/MetaTags';
import GroupList from '@/components/groupSelect/GroupList/GroupList';
import { useGroupSelect } from '@/hooks/useGroupSelect';
import useDevicePadding from '@/hooks/useDevicePadding';
import AccountSetBtn from '@/components/my/AccountSetBtn/AccountSetBtn';

const GroupSelectPage = () => {
  const paddingClass = useDevicePadding();
  const { isLoading, groups, handleMakeGroupBtnClick, handleInvitedBtnClick, handleClick } =
    useGroupSelect();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={`relative flex h-screen flex-col`}>
      <MetaTags
        title={'두잇투게더 - 그룹 선택'}
        description={'그룹을 선택하고 가사를 분담해보세요.'}
        url={'https://doit-together.vercel.app/group-select/'}
      />
      <div className='absolute right-5 top-4'>
        <AccountSetBtn />
      </div>
      <GroupSelectTitle />
      <div className='flex flex-1 flex-col px-5 py-4'>
        <GroupList groups={groups} handleClick={handleClick} />
      </div>
      <div className={`sticky bottom-6 ${paddingClass} flex gap-x-4 px-5`}>
        <Button
          label='방만들기'
          variant='full'
          size='small'
          handleClick={handleMakeGroupBtnClick}
          className={'flex-1'}
        />
        <Button
          label='초대받기'
          variant='full'
          size='small'
          handleClick={handleInvitedBtnClick}
          className={'flex-1'}
        />
      </div>
    </div>
  );
};

export default GroupSelectPage;
