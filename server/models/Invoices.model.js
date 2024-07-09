const sql = require("../database/db.config")

module.exports = {
    createInvoices : ()=>{
        const data = `
        create table if not exists invoice(
            invoice_id int auto_increment primary key,
            invoice_name varchar(100) not null,
            address varchar(500) not null,
            date timestamp default now(),
            delete_flag int default 0
        )
        `
        sql.query(data,(err,result)=>{
            if(err){
                console.log("error creating table invoice",err)
            }
            else{
                console.log("Table Invoice created !")
            }
        })
    },
    createInvoiceTransaction :()=>{
        const data = `
        create table if not exists invoice_transaction(
            invoice_trans_id int auto_increment primary key,
            item_name varchar(500) not null,
            description text not null,
            product_id varchar(100) not null,
            quantity int not null,
            sub_total float not null,
            invoice_id int references invoice(invoice_id),
            create_at timestamp default now(),
            delete_flag int default 0

        )
        `

        sql.query(data,(err,result)=>{
            if(err){
                console.log("error creating the table invoice Transaction",err)
            }
            else{
                console.log("Table Invoice Transaction Created !")
            }
        })
    }
}