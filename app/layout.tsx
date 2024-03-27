import "./globals.css";

import { Karla as FontSans } from "next/font/google";

import { cn } from "@/lib/strings";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
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
          "relative min-h-screen font-sans antialiased [background-color:#F0F0F4]",
          fontSans.variable,
        )}
      >
        <Providers>
          <main className="mx-auto flex flex-col-reverse items-center gap-4 p-6 lg:flex-row lg:items-start">
            {children}
            <Sidebar />
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
