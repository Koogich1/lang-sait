"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
//import getCurrentFreeDates from "./current-week-free-hours";

const CurrentWeekFreeHours = async (currDayOfWeek: any) => {
  const user = await currentUser();

  if (!user?.email) {
    return { error: "Подключите почту" };
  }

  const userEmail = await getUserByEmail(user?.email);

  const teacherId = userEmail?.teacherId;

  if (!teacherId) {
    return;
  }

  if(!currDayOfWeek){
    return
  }

  //const currWeekDates = await getCurrentFreeDates("currDayOfWeek");

  //if(!currWeekDates){
    //return
  //}

  //if ('error' in currWeekDates) {
    return (
      <div>
        {//<p>{currWeekDates.error}</p>
        }
        привет
      </div>
    );
  }



export default CurrentWeekFreeHours