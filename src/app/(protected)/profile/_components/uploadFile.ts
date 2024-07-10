
import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from "@/lib/s3Client";

const uploadFile = async (file: File, s3FilePath: string, fileName: string) => {
  try {
    const params = {
        Bucket: "langschoolacynberg",
        Key: s3FilePath,
        Body: file, 
    };

    // Загрузка файла в бакет
    const upload = new Upload({
        client: s3Client,
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

