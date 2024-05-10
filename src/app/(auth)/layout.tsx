import { db } from "@/lib/db";
import { AppHeader } from "@/src/widgets/app-header/app-header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">

      {children}
    </div>
  );
}
