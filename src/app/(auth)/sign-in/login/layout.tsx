import { AppHeader } from "@/src/widgets/app-header/app-header";
import Image from "next/image";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#EFEEF3] h-[100vh] w-[100%] flex justify-center items-center">
      <div className="bg-[#fff] w-[600px] h-[400px] rounded-[30px] shadow-xl flex">
				<Image 
					className="h-[104.5%] w-[52%] mt-[-2.52%] ml-[-4.8%] p-0 m-0 scale-125"
					src='/loginPage.png'
					width={10000}
					height={10000}
					alt="loginPage"
				/>
        {children}
      </div>
    </div>
  );
}
