"use server"

import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFile = async (base64Data: string, s3FilePath: string, fileName: string) => {
  try {
    // Преобразование base64 в Buffer
    const buffer = Buffer.from(base64Data.split(",")[1], 'base64');

    const params = {
      Bucket: "langschoolacynberg",
      Key: s3FilePath + fileName,
      Body: buffer, 
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

export default uploadFile;