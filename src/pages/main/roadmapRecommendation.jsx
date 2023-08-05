/* eslint-disable no-console */
import {
  ActionIcon,
  Card,
  Container,
  createStyles,
  Group,
  Image,
  rem,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
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

export default function RoadmapRecommendation() {
  const [allRoadmapData, setAllRoadmapData] = useState([]);
  // const { user } = useUser();
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [roadmapPage, setRoadmapPage] = useState(1);

  // const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  // options = {
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   hour12: false,
  //   timeZone: '',
  // };
  // console.log(new Intl.DateTimeFormat(undefined, options).format(date));
  // const themes = useMantineTheme();
  // const mobile = useMediaQuery(`(max-width: ${themes.breakpoints.sm})`);
  // const { getRoadmapById, getAllRoadmap, getRoadmapByIdAuth } = useRoadmap();
  // const { roadmaps } = useRoadmapData();

  const fetchRoadmaps = useCallback(() => {
    axios
      .get(`${baseUrl}/roadmaps?page=${roadmapPage}&order-type=most-liked`)
      .then((v) => {
        console.log('data', v?.data);
        setAllRoadmapData(v?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [roadmapPage]);

  const initialUrl = `${baseUrl}/roadmaps?page=${roadmapPage}&order-type=most-liked`;
  const fetchUrl = async (url) => {
    console.log('url', url);
    const response = await fetch(url);
    return response.json();
  };

  const {
    refetch,
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    'roadmaps',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.result.length !== 0) {
          return lastPage.next;
        }
        return undefined;
      },
    },
  );

  useEffect(() => {
    setRoadmapPage(1);
    refetch();
    fetchRoadmaps();
  }, [fetchRoadmaps, refetch]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  return (
    <>
      <Group position="center" mt={30} mb={50}>
        <h1>추천 로드맵</h1>
      </Group>
      {!allRoadmapData ? (
        <Text>만들어진 로드맵이 없습니다.</Text>
      ) : (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          <Container maw={1400}>
            <SimpleGrid
              cols={4}
              breakpoints={[
                { maxWidth: 'sm', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
              ]}
            >
              {data.pages &&
                data.pages.map((pageData) => {
                  return pageData.result.map((article, index) => (
                    <Card
                      key={index}
                      radius="md"
                      component="a"
                      className={classes.card}
                      ml={100}
                    >
                      <Card.Section>
                        {article.thumbnailUrl ? (
                          <Image
                            src={article.thumbnailUrl}
                            alt={`${article.title}.img`}
                            height={160}
                            width={260}
                            style={{ cursor: 'pointer' }}
                            onMouseOver={() => {
                              setCurrentPage(article.id);
                            }}
                            onClick={() => {
                              currentPage &&
                                navigate(`/roadmap/post/${currentPage}`);
                            }}
                          />
                        ) : (
                          <Image
                            src="https://t1.daumcdn.net/cfile/tistory/21221F4258E793521D"
                            alt={`${article.title}.img`}
                            height={160}
                            width={260}
                            style={{ cursor: 'pointer' }}
                            onMouseOver={() => {
                              setCurrentPage(article.id);
                            }}
                            onClick={() => {
                              currentPage &&
                                navigate(`/roadmap/post/${currentPage}`);
                            }}
                          />
                        )}
                      </Card.Section>
                      <Text className={classes.title} mt={10}>
                        {/* {new Intl.DateTimeFormat('ko', {
                    dateStyle: 'full',
                  }).format(article?.createdAt)} */}
                        {article?.createdAt}
                      </Text>
                      <Text
                        className={classes.title}
                        mt={10}
                        onMouseOver={() => {
                          setCurrentPage(article.id);
                        }}
                        onClick={() => {
                          currentPage &&
                            navigate(`/roadmap/post/${currentPage}`);
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
                        {article?.ownerNickname}
                      </Text>

                      <Group spacing={5}>
                        <ActionIcon>
                          <IconHeart
                            size="1.2rem"
                            color={theme.colors.red[6]}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Group>
                    </Card>
                  ));
                })}
            </SimpleGrid>
          </Container>
        </InfiniteScroll>
      )}
    </>
  );
}