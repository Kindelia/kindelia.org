import { getPosts } from "../../utils/data";
import Blog from "../../layouts/blog/Blog.js";
import Layout from "../../components/Layout";

export default function Index({ posts, params }) {
  return (
    <Layout>
      <Blog posts={posts} />
    </Layout>
  );
}

export function getServerSideProps() {
  const posts = getPosts();
  return { props: { posts } };
}

// export function getStaticProps(params) {
//   const posts = getPosts();
//   return { props: { posts } };
// }
