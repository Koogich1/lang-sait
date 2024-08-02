"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import deleteLittleRasdel from "../actions/deleteRasdel";

// Определите интерфейс для пропсов

const DeleteRasdelModal = ({currRasdel, lessonId, visov} : {currRasdel: string, lessonId: string, visov: () => void}) => {
  const[open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className='w-8 h-8 bg-red-300 border-2 border-red-400 text-red-500 rounded-sm cursor-pointer flex items-center justify-center transition-all hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg text-lg'
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FaRegTrashCan />
        </div>
      </DialogTrigger>
      <DialogContent className="text-gray-600">
        <DialogHeader>
          <DialogTitle className="font-bold">Вы действительно хотите удалить раздел?</DialogTitle>
          <DialogDescription className="text-gray-400 font-medium pt-1">
            Это действие необратимо, все данные, (включая тесты) будут потеряны, вы действительно хотите удалить раздел?
          </DialogDescription>
        </DialogHeader>
       <div className="flex gap-3">
        <Button
          variant={"shadow2"}
          className="bg-red-200 text-red-500 w-1/2"
          onClick={async()=>{
            await deleteLittleRasdel({rasdelId: currRasdel, lessonId: lessonId})
            visov()
            setOpen(false)
          }}
        >
          Подтверить
        </Button>
          <Button 
            variant={"shadow2"}
            className="bg-green-200 text-green-600 w-1/2"
            onClick={() => {
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

export default DeleteRasdelModal;
