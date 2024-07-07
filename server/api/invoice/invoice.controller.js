const {createInvoice} = require('./invoice.service')

module.exports= {
    createInvoice:(req,res)=>{
        const body = req.body
        createInvoice(body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    message:"Database Connection Error",
                    success:0
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    }
}