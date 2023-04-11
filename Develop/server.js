// importing files and setting up a port
const express = require('express');
const api = require('./routes/apiRoutes');
const html = require('./routes/htmlRoutes');
const app = express()
const PORT = process.env.PORT||3001

// setting up middleware functions
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/api',api)
app.use('/', html)

// starts a server
app.listen(PORT,()=>console.log(`Listening on Port ${PORT}`))
