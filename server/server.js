const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const db = require("./db/model")
var cors = require('cors')

app.use(express.json({limit: '50mb'}))

app.use(cors({origin:"http://localhost:3000"}))

app.get('/', (req,res) => {
    res.send("Hello World")
})

db.sequelize.sync()

require('./db/route/pesertaCimpa')(app);

app.listen(PORT, () => { 
    console.log(`Example app listening at port ${PORT}`)
})