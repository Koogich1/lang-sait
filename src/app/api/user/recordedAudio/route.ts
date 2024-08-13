import { createS3recordedAudio } from "@/app/(main_page)/createCourses/components/actions/s3files/s3RecordedAudio";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData();
    
    const testId = data.get('testId') as string;
    const audioFile = data.get('audioFile') as Blob; // Получаем файл
    console.log('Получен файл:', audioFile);

    if (!audioFile) {
        return NextResponse.json({ success: false, error: "Аудиофайл не найден." }, { status: 400 });
    }

    const folderName = 'tests'; 
    const fileName = `audio_test_${Math.floor(Math.random() * (1000000 - 100 + 1)) + 100}`; 

    try {
        console.log("Я ЗАГРУЖАЮ");
        
        const arrayBuffer = await audioFile.arrayBuffer(); // Получаем содержимое как ArrayBuffer
        const buffer = Buffer.from(arrayBuffer);
        
        console.log("Теперь в S3 пихаю");

        const result = await createS3recordedAudio(buffer, folderName, fileName, testId);
        
        if (result) {
            return NextResponse.json({ success: true, fileUrl: result.location }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Ошибка загрузки файла в S3' }, { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
