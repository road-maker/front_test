import { ActionIcon, Avatar, Group, Paper, Text, Title } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { HeaderMegaMenu } from 'layout/mainLayout/header/header';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

// import { HeaderMegaMenu } from '../../pages/main/header';
// import { usePatchUser } from '../common/hooks/usePatchUser';
// import { useUser } from './hooks/useUser';
import UserRoadmap from './userRoadmap';

const mockdata = [
  {
    id: 1,
    nickname: '박주영',
    info: '나는 코딩마스터 박주영이다.',
    bjid: '@aljlkdjakls',
    image: '주영',
  },
];

export function UserProfile(): ReactElement {
  const navigate = useNavigate();
  const myinfo = mockdata.map((info) => (
    <Paper withBorder radius="xs" p="xl" mx={500} my={50}>
      <Group position="center">
        <Avatar color="cyan" radius="xl">
          {info.image}
        </Avatar>
        <Group>
          <Text size="sm">{info.nickname}</Text>
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
        {info.info}
      </Text>
      <Text fz="sm" color="dimmed" lineClamp={4} mt={5} ta="center">
        {info.bjid}
      </Text>
    </Paper>
  ));

  return (
    <>
      {/* // <HeaderMegaMenu />
      <Paper withBorder shadow="md" radius="xs" p="xl" m={50}>
        <Group position="center">
          <Avatar color="cyan" radius="xl">
            주영
          </Avatar>
          <Group>
            <Text size="sm">박주영</Text>
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
          나는 코딩마스터 박주영이다.
        </Text>
      </Paper> */}
      <HeaderMegaMenu />
      <Title order={1} ta="center">
        마이페이지
      </Title>
      {myinfo}
      <UserRoadmap />
    </>
  );
}
