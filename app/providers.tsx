"use client";

import React, { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { createIDBPersister } from "@/lib/browser/idb-persister";
import Breadcrumbs from "@/components/breadcrumbs";
import { TopBar } from "@/components/top-bar";

TimeAgo.addDefaultLocale(en);

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
}

const persister = createIDBPersister();

let clientQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!clientQueryClient) clientQueryClient = makeQueryClient();
    return clientQueryClient;
  }
}

export default function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const segments = useSelectedLayoutSegments();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ReactQueryStreamedHydration>
        <TopBar />
        <Breadcrumbs segments={segments} />
        {props.children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
