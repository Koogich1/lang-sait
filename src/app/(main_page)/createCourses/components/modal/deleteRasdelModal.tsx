"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { FaRegTrashCan } from "react-icons/fa6";

// Определите интерфейс для пропсов
interface DeleteRasdelModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteRasdelModal: React.FC<DeleteRasdelModalProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className='w-8 h-8 bg-gray-200 rounded-sm flex items-center justify-center transition-all hover:bg-gray-500 hover:text-white hover:shadow-lg text-lg'
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FaRegTrashCan />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteRasdelModal;
