const location = require('../Models/city');
const mealtype = require('../Models/mealtype');
const restaurant = require('../Models/restaurant');
const users = require('../Models/user');
const items=require('../Models/items');
const orderitem=require('../Models/orderitem');

exports.getcities = (req, res) => {
    location.find().then(response => {
        res.status(200).json({ message: 'Data From Database', location: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}
exports.getcitiesbyid = (req, res) => {
    const cityid = req.params.cityid;
    location.find({ city_id: cityid }).then(response => {
        res.status(200).json({ message: 'Data From Database', location: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}
exports.getmealtype = (req, res) => {
    mealtype.find().then(response => {
        res.status(200).json({ message: 'Data From Database', mealtype: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}
exports.getmealtypebyid = (req, res) => {
    const mealid = req.params.mealid;
    mealtype.find({ _id: mealid }).then(response => {
        res.status(200).json({ message: 'Data From Database', mealtype: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}
exports.getrestaurantbyid = (req, res) => {
    const restid = req.params.restid;
    restaurant.find({ _id: restid }).then(response => {
        res.status(200).json({ message: 'Data From Database', restaurent: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}

exports.getrestaurantbycity = (req, res) => {
    const cuisine =req.body.cuision;//String type
    const cityname = req.body.city;//String type
    const mealtype = req.body.mealtype;//String type
    const lcost = req.body.lcost ? req.body.lcost : 1;//Number
    const hcost = req.body.hcost;//Number
    const sort = req.body.sort ? req.body.sort : 1;//Number-Format
    const page = req.body.page ? req.body.page : 1;//Number-Format
    const d_p = req.body.dataperpage ? req.body.dataperpage : 2;//Number-Format(Number of data per page)
    //{ $all: ['red', 'blank']
    //minimal Data
    console.log(cityname);
    console.log(cuisine)
    var query_data = {}, temp = page - 1;
    if (!cityname == "" || !cityname=='undefined') { query_data.city = cityname }
    if (!mealtype == "") { query_data['type.mealtype'] = mealtype }
    // if (!cuisine == "") { query_data['Cuisine'] = {$elemMatch:{'cuisine':{$in:cuisine}}}} 
    if (!hcost == "") { query_data.cost = { $lt: hcost } }
    if (!lcost == "") { query_data.cost = { $gt: lcost } }
    if (!lcost == "" && !hcost == "") { query_data.cost = { $gt: lcost, $lt: hcost } }
    if (!cuisine == "") { query_data['cuisinedata'] ={$elemMatch:{$in:cuisine}}}
   
    //pagination using slice method in find() function 
//    for(i=0;i<=cuisine.length;i++){
//         query_data['Cuisine'] = {$elemMatch:{'cuisine':cuisine[i]}}
//         restaurant.find(
//             query_data
//         ).sort({ cost: sort }).then(response => {
//             const arr = [];
//             for (var i = 1; i <= Math.ceil(response.length / d_p); i++) {
//                 arr.push(i);
//             }
//            const restaurant=response;

//             res.status(200).json({ message: 'Data From Database', restaurant: response.slice(temp * d_p, (temp + 1) * d_p), 'Page Number': page, sort: sort, 'Total result': response.length, 'Numberofpage': arr });
//         }).catch(err => {
//             res.status(500).json({ error: err });
//         })
//         query_data = {};
//     } 
console.log(query_data);
    restaurant.find(
        query_data
    ).sort({ cost: sort }).then(response => {
        const arr = [];
        for (var i = 1; i <= Math.ceil(response.length / d_p); i++) {
            arr.push(i);
        }
        res.status(200).json({ message: 'Data From Database', restaurant: response.slice(temp * d_p, (temp + 1) * d_p), 'Page Number': page, sort: sort, 'Total result': response.length, 'Numberofpage': arr });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
    query_data = {};
}

exports.getrestaurantbycityparam=(req, res)=>{
    const locationid =Number( req.params.locationid);
    
    restaurant.find({ city: locationid }).then(response => {    
        res.status(200).json({ message: 'Data From Database', restaurent: response });
    }).catch(err => {
        res.status(500).json({ error: err });
    })
}
exports.signup = (req,res) => {
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    var signinuser = new users({ email: email, firstname: firstname, lastname: lastname, password: password });
    signinuser.save().then(result => res.status(200).json({ message: 'User signedup sucessfully', user: result }) ).catch(err => {
        res.status(500).json({ message: err })
    })
}
exports.setorder= (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const mobileno = req.body.mobileno;
    const address = req.body.address;
    const orderitems=req.body.orderitems;
    var orders = new orderitem({ email: email, name: name, mobileno: mobileno,address: address,orderitems:orderitems });
    orders.save().then(result => res.status(200).json({ message: 'User signedup sucessfully', orderitem: result }) ).catch(err => {
        res.status(500).json({ message: err })
    })
}
exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    users.find({ email: email, password: password }).then(result => {
        if (result.length >= 1) {
            res.status(200).json({ message: "User logged in sucessfully", user: result, isauthenticated: true })
        } else {
            res.status(200).json({ message: "User login failed", user: result, isauthenticated: false })

        }
    }).catch(err => {
        res.status(500).json({ message: err })
    })
}
exports.getitemlist=(req,res)=>{
    const data=[Number(req.params.restid)];
    var query_data={};
    query_data['rest_id']={$elemMatch:{$in:data}}
    // console.log(data);
items.find(query_data).then(response=>{
    // console.log("Hey");
    res.status(200).json({message:"Data From Items",response:response})
}).catch(err=>{
    res.status(500).json({message:err})
})
}
// passed Data
// city:
// cuision:
// mealtype:
// lcost:
// hcost:
// sort:
// page:



// city:cityname,
//'Cuisine.cuisine':cuisine,
// cost:{$lt:hcost,$gt:lcost},
// 'type.mealtype':mealtype