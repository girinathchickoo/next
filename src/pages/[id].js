import Image from "next/image";
import { useInfiniteQuery } from "react-query";

export default function posts({ posts }) {
  
  return (
    <div className="container">
      <h5 className="text-[24px] text-center">Full Post</h5>
      <div className="flex gap-2 w-full flex-wrap justify-center pt-4">
        <div className="flex flex-col  w-[50%] h-auto bg-[#f7f3f3] rounded-md">
          <Image
            className="rounded-t-md"
            src={`https://picsum.photos/id/${posts.id}/200/300`}
            width="400px"
            height="350px"
          />
          <div className="p-4">
            <h3 className="text-[24px] font-bold py-4">{posts.title}</h3>
            <p className="text-[14px] font-normal"> {posts.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const req = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const posts = await req.json();

  const paths = posts.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //   console.log(params);
  const req = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const posts = await req.json();

  return {
    props: { posts },
  };
}
