'use server'

import { db } from "@/lib/db"

type Props = {
    user: string,     // Ожидаем, что user это строка (ID пользователя)
    teacherId: string
}

const getTeacherSubs = async({ user, teacherId }: Props) => {
    // Выполняем запрос на поиск подписок
    const userSubscriptions = await db.userSubscriptions.findFirst({
        where: {
            userId: user,              // Здесь user - это строка, ID пользователя
            teacherId: teacherId
        }
    })

    return userSubscriptions
}

export default getTeacherSubs
