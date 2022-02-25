import { Client } from "@notionhq/client";
import TelegramBot from "node-telegram-bot-api";

// const TelegramBot = require("node-telegram-bot-api");
const token = "5077781602:AAFgGYVA5fafUbo9zT_epNgtZFFggNs64DI";

const bot = new TelegramBot(token, { polling: true });
const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text, author) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: "c84ecc00bd684cdc87e94944e6669279",
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
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

const getLink = (msg) => msg.entities.find((ent) => "url" in ent).url;

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const author = `@${msg.from.username}`;
  console.log(msg);
  // const link = getLink(msg);

  addItem(msg.text, author);
  bot.sendMessage(chatId, "Привет :)");
});
