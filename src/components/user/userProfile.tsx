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
// import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

// import { getStoredUser } from 'storage/user-storage';
import { HeaderMegaMenu } from '../../layout/mainLayout/header/header';
// import { User } from '../../types/types';
import { useUser } from './hooks/useUser';
import UserRoadmap from './userRoadmap';

const mockdata = {
  // id: 1,
  // nickname: '박주영',
  // info: '나는 코딩마스터 박주영이다.',
  // bjid: '@aljlkdjakls',
  image: '주영',
};

export function UserProfile(): ReactElement {
  const navigate = useNavigate();
  // const { myInfo } = UseUserInfo();
  const { user } = useUser();

  const myinfo = (
    <Paper withBorder radius="xs" p="xl" mx={500} my={50}>
      <Group position="center">
        <Avatar color="cyan" radius="xl">
          {mockdata.image}
        </Avatar>
        <Group>
          <Text>{user.nickname}</Text>
          <ActionIcon
            onClick={() => {
              navigate('edit');
            }}
          >
            <IconSettings />
          </ActionIcon>
        </Group>
      </Group>
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
