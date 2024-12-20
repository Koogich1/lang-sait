import MovingImage from '@/components/images/movingImages';
import Image from 'next/image'
import React from 'react'

const generateRandomPosition = (maxWidth : any, maxHeight : any, imageSize : any, existingPositions : any) => {
	let position : any;

	// Try to find a non-overlapping position
	do {
			position = {
					left: Math.random() * (maxWidth - imageSize),
					top: Math.random() * (maxHeight - imageSize),
			};
	} while (existingPositions.some((pos: any) => {
			return (
					position.left < pos.left + imageSize &&
					position.left + imageSize > pos.left &&
					position.top < pos.top + imageSize &&
					position.top + imageSize > pos.top
			);
	}));

	return position;
};

const RigthSideBlock = () => {
	const images = [
		"/fly.png",
		"/pensil.png",
		"/brush.png",
		"/fly.png",
		"/palitra.png",
		"/brush.png",
		"/pensil.png",
		"/fly.png",
		"/palitra.png",
		"/fly.png",
		"/pensil.png",
		"/brush.png",
		"/fly.png",
		"/palitra.png",
	];

	const imageSize = 100; // Задайте размер изображения
	const maxWidth = 900; // Максимальная ширина контейнера
	const maxHeight = 1000; // Максимальная высота контейнера
	const positions : any = [];

	const positionedImages = images.map((src, index) => {
		const position = generateRandomPosition(maxWidth, maxHeight, imageSize, positions);
		positions.push(position);
		
		// Генерация случайного времени анимации и смещения
		const duration = Math.random() * 2 + 0.5; // Время от 0.5 до 2.5 секунд
		const yOffset = Math.random() * 20 + 10; // Смещение от 10 до 30 пикселей
		const rotate = Math.random() * 360;

		return { src, position, duration, yOffset, rotate};
	});
	
	return (
		<div className='flex w-full h-[100vh] overflow-hidden items-center justify-center'>
				<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }} className='mt-[] bg-red-50'>
				{positionedImages.map((item, index) => (
                    <div
                        key={index}
                        className='z-10'
                        style={{
                            position: "absolute",
                            left: `${item.position.left}px`,
                            top: `${item.position.top}px`,
                        }}
                    >
                        <MovingImage 
                            src={item.src} 
                            alt={`Image ${index + 1}`} 
                            duration={item.duration} 
                            yOffset={item.yOffset} 
														rotate={item.rotate}
                        />
                    </div>
                ))}
        </div>
			<Image
          className="w-[50%] z-50"
          alt="Main" 
          src={"/mainImg.png"}
          width={550} 
          height={550} 
      />
			<Image 
				 className="z-0 absolute bottom-0 right-0 opacity-10"
				 alt="Main" 
				 src={"/backGround.png"}
				 width={550} 
				 height={550} 
			/>
		</div>
	)
}

export default RigthSideBlock