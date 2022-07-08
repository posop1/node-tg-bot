const TelegramApi = require('node-telegram-bot-api');

const token = '5503019882:AAGQAjgMGFpCFSxNJ3J_oYQBdCtsc0tc-sM';

const bot = new TelegramApi(token, { polling: true });

const commands = `/info - команда хелпер
/start - начать сначала 
хуесос - сам ты хуесос`;

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  switch (text) {
    case '/start':
      await bot.sendMessage(chatId, 'Добрый день, чтобы узнать команды введи /info');
      break;
    case '/info':
      await bot.sendMessage(chatId, commands);
      break;
    case 'хуесос':
      await bot.sendMessage(chatId, 'Сам хуесос');
      break;
    default:
      await bot.sendMessage(chatId, 'Нет такой команды');
  }
});
