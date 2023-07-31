import {
  ActionIcon,
  Avatar,
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
import { useCounter, useDisclosure } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useRoadmap } from 'components/roadmaps/posts/hooks/useRoadmap';
import { useRoadmapData } from 'components/roadmaps/posts/hooks/useRoadMapResponse';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useCommentInfo } from '../../components/user/hooks/useComment';
import { useUser } from '../../components/user/hooks/useUser';
// import { InputWithButton } from './header';
// import { InputWithButton } from '../../layout/mainLayout/header';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

function CommentPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [count, handlers] = useCounter(0, { min: 0, max: 1000 });
  const [commentPage, setCommentPage] = useState(0);
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const { user } = useUser();
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/roadmaps/load-roadmap/${pathname.slice(
          pathname.lastIndexOf('/') + 1,
        )}/comments?page=${commentPage}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((v) => {
        console.log(v);
        // setTitle(v?.data?.title);
        setContent(v?.data?.content);
        // setNickname(v?.data?.commentNickname);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleCommentTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCommentContentChange = (event) => {
    setContent(event.target.value);
  };

  function handleSubmit() {
    axios
      .post(
        `${baseUrl}/comments/save-comment`,
        {
          // commentTitle: title,
          content,
          roadmapId: pathname.slice(pathname.lastIndexOf('/') + 1),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((v) => {
        console.log(v);
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
          name="topic" // 폼 데이터의 location 필드와 연결
          value={topic}
          onChange={handleInputChange}
        /> */}
        <TextInput
          mt={80}
          placeholder="제목을 입력하세요"
          name="title" // 폼 데이터의 title 필드와 연결
          onChange={handleCommentTitleChange}
        />
        <Textarea
          autosize
          minRows={5}
          maxRows={10}
          mt={30}
          placeholder="내용을 입력하세요"
          name="content" // 폼 데이터의 content 필드와 연결
          onChange={handleCommentContentChange}
        />
        <Center>
          <Button
            mt={30}
            onClick={() => {
              handleSubmit();
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
      {content ? (
        <SimpleGrid
          key={user.id}
          cols={1}
          spacing="xl"
          mt={20}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          <Paper withBorder shadow="md" radius="xs" p="xl">
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
              {content}
              <Group>
                <ActionIcon onClick={handlers.increment}>
                  <IconHeart
                    size="1.5rem"
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
                {count}
              </Group>
            </Text>
          </Paper>
        </SimpleGrid>
      ) : (
        '댓글이 없습니다.'
      )}
    </>
  );
}

export default CommentPage;
