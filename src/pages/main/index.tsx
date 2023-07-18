// import {
//   ActionIcon,
//   AppShell,
//   Avatar,
//   Header,
//   MantineProvider,
//   Navbar,
//   Text,
//   TextInput,
//   TextInputProps,
//   useMantineTheme,
// } from '@mantine/core';
// import {
//   IconAlertCircle,
//   IconArrowLeft,
//   IconArrowRight,
//   IconSearch,
// } from '@tabler/icons-react';

// function MainPage() {
//   return (
//     <AppShell
//       display="flex"
//       p="md"
//       header={
//         <Header height={60} p="md" display="flex">
//           <h2>RoadMaker</h2>
//           <InputWithButton />
//           <IconAlertCircle size="2rem" />
//           <Avatar src={null} alt="no image here" />
//         </Header>
//       }
//       styles={(theme) => ({
//         main: {
//           backgroundColor:
//             theme.colorScheme === 'dark'
//               ? theme.colors.dark[8]
//               : theme.colors.gray[0],
//         },
//       })}
//     >
//       {/* Your application here */}
//     </AppShell>
//   );
// }

// export default MainPage;

// export function Demo() {
//   return (
//     <MantineProvider
//       theme={{
//         headings: {
//           // properties for all headings
//           fontFamily: 'Roboto',
//           // properties for individual headings, all of them are optional
//           sizes: {
//             h1: { fontSize: '3rem', lineHeight: 1.4 },
//             h2: { fontSize: '2rem' },
//             // ...up to h6
//             h6: { fontWeight: 900 },
//           },
//         },
//       }}
//     >
//       <MainPage />
//     </MantineProvider>
//   );
// }
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { HeaderMegaMenu } from './header';

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderMegaMenu />
      <Button onClick={() => navigate('roadmap/editor')}>Editor Page</Button>
    </>
  );
}
export default MainPage;
