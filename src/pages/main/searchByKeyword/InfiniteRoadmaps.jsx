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
