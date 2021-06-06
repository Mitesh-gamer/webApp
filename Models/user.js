const mongos=require('mongoose');

const Schema=mongos.Schema;

const userschema=new Schema({
    email:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongos.models.users ||mongos.model('users',userschema);

