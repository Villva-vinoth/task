const pool = require("../../database/db.config")
const sql = require("../../database/db.config")

module.exports = {
    createInvoice: (data, callback) => {
        try {
            sql.query(`select count(*) from invoice`, (err, result) => {
                if (err) {
                    callback(err)
                }
                let len = result.length + 1
                len = len.padStart(4, "0")
                console.log(len)
                pool.query(`insert into invoice (invoice_id) values (?)`, [len], (err, result) => {
                    if (err) {
                        callback(err)
                    }
                    pool.query(`insert into invoiceTransaction (invoice_id,itemName,description,productId,quantity,subTotal) values (?,?,?,?,?,?)`,
                        [
                            len,
                            data.itemName,
                            data.description,
                            data.productId,
                            data.quantity,
                            data.subTotal
                        ],
                        (err,result)=>{
                            if(err){
                                callback(err)
                            }
                            callback(null,result)
                        }
                    )
                })
            })

        }
        catch (error) {
            console.log(error)
        }
    },

    

}