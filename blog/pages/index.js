import Main from "../layouts/main/Main";

export default function Index({ posts, params }) {
  return <Main />;
}

// export function getStaticProps(params) {
//   const posts = getPosts();
//   return { props: { posts } };
// }
