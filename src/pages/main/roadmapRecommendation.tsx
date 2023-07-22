import {
  ActionIcon,
  Avatar,
  Card,
  Container,
  createStyles,
  Group,
  Image,
  Paper,
  PaperProps,
  rem,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import RoadMapEditor from 'components/editor/RoadMapEditor';

const mockdata = [
  {
    id: 1,
    title: 'Javascript 정복하기',
    category: 'Frontend',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: 'August 18, 2022',
    author: {
      name: '표혜민',
      description: '한 번 정복해보아요~^^',
    },
  },
  {
    id: 2,
    title: 'Javascript 정복하기',
    category: 'Frontend',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: 'August 18, 2022',
    author: {
      name: '표혜민',
      description: '한 번 정복해보아요~^^',
    },
  },
  {
    id: 3,
    title: 'Javascript 정복하기',
    category: 'Frontend',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: 'August 18, 2022',
    author: {
      name: '표혜민',
      description: '한 번 정복해보아요~^^',
      profile: 'avatar.png',
    },
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  author: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    fontSize: '13px',
  },
}));

export function RoadmapRecommendation(props: PaperProps) {
  const { classes, theme } = useStyles();

  const cards = mockdata.map((article) => (
    <Card key={article.id} radius="md" component="a" className={classes.card}>
      <Card.Section>
        <Image
          src={article.image}
          alt={article.title}
          height={160}
          width={240}
        />
      </Card.Section>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Text fz="sm" color="dimmed" lineClamp={4} mt={5}>
        {article.author.description}
      </Text>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {`#${article.category}`}
      </Text>
      <Group spacing={5}>
        <Avatar src={article.author.profile} alt="it's me" />
        <Text className={classes.author} mt={5}>
          {article.author.name}
        </Text>
        <ActionIcon>
          <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
        </ActionIcon>
        <ActionIcon>
          <IconBookmark
            size="1.2rem"
            color={theme.colors.yellow[6]}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon>
          <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  ));

  return (
    <Container>
      <h1>추천 로드맵</h1>
      <Paper radius="md" p="xl" ml={50} mr={50} withBorder {...props}>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 'sm', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {cards}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}
