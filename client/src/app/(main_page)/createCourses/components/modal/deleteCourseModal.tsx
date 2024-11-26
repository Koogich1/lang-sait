import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FaRegTrashCan } from "react-icons/fa6"
import deleteCourse from "../actions/deleteCourse"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const DeleteCourseModal = ({ courseId }: { courseId: string }) => {
  const [open, setOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className='p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-all'
        >
          <FaRegTrashCan />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-500">Вы действительно хотите удалить весь Курс?</DialogTitle>
          <DialogDescription className="text-red-500 font-semibold text-lg">
            Все разделы, уроки, тесты будут безвозвратно удалены!
          </DialogDescription>
        </DialogHeader>
        <div className="text-base gap-3 text-gray-400 font-semibold flex items-center w-full">
          <input
            type="checkbox"
            className="border-red-500 border-2 h-6 w-6 rounded cursor-pointer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Нажмите сюда, чтобы подтвердить намерение
        </div>
        <div className="flex gap-3">
					<Button
						onClick={() => {
							deleteCourse(courseId)
							router.push("/createCourses/materials/")
							setOpen(false)
						}}
						disabled={!isChecked}
						variant={"shadow2"}
						className="bg-red-200 text-red-500 font-semibold w-1/2"
					>
						удалить
					</Button>
					<Button
					variant={"shadow2"}
					className="bg-green-200 text-green-500 hover:bg-green-300 font-semibold w-1/2"
						onClick={() => {
							setIsChecked(false)
							setOpen(false)
						}}
					>
						Отменить
					</Button>
				</div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCourseModal
