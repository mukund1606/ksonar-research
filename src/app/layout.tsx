import "@/styles/globals.css";

import { Providers } from "@/providers";
import { TRPCReactProvider } from "@/trpc/react";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Nav from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { getServerAuthSession } from "@/server/auth";

export const metadata = {
  title: "KSonar Research",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        <Providers>
          <TRPCReactProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Nav 
              session={session}
            />
            {children}
            <ReactQueryDevtools />
            <Toaster richColors closeButton />
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
