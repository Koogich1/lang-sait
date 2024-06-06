import { Button } from "../../../../components/ui/button";
import Image from "next/image";

type Props = {
  courseName: string;
  courseLable: string;
  li1: string;
  li2: string;
  li3: string;
  gradient: boolean;
};

const Card = ({ courseName, courseLable, li1, li2, li3, gradient }: Props) => {
  return (
    <div
      className={`${gradient ? "w-[420px] h-[535px]" : "w-[380px] h-[500px]"} rounded-3xl shadow-xl mb-10 flex p-7 pt-[60px] flex-col justify-between mt-10 text-${gradient ? "[#fff]" : "[#3E236C]"} ${gradient ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "bg-[#DEDAF0] text-[]"}`}
    >
      <h1 className={`text-3xl font-bold`}>{courseName}</h1>
      <h3 className="font-semibold">{courseLable}</h3>
      <ul className="flex flex-col justify-around gap-5">
        <li className="flex items-start justify-start text-start">
          <Image
            className="h-[15px] w-[15px] mr-1 mt-1"
            src={`${gradient ? "/checkMark-white.png" : "/checkMark-purple.png"}`}
            alt="checkMark"
            width={300}
            height={300}
          />
          {li1}
        </li>
        <li className="flex items-start justify-start text-start">
          <Image
            className="h-[15px] w-[15px] mr-1 mt-1"
            src={`${gradient ? "/checkMark-white.png" : "/checkMark-purple.png"}`}
            alt="checkMark"
            width={300}
            height={300}
          />
          {li2}
        </li>
        <li className="flex items-start justify-start text-start">
          <Image
            className="h-[15px] w-[15px] mr-1 mt-1"
            src={`${gradient ? "/checkMark-white.png" : "/checkMark-purple.png"}`}
            alt="checkMark"
            width={300}
            height={300}
          />

          {li3}
        </li>
      </ul>
      <Button
        variant="cube"
        className={`w-[160px] h-[45px] bg-transparent border-[1px] shadow-none mb-10 ${gradient ? "bg-transparent border-[1px] border-[#fff]  text-[#fff] hover:bg-[#fff] hover:text-purple-600" : "hover:bg-purple-600 hover:text-[#fff]"}`}
      >
        Узнать больше
      </Button>
    </div>
  );
};
export default Card;
