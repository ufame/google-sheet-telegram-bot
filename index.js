import { Telegraf } from 'telegraf';
import { getApiClient } from './google/api.google.js';
import { getValuesData } from './google/data.google.js';

import 'dotenv/config';

const TelegramBot = new Telegraf(process.env.BOT_TOKEN);

const findContains = (sheet, message) => {
    const containClients = sheet.data[0].rowData.filter(row => row.values[0].formattedValue.indexOf(message) !== -1);

    return containClients;
}

const StartBot = async () => {
    try {
        const range = process.env.RANGE;
        const apiClient = await getApiClient();
        const [ sheet ] = await getValuesData(apiClient, range, process.env.SPREADSHEETID);

        TelegramBot.on('text', async ctx => {
            const message = ctx.message.text;
            const foundedClients = findContains(sheet, message);

            if (foundedClients.length <= 0) {
                return ctx.replyWithMarkdown(`По ключу \`${message}\` ничего не найдено.`);
            }

            let telegramAnswer = '\0';

            foundedClients.every((element, index) => {
                telegramAnswer += `${index + 1}. ${element.values[0].formattedValue}\n\n`;

                return (index + 1) < 5;
            });

            ctx.reply(`Найдено:\n\n${telegramAnswer}`);
        })
    } catch (err) {
        console.log(err);
    }
}

StartBot().then(() => TelegramBot.launch());