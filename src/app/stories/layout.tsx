
"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  );
}
