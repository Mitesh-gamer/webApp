const express=require('express');
const apiroute=require('./Router/route');
const mongodb=require('mongoose');
const bodyparser=require('body-parser');

const app=express();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})
app.use(bodyparser.json());
app.use('/apirequest',apiroute);



const port=process.env.port || 3131;
//mongodb://127.0.0.1:27017/restaurant
//mongodb+srv://mitesh1234:mitesh@1234@cluster0.2xqey.mongodb.net/restaurantdb?retryWrites=true&w=majority
mongodb.connect(' mongodb+srv://mitesh1234:mitesh@1234@cluster0.2xqey.mongodb.net/restaurantdb?retryWrites=true&w=majority',
{useNewUrlParser: true,useUnifiedTopology: true})
    .then(res=>{
        app.listen(port,()=>{
        console.log('Server is on Port no : '+port);
    })})
    .catch(err=>console.log(err));
