const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
const { sectoken } = require('./token');

const token = sectoken;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async chatId => {
  await bot.sendMessage(chatId, 'Бот загадывает цыфру от 0 до 9 и ты должен её отгадать.');

  const randomNumber = Math.floor(Math.random() * 10);

  chats[chatId] = randomNumber;

  await bot.sendMessage(chatId, 'Отгадывай)', gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Запуск бота' },
    { command: '/info', description: 'Информация о пользователе' },
    { command: '/game', description: 'Игра' },
  ]);

  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    switch (text) {
      case '/start':
        await bot.sendMessage(
          chatId,
          `Здарова ${msg.chat.first_name} ${msg.chat.last_name}, чтобы получить информацию о себе введи /info, а если хочешь сыграть в игру введи /game.`,
        );
        break;

      case '/info':
        await bot.sendMessage(chatId, `Тебя чё реально зовут ${msg.chat.first_name} ?`);
        break;

      case '/game':
        startGame(chatId);
        break;

      default:
        await bot.sendMessage(chatId, 'Нет такой команды.');
    }
  });

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      startGame(chatId);
    }

    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, `Ты угадал! Цыфра ${chats[chatId]}`, againOptions);
    } else {
      return await bot.sendMessage(
        chatId,
        `К сожалению ты не угадал, бот загадал цыфру ${chats[chatId]}`,
        againOptions,
      );
    }
  });
};

start();
