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

import CommentPage from './commentPage';
import { HeaderMegaMenu } from './header';

const mockdata = [
  {
    title: '참여인원: 800명',
    icon: IconUser,
  },
  {
    title: '완료인원: 80명',
    icon: IconChecklist,
  },
  {
    title: '권장 수행기간: 6개월',
    icon: Icon24Hours,
  },
  {
    title: '난이도: 입문',
    icon: IconStars,
  },
];

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
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md" c="dimmed">
        {feature.title}
      </Text>
      {/* <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text> */}
    </Card>
  ));

  return (
    <>
      <HeaderMegaMenu />
      <Container px="xs">
        <Title className={classes.title} mt="sm">
          Javasript 정복하기
        </Title>
        <Group>
          <Avatar color="purple" radius="xl">
            HM
          </Avatar>
          표혜민
        </Group>
        <Button ml={800}>참여하기</Button>
        <Text c="dimmed" className={classes.description} mt="md">
          이 로드맵은 초보 프론트엔드 개발자를 위한 로드맵입니다.
        </Text>
        <SimpleGrid
          cols={4}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          {features}
        </SimpleGrid>
        {/* <InteractionFlow /> */}
        <CommentPage />
      </Container>
    </>
  );
}

export default PostedRoadmap;
