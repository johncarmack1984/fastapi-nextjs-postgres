import "./globals.css";

import { Karla as FontSans } from "next/font/google";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/strings";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import Providers from "./providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "John Carmack - AuxHealth Interview",
  description: "Created with FastAPI and Next.js; deployed on Vercel.",
};

const bodyVariants = cva(
  "min-h-screen [background-color:#F0F0F4] font-sans antialiased",
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(bodyVariants(), fontSans.variable)}>
        <Providers>
          <main className="mx-auto flex flex-col-reverse items-center gap-4 p-6 lg:flex-row lg:items-start">
            {children}
            <Sidebar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
