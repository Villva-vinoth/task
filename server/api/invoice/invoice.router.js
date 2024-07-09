const router = require("express").Router()
const {createInvoice, createTransactionInvoice, getAllInvoice, getInvoiceTransaction} = require("./invoice.controller")

router.post('/createInvoice',createInvoice);
router.post('/createInvoiceTransaction',createTransactionInvoice);
router.get('/getAllInvoice',getAllInvoice);
router.get('/getInvoiceTransaction/:invoiceId',getInvoiceTransaction);

module.exports = router