"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const updateUrlImgForUsers = async(fileName: string) => {
	const user = await currentUser()
      const imageUrl = `https://storage.yandexcloud.net/langschoolacynberg/images/${fileName}`
      try{
        await db.user.update({
          where:{
            id: user?.id
          },
          data:{
            image: imageUrl
          }
        })
        console.log("обновление успешно")
      } catch(e){
        console.log(e)
      }
}

export default updateUrlImgForUsers