import Image from "next/image";
import RigthSideBlock from "./rigthSide/rigthSideBlock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100%] h-[100vh] flex justify-start items-center overflow-hidden">
			<div className="w-[45%] min-w-[300px] h-full bg-white shadow-xl p-5 flex items-center justify-center">
				{children}
			</div>
      <div className="flex items-center justify-center w-[55%] relative">
        <RigthSideBlock />
      </div>
		</div>
  );
}
