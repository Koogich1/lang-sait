"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sendCourseData from "../sendCourseData";
import createLesson from "../../../watching/actions/createLesson";
import updateCustomLesson from "../../../watching/actions/updateCustomLesson";

export async function s3UpdateLessonData(fileBuffer: Buffer, folderName: string, fileName: string, name: string, id: string) {
    const user = await currentUser();

    if (!user) {
        return;
    }

    try {
        const s3FilePath = `lessons/${user.id}/images/${folderName}/`; // Обратите внимание на завершающий слеш
        const params = {
            Bucket: "langschoolacynberg",
            Key: s3FilePath + fileName,
            Body: fileBuffer, 
            ContentType: 'image/jpeg', // Указываем тип содержимого для MP3
        };

        await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully uploaded to " + params.Bucket + "/" + params.Key);
        const question = `https://storage.yandexcloud.net/${params.Bucket + "/" + params.Key}`
        console.log(question)
        
        try{
					updateCustomLesson({ id: id, name: name, photoUrl: question});
        }catch(e){
            console.log(e)
        }
        const location = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        return { location }; // Возвращаем URL загруженного файла
    } catch (err) {
        console.log("Error", err);
        return false;
    }
}
