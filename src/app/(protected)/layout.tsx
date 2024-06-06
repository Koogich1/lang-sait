import { Navbar } from "@/app/(protected)/profile/_components/navbar/navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}


const ProtectedLayout = ( {children}: ProtectedLayoutProps ) => {

	return (
		<div>
			<Navbar />
				<div className="ml-[240px] px-20 pt-5">
					{children}
				</div>
		</div>

	);
}

export default ProtectedLayout;