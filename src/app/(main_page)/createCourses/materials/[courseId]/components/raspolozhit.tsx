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
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import fetchCourses from '../../../components/actions/fetchCourses';
import { ClipLoader } from 'react-spinners'; // Loader for loading states
import { Button } from '@/components/ui/button';
import upateRasdelPosition from '../../../components/actions/test/updateRasdelPosition';

const Raspolozhenie = () => {
  const { courseId } = useParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rasd, setRasd] = useState<rasdelId[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const fetchRasd = async () => {
    const fetcher = await fetchCourses({ courseID: courseId as string });
    if (fetcher) {
      setRasd(fetcher);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRasd();
  }, [courseId]); // Fetch data on courseId change

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);

      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
      setItems(newItems);

      const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index + 1, // Обновляем позицию
      }));
  
      try {
        setLoading(true);
        await Promise.all(updatedItems.map(data => 
          upateRasdelPosition({ rasdelId: data.id, position: data.position })
        ));
        setLoading(false);
      } catch(e) {
        console.log(e);
      }
    }

    setActiveId(null);
  };

  useEffect(() => {
    const itemsData = rasd.map(material => ({
      id: material.id,
      content: material.name,
      photoUrl: material.photoUrl,
    }));
    setItems(itemsData);
  }, [rasd]); // Set items when rasd changes

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-60vh">
        <ClipLoader size={50} color="#835BD2" />
        <span className="ml-2">Загрузка данных...</span>
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="flex items-center flex-col relative">
            <div className='text-gray-600 w-full mt-3'>
              {items.map(data => (
                <SortableItem 
                  key={data.id} 
                  id={data.id} 
                  content={data.content} 
                  imageSrc={data.photoUrl} 
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
            /> 
            : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

const SortableItem: React.FC<{ id: string; content: string | null; imageSrc: string | null }> = ({ id, content, imageSrc }) => {
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
      className="border border-blue-300 p-2 my-1 bg-blue-50 hover:bg-blue-100 transition-all rounded-lg relative flex gap-2 items-center mx-3"
    >
      <img className="h-[3.5rem] w-[3.5rem] object-cover" src={imageSrc ? imageSrc : ""} alt={content || "Material image"} />
			<h1 className='text-lg font-semibold'>{content}</h1>
    </div>
  );
};

export default Raspolozhenie;