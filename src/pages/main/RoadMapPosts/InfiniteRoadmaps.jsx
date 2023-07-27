// import InfiniteScroll from 'react-infinite-scroller';
// import { useInfiniteQuery } from 'react-query';
// import { Roadmaps } from './Roadmaps';

// export function InfiniteRoadmaps() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetching,
//     isError,
//     error,
//   } = useInfiniteQuery(
//     "roadmaps",
//     ({ pageParam = initialUrl }) => fetchUrl(pageParam),
//     { getNextPageParam: (lastPage) => lastPage.next || undefined }
//   );
//   if (isLoading) {
//     return <div className="loading">loading...</div>;
//   }
//   if (isError) {
//     return <div>Errror!{error.toString()}</div>;
//   }
//   return (
//     <>
//       {isFetching && <div className="loading">loading...</div>}
//       <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
//         {data.pages.map((pageData) => {
//           return pageData.results.map((species) => {
//             return (
//               <Roadmaps
//                 key={species.name}
//                 name={species.name}
//                 language={species.language}
//                 averageLifespan={species.average_lifespan}
//               />
//             );
//           });
//         })}
//       </InfiniteScroll>
//     </>
//   );
// }
