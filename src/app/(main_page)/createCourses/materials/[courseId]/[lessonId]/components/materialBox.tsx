"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import createMaterial from '@/app/(main_page)/createCourses/components/actions/materials/createMaterial';
import { Materials } from '@prisma/client';
import getMaterailFromDb from '@/app/(main_page)/createCourses/components/actions/materials/getMaterailFromDb';
import UpdateMaterialModal from '@/app/(main_page)/createCourses/components/modal/updateMaterialModal';
import AddImageMaterial from '@/app/(main_page)/createCourses/components/modal/addImageMaterial';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
  currRasdel: { id: string; lessonId: string; name: string } | null;
  materials: Materials[],
  visov: () => void,
};

const MaterialBox = ({ currRasdel, materials, visov }: Props) => {
  const [content, setContent] = useState('');

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

  const handleCreateMaterial = async () => {
    if (!currRasdel) {
      console.error('currentRasdel is null');
      return;
    }

    const { id: currentLittleRasdelId, lessonId: currentLessonId } = currRasdel;

    await createMaterial({
      currentLittleRasdelId,
      currentLessonId,
      content,
    });
    console.log('Успешно создан');
  };

  return (
    <main>
      <div className="flex items-center flex-col relative">
        <div className='text-gray-600 w-full'>
          {materials?.map((data) => (
            <>
              {data.content ? 
              <div 
                key={data.id} 
                className='rounded-lg relative cursor-pointer transition-all m-0 p-0 prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0
                prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none
                ' 
                onClick={() => {}}
              >
               <div 
                className='m-0 p-0 mb-0 w-full' 
                dangerouslySetInnerHTML={data.content ? { __html: data.content } : undefined}
               />
               <UpdateMaterialModal materialInfo={data} visov={() => visov()}/>
            </div> 
            : 
            <div className='max-w-[150px]'>
              <img className="w-full" src={data.imageSrc ? data.imageSrc: ""}  alt="" />
            </div>
            }
            </>
          ))}
        </div>
        <div className="w-full rounded-lg text-lg font-normal text-gray-600">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-full mt-5 bg-white rounded-xl"
          />
        </div>
        <div className='flex gap-3 w-full'>
          <button 
          onClick={() => {
            handleCreateMaterial()
            visov()
            setContent('')
          }} 
          className="mt-5 p-2 bg-blue-500 text-white rounded w-1/2">
            Добавить фрагмент
          </button>
          <AddImageMaterial currRasdel={currRasdel} visov={() => visov()}/>
        </div>
      </div>
    </main>
  );
};

export default MaterialBox;
