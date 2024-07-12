"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const updateUrlImgForUsers = async(fileName: string) => {
	const user = await currentUser()
      const imageUrl = `https://storage.yandexcloud.net/langschoolacynberg/images/${fileName}`

      const image = user?.image
      if(!user?.id){return}
      const userById = await getUserById(user?.id)
      if(!userById?.allUserImage){
        return
      }

      const updatedImages = [...userById?.allUserImage, imageUrl]
    

      if(image && image.toString().length > 20){
        
      }

      try{
        await db.user.update({
          where:{
            id: user?.id
          },
          data:{
            image: imageUrl,
            allUserImage: updatedImages,
          }
        })
        console.log("обновление успешно")
      } catch(e){
        console.log(e)
      }
}

export default updateUrlImgForUsers