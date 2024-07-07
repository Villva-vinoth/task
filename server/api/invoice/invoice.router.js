const router = require("express").Router()
const {createInvoice} = require("./invoice.controller")

router.post('/createInvoice',createInvoice);
router.get()

module.exports = router