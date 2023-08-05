// import axios from 'axios';
// import { baseUrl } from 'axiosInstance/constants';
// import { useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
// import { useInfiniteQuery } from 'react-query';

// import { Roadmap } from './Roadmap';

// export function InfiniteSearchRoadmap() {
//   const [pages, setPages] = useState(0);
//   const fetchUrl = async (param) => {
//     axios
//       // .get(`${baseUrl}/roadmaps/search/${search}?page=${url}&size=5`)
//       .get(`${baseUrl}/roadmaps/search/자바?page=${param}&size=5`)
//       // .get(url)
//       .then((v) => {
//         console.log(v);
//         // setPages(pages + 1);
//       })
//       .catch((e) => console.log(e));
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetching,
//     isError,
//     error,
//   } = useInfiniteQuery(
//     'search-roadmaps', // query key
//     ({ pageParam = pages }) => fetchUrl(pageParam), // default value will be the initial Url
//     // { getNextPageParam: (lastPage) => lastPage.next || undefined }, // undefined ===> hasNextPage false
//     { getNextPageParam: () => pages || undefined }, // undefined ===> hasNextPage false
//   ); // destructure
//   if (isLoading) {
//     return <div className="">loading...</div>;
//   }
//   if (isError) {
//     return <div className="">Error!{error.toString()}</div>;
//   }
//   return (
//     <>
//       {isFetching && <div className="loading">loading...</div>}
//       <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
//         {data.pages.map((allRoadmapData) => {
//           console.log(data);
//           console.log(allRoadmapData);
//           return allRoadmapData?.map((r) => {
//             // actual data
//             return (
//               <Roadmap
//                 id={r.id}
//                 thumbnailUrl={r.thumbnailUrl}
//                 title={r.title}
//                 ownerNickname={r.ownerNickname}
//               />
//             );
//           });
//         })}
//       </InfiniteScroll>
//     </>
//   );
// }
/* eslint-disable no-console */
import { baseUrl } from 'axiosInstance/constants';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Roadmap } from './Roadmap';

// const initialUrl = 'https://swapi.dev/api/people/';
const keyword = localStorage.getItem('roadmap_search_keyword');
// const initialUrl = `${baseUrl}/roadmaps/search/타입스크립트?&size=5`;
const initialUrl = `${baseUrl}/roadmaps/search/${keyword}/`;
const fetchUrl = async (url) => {
  const response = await fetch(url);
  console.log('response', response.status);
  //   return response.json();
  //   const response = await axios.get(url, {}).then((v) => {
  //     return v;
  //   });
  return response;
};

export function InfiniteRoadmapByKeyword() {
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
      'search-keyword', // query key
      ({ pageParam = initialUrl }) => fetchUrl(pageParam), // default value will be the initial Url
      {
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
      }, // undefined ===> hasNextPage false
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
        {data &&
          data.pages &&
          data?.pages?.map((pageData) => {
            //   return pageData?.results.map((person) => {
            return pageData?.result.map((person) => {
              // actual data
              return (
                <Roadmap
                  key={person.id}
                  thumbnailUrl={person.thumbnailUrl}
                  title={person.title}
                  ownerNickname={person.ownerNickname}
                  createdAt={person.createdAt}
                />
              );
            });
          })}
      </InfiniteScroll>
    </>
  );
}
