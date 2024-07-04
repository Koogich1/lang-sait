type Props={
	slot: any,
	id: number,
}

const SlotBlock = ({slot, id}: Props) => {
	return (
		<li key={id}>
			{slot.date}
		</li>
	)
}

export default SlotBlock