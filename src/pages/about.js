import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import axios from "axios";

import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { Hydrate } from "react-query/hydration";
// import { dehydrate } from "react-query/hydration";
//
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const HOST = "https://zjbwj.sse.codesandbox.io"; // CHANGE THIS
const queryClient = new QueryClient();

export default function App(pageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Example {...pageProps} />
    </QueryClientProvider>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  const getProjects = async (pageParam = 1) => {
    const res = await axios.get(
      `https://ghost.coinshots.com/ghost/api/v3/content/posts/?key=761d4b3dc19eefd5298dbc5a36&limit=15&include=tags,authors&page=${pageParam}`
    );
    return res.data;
  };
  const projects = await getProjects();

  return {
    props: { projects },
  };
}

function Example({ projects }) {
  const [scroll, setScroll] = useState(0);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "projects",
    async ({ pageParam = 0 }) => {
      const res = await axios.get(
        `https://ghost.coinshots.com/ghost/api/v3/content/posts/?key=761d4b3dc19eefd5298dbc5a36&limit=15&include=tags,authors&page=${pageParam}`
      );
      return res.data;
    },
    {
      initialData: {
        pages: [projects],
        pageParams: [undefined],
      },

      getPreviousPageParam: (firstPage, allPages) => {
        if (allPages.length >= 1) {
          return true;
        } else {
          false;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < allPages[0]?.meta?.pagination.total) {
          return allPages.length + 1;
        } else {
          return false;
        }
      },
    }
  );

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  useEffect(() => {
    console.log("scrollTo", global.testScrollY);
    if (global.testScrollY) {
      window.scrollTo(0, global.testScrollY);
    }
    console.log(window.scrollY);
    return () => {
      console.log("exit component", window.scrollY);
      global.testScrollY = window.scrollY;
    };
  }, []);
  return (
    <div>
      <h1>Infinite Loading without Hydration</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.posts.map((project) => (
                <p
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "10rem 1rem",
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.excerpt}
                </p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              ref={loadMoreButtonRef}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
      <hr />
      <Link href="/contact">
        <a style={{ position: "fixed", fontSize: "2em", top: 0, left: 0 }}>
          Go to another page
        </a>
      </Link>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
