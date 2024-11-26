import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request:any) {
	
  try {
    const user = await currentUser()
    const usersInfo = await db.user.findMany({
      where:{
        NOT:{
          id: user?.id
        }
      }
    })
    return NextResponse.json(usersInfo);
  } catch (error) {
    console.error('Ошибка получения информации о всех пользователях из базы данных', error);
    return NextResponse.error();
  }

}