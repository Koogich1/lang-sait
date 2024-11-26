import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const getConversations = async () => {
  const user = await currentUser();
  if (!user) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        users: { select: { id: true} }, // Выбрать только id, имя и аватар 
        messages: {
          take: 10, // Ограничить количество сообщений
          orderBy: { createdAt: 'desc' }, // Сортировать по дате создания
          include: {
            sender: { select: { id: true, name: true, image: true } },
            seen: true, // Выбрать все поля для seen
          },
        },
      },
    });
    return conversations;
  } catch (error: any) {
    console.error('Ошибка при получении бесед:', error); // Записываем ошибку в лог
    return []; 
  }
};

export default getConversations;