interface HeaderProps {
	label: string;
}

export const Header = ({
	label,
}: HeaderProps) => {
	return(
		<div className="w-[100%] flex gap-3 justify-end items-end">
			<p className="text-2xl font-bold text-[#f9b0f8] right-0">
				{label}
			</p>
		</div>
	)
}