"use server";

import { currentUser } from "@/lib/auth";
import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const MAX_SIZE_BYTES = 150 * 1024; // 150 КБ

const createS3photo = async (base64Data: string, folderName: string, fileName: string) => {
	const user = await currentUser()

	if(!user){
		return
	}

  try {
    const buffer = Buffer.from(base64Data.split(",")[1], 'base64');

    const jpegBuffer = await sharp(buffer)
      .jpeg() // Преобразуем в JPEG
      .toBuffer(); 

    const compressedBuffer = await compressImage(jpegBuffer);

    // Формируем путь с добавленной "папкой"
    const s3FilePath = `courses/${user.id}/${folderName}/`; // Обратите внимание на завершающий слеш
    const params = {
      Bucket: "langschoolacynberg",
      Key: s3FilePath + fileName,
      Body: compressedBuffer, 
      ContentType: 'image/jpeg',
    };

    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " +
      params.Key +
      " and uploaded it to " +
      params.Bucket +
      "/" +
      params.Key
    );

    return results; 
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

const compressImage = async (buffer: Buffer) => {
  let compressedBuffer = buffer; // Начальное значение
  let sizeInBytes = compressedBuffer.length;

  while (sizeInBytes > MAX_SIZE_BYTES) {
    // Сжимаем изображение
    compressedBuffer = await sharp(compressedBuffer)
      .resize(null, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    sizeInBytes = compressedBuffer.length;

    // Ожидаем, чтобы избежать перегрузки процессора
    await new Promise(resolve => setTimeout(resolve, 10)); 
  }

  return compressedBuffer;
};

export default createS3photo;