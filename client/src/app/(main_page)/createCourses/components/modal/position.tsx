"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
  },
  {
    id: 'cato',
    name: 'Little Cato',
  },
  {
    id: 'kvn',
    name: 'KVN',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
  }
]

const Position = () => {

	const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result:any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex bg-gray-100 h-12 rounded-lg px-7 py-2 items-center justify-center text-gray-500">
					<FaFilter />
					<h1 className="text-lg font-semibold p-3">Фильтр</h1>
				</div>
			</DialogTrigger>
				<DialogContent>
				<div className="App">
					<header className="App-header">
						<h1>Final Space Characters</h1>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="characters">
								{(provided) => (
									<ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
										{characters.map(({id, name}, index) => {
											return (
												<Draggable key={id} draggableId={id} index={index}>
													{(provided) => (
														<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
															<p>
																{ name }
															</p>
														</li>
													)}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
					</header>
					<p>
						Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default Position