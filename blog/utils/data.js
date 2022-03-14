import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { postFilePaths, POSTS_PATH } from "./mdxUtils";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "@mapbox/rehype-prism";

export function getPosts(params) {
  let posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath,
      };
    })
    .filter((post) => post.data.published)
    .sort(
      (postA, postB) =>
        new Date(postA.data.publishedOn) - new Date(postB.data.publishedOn)
    );

  // if (params?.category) {
  //   const category = params.category;
  //   posts = posts.filter((post) => post.data.category === category);
  // }

  // const totalSize = posts.length;
  // const pageSize = 10;
  // const pageQtt = Math.ceil(totalSize / pageSize);

  // if (params?.page) {
  //   const page = Math.min(params.page, pageQtt);
  //   const start = (page - 1) * pageSize;
  //   const end = page * pageSize;

  //   posts = posts.slice(start, end);
  // }

  // return { posts, pageQtt };

  return posts;
}

export async function getContent(path_to_file, name) {
  const postFilePath = path.join(path_to_file, `${name}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}