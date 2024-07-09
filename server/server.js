const express = require("express")
const cors = require("cors")
const mysql = require("./database/db.config")
const googleRoute = require("./api/google/google.router")
const {createInvoices,createInvoiceTransaction}= require("./models/Invoices.model")
const invoiceRoute  = require("./api/invoice/invoice.router")
const app = express()

app.use(express.json())
app.use(cors())

mysql.getConnection((err, connection) => {
    if (err) {
        console.log(err)
    }
    if (connection) {
        console.log("connected to the sql")
        // createInvoices()
        // createInvoiceTransaction()

    }
})

app.get('/', async (req, res) => {
    res.send({
        message: "Home Active !",
    })
})
app.use('/api/google',googleRoute);
app.use('/api/invoice',invoiceRoute);

port = 3001
app.listen(port, () => {
    console.log(`server is listening on the port ${port}`)
})