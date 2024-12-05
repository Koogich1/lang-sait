"use client";

import React, { useEffect, useState } from 'react';
import createMaterial from '@/app/(main_page)/createCourses/components/actions/materials/createMaterial';
import { courseData, Materials, User } from '@prisma/client';
import UpdateMaterialModal from '@/app/(main_page)/createCourses/components/modal/updateMaterialModal';
import AddImageMaterial from '@/app/(main_page)/createCourses/components/modal/addImageMaterial';
import { useParams } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import fetchCourseById from '@/app/(main_page)/createCourses/components/actions/fetchCourseById';

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  rectIntersection,
} from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import upateMaterialPosition from '@/app/(main_page)/createCourses/components/actions/test/upateMaterialPosition';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { ClipLoader } from 'react-spinners';
import UpdateMaterialImage from '@/app/(main_page)/createCourses/components/modal/updateMaterailImage';
import Image from 'next/image';

import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";

type Props = {
  currRasdel: { id: string; lessonId: string; name: string } | null;
  materials: Materials[],
  visov: () => void,
};

let mergeTags = [{trigger: "@",
  tags: [
    {name: "Dominic St-Pierre", tag: "@dominic"},
    {name: "John Doe", tag: "@john"}
  ]}]

const MaterialBox: React.FC<Props> = ({ currRasdel, materials, visov }) => {
  const [editorState, setEditorState] = useState<string>("");  
  const [user, setUser] = useState<User | null>(null);
  const { courseId } = useParams();
  const [course, setCourse] = useState<courseData | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Materials | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleEditorChange(value:any, event:any) {
    console.log('here is the current model value:', value);
  }

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
  
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);
      
      const newItems = [...items];
      newItems.splice(oldIndex, 1); // Убираем элемент из старой позиции
      newItems.splice(newIndex, 0, items[oldIndex]); // Вставляем элемент в новую позицию
  
      // Обновляем состояние items
      setItems(newItems);
  
      // Обновляем позиции в базе данных
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index + 1, // Обновляем позицию
      }));
  
      try {
        setLoading(true);
        await Promise.all(updatedItems.map(data => 
          upateMaterialPosition({ materialId: data.id, position: data.position })
        ));
        setLoading(false);
      } catch(e) {
        console.log(e);
      }
    }
  
    setActiveId(null);
  };

  useEffect(() => {
    const itemsData = materials.map((material) => ({
      id: material.id,
      content: material.content,
      imageSrc: material.imageSrc,
    }));

    setItems(itemsData);
  }, [materials]);

  useEffect(() => {
    const fetch = async () => {
      const data = await currentUser();
      const courseInfo = await fetchCourseById(courseId as string);
      if (courseInfo) setCourse(courseInfo);
      if (data) setUser(data);
    };
    fetch();
  }, [courseId]);  

  const handleCreateMaterial = async () => {
    if (!currRasdel) {
      console.error('currentRasdel is null');
      return;
    }

    const { id: currentLittleRasdelId, lessonId: currentLessonId } = currRasdel;

    if(editorState.length > 0){
      await createMaterial({
        currentLittleRasdelId,
        currentLessonId,
        content: editorState, // Использование локального состояния editorState
      });
    }

    console.log(editorState);
  };


  if (!user) {
    return(
      <Dialog open={loading}>
        <DialogContent className="flex flex-col items-center justify-center w-full min-h-[60vh] min-w-[60vh] text-2xl font-bold text-gray-400">
            <h1>Обновление данных...</h1>
            <ClipLoader size="100" color="#835BD2" />
        </DialogContent>
     </Dialog>
    );
  }

  if (loading) {
    return (
      <Dialog open={loading}>
        <DialogContent className="flex flex-col items-center justify-center w-full min-h-[60vh] min-w-[60vh] text-2xl font-bold text-gray-400">
            <h1>Обновление данных...</h1>
            <ClipLoader size="100" color="#835BD2" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <main>
          <div className="flex items-center flex-col relative">
            <div className='text-gray-600 w-full mt-3'>
              {items.map(data => (
                <SortableItem 
                  key={data.id} 
                  id={data.id} 
                  content={data.content} 
                  imageSrc={data.imageSrc} 
                  material={data} 
                  onRightClick={(material) => {
                    setSelectedMaterial(material); // Устанавливаем выбранный материал
                  }}
                />
              ))}
            </div>
            <h1 className='text-lg font-medium text-blue-400 py-2'>Введите текст или изображения, которые хотите добавить!</h1>
            {user.id === course?.userId && typeof window !== 'undefined' && (
                <div className='w-full'>
                  <TrixEditor
                    className="w-full border border-gray-100 text-gray-500"
                    autoFocus={true}
                    placeholder=""
                    value=""
                    uploadURL="https://domain.com/imgupload/receiving/post"
                    uploadData={{"key1": "value", "key2": "value"}}
                    fileParamName="blob"
                    mergeTags={mergeTags}
                    onChange={setEditorState}
                    onEditorReady={() => {}}
                  />
                  <div className='flex gap-3 w-full'>
                    <button 
                      onClick={() => {
                        handleCreateMaterial();
                        visov();
                      }} 
                      className="mt-5 p-2 bg-blue-500 text-white rounded w-1/2">
                      Добавить фрагмент
                    </button>
                    <AddImageMaterial currRasdel={currRasdel} visov={visov} />
                  </div>
                </div>
              )}
          </div>
        </main>
      </SortableContext>
      <DragOverlay>
        {activeId ? 
          <SortableItem 
            id={activeId} 
            content={items.find(item => item.id === activeId)?.content} 
            imageSrc={items.find(item => item.id === activeId)?.imageSrc} 
            material={items.find(item => item.id === activeId)}
            onRightClick={(material) => {
              setSelectedMaterial(material); // Устанавливаем выбранный материал
            }}
          /> 
          : null}
      </DragOverlay>

      {selectedMaterial && (
        selectedMaterial.imageSrc ? 
        <UpdateMaterialImage 
          materialInfo={selectedMaterial} 
          visov={() => setSelectedMaterial(null)} 
          update={() => visov()}
        />
        :
        <UpdateMaterialModal 
          materialInfo={selectedMaterial} 
          visov={() => setSelectedMaterial(null)}
          update={() => visov()} 
         />
      )}
    </DndContext>
  );
};

const SortableItem: React.FC<{ id: string; content: string | null; imageSrc: string | null; material: Materials; onRightClick: (material: Materials) => void }> = ({ id, content, imageSrc, material, onRightClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем стандартное контекстное меню
    onRightClick(material); // Вызываем функцию для обработки правого клика
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      onContextMenu={handleContextMenu} // Добавляем обработчик контекстного меню
      className="border border-gray-100 hover:bg-blue-50 p-2 my-1 bg-white transition-all rounded-lg relative"
    >
      {content ? (
       <div className='relative flex items-center'>
          <div className='prose prose-p:m-0 z-40 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0
           prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none' 
          dangerouslySetInnerHTML={{ __html: content }} />
       </div>
      ) : (
        <Image width={1000} height={1000} className="w-full" src={imageSrc ? imageSrc : ""} alt="" />
      )}
    </div>
  );
};

export default MaterialBox;