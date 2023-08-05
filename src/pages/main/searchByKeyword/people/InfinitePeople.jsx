import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } =
    // const { data, fetchNextPage, hasNextPage, isFetching, isError, error } =
    useInfiniteQuery(
      'sw-people', // query key
      ({ pageParam = initialUrl }) => fetchUrl(pageParam), // default value will be the initial Url
      { getNextPageParam: (lastPage) => lastPage.next || undefined }, // undefined ===> hasNextPage false
    ); // destructure
  if (isLoading) {
    // if (isFetching) {
    // yikes! its scrolling to the top !(yes, we are getting new data, but we are scrolling to the top whenever it is refetching)
    // that's cos we are early returning every time we are fetching new data
    return <div className="">loading...</div>;
  }
  if (isError) {
    return <div className="">Error!{error.toString()}</div>;
  }
  return (
    <>
      {isFetching && <div className="loading">loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            // actual data
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
