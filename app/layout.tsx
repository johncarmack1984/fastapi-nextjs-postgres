import "@/styles/globals.css";
import { Karla as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { TopBar } from "@/components/top-bar";
import { Sidebar } from "@/components/sidebar";
import Providers from "./providers";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "John Carmack - AuxHealth Interview",
  description: "Created with FastAPI and Next.js; deployed on Vercel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen [background-color:#F0F0F4] font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <TopBar />
          <main className="flex items-center mx-auto flex-col-reverse lg:flex-row lg:items-start gap-4 p-6">
            {children}
            <Sidebar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
