 "use client"

import BackButton from "./back-button";
import { HeaderReg } from "./headerReg";
import Social from "./social";

 interface CardWrapperRegProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
 }

export const CardWrapperReg = ({
children,
headerLabel,
backButtonLabel,
backButtonHref,
showSocial,
}: CardWrapperRegProps) => {
	return (
		<div className="w-[100%] flex flex-col justify-between items-center">
			<HeaderReg
			label = {headerLabel}
			/>
		 {children}

		 {showSocial && (
			<div className="">
				<Social />
			</div>
		 )}
		 	<BackButton
					label={backButtonLabel}
					href={backButtonHref}
				/>
		</div>
	 )	
}