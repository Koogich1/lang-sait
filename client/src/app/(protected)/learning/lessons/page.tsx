"use client"

import CurrentWeek from "@/app/(protected)/profile/_components/TimePicker/current-week"; 
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { DayOfWeek, TeacherAvailability } from "@prisma/client";
import FirstTimeChoosePage from "./firstTime/page";
import { Button } from "@/components/ui/button";
import getweeksFronDb from "../../profile/_components/TimePicker/getweeksFronDb";


const MyWeek = () => {
  const [loading, setLoading] = useState(true);
  const [aviability, setAviability] = useState<TeacherAvailability[]>([]);
  const [notCreated, setNotCreated] = useState(false);

  const findAnything = async () => {
    try {
      const data = await getweeksFronDb();
      if (data && data.length > 0) {
        setNotCreated(false);
        setAviability(data);
      } else {
        setNotCreated(true);
      }
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  useEffect(() => {
    findAnything();
    setLoading(false);
  }, []);


  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center">
        <div className="w-[150px] h-[150px] bg-white mt-[38vh] rounded-lg shadow-md flex justify-center items-center">
          <ClipLoader color="#835BD2" className="w-20 h-20" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {notCreated ? (
        <div>
          <FirstTimeChoosePage />
        </div>
      ) : (
        <div className="flex mt-5 w-full gap-5">
          <CurrentWeek freeDates={aviability} />
        </div>
      )}
    </div>
  );
}

export default MyWeek;
