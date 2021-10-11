const express=require('express')
const app=express()
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const path=require('path')
const cors=require('cors')
const connectDB=require('./config/bdd.js')

dotenv.config({path:'./config/config.env'})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

connectDB()

app.use(cors())
app.use('/employees',require('./routes/employees.js'))
app.use('/entreprise',require('./routes/entreprise.js'))



app.listen(process.env.PORT || 3000)