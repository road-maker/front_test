/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  createStyles,
  Drawer,
  Group,
  Header,
  Image,
  Modal,
  rem,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearStoredGpt } from 'storage/gpt-storage';
import { clearStoredRoadmap } from 'storage/roadmap-storage';
import { styled } from 'styled-components';

import { useAuth } from '../../../auth/useAuth';
import { useUser } from '../../../components/user/hooks/useUser';
import { InputWithButton } from './GptModal';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderItem() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const { user } = useUser();
  const { signout } = useAuth();
  const { pathname } = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditorPage, setIsEditorPage] = useState(false);
  const [leaveEditorAction, setLeaveEditorAction] = useState('');

  return (
    <HeaderWrap>
      <Box>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Image
              src="/img/logo.png"
              width={100}
              height="2rem"
              ml={10}
              onClick={() => {
                setLeaveEditorAction('home');
                pathname === '/roadmap/editor'
                  ? setIsEditorPage(true)
                  : navigate('/');
              }}
              className="hoverItem"
            />
            <Group className={classes.hiddenMobile}>
              {pathname !== '/roadmap/editor' && (
                <Button size="md" onClick={open} variant="light" color="indigo">
                  로드맵 생성
                </Button>
              )}
              {user && 'accessToken' in user ? (
                <>
                  <Text
                    c="blue"
                    size="md"
                    mx={20}
                    className="hoverItem"
                    onClick={() => {
                      setLeaveEditorAction('mypage');
                      pathname === '/roadmap/editor'
                        ? setIsEditorPage(true)
                        : navigate('/users/mypage');
                    }}
                  >
                    <Avatar
                      color="cyan"
                      radius="xl"
                      className="hoverItem"
                      onClick={() => {
                        setLeaveEditorAction('mypage');
                        pathname === '/roadmap/editor'
                          ? setIsEditorPage(true)
                          : navigate('/users/mypage');
                      }}
                    >
                      {user.nickname.slice(0, 1)}
                    </Avatar>
                  </Text>
                  <Button
                    size="md"
                    onClick={() => {
                      setLeaveEditorAction('signout');
                      pathname === '/roadmap/editor'
                        ? setIsEditorPage(true)
                        : signout();
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  onClick={() => {
                    pathname === '/roadmap/editor'
                      ? setIsEditorPage(true)
                      : navigate('/users/signin');
                  }}
                >
                  Sign in
                </Button>
              )}
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
            <Drawer
              opened={drawerOpened}
              onClose={toggleDrawer}
              title="Authentication"
            >
              {/* Drawer content */} eh..
            </Drawer>
          </Group>
        </Header>
      </Box>
      <Group className={classes.hiddenMobile}>
        <Modal.Root
          opened={isEditorPage}
          onClose={() => setIsEditorPage(false)}
          centered
        >
          <Modal.Overlay color="#000" opacity={0.85} />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>
                <h1>로드맵 작성을 중단하시겠습니까?</h1>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
              <IconAlertTriangle
                size="100"
                style={{
                  display: 'block',
                  opacity: 0.5,
                  marginBottom: '1rem',
                  width: '18em',
                  color: '#ff2825',
                  margin: '0 auto',
                }}
              />{' '}
              <h3>변경사항이 저장되지 않을 수 있습니다. </h3>
              <Button
                mt="1rem"
                mb="1rem"
                style={{ float: 'right' }}
                onClick={() => {
                  if (leaveEditorAction === 'mypage') {
                    navigate('/users/mypage');
                  }
                  if (leaveEditorAction === 'home') {
                    navigate('/');
                  }
                  if (leaveEditorAction === 'signout') {
                    signout();
                  }
                }}
              >
                나가기
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>

        <Modal opened={opened} onClose={close} size="70%">
          <Center>
            <h1>새로운 로드맵 생성하기</h1>
          </Center>
          <Center>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDEv4qC_L_0WLYmLRBtBd2sYGkjMzWvGqrOw&usqp=CAU"
              width={300}
              height={280}
            />
          </Center>
          <Center>
            <InputWithButton />
          </Center>
          <Center mt={50}>
            <h5>오늘은 그냥 템플릿 없이 빈 로드맵 만들게요.</h5>
            <Button
              size="xs"
              variant="light"
              color="blue"
              onClick={() => {
                clearStoredRoadmap();
                clearStoredGpt();
                if (!user || !('accessToken' in user)) {
                  // eslint-disable-next-line no-alert
                  alert('로그인 후 이용가능합니다.');
                  navigate('/users/signin');
                }
                // if(localStorage.getItem(''))
                navigate('/roadmap/editor');
              }}
            >
              빈 로드맵 만들기
            </Button>
          </Center>
        </Modal>
      </Group>
    </HeaderWrap>
  );
}
const HeaderWrap = styled.nav`
  & .hoverItem:hover {
    cursor: pointer;
  }
  & .confirm_btn_wrap {
    display: inline-flex;
  }
`;
