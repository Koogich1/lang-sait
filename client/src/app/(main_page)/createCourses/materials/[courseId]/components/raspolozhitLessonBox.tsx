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
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Lessons } from '@prisma/client';
import updateLessonPosition from '../../../components/actions/test/updateLessonPosition';
import { HashLoader } from 'react-spinners';


type Props = {
  lessons: Lessons[];
  fetchLesson: () => void;
};

const RaspolozhitLessonBox = ({ lessons, fetchLesson }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<Lessons[]>([]);
	const [loading, setLoading] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    setItems(lessons); // Устанавливаем начальные элементы
  }, [lessons]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);

      const newItems = [...items];
      // Обновляем порядок элементов
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
      setItems(newItems);

			const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index, // Обновляем позицию
      }));
			
			try {
				setLoading(true)
        await Promise.all(updatedItems.map(data => 
          updateLessonPosition({ rasdelId: data.id, position: data.position })
        ));
				setLoading(false)
      } catch(e) {
        console.log(e);
      }

      // Здесь можно добавить вызов API для обновления позиции в БД
      await fetchLesson(); // Обновляем данные после перетаскивания
    }

    setActiveId(null);
  };

	if(loading){
		return(
			<div className='min-h-[8rem] w-full flex flex-col items-center justify-center gap-2 text-gray-400'>
				<p>Подождите обновление данных...</p>
				<HashLoader color='#9ca3af'/>
			</div>
		)
	}

  return (
	<div>
		<h1 className='text-blue-400 font-medium pt-1 text-lg'>Переставляйте уроки!</h1>
		<DndContext
					sensors={sensors}
					collisionDetection={rectIntersection}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				>
					<SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
						<div className="flex items-center flex-col relative">
							<div className='text-gray-600 w-full mt-3'>
								{items.map((item, index) => (
									<SortableItem 
										key={item.id} 
										id={item.id} 
										content={item.name || null} 
										imageSrc={item.photoUrl || null} 
										position={index + 1} // Передаем позицию (индекс + 1)
									/>
								))}
							</div>
						</div>
					</SortableContext>
					<DragOverlay>
						{activeId ? 
							<SortableItem 
								id={activeId} 
								content={items.find(item => item.id === activeId)?.name || null} 
								imageSrc={items.find(item => item.id === activeId)?.photoUrl || null} 
								position={items.find(item => item.id === activeId)?.position || 0} // Передаем позицию
							/> 
							: null}
					</DragOverlay>
				</DndContext>
		</div>
  );
};

const SortableItem: React.FC<{ id: string; content: string | null; imageSrc: string | null; position: number }> = ({ id, content, imageSrc, position }) => {
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
      className="border border-blue-400 p-1 mb-1 bg-white px-3 hover:bg-blue-50 transition-all rounded-lg relative flex gap-2 items-center"
    >
      <div className="font-bold h-4 w-4 flex items-center justify-center rounded-sm bg-blue-400 text-white">{position}</div> {/* Отображаем позицию */}
      <Image 
        className="h-[1.7rem] w-[1.7rem] object-cover" 
        src={imageSrc || ""} 
        alt={content || "Lesson image"} 
        width={1000} 
        height={1000} 
      />
      <h1 className='text-base text-gray-400'>{content}</h1>
    </div>
  );
};

export default RaspolozhitLessonBox;
