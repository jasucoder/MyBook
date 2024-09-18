const express = require('express')
const app = express()
const PORT = 8125
const bodyParser = require('body-parser')
const Myroutes = require('./Routers/userRoutes')
const adminroutes = require('./Routers/AdminRoutes')
//const fakeroutes = require('./routes/fakeuserroutes')
const db = require('./DB/database')
//const dbb = require('./DB/dbb')
const cors = require('cors')



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', Myroutes)
app.use('/', adminroutes)
//app.use('/', fakeroutes)





app.listen(PORT, ()=>{
    console.log(` Server is running on PORT : ${PORT}`)
})  