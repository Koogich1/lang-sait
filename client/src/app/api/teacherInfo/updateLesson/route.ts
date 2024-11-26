import { createS3audio } from "@/app/(main_page)/createCourses/components/actions/createS3audio";
import { createS3courseImage } from "@/app/(main_page)/createCourses/components/actions/s3files/s3createCourse";
import { CreateS3normalImage } from "@/app/(main_page)/createCourses/components/actions/s3files/s3NormalImage";
import { s3UpdateCourseData } from "@/app/(main_page)/createCourses/components/actions/s3files/s3updateCourse";
import { s3UpdateLessonData } from "@/app/(main_page)/createCourses/components/actions/s3files/s3UpdateLessonData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData(); // Получаем данные формы
    const file = data.get('file') as File; // Приводим к типу File
		const name = data.get("name") as string;
		const id = data.get("id") as string;

    if (!file) {
        return NextResponse.json({ success: false, error: "Файл не найден." }, { status: 400 });
    }

    const folderName = 'courseImages'; // Замените на нужное имя папки
    const fileName = `course_${Math.floor(Math.random() * (1000000 - 100 + 1)) + 100}`; // Получаем имя файла
    const arrayBuffer = await file.arrayBuffer(); // Теперь TypeScript понимает, что `file` — это File
    const fileBuffer = Buffer.from(arrayBuffer);

    try {
        const result = await s3UpdateLessonData(fileBuffer, folderName, fileName, name, id);
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