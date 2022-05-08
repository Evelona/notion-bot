import { Client } from "@notionhq/client";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const token = "5077781602:AAFgGYVA5fafUbo9zT_epNgtZFFggNs64DI";

const bot = new TelegramBot(token, { polling: true });
const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text, links, date, author) {
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
                content: text.split(".")[0],
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
        Column: {
          select: {
            name: "to read",
          },
        },
        Date: {
          date: {
            start: date.toISOString(),
          },
        },
        Link: {
          url: links[0],
        },
      },

      children: [
        // {
        //   object: "block",
        //   type: "heading_2",
        //   heading_2: {
        //     text: [
        //       {
        //         type: "text",
        //         text: {
        //           content: text.split(".")[0],
        //         },
        //       },
        //     ],
        //   },
        // },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            text: [
              {
                type: "text",
                text: {
                  content: text.split(".")[0],
                  link: {
                    url: links[0],
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
    } else if (ent.type === "text_link") links.push(ent.url);
  });
  return links;
};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const date = new Date(msg.date * 1000);
  const author = `@${msg.from.username}`;
  // console.log("________NEW MESS______");
  const links = getLinksArr(msg);

  try {
    if (links.length < 1) throw new Error("Ссылки то нет");
    addItem(msg.text, links, date, author);
    bot.sendMessage(chatId, "Успешно добавил!");
    bot.sendMessage(chatId, "🐥");
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Сорри, произошла какая то ошибка: " + error.message
    );
  }
});
