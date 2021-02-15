import Link from 'next/link';
import { getPost, getPostIds } from '../api/posts';
import Markdown from '../../components/markdown';
import Layout from '../../components/layout';

export async function getStaticPaths() {
  const paths = getPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getPost(params.id);
  return {
    props: {
      data,
    },
  };
}

export default function Post({ data }) {
  return (
    <Layout>
      <Markdown content={data} className="py-6 px-6 md:px-0" />
      <Link href="/">
        <button
          type="button"
          className="flex justify-center mx-auto mt-6 mb-4 py-2 px-4 border-2 border-yellow-500 rounded-lg font-medium text-yellow-500 bg-transparent hover:bg-yellow-300 hover:bg-opacity-20 hover"
        >
          Back to Home page
        </button>
      </Link>
    </Layout>
  );
}
