import { Application, User } from "@prisma/client";
import getUserAplication from "../actions/application/getUserApplication";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaArchive } from "react-icons/fa";
import Teacher from "./teacher";
import { Button } from "@/components/ui/button";
import { BsCheckAll } from "react-icons/bs";
import { FaArrowRight, FaCheck, FaInfo } from "react-icons/fa6";

type Props = {
  user: User;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} в ${hours}:${minutes}`;
};

const Applications = ({ user }: Props) => {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [filteredApplication, setFilteredApplication] = useState<Application[]>();
  const [filterType, setFilterType] = useState<string>("sended");
  const [isHover, setIsHover] = useState<boolean>(false)

  const filterAplication = (type: string) => {
    if (!applications) return;
  
    if (type === "sended") {
      setFilteredApplication(applications.filter((data) => data.senderId === user.id));
    } else if (type === "receiver") {
      setFilteredApplication(applications.filter((data) => data.senderId !== user.id));
    }
  
    setFilterType(type);
  };

  const fetchApplication = async () => {
    const data = await getUserAplication(user.id);
    if (data) {
      console.log(data)
      setApplications(data);
    }
  };

  const color = (data: Application) => {
    if (data.status === "accepted") {
      return "green-600";
    }
    if (data.status === "rejected") {
      return "red-500";
    }
    if (data.status === "waiting") {
      return "yellow-400";
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [filterType]); // вызов fetchApplication() каждый раз, когда filterType меняется

  if(!applications){
    return(
      <div>
        грузим
      </div>
    )
  }

  return (
    <ScrollArea className="w-full h-[290px] lg:h-[310px] shadow-sm border border-gray-100 rounded-lg mt-2">
      <div className="flex flex-col gap-3 rounded-lg m-1">
        <div className="flex gap-1 pb-1 justify-between">
          <Button
            className={`px-2 h-8 flex gap-2 w-[55%] shadow-none font-medium relative`}
            variant="violetSelect"
            onClick={() => {
              filterAplication("sended");
            }}
          >
            {applications?.filter((data) => data.senderId === user.id).length > 0 ? 
            <div className="absolute top-[-4px] right-[-4px]">
              <div className="text-xs w-4 h-4 pr-[1%] pt-[7%] text-green-600 font-semibold rounded-full bg-green-300 flex items-center justify-center">
                {applications?.filter((data) => data.senderId === user.id).length}
              </div>
            </div>
           : ""}
            <FaArrowRight className="" />
            <p>Отправленные</p>
          </Button>
          <Button
            className={`px-2 h-8 m-0 flex gap-1 w-[45%] justify-between relative`}
            variant="shadow2"
            onClick={() => {
              filterAplication("receiver");
            }}
          >
            {applications?.filter((data) => data.receiverId === user.id).length > 0 ? 
            <div className="absolute top-[-4px] right-[-4px]">
              <div className="text-xs w-4 h-4 pl-[1px] pt-[1px] text-green-800 font-semibold rounded-full bg-green-400 flex items-center justify-center">
                {applications?.filter((data) => data.receiverId === user.id).length}
              </div>
            </div>
           : ""}
            <FaCheck />
            <p>Полученные</p>
          </Button>
          <Button 
            className={`h-10 gap-1 flex items-center justify-center p-0 transition-all absolute bottom-0 right-0 m-1 border-2 border-gray-300 overflow-hidden ${isHover ? "px-2 w-[100px]" : "w-10"}`} variant="shadow2"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <FaArchive className={`text-lg font-medium ${isHover ? "" : "scale-120"}`} />
            {isHover && <p>Архив</p>}
          </Button>
        </div>
        {filteredApplication && filteredApplication.length > 0 ? (
          filteredApplication.map((data) => (
            <div className="border border-gray-200 h-20 rounded-lg relative flex justify-between items-center" key={data.id}>
              <div className="text-xs absolute top-0 bg-white mt-[-9px] text-gray-400 font-medium w-[115px] ml-2 flex items-center justify-center">
                {formatDate(data.date.toJSON())}
              </div>
              {data.format === "addTeacher" && (
                <div className="px-1 my-1 flex items-start flex-col pb-1">
                  <h1 className="font-semibold text-[#835BD2]">
                    Заявка на обучение
                  </h1>
                  <Teacher teacherId={data.receiverId} />
                </div>
              )}
              <div className="flex flex-col w-20 h-[4.9rem] items-center justify-center pb-1">
                <h1 className={`font-medium text-${color(data)}`}>Cтатус</h1>
                <div className={`w-12 h-12 border-[3px] rounded-lg flex items-center justify-center text-${color(data)} border-${color(data)}`}>
                  <p className="text-3xl">
                    {data.status === "waiting" ? "?" : data.status === "accepted" ? "!" : "x"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-[205px] flex flex-col items-center justify-center">
            <p>Уведомлений нет</p>
            <h1 className="text-5xl">🔔</h1>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Applications;
