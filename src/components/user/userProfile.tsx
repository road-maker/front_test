import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Text,
  // TextInput,
  Title,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import axios from 'axios';
// import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setStoredUser } from 'storage/user-storage';

import { baseUrl } from '../../axiosInstance/constants';
// import { getStoredUser } from 'storage/user-storage';
import { HeaderMegaMenu } from '../../layout/mainLayout/header/header';
// import { User } from '../../types/types';
import { UseUserInfo } from './hooks/useProfile';
import { useUser } from './hooks/useUser';
import UserRoadmap from './userRoadmap';

export function UserProfile() {
  // export function UserProfile(): ReactElement {
  const navigate = useNavigate();
  // const { myInfo } = UseUserInfo();
  const { user } = useUser();
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [baekjoonId, setBaekjoonId] = useState('');

  useEffect(() => {
    myInfo();
    // console.log('user', user?.member?.nickname);
  }, []);

  function myInfo() {
    if (!user?.id) {
      // user 객체에 memberId가 없는 경우 처리
      console.error('User memberId is not available.');
      return;
    }

    axios
      .get(`${baseUrl}/members/${user.id}`)
      .then((response) => {
        setNickname(response.data.nickname);
        setBio(response.data.bio);
        setBaekjoonId(response.data.baekjoonId);
      })
      .catch((e) => console.log(e));
  }

  const myinfo = (
    <Paper withBorder radius="xs" p="xl" mx={500} my={50}>
      <Group position="center">
        <Avatar color="cyan" radius="xl">
          {nickname.substring(0, 1)}
        </Avatar>
        <Group>
          <Text>{nickname}</Text>
          <ActionIcon
            onClick={() => {
              navigate('edit');
            }}
          >
            <IconSettings />
          </ActionIcon>
        </Group>
      </Group>
      <Text size="sm" ta="center" mt={20}>
        {bio}
      </Text>
      <Text fz="sm" color="dimmed" lineClamp={4} mt={5} ta="center">
        {baekjoonId}
      </Text>
    </Paper>
  );

  return (
    <>
      <HeaderMegaMenu />
      <Title order={1} ta="center">
        마이페이지
      </Title>
      {myinfo}
      <UserRoadmap />
    </>
  );
}
