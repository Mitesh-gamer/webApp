const mongos=require('mongoose');

const Schema=mongos.Schema;

const cityschema=new Schema({
    
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    city_id:{
        type:String,
        required:true
    },
    location_id:{
        type:String,
        required:true
    },
    country_name:{
        type:String,
        required:true
    }

})

module.exports=mongos.models.location ||mongos.model('location',cityschema);

