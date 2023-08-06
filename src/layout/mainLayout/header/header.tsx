/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Header,
  Image,
  LoadingOverlay,
  Modal,
  rem,
  Text,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react';
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useInput } from 'components/common/hooks/useInput';
// import { usePrompt } from 'components/prompts/hooks/usePrompt';
import { usePromptAnswer } from 'components/prompts/hooks/usePromptResponse';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearStoredGpt } from 'storage/gpt-storage';
import { clearStoredRoadmap } from 'storage/roadmap-storage';
import { styled } from 'styled-components';

import { useAuth } from '../../../auth/useAuth';
import { useUser } from '../../../components/user/hooks/useUser';

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
    // paddingBottom: theme.spacing.xl,
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

export function HeaderMegaMenu() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useUser();
  const { signout } = useAuth();
  const { pathname } = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditorPage, setIsEditorPage] = useState(false);
  const [leaveEditorAction, setLeaveEditorAction] = useState('');
  const [search, onChangeSearch, setSearch] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const searchByKeyword = useCallback(() => {
    axios
      .get(`${baseUrl}/roadmaps/search/${search}?page=${1}&size=5`)
      .then((v) => {
        localStorage.setItem('roadmap_search_keyword', search);
        navigate(`/roadmap/post/search/${search}`);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <HeaderWrap>
      <Box>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Group
              sx={{ height: '100%' }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Image
                src="/img/logo.png"
                width={200}
                height={50}
                onClick={() => {
                  setLeaveEditorAction('home');
                  pathname === '/roadmap/editor'
                    ? setIsEditorPage(true)
                    : navigate('/');
                }}
                className="hoverItem"
              />
              {/* <InputWithButton ml="5rem" /> */}
              {pathname !== '/roadmap/editor' && (
                <TextInput
                  value={search}
                  onChange={onChangeSearch}
                  placeholder="검색어를 입력해주세요."
                  rightSection={
                    // isLoading ? <Loader size="xs" /> : <IconSearch size="xs" />
                    <ActionIcon
                      variant="filled"
                      color="blue"
                      loading={isLoading}
                      disabled={isLoading}
                      sx={{
                        borderRadius: '100%',
                        '&[data-disabled]': { opacity: 0.4 },
                        '&[data-loading]': { backgroundColor: 'red' },
                      }}
                    >
                      <IconSearch
                        size="1rem"
                        onClick={() => searchByKeyword()}
                      />
                    </ActionIcon>
                  }
                />
              )}
            </Group>

            <Group className={classes.hiddenMobile}>
              <Modal
                opened={isEditorPage}
                size="70%"
                onClose={() => setIsEditorPage(false)}
              >
                <Center>
                  <Center>
                    <h1>로드맵을 아직 출간하지 않았습니다. </h1>
                    <h3>변경사항이 저장되지 않을 수 있습니다. </h3>
                  </Center>
                  <div className="confirm_btn_wrap">
                    <Button
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

                    <Button
                      variant="outline"
                      onClick={() => setIsEditorPage(false)}
                    >
                      취소
                    </Button>
                  </div>
                </Center>
              </Modal>
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
              <Group position="center">
                {pathname !== '/roadmap/editor' && (
                  <Button onClick={open} variant="light" color="indigo">
                    로드맵 생성하기
                  </Button>
                )}
              </Group>
              {user && 'accessToken' in user ? (
                <>
                  <Text
                    c="blue"
                    className="hoverItem"
                    onClick={() => {
                      setLeaveEditorAction('mypage');
                      pathname === '/roadmap/editor'
                        ? setIsEditorPage(true)
                        : navigate('/users/mypage');
                    }}
                  >
                    {user.nickname}님
                  </Text>
                  <Button
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
          </Group>
        </Header>
      </Box>
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

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();
  const [prompt, onPromptChange, setPrompt] = useInput('');
  // const { getprompt } = usePrompt();
  const navigate = useNavigate();
  const { user } = useUser();
  // const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { clearGptAnswer, updateGptAnswer } = usePromptAnswer();
  // const [promptResponse, setPromptResponse] = useState();
  const [promptResponse, setPromptResponse] =
    useState<AxiosResponse | null | void>(null);

  // const onRequestPrompt = useCallback(() => {
  const onRequestPrompt = () => {
    updateGptAnswer({ keyword: prompt });
    setPromptResponse(prompt);
  };
  // const onRequestPrompt = () => {
  //   updateGptAnswer({ keyword: prompt });
  //   setPromptResponse(prompt);
  //   // setIsLoading(true);
  //   // axios
  //   //   .post(`${baseUrl}/chat?prompt=${prompt}`, {
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //       Authorization: `Bearer ${user?.accessToken}`,
  //   //     },
  //   //   })
  //   //   .then((result) => {
  //   //     console.log(result);
  //   //     setPromptResponse(result);
  //   //     // navigate(`/roadmap/editor`);
  //   //   })
  //   //   .then(() => {
  //   //     setIsLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });

  //   // queryClient.prefetchQuery(['prompts', prompt], () => {
  //   //   getprompt(prompt);
  //   //   updateGptAnswer(promptResponse as unknown as Prompt);
  //   // });
  // };

  // const onRequestPrompt = () => {

  //   axios
  //     .post(`${baseUrl}/chat?prompt=${prompt}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user?.accessToken}`,
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       navigate(`/roadmap/editor`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const onRequestPrompt = useMemo(() => {}, []);

  // useMemo(() => {
  useEffect(() => {
    // @Pyotato : 페이지 안넘어가던 문제 해결~
    if (promptResponse) {
      navigate(`/roadmap/editor`);
    }
  }, [promptResponse, navigate]);
  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        value={prompt}
        onChange={onPromptChange}
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="md"
        w="600px"
        rightSection={
          <ActionIcon
            size={32}
            onClick={() => {
              if (!user?.accessToken) {
                alert('로그인 후 이용가능합니다.');
                navigate('/users/signin');
              }
              // onRequestPrompt();
              onRequestPrompt();
            }}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            {theme.dir === 'ltr' ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        rightSectionWidth={42}
        placeholder="키워드를 입력하세요"
        {...props}
      />
    </>
  );
}
