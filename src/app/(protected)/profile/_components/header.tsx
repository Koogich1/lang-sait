
import { Button } from "@/components/ui/button";
import { HiOutlineBell } from "react-icons/hi";
import DropDownMenu from "./navbar/Dropdown_menu";

type Props = {
	header: string,
}

const Header = ({header}: Props) => {

 return(
	
	<div>
		<div className="flex justify-between items-center">
			<h1 className="text-3xl font-semibold text-[#4D6785]">
				{header}
			</h1>
			<div className="flex items-center gap-3">
				<Button variant="shadow" size='lg' className="rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center">
					<HiOutlineBell  className="text-[#4D6785] text-3xl"/>
				</Button>
				<DropDownMenu />
			</div>
		</div>
		<div className="h-[1px] w-full bg-[#BFBEC2] mt-5 rounded-full">

		</div>
	</div>
 )
}

export default Header