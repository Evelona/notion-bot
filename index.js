import { Client } from "@notionhq/client";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const token = "5077781602:AAFgGYVA5fafUbo9zT_epNgtZFFggNs64DI";

const bot = new TelegramBot(token, { polling: true });
const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text, author) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },

      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        Author: {
          rich_text: [
            {
              text: {
                content: author,
              },
            },
          ],
        },
      },

      children: [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            text: [
              {
                type: "text",
                text: {
                  content: "Lacinato kale",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            text: [
              {
                type: "text",
                text: {
                  content:
                    "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                  link: {
                    url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                  },
                },
              },
            ],
          },
        },
      ],
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

const getLinksArr = (msg) => {
  const links = [];
  msg.entities?.forEach((ent) => {
    if (ent.type === "url") {
      links.push(msg.text.slice(ent.offset, ent.offset + ent.length));
    }
  });
  return links;
};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const author = `@${msg.from.username}`;
  console.log("________NEW MESS______");
  console.log(msg);
  const links = getLinksArr(msg);
  console.log({ links });

  // bot.sendMessage(chatId, "А как назвать ?");

  try {
    // addItem(msg.text, author);
    bot.sendMessage(chatId, "Успешно добавил!");
    bot.sendMessage(chatId, "🐥");
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Сорри, произошла какая то ошибка: " + error.message
    );
  }
});
