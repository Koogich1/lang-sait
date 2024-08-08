"use server"

import { db } from "@/lib/db"

type Props = {
	blockId: string
}

const deleteBlock = async({blockId}: Props) => {
  const blockToDelete = await db.textBlock.findUnique({
		where: {
			id: blockId
		}
	})

	if (!blockToDelete) {
		throw new Error("Block not found");
	}

	// Удаляем блок
	await db.textBlock.delete({
		where: {
			id: blockId
		}
	})

	// Перераспределяем позиции
	const remainingBlocks = await db.textBlock.findMany({
		where: {
			testId: blockToDelete.testId
		},
		orderBy: {
			position: "asc"
		}
	})

	for (let i = 0; i < remainingBlocks.length; i++) {
		await db.textBlock.update({
			where: {
				id: remainingBlocks[i].id
			},
			data: {
				position: i + 1 // Устанавливаем новую позицию
			}
		})
	}
}

export default deleteBlock
