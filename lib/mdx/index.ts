import { serialize, SerializeOptions } from "next-mdx-remote-client/serialize";
import { z } from "zod";

import { Frontmatter } from "./mdx";
import { recmaPlugins } from "./recma";
import { code, rehypePlugins } from "./rehype";
import { remarkPlugins } from "./remark";

interface AuxHealthSerializeOptions extends SerializeOptions {
  scope: { props?: Frontmatter };
}

function makeOptions(props?: Frontmatter): AuxHealthSerializeOptions {
  return {
    parseFrontmatter: false,
    scope: { props },
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
      recmaPlugins,
      remarkRehypeOptions: { handlers: { code } },
      development: process.env.NODE_ENV === "development",
    },
  };
}

export const sourceToMdx = async (source: string, frontmatter: Frontmatter) => {
  const options = makeOptions(frontmatter);
  const serialized = await serialize<
    Frontmatter,
    AuxHealthSerializeOptions["scope"]
  >({
    source,
    options,
  });
  return {
    serialized,
    source,
  };
};

export const mdxSchema = (frontmatter: Frontmatter) =>
  z.string().transform((ctx) => sourceToMdx(ctx, frontmatter));
export type MdxSchema = z.infer<ReturnType<typeof mdxSchema>>;
