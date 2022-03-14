import Layout from "../components/Layout";
import MDX from "../components/MDX";
import { getContent } from "../utils/data";
import { CONTENT_PATH } from "../utils/mdxUtils";

export default function FAQ({ source }) {
  return (
    <Layout>
      <MDX source={source} lazy></MDX>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return await getContent(CONTENT_PATH, "faq");
};
