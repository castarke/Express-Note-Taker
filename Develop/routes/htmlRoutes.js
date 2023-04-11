const path = require('path');
const router = require('express').Router();
// getting notes html page
router.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
// getting the index htmlpage
router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
// exporting html routes
module.exports = router;

