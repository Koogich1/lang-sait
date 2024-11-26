"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { courseData } from "@prisma/client";
import userUpdatePhofilePhoto from "./actionForS3/userUpdatePhofilePhoto";

export async function s3UpdateProfilePhoto(fileBuffer: Buffer, folderName: string, fileName: string, userId: string) {
    const user = await db.user.findFirst({
			where:{
				id: userId
			}
		})

    if (!user) {
        return;
    }

    try {
        const s3FilePath = `images/(${user.id})/avatar/`; // Обратите внимание на завершающий слеш
        const params = {
            Bucket: "langschoolacynberg",
            Key: s3FilePath + fileName,
            Body: fileBuffer, 
            ContentType: 'image/jpeg', // Указываем тип содержимого для MP3
        };

        await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully uploaded to " + params.Bucket + "/" + params.Key);
        const url = `https://storage.yandexcloud.net/${params.Bucket + "/" + params.Key}`
        console.log(url)
				const location = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        try{
					userUpdatePhofilePhoto(userId, url)
        }catch(e){
            console.log(e)
        }
        return { location }; // Возвращаем URL загруженного файла
    } catch (err) {
        console.log("Error", err);
        return false;
    }
}
