import Image from "next/image";
import RigthSideBlock from "./rigthSide/rigthSideBlock";
import RandomImagesBg from "./rigthSide/randomImagesBg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center md:justify-start items-center overflow-hidden">
			<div className="flex md:w-[45%] min-w-[300px] h-full bg-white shadow-xl p-5  items-center justify-center">
				<div>
          {children}
        </div>
			</div>
      <div className="hidden md:flex items-center justify-center w-[55%] relative ">
        <RigthSideBlock />
      </div>
		</div>
  );
}
