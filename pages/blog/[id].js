import Link from 'next/link';

export default function Post({post}) {
    return (
        <>
        <main>
        <Link href="/">
            <h2>Revenir à lAccueil</h2>
        </Link>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        </main>
        </>
    );
    }

export async function getStaticProps({params}) {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then(r => r.json())
    return {
        props: {
            post
    }
}
}

export async function getStaticPaths() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
    .then(r => r.json())
    return {
        paths: posts.map(post => ({params: {id: post.id.toString()}})),
        fallback: false
    }
}