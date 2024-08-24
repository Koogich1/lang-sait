import { s3UpdateOptionImage } from "@/app/(main_page)/createCourses/components/actions/s3files/s3UpdateOptionImage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData(); // Получаем данные формы
    const file = data.get('file'); // Получаем файл
    const testId = data.get('testId') as string; 
    const currOptionId = data.get('currOption') as string;

    if (!file || !(file instanceof File)) { // Проверка на наличие файла
        return NextResponse.json({ success: false, error: "Файл не найден." }, { status: 400 });
    }

    const folderName = 'images_option'; 
    const fileName = `option_${currOptionId}_${Math.floor(Math.random() * 1000000)}`; 
    // Используем arrayBuffer для получения данных файла
    const arrayBuffer = await file.arrayBuffer(); // Получаем ArrayBuffer
    const fileBuffer = Buffer.from(arrayBuffer); // Создаем Buffer из ArrayBuffer

		try {
			const result = await s3UpdateOptionImage(fileBuffer, folderName, fileName, testId, currOptionId);
			if (result) {
					return NextResponse.json({ success: true, fileUrl: result.location }); // Используем правильное свойство
			} else {
					return NextResponse.json({ success: false, error: 'Ошибка загрузки файла в S3' }, { status: 500 });
			}
	} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
			return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
	}

    return NextResponse.json({ success: true });
}
