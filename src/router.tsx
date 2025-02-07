import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';
import StatisticsLayout from '@/layout/StatisticsLayout';

const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const RegisterPage = lazy(() => import('@/pages/register/RegisterPage'));
const SurveyIntroPage = lazy(() => import('@/pages/survey/SurveyIntroPage'));
const SurveyPage = lazy(() => import('@/pages/survey/SurveyPage'));
const GroupCreatePage = lazy(() => import('@/pages/group/GroupCreatePage'));
const GroupSelectPage = lazy(() => import('@/pages/group/GroupSelectPage'));
const GroupSettingPage = lazy(() => import('@/pages/group/GroupSettingPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const WeeklyStatisticsPage = lazy(() => import('@/pages/statistics/WeeklyStatisticsPage'));
const MonthlyStatisticsPage = lazy(() => import('@/pages/statistics/MonthlyStatisticsPage'));
const PresetSettingPage = lazy(() => import('@/pages/group/PresetSettingPage'));
const MyPage = lazy(() => import('@/pages/my/MyPage'));
const MyPageEditPage = lazy(() => import('@/pages/my/MyPageEditPage'));
const AccountManagePage = lazy(() => import('@/pages/my/AccountManagePage'));
const LeavePage = lazy(() => import('@/pages/my/LeavePage'));
const GroupInviteReceivePage = lazy(() => import('@/pages/group/GroupInviteReceivePage'));
const AddHouseworkPage = lazy(() => import('@/pages/housework/AddHouseworkPage'));

import ScrollToTop from '@/components/common/scroll/ScrollToTop';
import { Toaster } from '@/components/common/ui/toaster';
import PrivateRouter from '@/components/PrivateRouter';

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Outlet />
      </Suspense>
      <Toaster />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/register',
        element: (
          <PrivateRouter>
            <RegisterPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/survey-intro',
        element: (
          <PrivateRouter>
            <SurveyIntroPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/survey',
        element: (
          <PrivateRouter>
            <SurveyPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/group-select',
        element: (
          <PrivateRouter>
            <GroupSelectPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/group/create',
        element: (
          <PrivateRouter>
            <GroupCreatePage />
          </PrivateRouter>
        ),
      },
      {
        path: '/group/invite-receive',
        element: (
          <PrivateRouter>
            <GroupInviteReceivePage />
          </PrivateRouter>
        ),
      },
      {
        path: '/main/:channelId',
        element: (
          <PrivateRouter>
            <MainLayout />
          </PrivateRouter>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'statistics',
            element: <StatisticsLayout />,
            children: [
              {
                index: true, // 기본 리다이렉트
                element: <WeeklyStatisticsPage />,
              },
              {
                path: 'weekly',
                element: <WeeklyStatisticsPage />,
              },
              {
                path: 'monthly',
                element: <MonthlyStatisticsPage />,
              },
            ],
          },
          {
            path: 'group-setting',
            element: <GroupSettingPage />,
          },
          {
            path: 'my-page',
            element: <MyPage />,
          },
          {
            path: 'my-page/edit',
            element: <MyPageEditPage />,
          },
        ],
      },
      {
        path: 'my-page/account-manage/:channelId',
        element: (
          <PrivateRouter>
            <AccountManagePage />
          </PrivateRouter>
        ),
      },
      {
        path: 'my-page/leave/:channelId',
        element: (
          <PrivateRouter>
            <LeavePage />
          </PrivateRouter>
        ),
      },
      {
        path: '/group-setting/:channelId/preset-setting',
        element: (
          <PrivateRouter>
            <PresetSettingPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/add-housework/:channelId',
        element: (
          <PrivateRouter>
            <AddHouseworkPage />
          </PrivateRouter>
        ),
      },
      {
        path: '/add-housework/edit/:channelId/:houseworkId',
        element: (
          <PrivateRouter>
            <AddHouseworkPage />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
