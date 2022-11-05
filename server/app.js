const dotenv = require('dotenv')
const express = require ('express')
const mongoose= require('mongoose')
const app = express();

dotenv.config({path:'./config.env'});

require('./db/conn')
//const User = require('./model/userSchema')
app.use(express.json())
// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

//middleware
const middleware =(req , resp, next)=>{
    console.log('this is middle')
    next();
}

// app.get('/',(req ,resp )=>{
//     resp.send(`Hello akshay, this is HOME page from app.js`)
// });

app.get('/about',middleware,(req ,resp )=>{
   // console.log('this is middle inside /about')
    resp.send(`Hello akshay, this is about page`)
});

app.get('/contact',(req ,resp )=>{
   // resp.cookie('sample', 'test')
    resp.send(`Hello akshay, this is contact page`)
});

app.get('/signin',(req ,resp )=>{
    resp.send(`Hello akshay, this is login page`)
});

app.get('/signup',(req ,resp )=>{
    resp.send(`Hello akshay, this is register`)
});


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`,Date())
})