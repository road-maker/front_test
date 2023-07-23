// import Quil from 'components/pretest/codeBox';
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
          path: '/users/signin',
          element: <LoginPage />,
        },
        { path: 'users/signup', element: <SignupPage /> },
        { path: 'users/reset', element: <ResetInfoPage /> },
        { path: 'roadmap/editor', element: <RoadMapEditor /> },
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
