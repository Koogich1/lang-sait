"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { BsClipboard } from "react-icons/bs"; // Импортируем иконку для кнопки копирования
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	userInfo: User;
}

const AddNewUser = ({ openModal, setOpenModal, userInfo }: Props) => {
  const linkToCopy = `http://localhost:3000/addTeacher/${userInfo.teacherId}`; // Ваше стандартное значение

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToCopy);
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <div
            className="bg-red-500 w-6 h-6 rounded-md text-white flex items-center justify-center text-xl absolute right-6 top-8 hover:bg-red-600 transition-all cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <IoClose />
          </div>
          <DialogTitle className="text-xl font-normal text-[#835BD2]">
            Отправьте эту ссылку вашему ученику!
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3">
            <Input
              className="h-9"
              value={linkToCopy} // Установка стандартного значения
              readOnly // Делаем поле неизменяемым
            />
            <Button
              className="bg-[#835BD2] text-white px-3 h-9 rounded"
              variant={"violetSelect"}
              onClick={handleCopy}
            >
              <BsClipboard className="inline-block mr-1" />
              Копировать
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewUser;