import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async ({ query }) => {
  const { page = 1 } = query;
  const data = await fetch(
    `https://api.unsplash.com/photos/?client_id=${process.env.ACCESS_KEY}&page=${page}`
  ).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
};

export default function Home(props) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const handleClick = () => {
    setPage(page + 1);
    router.push(`?page=${page + 1}`);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {props.data.map((photo) => {
          return (
            <Image
              key={photo.id}
              alt="image"
              src={photo.urls.small}
              width={100}
              height={100}
            />
          );
        })}

        <button className="btn btn-primary" onClick={handleClick}>
          Next Page
        </button>
      </main>
    </>
  );
}
