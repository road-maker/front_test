import {
  Avatar,
  Button,
  Card,
  Container,
  createStyles,
  Group,
  rem,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import {
  Icon24Hours,
  IconChecklist,
  IconStars,
  IconUser,
} from '@tabler/icons-react';
import { useRoadmapData } from 'components/roadmaps/posts/hooks/useRoadMapResponse';
import MainLayout from 'layout/mainLayout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CommentPage from '../../main/commentPage';
import CompleteRoadmap from './completeRoadmap';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

function PostedRoadmap() {
  const { classes, theme } = useStyles();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );

  const { roadmapById } = useRoadmapData(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );
  const [currentRoadmap, setCurrentRoadmap] = useState(roadmapById?.data || []);
  const [currentNodes, setCurrentNodes] = useState(roadmapById?.data || []);
  // const [currentNodes, setCurrentNodes] = useState(
  //   roadmapById?.data?.edges || [],
  // );
  // const [currentEdges, setCurrentEdges] = useState(
  //   roadmapById?.data?.nodes || [],
  // );
  // const [currentViewport, setCurrentViewport] = useState(
  //   roadmapById?.data?.viewport || [],
  // );

  useEffect(() => {
    if (currentPage !== roadmapById?.data?.roadmap?.id) {
      setCurrentRoadmap(
        JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap,
      );
      setCurrentNodes(
        JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap,
      );
      // setCurrentNodes(
      //   JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap?.nodes,
      // );
      // setCurrentEdges(
      //   JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap?.edges,
      // );
      // setCurrentViewport(
      //   JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap
      //     ?.viewport,
      // );
      // console.log('currentRoadmap', currentRoadmap);
    }
  }, []);

  // const features = data.map((feature) => (
  //   <Card
  //     key={feature.title}
  //     mb={30}
  //     shadow="md"
  //     radius="md"
  //     className={classes.card}
  //     padding="xl"
  //   >
  //     <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
  //     <Text fz="lg" fw={500} className={classes.cardTitle} mt="md" c="dimmed">
  //       {feature.title}
  //     </Text>
  //     <Text fz="sm" c="dimmed" mt="sm">
  //       {feature.description}
  //     </Text>
  //   </Card>
  // ));

  return (
    <MainLayout>
      <Container px="xs" maw={1000}>
        <Title className={classes.title} mt="sm">
          {currentRoadmap?.title}
        </Title>
        <Group mt={20}>
          <Avatar color="purple" radius="xl">
            {currentRoadmap?.ownerAvatarUrl || '없음'}
          </Avatar>
          {currentRoadmap?.ownerNickname || 'no nickname'}
        </Group>
        <Button ml={800}>참여하기</Button>
        <Text c="dimmed" className={classes.description} mt="md">
          {currentRoadmap?.description || '없음'}
        </Text>
        <SimpleGrid
          cols={4}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconUser
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              참여인원: 명
            </Text>
          </Card>
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconChecklist
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              완료인원: 명
            </Text>
          </Card>
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <Icon24Hours
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              권장 수행기간:{' '}
              {currentRoadmap?.recommendedExecutionTimeValue || 'X'}{' '}
              {currentRoadmap?.recommendedExecutionTimeUnit}
            </Text>
          </Card>
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconStars
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              난이도: {currentRoadmap?.recommendedExecutionTimeUnit}
            </Text>
          </Card>
        </SimpleGrid>
        <CompleteRoadmap
        // postNodes={currentNodes}
        // postEdges={currentEdges}
        // postViewport={currentViewport}
        />
        <CommentPage />
      </Container>
    </MainLayout>
  );
}

export default PostedRoadmap;
