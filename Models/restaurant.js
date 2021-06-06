const mongo=require('mongoose');

const schema=mongo.Schema;

const restaurant=new schema({
_id:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
city_name:{
    type:String,
    required:true
},
city:{
    type:Number,
    required:true
},
area:{
    type:Number,
    required:true
},locality:{
    type:String,
    required:true
},thumb:{
    type:Array,
    required:true   
},cost:{
    type:Number,
    required:true
},address:{
    type:String,
    required:true
},type:{
    type:Array,
    required:true  
},Cuisine:{
    type:Array,
    required:true
},contact_number:{
    type:String,
    required:true
},cuisinedata:{
    type:Array,
    required:true
}

})

module.exports=mongo.models.restaurant || mongo.model('restaurant',restaurant);