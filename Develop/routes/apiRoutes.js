const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')

router.get('/notes',(req,res)=>{
  let data = fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf8');
    res.send(JSON.parse(data))
})

router.post('/notes', (req,res)=>{
    let data = fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf8');
    let notes = JSON.parse(data);
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id:uuidv4()
    };
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json') ,JSON.stringify(notes));
    res.send(newNote);
})

router.delete('/notes/:id', (req, res) => {
    const id = uuidv4(req.params.id);
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    const notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== id);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes));
    res.json({ msg: 'deleted successfully' });
  });

// router.delete('/notes/:id' ,  (req, res)=>{
//         let id = req.params.id;
//         let data =readFromFile('../db/db.json');
//         let notes = JSON.parse(data);
//         let newNotes = notes.filter((notes) => notes.id !== id);
//        writeToFile('../db/db.json', JSON.stringify(newNotes))
//         res.json({msg: 'deleted successfully'})
//     })


//fs readfile to get the currernt array of objects
//parse old array
//get new object from req.body
//push new object to old array
//strigify new array
//fs write file with new array
//res.send new array 


module.exports = router;