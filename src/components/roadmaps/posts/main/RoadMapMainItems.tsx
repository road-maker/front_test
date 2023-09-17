/* eslint-disable no-console */
import {
  Avatar,
  Card,
  createStyles,
  Group,
  Image,
  rem,
  SimpleGrid,
  Text,
} from '@mantine/core';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as NoImage } from '../../../../assets/noImage.svg';
import { ReactComponent as Spinner } from '../../../../assets/Spinner.svg';

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
    width: '96%',
    margin: '3rem auto 1rem',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '1.5rem',
    borderTop: '1px',
    fontSize: '1.3rem',
  },

  desc: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    maxHeight: '4.5em',
    lineHeight: '1.3em',
    marginTop: '0.725rem',
  },

  like: {
    color: theme.colors.red[6],
  },

  item: {
    width: '100%',
  },

  section: {
    height: '24rem',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allRoadmapData, setAllRoadmapData] = useState([]);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [roadmapPage, setRoadmapPage] = useState(1);

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

  if (isLoading)
    return (
      <div className="loading" style={{ height: '100vh' }}>
        <Spinner />
        <h1 style={{ textAlign: 'center' }}>로드맵 가져오는 중</h1>
      </div>
    );
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      <SimpleGrid
        cols={4}
        style={{ width: '100%' }}
        breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'lg', cols: 3 },
        ]}
      >
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
                      currentPage && navigate(`/roadmap/post/${currentPage}`);
                    }}
                  >
                    <Group>
                      <div className={classes.item}>
                        <BlurredImg
                          className={`${isLoading ? 'before' : 'loaded'}`}
                        >
                          {article.thumbnailUrl ? (
                            <Image
                              className={`${isLoading ? 'before' : 'loaded'}`}
                              src={article.thumbnailUrl}
                              alt={`${article.title}.img`}
                              height="15em"
                            />
                          ) : (
                            <div
                              style={{
                                height: '15em',
                                display: 'inline-flex',
                                width: '100%',
                              }}
                            >
                              <NoImage
                                style={{ height: '15em', margin: '0 auto' }}
                              />
                            </div>
                          )}
                        </BlurredImg>
                      </div>
                    </Group>
                    <Text fw={700} className={classes.title} mx={20}>
                      {article.title}
                    </Text>
                    <Text fz="lg" className={classes.desc} mx={20}>
                      {article.description.length < 30
                        ? article.description
                        : // eslint-disable-next-line prefer-template
                          article.description.slice(0, 29) + '...'}
                    </Text>
                  </Card.Section>
                  <Text fz="md" c="dimmed" mx={8}>
                    {article.createdAt}
                  </Text>
                  <Card.Section className={classes.footer}>
                    <Group>
                      <Avatar radius="lg" color="blue">
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
      {/* </Container> */}
    </InfiniteScroll>
  );
}
const BlurredImg = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  .before {
    filter: blur(10px);
  }
  .before ::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: pulse 2.5s infinite;
    background-color: var(--text-color);
  }

  @keyframes pulse {
    0% {
      opacit: 0;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 0;
    }
  }
  .loaded::before {
    animation: none;
    content: none;
  }
  & > img {
    opacity: 0;
    transition: opacity 250ms ease-in-out;
  }

  & .loaded > img {
    opacity: 1;
  }
`;
