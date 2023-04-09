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
    const id = req.params.id;
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    const notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== id);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes));
    res.json({ msg: 'deleted successfully' });
  });

module.exports = router;