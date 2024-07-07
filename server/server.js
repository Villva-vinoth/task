const express = require("express")
const cors = require("cors")
const mysql = require("./database/db.config")
const { google } = require("googleapis")
const googleRoute = require("./api/google/google.router")
const app = express()

app.use(express.json())
app.use(cors())

mysql.getConnection((err, connection) => {
    if (err) {
        console.log(err)
    }
    if (connection) {
        console.log("connected to the sql")
    }
})

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const googlesheets = google.sheets({ version: "v4", auth: client })

    const spreadSheetId = '1tHLz0PxS6rh5T0aQ-44XQgXCq66XHL5FuR0_5K6ZuM0'

    const metaData = await googlesheets.spreadsheets.get({
        auth: auth,
        spreadsheetId: spreadSheetId
    })

    const getRows = await googlesheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1"
    })
    res.send({
        message: "Home Active !",
        data: getRows.data
    })
})

app.use('/api/google',googleRoute);


port = 3001
app.listen(port, () => {
    console.log(`server is listening on the port ${port}`)
})