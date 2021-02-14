import Head from 'next/head';
import Link from 'next/link';
// import styles from '../styles/Home.module.css';
import { getPostList } from './api/posts';
import Layout from '../components/layout';

export async function getStaticProps() {
  const postList = getPostList();
  return {
    props: {
      postList,
    },
  };
}

export default function Home({ postList }) {
  const { total, data } = postList;

  return (
    <div>
      <Head>
        <title>Untitled TechShare Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="px-4 h-screen flex flex-col justify-center">

          <h1 className="block md:block text-4xl md:text-6xl text-left md:text-center font-semibold">
            <span className="block md:inline">Welcome to </span>
            <span className="text-yellow-500">Untitled TechShare</span>
          </h1>

          <p className="mt-8 text-left md:text-center text-lg md:text-2xl text-gray-500 font-normal">
            See the following content to learn more.
          </p>
        </div>

        <section className="mx-4 flex flex-col md:flex-row flex-wrap justify-center content-between">
          {
            data.map((post) => (
              <div className="max-w-prose flex-initial w-full md:w-2/5 p-6 my-2 md:mx-4 border-2 border-yellow-500 border-opacity-25 cursor-pointer rounded-lg overflow-hidden hover:bg-yellow-500 hover:bg-opacity-30">
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <a>
                    <h3 className="block mt-1 text-lg leading-tight font-medium test-black">{post.props.title}</h3>
                    <p className="mt-2 text-gray-500">
                      Author:
                      {post.props.Author}
                      <br className="mt-1" />
                      Date:
                      {post.props.Date}
                      <br />
                      Type:
                      {post.props['性質']}
                    </p>
                  </a>
                </Link>
              </div>
            ))
          }
        </section>

      </Layout>
    </div>
  );
}
