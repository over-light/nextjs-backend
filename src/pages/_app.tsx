import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";

import "../styles/globals.scss";
import { PostProvider } from "../context/PostContext";
const queryClient = new QueryClient();
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PostProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PostProvider>
  );
};

export default trpc.withTRPC(MyApp);
