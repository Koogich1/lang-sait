import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
	DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { HiOutlineCamera } from "react-icons/hi"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import {useDropzone} from 'react-dropzone';
import Image from "next/image"

const UploadFile = () => {
	const [active, setActive] = useState(false)

	const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      <Image
        src={'/'}
        alt={file.name}
        width={100}
        height={100}
      />
    </li>
  ));

 return(

	<Dialog>
      <DialogTrigger asChild>
				<Button
					className={`rounded-full w-full h-full flex items-center justify-center bg-[#699BD8] text-white transition-all duration-300 ${active ? "hover:bg-[#699BD8] scale-105" : ""}
					`}
					onMouseEnter={() => setActive(true)}
					onMouseLeave={() => setActive(false)}
					onClick={() => {}}
				>
					{active ? <HiOutlinePencilSquare className="text-4xl" /> : <HiOutlineCamera className="text-4xl" />}
				</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменение фото профиля</DialogTitle>
        </DialogHeader>
        <section className="container border h-[100px] rounded-lg border-dashed relative">
          <div {...getRootProps({className: 'dropzone'})} className="flex items-center w-full h-full">
            <input {...getInputProps()} />
            <p className="w-full h-full py-9">
              {isDragActive ? "Отпустите фото, чтобы загрузить его!" : "Перенесите фото, чтобы загрузить его!"}
            </p>
          </div>
          <aside className="block">
            <ul>{files}</ul>
          </aside>
        </section>
        <DialogFooter className="pt-10">
          <Button type="submit">Сохранить изменения</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
 )
}

export default UploadFile