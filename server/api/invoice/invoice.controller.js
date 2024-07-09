const { createInvoice, createTransactionInvoice, getInvoice, getInvoiceTransaction } = require('./invoice.service')

module.exports = {
    createInvoice: (req, res) => {
        const body = req.body
        createInvoice(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Connection Error",
                    success: 0
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    createTransactionInvoice: (req, res) => {
        const body = req.body
        createTransactionInvoice(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Connection Error",
                    success: 0
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    getAllInvoice: (req, res) => {
        getInvoice((err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Connection Error",
                    success: 0,
                })
            }
            return res.status(200).json({
                data: result,
                success: 1,
            })
        })

    },
    getInvoiceTransaction: (req, res) => {
        const body = req.params;
        getInvoiceTransaction(body,(err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Connection Error",
                    success: 0,
                })
            }
            return res.status(200).json({
                data: result,
                success: 1,
            })
        })
    }

}