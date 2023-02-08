import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';



function Home({posts, date}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <Head>
        <title>Mon super blog</title>
      </Head>
      <h1>Count : {count} - {date}</h1>
      <ul>
        {posts.map(post => 
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <h3>{post.id}-{post.title}</h3>
            </Link>
            </li>)}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
  .then(res => res.json())
  return {
    props: {
      posts,
date : (new Date()).toString()
    },
    revalidate: 5,
  }
}


export default Home;
