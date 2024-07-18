

const addLanguage = async(	
	language:string,
	languages: string[],
) => {
	let Newlanguages
	
	if(languages.includes(language)){
		Newlanguages = languages
	}else{
		Newlanguages = [...languages, language]
	}
	
}

export default addLanguage