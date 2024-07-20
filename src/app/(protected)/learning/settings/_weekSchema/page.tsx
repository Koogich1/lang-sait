"use client"

import React, { useState, useEffect } from 'react';
import WeekSchema from './actions/weekSchema';
import { TeacherAvailability } from '@prisma/client';
import HelpModal from '../../components/modal/help';
import ChangeSchema from '../../components/modal/changeShema';




const daysOfWeekTranslation = {
	MONDAY: 'Понедельник',
	TUESDAY: 'Вторник',
	WEDNESDAY: 'Среда',
	THURSDAY: 'Четверг',
	FRIDAY: 'Пятница',
	SATURDAY: 'Суббота',
	SUNDAY: 'Воскресенье'
};

// Этот компонент будет хранить все данные состояния схемы
const UpdateWeekSchema = () => {
    const [weekSchema, setWeekSchema] = useState<TeacherAvailability[]>([]); // По умолчанию пустой массив, здесь будут данные о схеме
		const [loading, setLoading] = useState(true);

		const daysOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    // Функция для изменения схемы
    const updateSchema = (newSchema:any) => {
        setWeekSchema(newSchema);
    };

    // Этот блок выполнится, когда компонент будет замонтирован
    useEffect(() => {
			const fetchData = async () => {
					try {
							const data = await WeekSchema();
							updateSchema(data); // Обновить состояние схемы данными с сервера
					} catch (error) {
							console.error('Ошибка загрузки данных:', error);
					} finally {
							setLoading(false); // Установите состояние загрузки в "false", когда данные загружены или возникла ошибка
					}
			};
	
			fetchData();
	}, []);

	if (loading) {
    return <p>Загрузка данных...</p>;
}

	if (!weekSchema || weekSchema.length < 7) {
			return <p>Данные недоступны или неполные.</p>;
	}

	const sortedWeekSchema = [...weekSchema].sort((a, b) => daysOrder.indexOf(daysOfWeekTranslation[a.day]) - daysOrder.indexOf(daysOfWeekTranslation[b.day]));

    return (
        <div className='mt-5'>
						<div className='w-full flex justify-between items-center'>
							<h1 className='text-xl font-semibold text-gray-600'>Схема расписания</h1>
							<HelpModal />
						</div>
            <ul className='grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 w-full text-purple-600 mt-5'>
                {sortedWeekSchema.map((slot, index) => (
                    <li key={index} className='flex flex-col p-3 bg-purple-100 shadow-sm w-full text-base font-semibold rounded-lg'>{daysOfWeekTranslation[slot.day]}
										{slot.timeSlots.length > 0 ? 
										<div className='grid grid-cols-2 gap-1 mt-2'>
											{slot.timeSlots.map((time, index) => (
												<p key={index} className='w-full h-9 flex items-center justify-center bg-white text-gray-600 rounded-md font-medium text-sm'>{time}</p>
											))}
										</div>
										: 
										""
										}
											<ChangeSchema day={slot.day} slots={slot.timeSlots}/>
										</li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateWeekSchema;