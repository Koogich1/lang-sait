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
  update: () => void;
};

const UpdateMaterialModal = ({ materialInfo, visov, update}: UpdateMaterialModalProps) => {
	const [content, setContent] = useState(materialInfo.content);
	const [open, setOpen] = useState(false)

	const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['clean'],
    ],
  };

	const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
  ];

	const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-20 h-20 fixed left-0 top-[44%] bg-blue-300 text-blue-600 flex rounded-lg transition-all items-center justify-center gap-3 z-20 hover:opacity-80">
        <div className="rounded-md min-h-5 min-w-5">
          <FiEdit className="w-full h-full text-3xl text-blue-600 p-[0.125rem]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div 
          className='absolute right-0 w-8 m-5 h-8 rounded-lg bg-red-300 flex items-center justify-center text-2xl border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-600 cursor-pointer transition-all'
          onClick={() => {
            deleteMaterial(materialInfo.id, materialInfo.lessonId)
            visov()
            update()
            setOpen(false)
          }}
        >
         <FaRegTrashCan />
        </div>
        <DialogHeader>
          <DialogTitle>Измененик контрентного блока</DialogTitle>
        </DialogHeader>
				<QuillEditor
					value={content}
					onChange={handleEditorChange}
					modules={quillModules}
					formats={quillFormats}
					className="w-full h-full mt-5 pb-[5.8rem] bg-white rounded-xl"
 				/>
				<div className='flex gap-3'>
					<Button className='w-1/2 text-base' variant={"violetSelect"}
						onClick={() => {
							updateMaterial({materialId: materialInfo.id, materialLessonId: materialInfo.lessonId, materialRasdelId: materialInfo.littleRasdelId, content: content ? content : materialInfo.content ? materialInfo.content : "" })
							visov()
              update()
							setOpen(false)
						}}
					>
						Подтвердить изменения
					</Button>
					<Button className='w-1/2 text-base' variant={"shadow2"}
            onClick={() => {
              setOpen(false)
              update()
              visov()
            }
            }
          >
						Отменить
					</Button>
				</div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMaterialModal;