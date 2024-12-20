"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
	open: boolean,
	setOpen: any,
	visov: () => void
}

const UpdateEmailModal = ({open, setOpen, visov}: Props) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-[#835BD2]">Письмо подтверждения выслано на почту</DialogTitle>
					<DialogDescription className="py-2 pb-4">
						Подтвердите почту и получите награду!
					</DialogDescription>
					<div className="flex gap-3">
						<Button variant={"shadow2"} className="w-1/2" onClick={() => {setOpen(false)}}>Отменить</Button>
						<Button 
							variant={"violetSelect"} 
							className="w-1/2"
							onClick={visov}
						>
							Уже подтвердил!
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}

export default UpdateEmailModal