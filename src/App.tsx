// import Quil from 'components/pretest/codeBox';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditUserProfile from './components/user/editUserProfile';
import { UserProfile } from './components/user/userProfile';
import ErrorPage from './pages/error';
import LoginPage from './pages/login';
import MainPage from './pages/main';
// import InteractionFlow from './pages/main/userRoadmap';
import ResetInfoPage from './pages/resetInfo';
import RoadMapEditor from './pages/roadmap/editor';
import PostedRoadmap from './pages/roadmap/view/postedRoadmap';
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
          path: 'users/signin',
          element: <LoginPage />,
        },
        { path: 'users/signup', element: <SignupPage /> },
        { path: 'users/reset', element: <ResetInfoPage /> },
        {
          path: 'roadmap/editor',
          element: <RoadMapEditor />,
        },
        { path: 'roadmap/editor/view', element: <PostedRoadmap /> },
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
      <div className="App">
        {/* <Loading /> */}
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
