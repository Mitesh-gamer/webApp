const mongo=require('mongoose')

const schema=mongo.Schema;

const orderitem=new schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true
    }, 
    address:{
        type:String,
        required:true
    }, 
    orderitems:{
        type:Array,
        required:true
    }
})

module.exports=mongo.models.orderitem || mongo.model('orderitem',orderitem);   






