const TelegramBot = require("node-telegram-bot-api");
const token = "5077781602:AAFgGYVA5fafUbo9zT_epNgtZFFggNs64DI";

const bot = new TelegramBot(token, { polling: true });

const startKeyboard = [
  [{ text: "Хочу номер", callback_data: "number" }],
  [{ text: "Хочу адрес", callback_data: "adress" }],
];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет :)", {
    // прикрутим клаву
    reply_markup: {
      inline_keyboard: startKeyboard,
    },
  });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const img = "kek.JPG";

  if (img) {
    bot.sendPhoto(chatId, img, {
      reply_markup: {
        inline_keyboard: startKeyboard,
      },
    });
  }
});

//Token --- secret_iVfBoZJSqXsQTZbKdb1x7nIml5Yq9U1fYzn92UB9ddO
// database id --- c84ecc00bd684cdc87e94944e6669279?v=a97c8ecb823b439a8c5a1c5d7b57a998

// const TelegramBot = require("node-telegram-bot-api"); // подключаем node-telegram-bot-api

// const token = "5077781602:AAFgGYVA5fafUbo9zT_epNgtZFFggNs64DI"; // тут токен кторый мы получили от botFather

// // включаем самого обота
// const bot = new TelegramBot(token, { polling: true });

// //конфиг клавиатуры
// const keyboard = [
//   [
//     {
//       text: "Хочу кота", // текст на кнопке
//       callback_data: "moreKeks", // данные для обработчика событий
//     },
//   ],
//   [
//     {
//       text: "Хочу песика",
//       callback_data: "morePes",
//     },
//   ],
//   [
//     {
//       text: "Хочу проходить курсы",
//       url: "https://htmlacademy.ru/continue", //внешняя ссылка
//     },
//   ],
// ];

// // обработчик события присылания нам любого сообщения
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

//   // отправляем сообщение
//   bot.sendMessage(chatId, "Привет, Друг! чего хочешь?", {
//     // прикрутим клаву
//     reply_markup: {
//       inline_keyboard: keyboard,
//     },
//   });
// });

// // обработчик событий нажатий на клавиатуру
// bot.on("callback_query", (query) => {
//   const chatId = query.message.chat.id;

//   let img = "";

//   if (query.data === "moreKeks") {
//     // если кот
//     img = "kek.JPG";
//   }

//   if (query.data === "morePes") {
//     // если пёс
//     img = "kek.JPG";
//   }

//   if (img) {
//     bot.sendPhoto(chatId, img, {
//       // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard,
//       },
//     });
//   } else {
//     bot.sendMessage(chatId, "Непонятно, давай попробуем ещё раз?", {
//       // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard,
//       },
//     });
//   }
// });
