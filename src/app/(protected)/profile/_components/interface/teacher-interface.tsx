"use client"

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const TeacherInterface = () => {
	const [selected, setSelected] = useState<Date>();
  return (
		<div className="mt-6">
			<DayPicker mode="single" selected={selected} onSelect={setSelected} className="bg-white rounded-xl shadow-lg p-3"/>
		</div>
	)
}

export default TeacherInterface