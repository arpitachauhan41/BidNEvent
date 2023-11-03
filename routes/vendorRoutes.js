const express = require('express');
const { query, validationResult, body} = require('express-validator');
const router = express.Router();
const vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const fetchuser = require('../middleware/fetchuser');
const jwt_secret = "qwerty_divyashunk";

//signup.... no login require
router.post('/createVendor',[
    body('name').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:8}),
    body('phone_num').isLength({require:10})
],
    async (req,res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success,error:errors.array()});
        }
        //check if email exist
        try{
            let vendor = await Vendor.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({success,error:"Sorry the name the same name and email ID exist"});
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password,salt);
            //create a new user
            vendor = await Vendor.create({
                name:req.body.name,
                email:req.body.email,
                password:secPass,
                phone_num:req.body.phone_num
            })
            const data = {
                vendor:{
                    id:vendor.id
                }
            }
            const Authtoken = jwt.sign(data, jwt_secret);
            success = true;
            res.json({success,Authtoken});
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("some error occured");
        }
    }
)



