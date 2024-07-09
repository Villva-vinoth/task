const pool = require("../../database/db.config")
const sql = require("../../database/db.config")

module.exports = {
    createInvoice: (data, callback) => {
        try {
            pool.query(`insert into invoice (invoice_name,address) values (?,?)`, [data.invoiceName,data.address], (err, result) => {
                if (err) {
                  return callback(err)
                }
                return callback(null,result)
               
            })
        }
        catch (error) {
            console.log(error)
        }
    },

    createTransactionInvoice :(data,callback) =>{
        console.log(data)
        pool.query(`insert into invoice_transaction (invoice_id,item_name,description,product_id,quantity,sub_total) values (?,?,?,?,?,?)`,
            [
                data.invoiceId,
                data.itemName,
                data.description,
                data.productId,
                data.quantity,
                data.subTotal
            ],
            (err,result)=>{
                if(err){
                    console.log(err)
                  return  callback(err)
                }
               return callback(null,result)
            }
        )
    },
    getInvoice:(callback)=>{
        pool.query(`select * from invoice where delete_flag=0 order by invoice_id desc`,(err,result)=>{
            if(err){
                console.log(err)
                return callback(err);
            }
            return callback(null,result);
        })
    },
    getInvoiceTransaction:(data,callback)=>{
        console.log(data)
        pool.query(`select * from invoice as i join invoice_transaction as  it on i.invoice_id = it.invoice_id and it.invoice_id=? and it.delete_flag=0 order by invoice_trans_id desc`,[data.invoiceId],(err,result)=>{
            if(err){
                console.log(err)
                return callback(err);
            }
            // console.log(result)
            return callback(null,result);
        })
    }
    

}