import { ActionIcon, Avatar, Group, Paper, Text } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

// import { HeaderMegaMenu } from '../../pages/main/header';
// import { usePatchUser } from '../common/hooks/usePatchUser';
// import { useUser } from './hooks/useUser';
import UserRoadmap from './userRoadmap';

export function UserProfile(): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      {/* <HeaderMegaMenu /> */}
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
      </Paper>
      <UserRoadmap />
    </>
  );
}
