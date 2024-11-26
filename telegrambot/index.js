const TelegramBot = require('node-telegram-bot-api');
const getUserByTelegramId = require('./lib/getUserByTelegramId.ts')

const bot = new TelegramBot("7307767407:AAEGOhSWH01Cu1BRlh0Arvxs7DFntBILQVI", {polling: true});


bot.on("message", async msg => {
  const chatId = msg.chat.id
  const user = await getUserByTelegramId(msg.from.id);
  if (user) {
    bot.sendMessage(chatId, `Имя пользователя: ${user.name}`);
  } else {
    bot.sendMessage(chatId, "Пользователь не найден");
  }
})

