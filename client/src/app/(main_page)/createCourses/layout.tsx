import FooterChoose from "./components/footerChoose";
import Header from "./components/header";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ( {children}: ProtectedLayoutProps ) => {

	return (
		<div className="w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] mt-3 relative pb-[100px]">
			<Header />
				<div>
					{children}
				</div>
			<FooterChoose/>
		</div>
	);
}

export default ProtectedLayout;