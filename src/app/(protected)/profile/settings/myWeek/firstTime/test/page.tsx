"use client"

import { useCallback, useEffect, useState } from "react";
import uploadFile from "@/lib/file-storage";
import updateUrlImgForUsers from "./testServerUpdateUrl";
import { currentUser } from "@/lib/auth";
import { ExtendedUser } from "@/next-auth";
import { getUserById } from "@/data/user";
import userImg from "./getImageUser";


const Page = () => {
  const [fileUpload, setFileUpload] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [url, setUrl] = useState<string>("");


  const onDrop = useCallback((files: FileList) => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const fName = `avatar_${user?.id}`;
    const s3FilePath = `images/${fName}`;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        const base64Data = reader.result.toString();

        uploadFile(base64Data, s3FilePath, fName)
          .then((response) => {
            // Обработка успешной загрузки
            console.log('Файл успешно загружен:', response);
            setFileUpload(`Файл "${fName}" успешно загружен`);
            setFileName(fName); // Обновляем состояние переменной fileName
          })
          .catch((error) => {
            // Обработка ошибки загрузки
            console.error('Ошибка при загрузке файла:', error);
            setFileUpload(`Ошибка при загрузке файла "${fName}"`);
          });
      }
    };
  }, []);

  useEffect(() => {
    if (fileName) {
      const updateProfilePhoto = async() => {
        await updateUrlImgForUsers(fileName);
      }
      updateProfilePhoto();
    }
  }, [fileName]);

  useEffect(() => {
		const fetchUser = async () => {
			try{
         const user = await currentUser();
         console.log(user);
         if(!user){return}
         setUser(user)
        } catch(e){
          console.log(e)
        }
	  	};
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchUserImage = async () => {
      const img = await userImg();
      if(!img){
        return
      }
      setUrl(img)
    }
    fetchUserImage();
  }, [])

  return (
    <div>
      <input type="file" onChange={(e) => {
        if (e.target.files) { 
          onDrop(e.target.files);
        }
      }} /> 
      <h1>{fileUpload && <p className="font-extrabold">{fileUpload}</p>}</h1>
      <h1>{user?.name}</h1>
    </div>
  );
};

export default Page;