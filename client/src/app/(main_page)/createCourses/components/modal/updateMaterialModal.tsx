"use client"

import React, { useEffect, useState } from 'react';

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

import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";

type UpdateMaterialModalProps = {
  materialInfo: Materials;
	visov: () => void;
  update: () => void;
};

let mergeTags = [{trigger: "@",
  tags: [
    {name: "Dominic St-Pierre", tag: "@dominic"},
    {name: "John Doe", tag: "@john"}
  ]}]

const UpdateMaterialModal = ({ materialInfo, visov, update}: UpdateMaterialModalProps) => {
	const [editorState, setEditorState] = useState("");
	const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-20 h-20 fixed left-0 top-[44%] bg-blue-300 text-blue-600 flex rounded-lg transition-all items-center justify-center gap-3 z-20 hover:opacity-80">
        <div className="rounded-md min-h-5 min-w-5">
          <FiEdit className="w-full h-full text-3xl text-blue-600 p-[0.125rem]" />
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[760px]'>
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
				<TrixEditor
          className="w-full border border-gray-100 text-gray-500"
          autoFocus={true}
          placeholder=""
          value={materialInfo.content ? materialInfo.content : ""}
          uploadURL="https://domain.com/imgupload/receiving/post"
          uploadData={{"key1": "value", "key2": "value"}}
          fileParamName="blob"
          mergeTags={mergeTags}
          onChange={setEditorState}
          onEditorReady={() => {}}
          />
				<div className='flex gap-3 mt-20'>
					<Button className='w-1/2 text-base' variant={"violetSelect"}
						onClick={() => {
							updateMaterial({materialId: materialInfo.id, materialLessonId: materialInfo.lessonId, materialRasdelId: materialInfo.littleRasdelId, content: editorState ? editorState : materialInfo.content ? materialInfo.content : "" })
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