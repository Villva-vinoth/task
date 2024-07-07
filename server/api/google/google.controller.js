const { getRow, createRow, updateRow } = require("./google.service")

module.exports = {
    getRow: (req, res) => {
        getRow((err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error !",
                    success: 0
                })
            }
            return res.status(200).json({
                message: "get successfull",
                success: 1,
                data:result
            })
        })
    },

    createRow: (req, res) => {
        const body = req.body.data
        createRow(body,(err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error !",
                    success: 0
                })
            }
            return res.status(200).json({
                message: "Added successfull",
                success: 1,
            })
        })
    },

    
    updateRow: (req, res) => {
        const body = req.body
        updateRow(body,(err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error !",
                    success: 0
                })
            }
            return res.status(200).json({
                message: "Updated successfull",
                success: 1,
            })
        })
    },
}