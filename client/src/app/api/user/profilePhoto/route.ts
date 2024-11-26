"use server"

import { createS3Rasdel } from "@/app/(main_page)/createCourses/components/actions/s3files/s3CreateRasdel";
import { s3UpdateProfilePhoto } from "@/app/(protected)/learning/components/s3Update/s3UpdatePropfilePhoto";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData(); // Получаем данные формы
    const file = data.get('file'); // Не приводим к типу File здесь 
    const userId = data.get('userId') as string;

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ success: false, error: "Файл не найден." }, { status: 400 });
    }

    const folderName = 'courseImages'; // Замените на нужное имя папки
    const fileName = `Avatar_${Math.floor(Math.random() * (1000000 - 100 + 1)) + 100}`; // Получаем имя файла

    const arrayBuffer = await file.arrayBuffer(); // Теперь TypeScript понимает, что `file` — это File
    const fileBuffer = Buffer.from(arrayBuffer);

    try {
        const result = await s3UpdateProfilePhoto(fileBuffer, folderName, fileName, userId);
        if (result) {
            return NextResponse.json({ success: true, fileUrl: result.location }); // Используем правильное свойство
        } else {
            return NextResponse.json({ success: false, error: 'Ошибка загрузки файла в S3' }, { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
