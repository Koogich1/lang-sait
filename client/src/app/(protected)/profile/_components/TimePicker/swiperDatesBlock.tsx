import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import "./styles.css"

type Props = {
	week1: any,
	week2: any,
	week3: any,
}

const SwiperDatesBlock = ({week1, week2, week3}: Props) => {

	return (
		<div className='relative w-full'>
			<Swiper
				navigation={true}
				modules={[Navigation]}
				spaceBetween={50}
				slidesPerView={1}
				className='w-[700px] relative mt-5'
			>
				<SwiperSlide className='flex relative'>
					<div className='flex justify-center gap-2 relative'>{week1}</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='flex justify-center gap-2 relative'>{week2}</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='flex justify-center gap-2 relative'>{week3}</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SwiperDatesBlock;