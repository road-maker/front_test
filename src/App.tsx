// import Quil from 'components/pretest/codeBox';
import EditUserProfile from 'components/user/editUserProfile';
import { UserProfile } from 'components/user/userProfile';
import PostedRoadmap from 'pages/main/postedRoadmap';
import RoadMapEditor from 'pages/roadmap/editor';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/error';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import ResetInfoPage from './pages/resetInfo';
import SignupPage from './pages/signup';
import { queryClient } from './react-query/queryClient';

function App(): ReactElement {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        {
          element: <LoginPage />,
        },
        { path: 'users/signin', element: <LoginPage /> },
        { path: 'users/signup', element: <SignupPage /> },
        { path: 'users/reset', element: <ResetInfoPage /> },
        // {
        //   path: 'roadmap/editor',
        //   element: <RoadMapEditor />,
        // },
        {
          path: 'roadmap',
          element: <RoadMapEditor />,
          children: [
            { path: 'view', element: <PostedRoadmap /> },
            { path: 'editor', element: <RoadMapEditor /> },
          ],
        },
        {
          path: 'users/mypage',
          element: <UserProfile />,
          children: [{ path: 'edit', element: <EditUserProfile /> }],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
