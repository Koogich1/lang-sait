import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/use-current-user";
import { HiOutlineUser } from "react-icons/hi";

const Block = ()=> {

	const user = useCurrentUser()

	const imgProfile = user?.image ? user?.image : (
	<Button variant='shadow' className="rounded-full w-[4rem] h-[4rem] flex items-center justify-center text-[#4D6785] hover:bg-[#B069CA] hover:text-white" >
		<HiOutlineUser className="text-3xl" />
	</Button>);

	return(
		<Card className="rounded-2xl shadow-md border-none">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	)
}

export default Block