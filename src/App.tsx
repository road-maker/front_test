// import Quil from 'components/pretest/codeBox';
import RoadMapEditor from 'pages/roadmap';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/error';
import LoginPage, { action as loginAction } from './pages/login';
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
          action: loginAction,
        },
        { path: 'users/signup', element: <SignupPage /> },
        { path: 'users/reset', element: <ResetInfoPage /> },
        { path: 'roadmap/editor', element: <RoadMapEditor /> },
        // { path: 'roadmap/editor', element: <EditorPage /> },
        // { path: 'roadmap/monacoeditor', element: <MonacoEditor /> },
        // { path: 'roadmap/tiptapeditor', element: <TipTapEditor /> },
        // { path: 'roadmap/basic', element: <BasicTest /> },
        // { path: 'roadmap/basic', element: <RoadMapEditor /> },
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
