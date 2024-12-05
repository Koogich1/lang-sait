"use client";

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
import { rasdelId } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import updateRasdelPosition from '../../../components/actions/test/updateRasdelPosition';
import Image from 'next/image';

type Props = {
  rasdel: rasdelId[] | null;
  fetchInfo: () => void
}

const Raspolozhenie = ({ rasdel, fetchInfo }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (rasdel) {
      const itemsData = rasdel.map(material => ({
        id: material.id,
        content: material.name,
        photoUrl: material.photoUrl,
      }));
      setItems(itemsData);
    }
  }, [rasdel]); // Устанавливаем элементы при изменении rasdel

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
  
    setLoading(true);
  
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);
  
      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
  
      setItems(newItems);
  
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index, // Обновляем позицию
      }));
  
      try {
        // Проверка: длительная операция
        await Promise.all(updatedItems.map(data => {
          return updateRasdelPosition({ rasdelId: data.id, position: data.position });
        }));
      } catch (error) {
        console.log(error);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 сек задержка для проверки
        fetchInfo();
        setLoading(false);
      }
    } else {
      setLoading(false); // Если drag не произошел, вернем state
    }
  
    setActiveId(null);
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-60vh flex-col gap-3 h-[12rem]">
        <ClipLoader size={50} color="#835BD2" />
        <span className="ml-2 text-[#835BD2]">Загрузка данных...</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 justify-center items-center w-full px-3'>
      <h1 className='text-lg mt-2 text-blue-400 font-medium w-full text-start'>Расположите разделы в необходимом порядке!</h1>
      <div className='lg:w-2/3 w-full border border-gray-100 shadow-lg p-5 rounded-xl'>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <div className="flex items-center flex-col relative">
              <div className='text-gray-600 w-full mt-1'>
                {items.map((data, index) => (
                  <SortableItem 
                    key={data.id} 
                    id={data.id} 
                    content={data.content} 
                    imageSrc={data.photoUrl} 
                    index={index} 
                  />
                ))}
              </div>
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? 
              <SortableItem 
                id={activeId} 
                content={items.find(item => item.id === activeId)?.content} 
                imageSrc={items.find(item => item.id === activeId)?.photoUrl} 
                index={0} 
              /> 
              : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

const SortableItem: React.FC<{ id: string; content: string | null; imageSrc: string | null, index: number }> = ({ id, content, imageSrc, index }) => {
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

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="border border-blue-400 p-2 my-1 bg-white hover:bg-blue-50 transition-all rounded-lg relative flex gap-3 items-center mx-3"
    >
      <p className='w-5 h-5 bg-blue-400 text-base font-semibold flex items-center justify-center rounded-sm text-white'>{index + 1}</p>
      <Image className="h-[3.5rem] w-[3.5rem] object-cover" src={imageSrc ? imageSrc : ""} alt={content || "Material image"} width={1000} height={1000} />
      <h1 className='text-lg font-semibold'>{content}</h1>
    </div>
  );
};

export default Raspolozhenie;
