import { MDXRemote } from "next-mdx-remote";
import styled from "styled-components";

const MDXStyle = styled.main`
  ol,
  ul {
    list-style: dot;
  }

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
    overflow-wrap: break-word;
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

export default function MDX({ source, components }) {
  return (
    <MDXStyle>
      <MDXRemote {...source} components={components} lazy />
    </MDXStyle>
  );
}
