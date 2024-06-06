import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100%] h-[100vh] flex justify-start items-center">
			<div className="w-[45%] min-w-[300px] h-full bg-white shadow-xl p-5 flex items-center justify-center">
				{children}
			</div>
      <div className="flex items-center justify-center w-[55%]">
        <Image
          className="w-[50%]"
          alt="Main" 
          src={"/mainImg.png"}
          width={550} 
          height={550} 
        />
        </div>
		</div>
  );
}
