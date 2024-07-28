'use client'

import { Navbar } from "@/app/(protected)/profile/_components/navbar/navbar";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {

  return (
    <div>
      <Navbar />
      <div className="lg:ml-[240px] px-5 md:px-10 xl:px-15 pt-5">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
