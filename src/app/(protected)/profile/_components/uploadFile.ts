"use server"

import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from "@/lib/s3Client"; // Импортируем s3Client
import sharp from "sharp"

const uploadFile = async (base64Data: string, s3FilePath: string, fileName: string) => {
  try {
    const buffer = Buffer.from(base64Data, 'base64');

		const outputBuffer = await sharp(buffer)
		.jpeg()
		.toBuffer()

    const params = {
      Bucket: "langschoolacynberg",
      Key: s3FilePath,
      Body: outputBuffer,
    };

    // Загрузка файла в бакет
    const upload = new Upload({
      client: s3Client, // Используем s3Client
      params
    });

    await upload.done();
    console.log("Файл успешно загружен");
    return true; // Для модульного тестирования
  } catch (err) {
    console.log("Ошибка загрузки файла:", err);
    return false; // Для модульного тестирования
  }
};

export default uploadFile;