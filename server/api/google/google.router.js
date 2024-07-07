const router = require("express").Router()
const {getRow, createRow, updateRow} = require("./google.controller")

router.get('/getSheetData',getRow);
router.post('/createSheetData',createRow);
router.put('/updateSheetData',updateRow);

module.exports = router