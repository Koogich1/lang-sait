"use client"

import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { useRef } from 'react';

type Answer = {
	id: string;
	testId: string;
	text: string;
	order: number | null;
}

const OrderBlock = ({ answers }: { answers: Answer[] }) => {
	const dropAreaRef = useRef(null);
  const dragGroupRef = useRef(null);
  const highlightRef = useRef(null);

	return (
			<div>
				{answers.map((answer, i) => (
					<div>
						{answer.text}
					</div>
				))}
			</div>
	);
};

export default OrderBlock;