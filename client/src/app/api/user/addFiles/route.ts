import { createS3audio } from "@/app/(main_page)/createCourses/components/actions/createS3audio";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData(); // Получаем данные формы
    const file = data.get('file') as File; // Приводим к типу File
    const question = data.get('question'); // Извлекаем вопрос
		const testId = data.get('testId') as string;

    if (!file) {
        return NextResponse.json({ success: false, error: "Файл не найден." }, { status: 400 });
    }

    const folderName = 'tests'; // Замените на нужное имя папки
    const fileName = `audio_test_${Math.floor(Math.random() * (1000000 - 100 + 1)) + 100}`; // Получаем имя файла

    // Подготавливаем файл как Buffer
    const arrayBuffer = await file.arrayBuffer(); // Теперь TypeScript понимает, что `file` — это File
    const fileBuffer = Buffer.from(arrayBuffer);

    try {
        const result = await createS3audio(fileBuffer, folderName, fileName, testId);
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
