"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default layout;
