"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import PageRaper from "@repo/ui/src/components/pageRaper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Turborepo",
//   description: "Generated by create turbo",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <PageRaper>{children}</PageRaper>
      </body>
      {mounted && <ToastContainer />}
    </html>
  );
}
