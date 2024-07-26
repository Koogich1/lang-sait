"use client"

import Header from "../_components/header"
import LearningBox from "../_components/learning/learningBox"

const SettingsPage = () => {

	return(
		<div className="h-[100%]">
			<div>
				<Header 
					header="Обучение"
				/>
				<LearningBox />
			</div>
		</div>
	)
}

export default SettingsPage