// import InteractionFlow from './pages/main/userRoadmap';
import { Notifications } from '@mantine/notifications';
import RoadMapPostPage from 'pages/roadmap/posts';
import KeywordSearchRoadmaps from 'pages/roadmap/posts/byKeyword';
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
import RoadMapEditor from './pages/roadmap/editor';
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
        {
          path: 'roadmap/editor',
          element: <RoadMapEditor />,
        },
        { path: '/roadmap/post/:Id', element: <RoadMapPostPage /> },
        {
          path: '/roadmap/post/search/:keyword',
          element: <KeywordSearchRoadmaps />,
        },
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
      <Notifications />
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
