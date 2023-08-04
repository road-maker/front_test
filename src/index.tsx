import './index.css';

import { Button, MantineProvider, Text } from '@mantine/core';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

function TestModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) {
  return (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  );
}
const modals = {
  demonstration: TestModal,
  /* ...other modals */
};
declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        components: {
          Containers: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        },
      }}
    >
      <ModalsProvider modals={modals}>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
