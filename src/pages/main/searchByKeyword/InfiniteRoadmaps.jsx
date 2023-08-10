/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { ReactComponent as Spinner } from '../../../assets/Spinner.svg';

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

export function InfiniteRoadmapByKeyword() {
  const [searchPage, setSearchPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [allRoadmapData, setAllRoadmapData] = useState([]);
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const keyword = localStorage.getItem('roadmap_search_keyword');

  const fetchRoadmaps = useCallback(() => {
    axios
      .get(`${baseUrl}/roadmaps/search/${keyword}?page=${searchPage}&size=5`)
      .then((v) => {
        setAllRoadmapData(v?.data);
        console.log(v?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [keyword, searchPage]);

  const initialUrl = `${baseUrl}/roadmaps/search/${keyword}?page=${searchPage}&size=5`;
  const fetchUrl = async (url) => {
    console.log('fetchUrl:', url);
    const response = await fetch(url);
    console.log('response', response);
    return response.json();
  };

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    'search-keyword',
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
    setSearchPage(1);
    refetch();
    fetchRoadmaps();
  }, [fetchRoadmaps, refetch]);
  console.log('data', data);

  if (isLoading)
    return (
      <div className="loading" style={{ height: '100vh' }}>
        <Spinner />
        <h1 style={{ textAlign: 'center' }}>로드맵을 검색하고 있어요</h1>
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
            return pageData?.result?.map((article, index) => {
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
                        <Image
                          className={`${isLoading ? 'before' : 'loaded'}`}
                          src={article.thumbnailUrl}
                          alt={`${article.title}.img`}
                          height="15em"
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
    </InfiniteScroll>
  );
}
