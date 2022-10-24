import telegramBot from 'node-telegram-bot-api'


const TOKEN = "5592434254:AAH78eGP8A_GaHjGJ1PcwlauqBNu0OS8VQ0"

const bot = new telegramBot(TOKEN, { polling: true })

bot.setMyCommands([
    { command: '/info', description: 'info about account' },
    { command: '/start', description: 'info about account' },
    { command: '/game', description: 'bots game' },
])


const chats = {}
const gameOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }, { text: '3', callback_data: '3' }]

        ]
    })
}





const gameStart = async (chatId) => {
    function ass(max) {
        return Math.floor(Math.random() * max) + 1;
    }
    chats[chatId] = ass(3)
    await bot.sendMessage(chatId, "Отгадай число от 1 до 3", gameOption) // число загаданно
}





const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === "/info") {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name},
    Твоя Фамилия ${msg.chat.last_name}`)
        }
        if (text === "/start") {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4a4/f28/4a4f2880-e005-3f8f-ab47-2bb189e7d263/192/29.webp')
        }
        if (text === "/game") {
            return gameStart(chatId)
        }
        if (text !== 1 && 2 && 3) {
            return bot.sendMessage(chatId, msg.text.split('').reverse().join(''))
        }
        console.log([msg])
        return bot.sendMessage(chatId, msg.text.split('').reverse().join(''))

    })

    bot.on('callback_query', async msg => {
        const dataChat = msg.data
        const chatId = msg.message.chat.id


        if (dataChat == chats[chatId]) {
            return bot.sendMessage(chatId, `you win ${chats[chatId]}`)
        } else {
            bot.sendMessage(chatId, `you loss`)
        }
        console.log(msg)
        console.log(chats[chatId])
        console.log(dataChat)

    })
}




start()
