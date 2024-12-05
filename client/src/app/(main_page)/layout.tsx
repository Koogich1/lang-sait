'use client'

import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-[#EFEEF3] w-full relative pb-[25rem]">
        <main className="flex-1 flex flex-col items-center w-[100%] max-w-[1440px] mx-auto overflow-hidden min-h-[60vh]">
          {children}
        </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
