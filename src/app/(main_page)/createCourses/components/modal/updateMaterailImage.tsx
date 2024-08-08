"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import createMaterial from '@/app/(main_page)/createCourses/components/actions/materials/createMaterial';
import getMaterailFromDb from '@/app/(main_page)/createCourses/components/actions/materials/getMaterailFromDb';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Materials } from "@prisma/client";
import { FiEdit } from "react-icons/fi";
import { Button } from '@/components/ui/button';
import updateMaterial from '../actions/materials/updateMaterial';
import { FaRegTrashCan } from "react-icons/fa6";
import deleteMaterial from '../actions/materials/deleteMaterial';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

type UpdateMaterialModalProps = {
  materialInfo: Materials;
	visov: () => void;
};

const UpdateMaterialImage = ({ materialInfo, visov }: UpdateMaterialModalProps) => {
	const [content, setContent] = useState(materialInfo.content);
	const [open, setOpen] = useState(false)


	const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full absolute top-0 hover:bg-blue-100 flex rounded-lg transition-all items-center justify-center gap-3  h-full opacity-0 border-2 border-dashed z-20 hover:opacity-80">
        <div className="rounded-md min-h-5 min-w-5 h-1/3">
          <FiEdit className="w-full h-full text-blue-400" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Дейстительно хотите удалить изображение?
        </DialogTitle>
        <div 
          className='absolute right-0 w-8 m-5 h-8 rounded-lg bg-red-300 flex items-center justify-center text-2xl border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-600 cursor-pointer transition-all'
          onClick={() => {
            deleteMaterial(materialInfo.id, materialInfo.lessonId)
            visov()
            setOpen(false)
          }}
        >
         <FaRegTrashCan />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMaterialImage;
