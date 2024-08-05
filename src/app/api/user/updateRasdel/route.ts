import { s3UpdateCourseData } from "@/app/(main_page)/createCourses/components/actions/s3files/s3updateCourse";
import { S3UpdateRasdel } from "@/app/(main_page)/createCourses/components/actions/s3files/s3UpdateRasdel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData(); // Получаем данные формы
    const file = data.get('file') as File; // Приводим к типу File
		const name = data.get("name") as string;
		const aboutCourse = data.get('aboutCourse') as string;
    const courseId = data.get("courseId") as string;

    if (!file) {
        return NextResponse.json({ success: false, error: "Файл не найден." }, { status: 400 });
    }

    const folderName = 'courseImages'; // Замените на нужное имя папки
    const fileName = `course_${Math.floor(Math.random() * (1000000 - 100 + 1)) + 100}`; // Получаем имя файла
    const arrayBuffer = await file.arrayBuffer(); // Теперь TypeScript понимает, что `file` — это File
    const fileBuffer = Buffer.from(arrayBuffer);

    try {
        const result = await S3UpdateRasdel(fileBuffer, folderName, fileName, name, aboutCourse, courseId);
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