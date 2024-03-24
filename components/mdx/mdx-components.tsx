import Image from "next/image";
import Link from "next/link";

import { Button as button } from "@/components/ui/button";
import blockquote from "@/components/ui/typography/blockquote";
import code from "@/components/ui/typography/code";
import h1 from "@/components/ui/typography/h1";
import h2 from "@/components/ui/typography/h2";
import h3 from "@/components/ui/typography/h3";
import h4 from "@/components/ui/typography/h4";
import Large from "@/components/ui/typography/large";
import Lead from "@/components/ui/typography/lead";
import li from "@/components/ui/typography/li";
import Muted from "@/components/ui/typography/muted";
import ol from "@/components/ui/typography/ol";
import p from "@/components/ui/typography/p";
import small from "@/components/ui/typography/small";
import strong from "@/components/ui/typography/strong";
import ul from "@/components/ui/typography/ul";

const wrapper = (props: { children: any }) => {
  return <>{props.children}</>;
};

const mdxComponents = {
  blockquote,
  button,
  caption: Muted,
  code,
  h1,
  h2,
  h3,
  h4,
  h5: Lead,
  h6: Large,
  Image,
  li,
  Link,
  ol,
  p,
  small,
  strong,
  ul,
  wrapper,
};

export default mdxComponents;
