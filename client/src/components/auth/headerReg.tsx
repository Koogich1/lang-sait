import Image from "next/image";

interface HeaderProps {
	label: string;
}

export const HeaderReg = ({
	label,
}: HeaderProps) => {
	return(
		<div className="w-[100%] flex justify-center items-center p-3">
			<Image src={"/logo.png"} alt="icon" width={100} height={100} className="w-[4rem] h-[4rem]"/>
			<p className="text-2xl font-medium text-[#6849a6]">
				{label}
			</p>
		</div>
	)
}