"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sendCourseData from "../sendCourseData";
import createRasdel from "../createRasdel";
import { courseData } from "@prisma/client";
import updateRasdel from "../updateRasdel";

export async function S3UpdateRasdel(fileBuffer: Buffer, folderName: string, fileName: string, name: string, aboutCourse: string, rasdelId: string) {
    const user = await currentUser();

    if (!user) {
        return;
    }

    try {
        const s3FilePath = `courses/${user.id}/images/${folderName}/`; // Обратите внимание на завершающий слеш
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
			updateRasdel({ name: name, aboutRasdel: aboutCourse, photoUrl: question, rasdelId: rasdelId});
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
