import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acyberg",
  description: "Онлайн школа языков",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html>
        <body className={`${inter.className} bg-[#EFEEF3]`}>
          <div className="w-full h-[100vh] p-0 m-0">
          {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
