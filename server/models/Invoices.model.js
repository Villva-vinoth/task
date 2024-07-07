const sql = require("../database/db.config")

module.exports = {
    createInvoices : ()=>{
        const data = `
        create table if not exists invoice(
            invoice_id int primary key,
            date timestamp default now()
        )
        `
        sql.query(data,(err,result)=>{
            if(err){
                console.log("error creating table invoice")
            }
            else{
                console.log("Table Invoice created !")
            }
        })
    },
    createInvoiceTransaction :()=>{
        const data = `
        create table if not exists invoiceTransaction(
            invoice_trans_id int auto_increment primary key,
            itemName varchar(500) not null,
            description text not null,
            productId varchar(100) not null,
            quantity int not null,
            subTotal float not null,
            invoice_id int reference invoice(invoice_id),
            create_at timestamp default now()
        )
        `

        sql.query(data,(err,result)=>{
            if(err){
                console.log("error creating the table invoice Transaction")
            }
            else{
                console.log("Table Invoice Transaction Created !")
            }
        })
    }
}