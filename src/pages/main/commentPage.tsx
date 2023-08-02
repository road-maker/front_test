/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Button,
  Center,
  createStyles,
  Group,
  Modal,
  rem,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useCounter, useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useEffect, useState } from 'react';
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
  const [count, handlers] = useCounter(0, { min: 0, max: 1000 });
  const [commentPage, setCommentPage] = useState(0);
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    </>
  );
}

export default CommentPage;
