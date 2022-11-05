const dotenv = require('dotenv')
const express = require ('express')
const mongoose= require('mongoose')
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn')

const PORT = process.env.PORT;

//middleware
const middleware =(req , resp, next)=>{
    console.log('this is middle')
    next();
}

app.get('/',(req ,resp )=>{
    resp.send(`Hello akshay, this is HOME page`)
});

app.get('/about',middleware,(req ,resp )=>{
    console.log('this is middle inside /about')
    resp.send(`Hello akshay, this is about page`)
});

app.get('/contact',(req ,resp )=>{
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