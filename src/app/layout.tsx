import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fontGothan } from '@/lib/fonts'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "sonner";
import { ToastTitle } from "@radix-ui/react-toast";

export const metadata: Metadata = {
  title: "Smart Fit | Code Challenge",
  description: "Front-end Smart Fit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontGothan.variable,
          )}
        >
          {children}
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
