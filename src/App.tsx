// import InteractionFlow from './pages/main/userRoadmap';
import { Notifications } from '@mantine/notifications';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from 'react-query/queryClient';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditUserProfile from './components/user/editUserProfile';
import { UserProfile } from './components/user/userProfile';
import ErrorPage from './pages/error';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import ResetInfoPage from './pages/resetInfo';
import RoadMapEditor from './pages/roadmap/editor';
import PostedRoadmap from './pages/roadmap/view/postedRoadmap';
import SignupPage from './pages/signup';

function App(): ReactElement {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        {
          path: 'users/signin',
          element: <LoginPage />,
        },
        { path: 'users/signup', element: <SignupPage /> },
        { path: 'users/reset', element: <ResetInfoPage /> },
        {
          path: 'roadmap/editor',
          element: <RoadMapEditor />,
        },
        { path: '/roadmap/post/:Id', element: <PostedRoadmap /> },
        {
          path: 'users/mypage',
          element: <UserProfile />,
        },
        { path: 'users/mypage/edit', element: <EditUserProfile /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MantineProvider withNormalizeCSS withGlobalStyles> */}
      <Notifications />
      <div className="App">
        {/* <Loading /> */}
        <RouterProvider router={router} />
      </div>
      {/* </MantineProvider> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
