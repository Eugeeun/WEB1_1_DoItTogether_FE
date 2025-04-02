import React from 'react';
import { useHomePage } from '@/hooks/useHomePage';
import MetaTags from '@/components/common/metaTags/MetaTags';
import { useParams } from 'react-router-dom';

import {
  GroupSelectSheet,
  HomeHeader,
  HouseworkList,
  NoList,
  WeeklyDateAndTab,
} from '@/components/home';
import useHomePageStore from '@/store/useHomePageStore';

const HomePage: React.FC = () => {
  const { chargers, setActiveTab, handleAction, handleEdit, handleDelete } = useHomePage();
  const { activeTab } = useHomePageStore();
  const { channelId } = useParams();
  return (
    <>
      <MetaTags
        title={'두잇투게더 - 메인'}
        description={'등록된 집안일을 확인하고 관리해보세요.'}
        url={`https://doit-together.vercel.app/main/${channelId}/`}
      />

      <HomeHeader />
      <WeeklyDateAndTab
        activeTab={activeTab}
        handleSetActiveTab={setActiveTab}
        chargers={chargers}
      />
      <HouseworkList
        handleAction={handleAction}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <NoList />
      <GroupSelectSheet />
    </>
  );
};

export default HomePage;
