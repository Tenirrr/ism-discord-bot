const {Client, GatewayIntentBits, Events} = require("discord.js")
const pool = require("./pool")

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on(Events.ClientReady, () => {
    console.log("Discord bot connected to the server!")
})

client.on(Events.MessageCreate, async (message) => {
    try {
        const promisePool = pool.promise()
        const date = new Date()

        const dateObj = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        }

        if (message.author.globalName !== null && message.author.id !== null && message.author.bot === false && message.author.system === false && message.content.length > 0 && message.guildId === process.env.GUILD_ID) {
            const [recordExist, fieldExist] = await promisePool.query("SELECT * FROM discord_activity WHERE discord_id = ? AND day = ? AND month = ? AND year = ?;", [message.author.id, dateObj.day, dateObj.month, dateObj.year])

            if (recordExist.length === 0) {
                await promisePool.query("INSERT INTO discord_activity (discord_id, discord_username, day, month, year) VALUES (?, ?, ?, ?, ?);", [message.author.id, message.author.globalName, dateObj.day, dateObj.month, dateObj.year])
                console.log(`No record for user: ${message.author.globalName} with ID: ${message.author.id} at ${dateObj.day}-${dateObj.month}-${dateObj.year}. CREATED!`)
            }

            await promisePool.query("UPDATE discord_activity SET messages = messages + 1, messages_length = messages_length + ? WHERE discord_id = ? AND day = ? AND month = ? AND year = ?", [message.content.length, message.author.id, dateObj.day, dateObj.month, dateObj.year])
        }
    } catch (e) {
        console.error(`Error: ${e}`)
    }
})

pool.query("CREATE TABLE IF NOT EXISTS `discord_activity` (`day` tinyint(3) UNSIGNED DEFAULT 0, `month` tinyint(3) UNSIGNED DEFAULT 0, `year` smallint(6) DEFAULT 0, `discord_id` bigint(20) UNSIGNED DEFAULT 0, `discord_username` varchar(32) DEFAULT 'anonymous', `messages` bigint(20) UNSIGNED DEFAULT 0, `messages_length` bigint(20) UNSIGNED DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;", (err, result) => {
    if (err) {
        console.error(`Error: ${err}`)
    } else {
        if (result.warningStatus === 0) {
            console.log("The table was created because it did not exist.")
        }
        client.login(process.env.DISCORD_TOKEN)
    }
})