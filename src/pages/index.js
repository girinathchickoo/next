// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useInfiniteQuery, QueryClient } from "react-query";
// import { useInView } from "react-intersection-observer";
// import { ReactQueryDevtools } from "react-query/devtools";

// export default function Home({ projects }) {
//   const [pageN, setPageN] = useState(1);
//   const { inView, ref, entry } = useInView();
//   const [ar, setAr] = useState([]);

//   const {
//     status,
//     data,
//     error,
//     isFetching,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//   } = useInfiniteQuery(
//     ["projects"],
//     async ({ pageParam = 1 }) => {
//       const res = await fetch(
//         `https://ghost.coinshots.com/ghost/api/v3/content/posts/?key=761d4b3dc19eefd5298dbc5a36&limit=15&include=tags,authors&page=${pageParam}`
//       );
//       return await res.json();
//     },
//     {
//       initialData: {
//         pages: [projects],
//         pageParams: [undefined],
//       },
//       getNextPageParam: (lastPage, allPages) => {
//         if (allPages.length < allPages[0]?.meta?.pagination.total) {
//           return allPages.length + 1;
//         } else {
//           return false;
//         }
//       },
//     }
//   );
//   useEffect(() => {
//     if (inView) {
//       fetchNextPage();
//     }
//   }, [inView]);

//   // useEffect(() => {
//   //   if (typeof window != "undefined") {
//   //   }
//   //   console.log("scrollTo", global.testScrollY);
//   //   if (global.testScrollY) {
//   //     window.scrollTo(0, global.testScrollY);
//   //   }

//   //   return () => {
//   //     console.log("exit component", window.scrollY);
//   //     global.testScrollY = 5000;
//   //   };
//   // }, []);
//   console.log(data);
//   return (
//     <div className="container">
//       <h5 className="text-[24px] text-center">Posts</h5>
//       <div className="flex gap-2 w-full flex-wrap justify-center pt-4">
//         {data.pages.map((page) => (
//           <>
//             {page.posts.map((project, i, array) => (
//               <Link key={i} href="/about">
//                 <a ref={array?.length - 1 === i && ref}>
//                   <div className="flex flex-col  w-[40%] h-auto bg-[#f7f3f3] rounded-md">
//                     <Image
//                       className="rounded-t-md"
//                       src={project.feature_image}
//                       width="400px"
//                       height="250px"
//                     />
//                     <div className="p-2">
//                       <p className="text-[14px] font-normal"> {project.id}</p>
//                     </div>
//                   </div>
//                 </a>
//               </Link>
//             ))}
//           </>
//         ))}
//       </div>
//       <ReactQueryDevtools initialIsOpen />
//     </div>
//   );
// }

// // export async function getStaticProps() {
// //   const req = await fetch("https://jsonplaceholder.typicode.com/posts");
// //   const posts = await req.json();

// //   return {
// //     props: { posts },
// //   };
// // }

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();

//   const res = await fetch(
//     `https://ghost.coinshots.com/ghost/api/v3/content/posts/?key=761d4b3dc19eefd5298dbc5a36&limit=15&include=tags,authors&page=1`
//   );
//   let req = await res.json();

//   return {
//     props: { projects: req },
//   };
// }

export default function Home() {
  return <h1>ine=dex</h1>;
}
