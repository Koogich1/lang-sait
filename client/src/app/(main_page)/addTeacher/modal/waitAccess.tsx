"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoClose } from "react-icons/io5";
import { ClimbingBoxLoader } from "react-spinners";
import { useEffect, useRef } from "react";
import { FcApproval } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  access: boolean;
	visov: () => void
}

const WaitAccess = ({ setOpenModal, openModal, access, visov}: Props) => {
  const router = useRouter();
  const accessRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (accessRef.current) {
      gsap.fromTo(accessRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 });
    }
    visov();
  }, [access, visov]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-[350px] h-[350px]">
        <DialogHeader>
          {access ? 
            <div ref={accessRef} className="w-full h-[300px] flex items-center justify-between flex-col gap-5">
              <DialogTitle className="text-3xl text-green-600 font-medium">
                Заявка отправлена!
              </DialogTitle>
              <DialogDescription className="text-center flex flex-col items-center justify-center">
                <FcApproval className="text-5xl size-[100px]"/>
                <span className="text-green-600">
                  Пока ожидаете прием заявки, можете посмотреть свободные часы у преподавателя, записаться на ознакомительное занятие!
                </span>
              </DialogDescription>
              <div className="w-full flex gap-2 mt-2">
                <Button 
                  className="w-1/2" 
                  variant={"shadow2"}
                  onClick={() => {setOpenModal(false)}}
                >
                  Вернуться
                </Button>
                <Button 
                  className="w-1/2 bg-green-600 hover:bg-green-700" 
                  variant={"violetSelect"}
                  onClick={() => {
                    router.push("/profile/user")
                  }}
                >
                  Перейти
                </Button>
              </div>
            </div>
          : 
            <div className="w-full h-[280px] flex items-center justify-center flex-col gap-5">
              <DialogTitle className="text-3xl text-[rgb(131,91,210)] font-medium">
                Отправка заявки...
              </DialogTitle>
              <DialogDescription>
                <ClimbingBoxLoader color="#835BD2" size={20}/>
              </DialogDescription>
            </div>
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default WaitAccess;