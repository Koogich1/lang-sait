"use client"

import StartBlock from "./blocks/StartBlock";
import CaruselBlock from "./blocks/carusel";
import Courses from "./blocks/courses";
import Footer from "./footer";
import Programs from "./blocks/programs";
import Teachers from "./blocks/teachers";
import MainHeader from "./header";
import TimerTeacher from "../timerUpdate/updateTeacherClock";

export default function Home() {
  return (
    <div className="relative w-full">
    <MainHeader />
      <div className="flex z-50 justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0">
        <StartBlock />
        <Courses />
        <CaruselBlock />
        <Programs />
        {
          //<Teachers />
        }
      </div>
    </div>
  );
}
