import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaFilter } from "react-icons/fa";

const FilterMaterials = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex bg-gray-100 h-12 rounded-lg px-7 py-2 items-center justify-center text-gray-500">
					<FaFilter />
					<h1 className="text-lg font-semibold p-3">Фильтр</h1>
				</div>
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

export default FilterMaterials