import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa6"

const CreateNewCourse = () => {
	return (
		<Dialog>
			<DialogTrigger className="max-w-[230px] min-w-[180px] flex flex-col items-center justify-center gap-3 h-[280px] border-2 border-dashed mt-5 hover:border-solid hover:border-purple-600 transition-all rounded-lg">
				<div className="h-6 w-6 bg-[#835BD2] rounded-lg">
					<FaPlus className="w-full h-full p-1 text-white"/>
				</div>
				<h1 className="text-lg font-semibold text-[#835BD2]">Создать <br /> новый курс</h1>
			</DialogTrigger>
				<DialogContent>
					<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
					This action cannot be undone. This will permanently delete your account
					and remove your data from our servers.
					</DialogDescription>
					</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default CreateNewCourse