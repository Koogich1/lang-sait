 "use client"

import BackButton from "./back-button";
import { Header } from "./header";
import Social from "./social";

 interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
 }

export const CardWrapper = ({
children,
headerLabel,
backButtonLabel,
backButtonHref,
showSocial,
}: CardWrapperProps) => {
	return (
		<div className="w-[100%] flex flex-col justify-between items-center">
			<Header 
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