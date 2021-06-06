const mongo=require('mongoose')

const schema=mongo.Schema;

const item=new schema({
    // _id:{
    //     type:String,
    //     required:true
    // },
    // name:{
    //     type:String,
    //     required:true
    // },
    // content:{
    //     type:String,
    //     required:true
    // }
    // , image:{
    //     type:String,
    //     required:true
    // }
})

module.exports=mongo.models.item || mongo.model('item',item);   






