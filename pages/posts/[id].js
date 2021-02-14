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
      <Markdown content={data} />
      <Link href="/">
        <a>
          <p>Back to Home page</p>
        </a>
      </Link>
    </Layout>
  );
}
