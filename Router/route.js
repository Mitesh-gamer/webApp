const express=require('express');

const router=express.Router();

const controller=require('../Controller/control');

router.get('/city',controller.getcities);
router.get('/city/:cityid',controller.getcitiesbyid);
router.get('/mealtype',controller.getmealtype);
router.get('/mealtypebyid/:mealid',controller.getmealtypebyid);
router.post('/restaurantbycity',controller.getrestaurantbycity);
router.get('/getrestaurantbycityparam/:locationid',controller.getrestaurantbycityparam);
router.get('/restaurantbyid/:restid',controller.getrestaurantbyid);
router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.get('/itemslist/:restid',controller.getitemlist);
router.post('/setorder',controller.setorder);

module.exports=router;