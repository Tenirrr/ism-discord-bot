const { Client, GatewayIntentBits, Events } = require("discord.js")
const express = require('express')
const moment = require("moment")

const pool = require("./pool")
require("./discord-bot")

const app = express()
const port =  process.env.PORT || 3000

app.get('/', async (req, res) => {
    var responseJSON = {
        status: "",
        wynik: ""
    }

    if (typeof req.query.data === "string") {
        try {
            const date = req.query.data
            const dateParse = await moment(date)

            const day = dateParse.date()
            const month = dateParse.month() + 1
            const year = dateParse.year()

            const promisePool = pool.promise()
            const [rows, fields] = await promisePool.query("SELECT discord_id AS u, discord_username AS n, messages AS c FROM discord_activity WHERE day = ? AND month = ? AND year = ?;", [day, month, year])

            responseJSON.status = "SUKCES"

            if (rows.length > 0) {
                responseJSON.wynik = rows
            } else {
                responseJSON.wynik = "BRAK_WYNIKOW_DLA_DNIA"
            }

            return res.json(responseJSON)
        } catch (e) {
            console.error(`Error: ${e}`)
            responseJSON.wynik = "BLAD"
            return res.json(responseJSON)
        }
    } else {
        responseJSON.wynik = "BLAD"
        return res.json(responseJSON)
    }
})

app.listen(port, () => {
    console.log('Web server started on port: ' + port)
});