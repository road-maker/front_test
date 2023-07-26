// import {
//   ActionIcon,
//   Avatar,
//   Box,
//   Button,
//   Center,
//   createStyles,
//   Group,
//   Header,
//   Image,
//   Modal,
//   rem,
//   Space,
//   TextInput,
//   TextInputProps,
//   useMantineTheme,
// } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react';
// import { useInput } from 'components/common/hooks/useInput';
// import { usePrompt } from 'components/prompts/hooks/usePrompt';
// import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../../auth/useAuth';
// // import { useUser } from '../../components/user/hooks/useUser';

// const useStyles = createStyles((theme) => ({
//   link: {
//     display: 'flex',
//     alignItems: 'center',
//     height: '100%',
//     paddingLeft: theme.spacing.md,
//     paddingRight: theme.spacing.md,
//     textDecoration: 'none',
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     fontWeight: 500,
//     fontSize: theme.fontSizes.sm,

//     [theme.fn.smallerThan('sm')]: {
//       height: rem(42),
//       display: 'flex',
//       alignItems: 'center',
//       width: '100%',
//     },

//     ...theme.fn.hover({
//       backgroundColor:
//         theme.colorScheme === 'dark'
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     }),
//   },

//   subLink: {
//     width: '100%',
//     padding: `${theme.spacing.xs} ${theme.spacing.md}`,
//     borderRadius: theme.radius.md,

//     ...theme.fn.hover({
//       backgroundColor:
//         theme.colorScheme === 'dark'
//           ? theme.colors.dark[7]
//           : theme.colors.gray[0],
//     }),

//     '&:active': theme.activeStyles,
//   },

//   dropdownFooter: {
//     backgroundColor:
//       theme.colorScheme === 'dark'
//         ? theme.colors.dark[7]
//         : theme.colors.gray[0],
//     margin: `calc(${theme.spacing.md} * -1)`,
//     marginTop: theme.spacing.sm,
//     padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
//     paddingBottom: theme.spacing.xl,
//     borderTop: `${rem(1)} solid ${
//       theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
//     }`,
//   },

//   hiddenMobile: {
//     [theme.fn.smallerThan('sm')]: {
//       display: 'none',
//     },
//   },

//   hiddenDesktop: {
//     [theme.fn.largerThan('sm')]: {
//       display: 'none',
//     },
//   },
// }));

// export function HeaderMegaMenu() {
//   const { classes } = useStyles();
//   const navigate = useNavigate();
//   // const { user } = useUser();
//   const { signout } = useAuth();
//   const [opened, { open, close }] = useDisclosure(false);

//   return (
//     <Box pb={30}>
//       <Header height={60} px="md">
//         <Group position="apart" sx={{ height: '100%' }}>
//           <Group
//             sx={{ height: '100%' }}
//             spacing={0}
//             className={classes.hiddenMobile}
//           >
//             <Image
//               src="/img/logo.png"
//               width={200}
//               height={50}
//               onClick={() => navigate('..')}
//             />
//             <InputWithButton ml="5rem" />
//           </Group>

//           <Group className={classes.hiddenMobile}>
//             <Modal opened={opened} onClose={close} size="50%">
//               <Center>
//                 <h1>새로운 로드맵 생성하기</h1>
//               </Center>
//               <Center>
//                 <Image
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDEv4qC_L_0WLYmLRBtBd2sYGkjMzWvGqrOw&usqp=CAU"
//                   width={300}
//                   height={300}
//                 />
//                 <Space />
//               </Center>
//               <Center>
//                 <InputWithButton />
//               </Center>
//               <Center>
//                 <h5>오늘은 그냥 템플릿 없이 빈 로드맵 만들게요.</h5>
//                 <Button
//                   size="xs"
//                   variant="light"
//                   color="blue"
//                   onClick={() => navigate('/roadmap/editor')}
//                 >
//                   빈 로드맵 만들기
//                 </Button>
//               </Center>
//             </Modal>
//             <Group position="center">
//               <Button onClick={open} variant="light" color="indigo">
//                 로드맵 생성하기
//               </Button>
//             </Group>
//             {/* {user ? (
//               <Button onClick={() => signout()}>Sign out</Button>
//             ) : (
//               <Button onClick={() => navigate('/users/signin')}>Sign in</Button>
//             )} */}
//             <Button onClick={() => signout()}>Sign out</Button>
//             <ActionIcon onClick={() => navigate('users/mypage')}>
//               <Avatar color="cyan" radius="xl">
//                 주영
//               </Avatar>
//             </ActionIcon>
//           </Group>
//         </Group>
//       </Header>
//     </Box>
//   );
// }

// export function InputWithButton(props: TextInputProps) {
//   const theme = useMantineTheme();
//   const [prompt, onPromptChange, setPrompt] = useInput('');
//   const { getprompt } = usePrompt();
//   const onRequestPrompt = (p) => {
//     getprompt(p.prompt);
//   };

//   return (
//     <TextInput
//       value={prompt}
//       onChange={onPromptChange}
//       icon={<IconSearch size="1.1rem" stroke={1.5} />}
//       radius="md"
//       w="500px"
//       rightSection={
//         <ActionIcon
//           size={32}
//           onClick={() => {
//             setPrompt(prompt);
//             onRequestPrompt({ prompt });
//           }}
//           radius="xl"
//           color={theme.primaryColor}
//           variant="filled"
//         >
//           {theme.dir === 'ltr' ? (
//             <IconArrowRight size="1.1rem" stroke={1.5} />
//           ) : (
//             <IconArrowLeft size="1.1rem" stroke={1.5} />
//           )}
//         </ActionIcon>
//       }
//       rightSectionWidth={42}
//       placeholder="키워드를 입력하세요"
//       {...props}
//     />
//   );
// }
