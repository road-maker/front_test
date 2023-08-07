/* eslint-disable no-console */
import {
  Avatar,
  Card,
  Container,
  createStyles,
  getStylesRef,
  Group,
  Image,
  rem,
  SimpleGrid,
  Text,
} from '@mantine/core';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { relative } from 'path';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    width: 400,
    marginBottom: 30,
    marginLeft: 50,
    marginRight: 50,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 20,
    borderTop: '1px',
    fontSize: '1.3rem',
  },

  desc: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 3, // 최대 줄 수
    WebkitBoxOrient: 'vertical',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    maxHeight: '4.5em', // 3줄에 해당하는 높이
    lineHeight: '1.3em', // 줄 간격
    marginTop: 8,
  },

  like: {
    color: theme.colors.red[6],
  },

  item: {
    width: '100%',
    // minHeight: '300px',
  },

  section: {
    height: 380,
    cursor: 'pointer',
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export default function RoadmapRecommendation() {
  const [allRoadmapData, setAllRoadmapData] = useState([]);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [roadmapPage, setRoadmapPage] = useState(1);
  const [hoveredIndexes, setHoveredIndexes] = useState([]);

  const fetchRoadmaps = useCallback(() => {
    axios
      .get(`${baseUrl}/roadmaps?page=${roadmapPage}&order-type=recent`)
      .then((v) => {
        setAllRoadmapData(v?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [roadmapPage]);

  const initialUrl = `${baseUrl}/roadmaps?page=${roadmapPage}&order-type=recent`;
  const fetchUrl = async (url) => {
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
      enabled: roadmapPage === 1,
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
        {/* <h1>추천 로드맵</h1> */}
      </Group>
      {!allRoadmapData ? (
        <Text>만들어진 로드맵이 없습니다.</Text>
      ) : (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          <Container maw={1900}>
            <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
              {data.pages &&
                data.pages.map((pageData) => {
                  return pageData.result.map((article, index) => {
                    return (
                      <Card key={index} className={classes.card}>
                        <Card.Section
                          className={classes.section}
                          onMouseOver={() => {
                            setCurrentPage(article.id);
                          }}
                          onClick={() => {
                            currentPage &&
                              navigate(`/roadmap/post/${currentPage}`);
                          }}
                        >
                          <Group>
                            <div className={classes.item}>
                              <Image
                                src={article.thumbnailUrl}
                                alt={`${article.title}.img`}
                                height={200}
                              />
                            </div>
                          </Group>
                          <Text fw={700} className={classes.title} mx={20}>
                            {article.title}
                          </Text>
                          <Text fz="lg" className={classes.desc} mx={20}>
                            {article.description}
                          </Text>
                        </Card.Section>
                        <Text fz="md" c="dimmed" mx={8}>
                          {article.createdAt}
                        </Text>
                        <Card.Section className={classes.footer}>
                          <Group>
                            <Avatar radius="sm" color="blue">
                              {article.member.nickname.substring(0, 1)}
                            </Avatar>

                            <Text fz="md" fw={600}>
                              {article.member.nickname}
                            </Text>
                          </Group>
                        </Card.Section>
                      </Card>
                    );
                  });
                })}
            </SimpleGrid>
          </Container>
        </InfiniteScroll>
      )}
    </>
  );
}
