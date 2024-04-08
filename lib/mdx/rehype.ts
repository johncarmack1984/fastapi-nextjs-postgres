import { nodeTypes } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { type PluggableList } from "unified";

export const rehypePlugins: PluggableList = [
  [rehypeRaw, { passThrough: nodeTypes }], // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
  rehypeHighlight,
  rehypeSlug,
];
