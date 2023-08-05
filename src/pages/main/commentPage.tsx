/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  Paper,
  rem,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { useUser } from '../../components/user/hooks/useUser';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

function CommentPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  // const [count, handlers] = useCounter(0, { min: 0, max: 1000 });
  const [commentPage, setCommentPage] = useState(1);
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const { user } = useUser();
  const [counts, setCounts] = useState([]);

  const fetchComments = useCallback(() => {
    axios
      .get(
        `${baseUrl}/roadmaps/load-roadmap/${pathname.slice(
          pathname.lastIndexOf('/') + 1,
        )}/comments?page=${commentPage}&size=5`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((v) => {
        setContent(v?.data);
        // setCounts(new Array(commentContents.length).fill(0));
        // setNickname(v?.data?.commentNickname);
      })
      .catch((e) => console.log(e));
  }, [commentPage, pathname]);

  const {
    refetch,
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    'comments',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage.result);
        if (lastPage.result.length !== 0) {
          return lastPage.next;
        }
        return undefined;
      },
    },
  );

  useEffect(() => {
    setCommentPage(1); // pathname이 변경될 때 commentPage 초기화
    refetch(); // refetch 함수를 호출하여 데이터를 다시 로드
    fetchComments();
  }, [commentPage, fetchComments, pathname, refetch, user.accessToken]);

  const initialUrl = `${baseUrl}/roadmaps/load-roadmap/${pathname.slice(
    pathname.lastIndexOf('/') + 1,
  )}/comments?page=${commentPage}&size=5`;

  const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  const handleCommentTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCommentContentChange = (event) => {
    setCommentInput(event.target.value);
  };

  function handleSubmit() {
    axios
      .post(
        `${baseUrl}/comments/save-comment`,
        {
          // commentTitle: title,
          content: commentInput,
          roadmapId: Number(pathname.slice(pathname.lastIndexOf('/') + 1)),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        fetchComments();
        refetch();
      })
      .catch((e) => console.log('err', e));
  }
  return (
    <>
      {' '}
      <Modal opened={opened} onClose={close}>
        <Center>
          <h2>코멘트 작성</h2>
        </Center>
        {/* <Select
          label="코멘트 위치"
          placeholder="선택하세요"
          data={[
            { value: 'svelte', label: '자바스크립트' },
            { value: 'vue', label: '함수 개념과 활용법' },
            { value: 'react', label: '그래프위치' },
            { value: 'ng', label: '조건문과 반복문' },
          ]}
          name="topic" 
          value={topic}
          onChange={handleInputChange}
        /> */}
        <TextInput
          mt={80}
          placeholder="제목을 입력하세요"
          name="title"
          onChange={handleCommentTitleChange}
        />
        <Textarea
          autosize
          minRows={5}
          maxRows={10}
          mt={30}
          placeholder="내용을 입력하세요"
          name="content"
          onChange={handleCommentContentChange}
        />
        <Center>
          <Button
            mt={30}
            onClick={() => {
              handleSubmit();
              close();
            }}
          >
            작성하기
          </Button>
        </Center>
      </Modal>
      <Group position="right">
        {/* <InputWithButton /> */}
        <Select
          mt={20}
          defaultValue="최신순"
          data={[
            { value: 'svelte', label: '최신순' },
            { value: 'vue', label: '공감순' },
          ]}
        />
      </Group>
      <Center mt={20}>
        <Button onClick={open}>코멘트 작성하기</Button>
      </Center>
      {content.length === 0 ? (
        <Paper withBorder shadow="md" radius="xs" p="xl" ta="center" mt={20}>
          댓글이 없습니다.
        </Paper>
      ) : (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          <SimpleGrid
            key={user.id}
            cols={1}
            spacing="xl"
            mt={70}
            breakpoints={[{ maxWidth: 'md', cols: 1 }]}
          >
            {data.pages.map((pageData) => {
              return pageData.result.map((comments, index) => (
                <Paper withBorder radius="xs" p="xl" key={index}>
                  <Group>
                    {/* <Avatar color="cyan" radius="xl">
            {user.nickname.substring(0, 1)}
          </Avatar> */}
                    <div>
                      {/* <Text size="sm">{nickname}</Text> */}
                      {/* <Text size="xs" color="dimmed">
                {title}
              </Text> */}
                    </div>
                  </Group>
                  <Text className={classes.body} size="sm">
                    {comments.content}
                    {/* <Group>
                <ActionIcon onClick={handlers.increment}>
                  <IconHeart
                    size="1.5rem"
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
                {count}
              </Group> */}
                  </Text>
                </Paper>
              ));
            })}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  );
}

export default CommentPage;
