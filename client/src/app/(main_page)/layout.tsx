'use client'

import Image from "next/image";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-[#EFEEF3] w-full relative pb-[18rem] overflow-hidden">
      <Image src={"/backgroundLine.png"} alt="background" width={1000} height={6000} className="absolute right-0 top-0 z-0 opacity-20"/>
        <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1440px] mx-auto overflow-hidden min-h-[60vh]">
          {children}
        </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
