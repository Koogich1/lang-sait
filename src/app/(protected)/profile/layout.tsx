import { Navbar } from "@/app/(protected)/profile/_components/navbar/navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}


const ProtectedLayout = ( {children}: ProtectedLayoutProps ) => {

	return (
		<div>
			<Navbar />
				<div className="lg:ml-[240px] px-5 md:px-10 xl:px-15 pt-5">
					{children}
				</div>
		</div>
	);
}

export default ProtectedLayout;