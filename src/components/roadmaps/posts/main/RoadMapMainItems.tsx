/* eslint-disable no-console */
import { Card, createStyles, Group, Image, rem, Text } from '@mantine/core';
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
    columnWidth: '350px',
    columnGap: '15px',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    padding: '10px',
    marginTop: '11px',
    borderTop: '1px',
  },

  author: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    fontSize: '13px',
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    marginBottom: '15px',
    padding: '10px',
    alignItems: 'center',
    gap: '10px',
  },

  item: {
    width: '100%',
  },

  //   list: {
  //     display: flex, // 1
  //     flex-direction: column, // 2
  //     flex-wrap: wrap, // 3
  //     align-content: start, // 4
  //     height: 1000px, // 5
  // },

  // item: {
  //     width: 25%; // 6
  // }
}));

export default function RoadmapMainItems() {
  const [allRoadmapData, setAllRoadmapData] = useState([]);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [roadmapPage, setRoadmapPage] = useState(1);

  const fetchRoadmaps = useCallback(() => {
    axios
      .get(`${baseUrl}/roadmaps?page=${roadmapPage}&order-type=recent`)
      .then((v) => {
        console.log('data', v?.data);
        setAllRoadmapData(v?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [roadmapPage]);

  const initialUrl = `${baseUrl}/roadmaps?page=${roadmapPage}&order-type=recent`;
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
          <Card radius="md" component="a" p="md" className={classes.card}>
            {data.pages &&
              data.pages.map((pageData) => {
                return pageData.result.map((article, index) => (
                  <>
                    <Card.Section className={classes.list} key={index}>
                      {article.thumbnailUrl ? (
                        <Image
                          className={classes.item}
                          src={article.thumbnailUrl}
                          alt={`${article.title}.img`}
                          style={{ cursor: 'pointer', zIndex: '5' }}
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
                          className={classes.item}
                          style={{ cursor: 'pointer', zIndex: '5' }}
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
                    {/*
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
                    </Group> */
                    /* <Text
                        fz="xl"
                        onMouseOver={() => {
                          setCurrentPage(article.id);
                        }}
                        onClick={() => {
                          currentPage &&
                            navigate(`/roadmap/post/${currentPage}`);
                        }}
                        style={{
                          cursor: 'pointer',
                          margin: '50px',
                          zIndex: '10',
                        }}
                      >
                        {/* {new Intl.DateTimeFormat('ko', {
                    dateStyle: 'full',
                  }).format(article?.createdAt)}
                        {article?.title}
                        {article?.createdAt}
                      </Text> */}
                  </>
                ));
              })}
          </Card>
        </InfiniteScroll>
      )}
    </>
  );
}
