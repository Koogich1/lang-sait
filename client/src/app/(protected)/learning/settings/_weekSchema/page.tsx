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
						
        </div>
    );
};

export default UpdateWeekSchema;