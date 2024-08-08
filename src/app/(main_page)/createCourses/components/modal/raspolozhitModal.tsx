import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { rasdelId } from "@prisma/client"
import { FaPlus } from "react-icons/fa6"

type Props = {
	rasdels: rasdelId[] | null,
}

const SetPositonModal = ({rasdels}: Props) => {
	return (
		<Dialog>
			<DialogTrigger className="px-3 py-2 bg-[#835BD2] text-base font-medium text-white rounded-lg border-b-4 border-[#63459f] hover:bg-[#9568ee] transition-all active:border-0">
				Расположить расделы
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

export default SetPositonModal