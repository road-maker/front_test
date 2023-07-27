import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Image,
  Paper,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { useRoadmap } from 'components/roadmaps/hooks/useRoadmap';
import { useRoadmapData } from 'components/roadmaps/hooks/useRoadMapResponse';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function RoadmapRecommendation(props) {
  const [allRoadmapData, setAllRoadmapData] = useState([]);

  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const themes = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${themes.breakpoints.sm})`);
  const { getAllRoadmap, getRoadmap } = useRoadmap();
  const { roadmaps } = useRoadmapData();

  useEffect(() => {
    getAllRoadmap();
    if (roadmaps !== undefined) {
      setAllRoadmapData(roadmaps?.data);
    }
  }, []);

  const cards = !allRoadmapData
    ? '아직 만들어진 로드맵이 없습니다.'
    : allRoadmapData.map((article) => (
        <Carousel.Slide>
          <Card
            key={article.id}
            radius="md"
            component="a"
            className={classes.card}
            ml={100}
            onClick={() => getRoadmap(article.id)}
          >
            <Card.Section>
              {article.thumbnailUrl ? (
                <Image
                  src={article.thumbnailUrl}
                  alt={`${article.title}.img`}
                  height={160}
                  width={260}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/roadmap/post/${article.id}`);
                  }}
                />
              ) : (
                <Image
                  src="https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D"
                  alt={`${article.title}.img`}
                  height={160}
                  width={260}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/roadmap/editor/view');
                  }}
                />
              )}
            </Card.Section>
            <Text
              className={classes.title}
              mt={5}
              onClick={() => {
                navigate('/roadmap/editor/view');
              }}
              style={{ cursor: 'pointer' }}
            >
              {article?.title}
            </Text>
            <Text
              color="dimmed"
              size="xs"
              transform="uppercase"
              weight={700}
              mt="md"
            >
              권장 수행 시간 : {`#${article.recommendedExecutionTimeValue}`}{' '}
              {`#${article.recommendedExecutionTimeValue}`}
            </Text>
            <Group spacing={5}>
              <ActionIcon>
                <IconHeart
                  size="1.2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon>
                <IconBookmark
                  size="1.2rem"
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon>
                <IconShare
                  size="1.2rem"
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Card>
        </Carousel.Slide>
      ));

  return (
    <>
      <Group position="center" mt={30}>
        <h1>추천 로드맵</h1>
      </Group>
      <Paper
        radius="md"
        px={60}
        py={30}
        mt={40}
        m="auto"
        withBorder
        {...props}
        w={1500}
        h={400}
      >
        <Carousel
          slideSize="100%"
          slideGap="100%"
          loop
          align="start"
          slidesToScroll={mobile ? 1 : 2}
          breakpoints={[
            { maxWidth: 'md', slideSize: '50%' },
            { maxWidth: 'sm', slideSize: '100%', slideGap: 100 },
          ]}
        >
          {cards}
        </Carousel>
      </Paper>
    </>
  );
}
