"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { courseData } from "@prisma/client";
import addUrlForImagesTeacher from "./actionForS3/addUrlForImagesTeacher";

export async function s3AddGalaryPhoto(fileBuffer: Buffer, folderName: string, fileName: string, userId: string) {
    const user = await currentUser()
    if(!user){return}

    try {
        const s3FilePath = `images/(${user.id})/teacher/galery/`; // Обратите внимание на завершающий слеш
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
            addUrlForImagesTeacher(userId, url)
					//userUpdatePhofilePhoto(userId, url)
        }catch(e){
            console.log(e)
        }
        return { location }; // Возвращаем URL загруженного файла
    } catch (err) {
        console.log("Error", err);
        return false;
    }
}
