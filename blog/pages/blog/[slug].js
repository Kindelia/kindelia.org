import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import styled from "styled-components";
import Title from "../../components/Title";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import { getContent } from "../../utils/data";
import { mdxComponents } from "../../utils/mdxComponents";
import Layout from "../../components/Layout";

const MDX = styled.main`
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 29px;
  }

  h1 {
    color: ${({ theme }) => theme.color.primary};
  }

  li + li {
    margin-top: 8px;
  }

  blockquote {
    border-left: 8px solid #c3daf1;
    padding-left: 20px;
    margin: 0;
    margin-left: 3rem;
  }

  code {
    background-color: rgba(110, 118, 129, 0.2);
    padding: 0 5px;
    border-radius: 5px;
  }

  img {
    width: 100%;
  }

  img + em {
    font-size: 0.87rem;
    text-align: center;
    display: block;
  }

  h2 {
    margin-top: 50px;
  }

  pre {
    background-color: ${({ theme }) => theme.background_code};
    font-family: monospace;
    padding: 20px 40px;
    border-radius: 3px;
    overflow: auto;

    code {
      padding: 0px;
      background: transparent;
    }
  }

  .toc {
    float: right;
  }

  .keyword {
    color: blue;
  }

  .function {
    color: red;
  }

  .class-name,
  .maybe-class-name {
    color: #5e6fed;
  }

  .comment {
    color: green;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 100px;
  max-width: 798px;
  text-align: justify;

  .description {
    text-align: center;
    font-size: 0.9rem;
  }

  .post-header {
    margin-bottom: 55px;
  }
`;

export default function PostPage({ source, frontMatter }) {
  return (
    <Layout>
      <Wrapper>
        <Head>
          <meta name="description" content={frontMatter.description}></meta>
          <meta property="og:title" content={frontMatter.title} />
          <meta property="og:type" content="website" />
          {frontMatter.thumb && (
            <meta property="og:image:url" content={frontMatter.thumb} />
          )}
          <meta property="og:description" content={frontMatter.description} />
        </Head>
        <div className="post-header">
          <Title style={{ textAlign: "center" }}>{frontMatter.title}</Title>
          {frontMatter.author && (
            <p className="description">
              by <em>{frontMatter.author}</em>
            </p>
          )}
        </div>
        <MDX>
          <MDXRemote {...source} components={mdxComponents} lazy />
        </MDX>
      </Wrapper>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  return await getContent(POSTS_PATH, params.slug);
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
