"use client"

import { useCallback, useEffect, useState } from 'react';
import findFirstTwoItems from '../../actions/findMaterials/find2FirstMaterial';
import { courseData, Lessons, rasdelId } from '@prisma/client';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';

type Props = {
	blockId: string;
}

type Item = (courseData | Lessons | rasdelId) & { type: 'course' | 'lesson' | 'rasdel' };

const BlocksFirts2 = ({ blockId }: Props) => {
	const [inner, setInner] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(true); // состояние загрузки

	const fetchInfo = useCallback(async () => {
		setLoading(true); // Начинаем загрузку
		const data = await findFirstTwoItems(blockId);
		if (data) {
			setInner(data);
		}
		setLoading(false); // Завершаем загрузку
	}, [blockId])

	useEffect(() => {
		fetchInfo();
	}, [fetchInfo]);

	return (
		<div className='opacity-60'>
			{loading ? ( // Проверяем, идет ли загрузка
				<div className="flex flex-col items-center">
					<HashLoader color="#835BD2" />
					<p>Загрузка данных...</p>
				</div>
			) : (
				inner.length > 0 ? (
					inner.map((item) => (
						<div key={item.id}>
							{item.type === 'course' && 
							<div className='flex gap-3 items-center border-t p-3'>
								<h1 className='text-gray-600 font-semibold'>Курс: </h1>
								<div className='flex gap-2 items-center'>
									<Image src={item.photoUrl} alt="" width={30} height={30} className='w-[30px] h-[30px] rounded-md object-cover' />
									<div className='text-base text-[#835BD2]'>{item.name}</div>
								</div>
							</div>}
							{item.type === 'lesson' && 
							<div className='flex gap-3 items-center border-t p-3'>
							<h1 className='text-gray-600 font-semibold'>Урок: </h1>
							<div className='flex gap-2 items-center'>
								<Image src={item.photoUrl} alt="" width={30} height={30} className='w-[30px] h-[30px] rounded-md object-cover' />
								<div className='text-base text-[#835BD2]'>{item.name}</div>
							</div>
							</div>
							}
							{item.type === 'rasdel' && 
							<div className='flex gap-3 items-center border-t p-3'>
								<h1 className='text-gray-600 font-semibold'>Урок: </h1>
								<div className='flex gap-2 items-center'>
									<Image src={item.photoUrl} alt="" width={30} height={30} className='w-[30px] h-[30px] rounded-md object-cover' />
									<div className='text-base text-[#835BD2]'>{item.name}</div>
								</div>
							</div>
							}
						</div>
					))
				) : (
					<p>Нет доступных элементов</p>
				)
			)}
		</div>
	);
}

export default BlocksFirts2;
