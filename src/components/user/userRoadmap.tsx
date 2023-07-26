import {
  Card,
  Container,
  createStyles,
  Image,
  Paper,
  PaperProps,
  Progress,
  rem,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const mockdata = [
  {
    id: 22,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
  },
  {
    id: 23,
    title: 'Javascript 정복하기',
    image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
    date: '마지막 달성: 8일 전',
    process: 78,
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
    <Card key={article.id} radius="md" component="a" className={classes.card}>
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
          navigate('/roadmap/view');
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
        mt={10}
      />
      <Text color="dimmed" size="xs" weight={700} mt={5}>
        {article.date}
      </Text>
    </Card>
  ));

  return (
    <Container>
      <h2>진행중인 로드맵</h2>
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
      <h2>진행완료한 로드맵</h2>
      <Paper radius="md" p="xl" mx={50} mt={20} withBorder {...props}>
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
