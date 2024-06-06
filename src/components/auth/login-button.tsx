'use client'

import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "./login-form";
import RegisterForm from "./register-form";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
};

export const LoginButton = ({
	children,
	mode = "redirect",
	asChild
}: LoginButtonProps) => {
	const router = useRouter()

	const onClick = () => {
		router.push("/sign-in/login")
	}

	if (mode === "modal") {
		return(
			<span>
				<Dialog>
					<DialogTrigger asChild={asChild}>
						{children}
					</DialogTrigger>
					<DialogContent>
						<LoginForm />
					</DialogContent>
					<DialogContent>
						<RegisterForm />
					</DialogContent>
				</Dialog>
			</span>
		)
	}

	return(
		<span className="cursor-pointer"
			onClick={onClick}
		>
			{children}
		</span>
	)
}