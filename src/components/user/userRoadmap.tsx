import { Carousel } from '@mantine/carousel';
import {
  Card,
  createStyles,
  Group,
  Image,
  Paper,
  PaperProps,
  Progress,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const mockdata = [
  {
    id: 21,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
  {
    id: 25,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
  {
    id: 26,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
  {
    id: 27,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
  {
    id: 28,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
];

const dummy = [
  {
    id: 22,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 100,
  },
  {
    id: 23,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 100,
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

export default function UserRoadmap(props: PaperProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const cards = mockdata.map((article) => (
    <Card
      key={article.id}
      radius="md"
      component="a"
      className={classes.card}
      ml={50}
    >
      <Card.Section>
        <Image
          src={article.image}
          alt={article.title}
          height={130}
          width={200}
        />
      </Card.Section>
      <Text
        className={classes.title}
        mt={5}
        onClick={() => {
          navigate(`/roadmap/post/${article.id}`);
        }}
      >
        {article.title}
      </Text>
      <Progress
        value={article.process}
        label={article.process.toString()}
        size="xl"
        radius="xl"
        color="indigo"
        w={180}
        mt={10}
      />
      <Text color="dimmed" size="xs" weight={700} mt={5}>
        {article.date}
      </Text>
    </Card>
  ));

  const complete = dummy.map((article) => (
    <Card
      key={article.id}
      radius="md"
      component="a"
      className={classes.card}
      ml={50}
    >
      <Card.Section>
        <Image
          src={article.image}
          alt={article.title}
          height={130}
          width={200}
        />
      </Card.Section>
      <Text
        className={classes.title}
        mt={5}
        onClick={() => {
          navigate(`/roadmap/post/${article.id}`);
        }}
      >
        {article.title}
      </Text>
      <Progress
        value={article.process}
        label={article.process.toString()}
        size="xl"
        radius="xl"
        color="pink"
        w={180}
        mt={10}
      />
      <Text color="dimmed" size="xs" weight={700} mt={5}>
        {article.date}
      </Text>
    </Card>
  ));

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Group position="center" mt={30}>
        <h2>진행 중인 로드맵</h2>
      </Group>
      <Paper
        radius="md"
        px={60}
        py={30}
        mt={40}
        m="auto"
        withBorder
        {...props}
        w={1000}
        h={280}
      >
        <Carousel
          slideSize="100%"
          slideGap="33.3333%"
          loop
          // breakpoints={[{ maxWidth: 'xl', slideSize: '100%', slideGap: 10 }]
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          {cards}
        </Carousel>
      </Paper>
      <Group position="center" mt={30}>
        <h2>진행 완료한 로드맵</h2>
      </Group>
      <Paper
        radius="md"
        px={60}
        py={30}
        mt={40}
        m="auto"
        withBorder
        {...props}
        w={1000}
        h={280}
      >
        <Carousel
          slideSize="100%"
          slideGap="33.3333%"
          loop
          // breakpoints={[{ maxWidth: 'xl', slideSize: '100%', slideGap: 10 }]
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          {complete}
        </Carousel>
      </Paper>
    </>
  );
}
