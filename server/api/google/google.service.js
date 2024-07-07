const { google } = require("googleapis")
const spreadSheetId = '1tHLz0PxS6rh5T0aQ-44XQgXCq66XHL5FuR0_5K6ZuM0'
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})
module.exports = {
    getRow: async (callback) => {
       try{
        
        const client = await auth.getClient();
        const googlesheets = google.sheets({ version: "v4", auth: client })
        const getRows = await googlesheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: spreadSheetId,
            range: "Sheet1"
        })
        return callback(null,getRows.data)
       }
       catch(error){
            callback(error)
       }
    },
    createRow: async (data,callback)=>{
        try{
            const client = await auth.getClient();
            const googlesheets = google.sheets({ version: "v4", auth: client })

            const write = await googlesheets.spreadsheets.values.append({
                auth:auth,
                spreadsheetId:spreadSheetId,
                range:"sheet1",
                valueInputOption:"USER_ENTERED",
                resource:{
                    values:data
                }
            })

            return callback(null,write)
           }
           catch(error){
                callback(error)
           }
    },
    updateRow: async (data, callback) => {
        try {
            const client = await auth.getClient();
            const googlesheets = google.sheets({ version: "v4", auth: client });
            const update = await googlesheets.spreadsheets.values.update({
                auth: auth,
                spreadsheetId: spreadSheetId,
                range: `Sheet1!A${data.rowIndex}:C${data.rowIndex}`,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: data.data
                }
            });

            return callback(null, update);
        } catch (error) {
            console.log(error)
            callback(error);
        }
     },
   
}