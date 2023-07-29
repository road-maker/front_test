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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRoadmap } from '../roadmaps/posts/hooks/useRoadmap';
import { useRoadmapData } from '../roadmaps/posts/hooks/useRoadMapResponse';

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
  const [allRoadmapData, setAllRoadmapData] = useState([]);

  // const { getAllRoadmap, getRoadmap } = useRoadmap();
  const { roadmaps } = useRoadmapData();
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
      <Group position="center" mt={30}>
        <h2>내가 만든 로드맵</h2>
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
    </>
  );
}

// import {
//   ActionIcon,
//   Card,
//   Container,
//   createStyles,
//   Group,
//   Image,
//   rem,
//   SimpleGrid,
//   Text,
// } from '@mantine/core';
// import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
// import { useRoadmap } from 'components/roadmaps/hooks/useRoadmap';
// import { useRoadmapData } from 'components/roadmaps/hooks/useRoadMapResponse';
// import { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
// import { useInfiniteQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// export function RoadmapRecommendation() {
//   const [allRoadmapData, setAllRoadmapData] = useState([]);

//   const { classes, theme } = useStyles();
//   const navigate = useNavigate();
//   const { getAllRoadmap, getRoadmap } = useRoadmap();
//   const { roadmaps } = useRoadmapData();

//   useEffect(() => {
//     getAllRoadmap();
//     if (roadmaps !== undefined) {
//       setAllRoadmapData(roadmaps?.data);
//     }
//   }, [getAllRoadmap, roadmaps]);

//   const cards = !allRoadmapData
//     ? '아직 만들어진 로드맵이 없습니다.'
//     : allRoadmapData.map((article) => (
//         <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
//           <Card
//             key={article.id}
//             radius="md"
//             component="a"
//             className={classes.card}
//             ml={100}
//             onClick={() => getRoadmap(article.id)}
//           >
//             <Card.Section>
//               {article.thumbnailUrl ? (
//                 <Image
//                   src={article.thumbnailUrl}
//                   alt={`${article.title}.img`}
//                   height={160}
//                   width={260}
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => {
//                     navigate(`/roadmap/post/${article.id}`);
//                   }}
//                 />
//               ) : (
//                 <Image
//                   src="https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D"
//                   alt={`${article.title}.img`}
//                   height={160}
//                   width={260}
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => {
//                     navigate('/roadmap/post/:id');
//                   }}
//                 />
//               )}
//             </Card.Section>
//             <Text
//               className={classes.title}
//               mt={10}
//               onClick={() => {
//                 navigate('/roadmap/post/:id');
//               }}
//               style={{ cursor: 'pointer' }}
//             >
//               {article?.title}
//             </Text>
//             {/* <Text
//               color="dimmed"
//               size="xs"
//               transform="uppercase"
//               weight={700}
//               mt="md"
//             >
//               권장 수행 시간 : {`#${article.recommendedExecutionTimeValue}`}
//             </Text> */}
//             <Group spacing={5}>
//               <ActionIcon>
//                 <IconHeart
//                   size="1.2rem"
//                   color={theme.colors.red[6]}
//                   stroke={1.5}
//                 />
//               </ActionIcon>
//               <ActionIcon>
//                 <IconBookmark
//                   size="1.2rem"
//                   color={theme.colors.yellow[6]}
//                   stroke={1.5}
//                 />
//               </ActionIcon>
//               <ActionIcon>
//                 <IconShare
//                   size="1.2rem"
//                   color={theme.colors.blue[6]}
//                   stroke={1.5}
//                 />
//               </ActionIcon>
//             </Group>
//           </Card>
//         </InfiniteScroll>
//       ));

//   return (
//     <>
//       <Group position="center" mt={30} mb={50}>
//         <h1>추천 로드맵</h1>
//       </Group>
//       <Container maw={1400}>
//         <SimpleGrid
//           cols={4}
//           breakpoints={[
//             { maxWidth: 'sm', cols: 2 },
//             { maxWidth: 'sm', cols: 1 },
//           ]}
//           spacing="sm"
//         >
//           {cards}
//         </SimpleGrid>
//       </Container>
//     </>
//   );
// }
