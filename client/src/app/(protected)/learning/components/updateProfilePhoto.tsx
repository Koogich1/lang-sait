import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import uploadFile from '@/lib/file-storage'
import userImg from '@/actions/getImageUser'
import updateUrlImgForUsers from '@/actions/testServerUpdateUrl'
import { User } from '@prisma/client'
import { currentUser } from '@/lib/auth'

import _ from "lodash"

const UpdateProfilePhoto = () => {
	const [fileUpload, setFileUpload] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
	const [accept, setAccept] = useState(false)
	const [open, setOpen] = useState(false)

	const [user, setUser] = useState<User | null>(); 

	useEffect(() => {
		const fetchUser = async() => {
			const user = await currentUser()
			if(user){
				setUser(user)
			}
		}
		fetchUser()
	}, [])

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
			setAccept(true)
			setOpen(true)
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
				if(!user?.id){
					return
				}
				const randNum = _.random(1000, 20000)
        const base64Data = reader.result as string; // Получаем base64 строку
        uploadFile(base64Data, "images/", `avatar_${user?.id + randNum}.jpg`) // Вставьте имя файла
          .then((response) => {
						if(!user.id){
							return
						}
            console.log('Файл успешно загружен:', response);
            setFileUpload(`Файл успешно загружен`);
            setFileName(`avatar_${user?.id + randNum}.jpg`);
          })
          .catch((error) => {
            console.error('Ошибка при загрузке файла:', error);
            setFileUpload(`Ошибка при загрузке файла "avatar.jpg"`);
          });
      }
    };
    reader.readAsDataURL(selectedFile);
  };
	
  useEffect(() => {
    if (fileName) {
      const updateProfilePhoto = async () => {
        await updateUrlImgForUsers(fileName);
      }
      updateProfilePhoto();
    }
  }, [fileName]);

  useEffect(() => {
    const fetchUserImage = async () => {
      const img = await userImg();
      if (!img) {
        return
      }
      setUrl(img)
    }
    fetchUserImage();
  }, [])


	return (
		<div className="w-[30%] flex flex-col items-center justify-start">
				<h1 className="text-lg font-semibold text-gray-600 text-center">Изображение профиля</h1>
					<div className="w-[70%] h-auto mt-3 p-0">
						{url && <img src={url} alt="Profile Picture" className="w-full h-full rounded-full"/>}
					</div>
					<Button
						className="text-sm font-semibold p-5 mt-3"
						variant='shadow2'
						onClick={() => setOpen(true)}
					>
						Редактировать
					</Button>
					
					<Dialog open={open}>
						<DialogContent className="p-5">
							<DialogTitle>
								Выберете изображение
							</DialogTitle>
							<DialogHeader className="relative items-center justify-center">
								<h1>{fileUpload && <p className="font-extrabold">{fileUpload}</p>}</h1>
								<Input type="file" onChange={onFileChange} className="w-full transition-all h-20 border-2 border-dashed cursor-pointer hover:border-solid hover:border-[#835BD2]"/>
							</DialogHeader>
							{selectedFile && (
								<div className="flex justify-center relative">
									<img
										src={URL.createObjectURL(selectedFile)}
										alt="Выбранное изображение"
										className="object-cover h-[300px] w-[300px] rounded-full"
									/>
								</div>
							)}
							<Button
								onClick={() => {setOpen(false)}}
								className='absolute right-0 m-5 h-8 w-3 bg-red-500 hover:bg-red-600'
							>
								X
							</Button>
							<div className={`flex gap-3 justify-end}`}>
								<Button 
								onClick={handleUpload}
								disabled={accept ? false : true}
								>
									Подтвердить
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
	)
}

export default UpdateProfilePhoto