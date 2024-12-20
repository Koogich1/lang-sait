import { LoginForm } from "@/components/auth/login-form" 
import RandomImagesBg from "../rigthSide/randomImagesBg";

const LoginPage = () => {
	return(
		<>
		<div className="w-[350px] hidden md:block">
			<LoginForm />
		</div>
		<div className="w-full h-full p-5 absolute bg-[#EFEEF3] top-0 left-0 border-blue-200 md:hidden flex items-center justify-center overflow-hidden">
			<div className="px-5 py-2 rounded-xl shadow-md border bg-white z-50">
				<LoginForm />
			</div>
			<div className="z-10">
				<RandomImagesBg />
			</div>
		</div>
		</>
	)
}
export default LoginPage;