import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request:any) {
	
  try {
    const user = await currentUser();
    const userInfo = await db.user.findFirst({
      where: {
        id: user?.id,
      },
    });
    console.log(userInfo);
    return NextResponse.json(userInfo);
  } catch (error) {
    console.error('Ошибка получения информации о пользователе из БД', error);
    return NextResponse.error();
  }

}