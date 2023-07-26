import { Carousel } from '@mantine/carousel';
import {
  createStyles,
  Group,
  Paper,
  PaperProps,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRoadmap } from 'components/roadmaps/hooks/useRoadmap';
import { useRoadmapData } from 'components/roadmaps/hooks/useRoadMapResponse';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roadmap } from 'types/types';

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

export default function RoadmapRecommendation(props: PaperProps) {
  // const [allRoadmapData, setAllRoadmapData] = useState([
  const [allRoadmapData, setAllRoadmapData] = useState<Roadmap[]>([]);
  // {
  //   id: 1,
  //   title: '한달만에 코딩 맛보기',
  //   description: '개발자에 도전하고 싶은 사람들을 위한 맛보기 로드맵입니다.',
  //   thumbnailUrl: '',
  //   recommendedExecutionTimeValue: 0,
  //   recommendedExecutionTimeUnit: '',
  // },
  // ]);
  // {
  //   id: 1,
  //   title: 'Javascript 정복하기',
  //   category: 'Frontend',
  //   image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
  //   date: 'August 18, 2022',
  //   author: {
  //     name: '표혜민',
  //     description: '한 번 정복해보아요~^^',
  //     profile: 'HM',
  //   },
  // },
  // {
  //   id: 2,
  //   title: 'Javascript 정복하기',
  //   category: 'Frontend',
  //   image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
  //   date: 'August 18, 2022',
  //   author: {
  //     name: '표혜민',
  //     description: '한 번 정복해보아요~^^',
  //     profile: 'HM',
  //   },
  // },
  // {
  //   id: 3,
  //   title: 'Javascript 정복하기',
  //   category: 'Frontend',
  //   image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
  //   date: 'August 18, 2022',
  //   author: {
  //     name: '표혜민',
  //     description: '한 번 정복해보아요~^^',
  //     profile: 'HM',
  //   },
  // },
  // {
  //   id: 4,
  //   title: 'Javascript 정복하기',
  //   category: 'Frontend',
  //   image: 'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D',
  //   date: 'August 18, 2022',
  //   author: {
  //     name: '표혜민',
  //     description: '한 번 정복해보아요~^^',
  //     profile: 'HM',
  //   },
  // },
  // ]);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const themes = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${themes.breakpoints.sm})`);
  interface AllRoadMaps {
    data: Array<Roadmap>;
    prevState: null;
  }
  interface AllRoadmaps {
    data: Array<Roadmap | null>;
  }
  const [user, setUser] = useState<AllRoadMaps | null>(null);
  // const [user, setUser] = useState([]);
  const { getAllRoadmap } = useRoadmap();
  const { roadmaps } = useRoadmapData();

  useEffect(() => {
    // onmount
    if (roadmaps !== undefined) {
      console.log(roadmaps);
      // setAllRoadmapData(roadmaps);

      // console.log([...[roadmaps]][0]);
    }
  }, []);

  // const cards = allRoadmapData.map((article: Roadmap) => (
  //   <Card
  //     key={article.id}
  //     radius="md"
  //     component="a"
  //     className={classes.card}
  //     ml={100}
  //   >
  //     <Card.Section>
  //       <Image
  //         src={
  //           article.thumbnailUrl ||
  //           'https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D'
  //         }
  //         alt={`${article.title}.img`}
  //         height={160}
  //         width={260}
  //         style={{ cursor: 'pointer' }}
  //         onClick={() => {
  //           navigate('/roadmap/editor/view');
  //         }}
  //       />
  //     </Card.Section>
  //     {/* <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
  //       {article.date}
  //     </Text> */}
  //     <Text
  //       className={classes.title}
  //       mt={5}
  //       onClick={() => {
  //         navigate('/roadmap/editor/view');
  //       }}
  //       style={{ cursor: 'pointer' }}
  //     >
  //       {article?.title}
  //     </Text>
  //     {/* <Text fz="sm" color="dimmed" lineClamp={4} mt={5}>
  //       {article?.author.description}
  //     </Text> */}
  //     <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
  //       권장 수행 시간 : {`#${article.recommendedExecutionTimeValue}`}{' '}
  //       {`#${article.recommendedExecutionTimeValue}`}
  //     </Text>

  //     {/* <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
  //       {`#${article.category}`}
  //     </Text> */}
  //     <Group spacing={5}>
  //       {/* <Avatar color="purple" radius="xl">
  //         {article.author.profile}
  //       </Avatar> */}
  //       {/* <Text className={classes.author} mt={5}>
  //         {article.author.name}
  //       </Text> */}
  //       <ActionIcon>
  //         <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
  //       </ActionIcon>
  //       <ActionIcon>
  //         <IconBookmark
  //           size="1.2rem"
  //           color={theme.colors.yellow[6]}
  //           stroke={1.5}
  //         />
  //       </ActionIcon>
  //       <ActionIcon>
  //         <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
  //       </ActionIcon>
  //     </Group>
  //   </Card>
  // ));

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
          {/* {cards} */}
          {allRoadmapData.map((v) => (
            <div>{v?.title}</div>
          ))}
        </Carousel>
      </Paper>
    </>
  );
}
