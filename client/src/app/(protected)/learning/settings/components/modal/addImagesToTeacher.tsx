"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipLoader } from 'react-spinners';
import getTeacherById from '@/actions/getAllInfoAboutUser';

type Props = {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  teacherId: string | undefined;
  visov: () => void;
};

const AddImagesToTeacher = ({ open, setOpenModal, teacherId, visov }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [accept, setAccept] = useState(false);
  const [crop, setCrop] = useState<Crop | undefined>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const blobUrlRef = useRef<string>('');
  const [acceptCrop, setAcceptCrop] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<any | null>();
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAccept(true);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
      setCrop(undefined); // Обнуляем обрезку при выборе нового файла
    }
  };

  const fetchTeacher = async() => {
    const data = await getTeacherById();
    if (data) {
      setTeacher(data);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop({ unit: 'px', width: Math.min(400, width), height: Math.min(400, height) }, 1, width, height), 
      width, height
    );
    setCrop(newCrop);
  };

  const onDownloadCropClick = async () => {
    if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const offscreen = new OffscreenCanvas(completedCrop.width, completedCrop.height);
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // Масштабируем холст
    offscreen.width = completedCrop.width;
    offscreen.height = completedCrop.height;

    ctx.drawImage(
      previewCanvasRef.current,
      0,
      0,
      previewCanvasRef.current.width,
      previewCanvasRef.current.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({ type: 'image/png', quality: 1 }); // Максимальное качество
    if (blob) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      setCroppedImageUrl(blobUrlRef.current); // Устанавливаем обрезанное изображение
    }
    setAcceptCrop(true);
  };

  const canvasPreview = (image: HTMLImageElement, canvas: HTMLCanvasElement | null, crop: PixelCrop, width: number, height: number) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width; // Используем ширину обрезки для холста
    canvas.height = crop.height; // Используем высоту обрезки для холста

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  };

  useEffect(() => {
    if (completedCrop && imgRef.current) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, imgRef.current.naturalWidth, imgRef.current.naturalHeight);
    }
  }, [completedCrop]);

  const onSubmit = async () => { 
    console.log("start");
    setLoading(true);
    if (!teacherId) return;

    if (croppedImageUrl) {
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob(); // Получаем Blob из URL
      
      const formData = new FormData();
      formData.append("file", blob, "croppedImage.png"); // Добавляем файл в FormData
      formData.append("teacherId", teacherId);

      try {
        const response = await fetch('/api/teacher/addGalaryPhoto', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          console.log("Success");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        visov(); // Обновление данных
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Dialog open={loading} onOpenChange={setLoading}>
        <DialogContent className='w-[220px] h-[220px] flex flex-col items-center text-center justify-center'>
          <ClipLoader color='#835BD2' size={75}/>
          <div className='text-lg font-semibold text-[#835BD2]'>Обновление данных...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpenModal}>
      <DialogContent className="p-5">
        <DialogTitle className="text-[#835BD2]">
          Выберите изображение
        </DialogTitle>
        <DialogHeader>
          <div className="flex items-center gap-3 justify-between">
            {croppedImageUrl ? (
              <div className="flex justify-center relative rounded-full">
                <Image
                  src={croppedImageUrl}
                  alt="Обрезанное изображение"
                  className="object-cover h-full w-full "
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              selectedFile && (
                <Skeleton className="flex text-gray-400 font-semibold justify-center items-center text-center relative rounded-full object-cover h-[200px] w-[200px] bg-gray-100">
                  Обрежьте <br/> изображение
                </Skeleton>
              )
            )}
            {selectedFile ? 
              <Button onClick={() => {
                fileInputRef.current?.click();
                setAcceptCrop(false);
              }} className="w-1/2 h-12 text-base font-medium" variant={"violetSelect"}>
                Изменить изображение
              </Button>
              :
              <Button onClick={() => fileInputRef.current?.click()} variant={"violetSelect"} className="w-full h-20 border-[3px] border-[#835BD2]">
                Нажмите, чтобы выбрать
              </Button>
            }
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept="image/*"
          />
        </DialogHeader>
        {acceptCrop ? "" : 
          imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              className='max-h-[60vh] flex items-center justify-center'
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
                className='max-h-[500px]'
              />
            </ReactCrop>
          )}
        {completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              display: 'none',
            }}
          />
        )}
        <Button
          onClick={() => { setOpenModal(false) }}
          className='absolute right-0 m-4 mr-5 p-0 w-6 h-6 bg-red-500 hover:bg-red-600 text-white'
        >
          <IoCloseOutline className="text-white text-xl" />
        </Button>
       
        {acceptCrop ?
          <div className='mt-3 flex gap-2'>
            <Button
              variant={"shadow2"}
              className='w-1/2 bg-blue-400 text-white hover:bg-blue-500'
              onClick={() => {
                setAcceptCrop(false);
              }}
            >
              Изменить
            </Button>
            <Button 
              className='w-1/2 text-base font-medium'
              variant={"violetSelect"}
              onClick={onSubmit}
            >
              Добавить
            </Button>
          </div>
          : 
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onDownloadCropClick}
              disabled={!accept}
              variant={"violetSelect"}
              className='w-full'
            >
              Подтвердить
            </Button>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};

export default AddImagesToTeacher;
