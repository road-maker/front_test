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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { getStoredUser } from 'storage/user-storage';
import { HeaderMegaMenu } from '../../layout/mainLayout/header/header';
// import { User } from '../../types/types';
import { UseUserInfo } from './hooks/useProfile';
import { useUser } from './hooks/useUser';
import UserRoadmap from './userRoadmap';

export function UserProfile() {
  // export function UserProfile(): ReactElement {
  const navigate = useNavigate();
  const { myInfo } = UseUserInfo();
  const { user } = useUser();

  useEffect(() => {
    myInfo(user?.member);
    // console.log('user', user?.member?.nickname);
  }, [myInfo, user]);

  const myinfo = (
    <Paper withBorder radius="xs" p="xl" mx={500} my={50}>
      <Group position="center">
        <Avatar color="cyan" radius="xl">
          {user?.member?.nickname.substring(0, 1)}
        </Avatar>
        <Group>
          <Text>{user?.member?.nickname}</Text>
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
        {user?.member?.bio}
      </Text>
      <Text fz="sm" color="dimmed" lineClamp={4} mt={5} ta="center">
        {user?.member?.baekjoonId}
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
