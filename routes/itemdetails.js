const express = require('express');
const { query, validationResult, body} = require('express-validator');
 const router = express.Router();

const Items = require('../models/Item');

//Route3 details of the product
router.post('/EnterDetails',[
    body('name').isLength({min:3}),
    body('desc').isLength({min:10}),
     body('image').isLength({min:20}),
     body('price').isLength({min:2})
    ],
    async (req,res)=>{
       let success=false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
        }
        try{

            Item = await Items.create({
            name:req.body.name,
            desc:req.body.desc,
            image:req.body.image,
            price:req.body.price
        

        })
        let success = true;
        res.json({success});
    }
        catch(error){
            console.error(error.message);
            res.status(500).send("some error occured")
        }
    })
    module.exports=router 