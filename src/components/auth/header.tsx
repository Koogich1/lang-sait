interface HeaderProps {
	label: string;
}

export const Header = ({
	label,
}: HeaderProps) => {
	return(
		<div className="w-[100%] flex justify-center items-end p-5">
			<p className="text-xl font-bold text-[#835BD2]">
				{label}
			</p>
		</div>
	)
}