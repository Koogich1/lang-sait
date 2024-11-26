"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

type TimeSlot = [string, string];
type TimeSlotsData = {
  [key: string]: TimeSlot[];
};

type DayKey = 'pn' | 'vt' | 'sr' | 'ct' | 'pt' | 'sb' | 'vs';

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const saveTeacherAvailability = async (timeSlotsData: TimeSlotsData) => {
  const user = await currentUser();

  if (!user) return; // Ensure the user is logged in

  const dbUser = await getUserById(user.id); // Await here

  // Check if dbUser returned a valid user object
  if (!dbUser) {
    console.error("User is missing or Teacher ID is undefined.");
    return;
  }

  const daysOfWeek: Record<DayKey, DayOfWeek> = {
    pn: DayOfWeek.MONDAY,
    vt: DayOfWeek.TUESDAY,
    sr: DayOfWeek.WEDNESDAY,
    ct: DayOfWeek.THURSDAY,
    pt: DayOfWeek.FRIDAY,
    sb: DayOfWeek.SATURDAY,
    vs: DayOfWeek.SUNDAY,
  };

  for (const key of Object.keys(timeSlotsData) as DayKey[]) {
    const slots = timeSlotsData[key];
    const day = daysOfWeek[key];

    // Flatten the time slots for saving with hourly slots
    const flattenedSlots: string[] = [];

    for (const slot of slots) {
      const startTime = timeToMinutes(slot[0]);
      const endTime = timeToMinutes(slot[1]);

      // Create one-hour slots
      for (let time = startTime; time < endTime; time += 60) {
        const slotStart = minutesToTime(time);
        const slotEnd = minutesToTime(time + 60);
        flattenedSlots.push(`${slotStart}-${slotEnd}`);
      }
    }

    // Output for debugging; replace with actual saving logic
    console.log({
      teacherId: dbUser.teacherId, // Now you can access teacherId safely
      day,
      timeSlots: flattenedSlots,
    });

    await db.teacherAvailability.create({
      data: {
        teacherId: dbUser.teacherId!,
        day: day,
        timeSlots: flattenedSlots,
      }
    });
  }
};

export default saveTeacherAvailability;
