interface HeaderProps {
	label: string;
}

export const HeaderReg = ({
	label,
}: HeaderProps) => {
	return(
		<div className="w-[100%] flex gap-3 justify-center items-center">
			<p className="text-xl font-bold text-[#835BD2] pb-3">
				{label}
			</p>
		</div>
	)
}