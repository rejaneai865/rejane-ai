const express = require("express")
const Stripe = require("stripe")

const User = require("../auth/userModel")

const stripe = new Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post("/create-checkout-session", async(req,res)=>{

try{

const {userId} = req.body

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items:[
{
price_data:{
currency:"usd",
product_data:{
name:"REJANE AI Pro"
},
unit_amount:1000
},
quantity:1
}
],

mode:"payment",

success_url:"http://localhost:3000/success",

cancel_url:"http://localhost:3000/cancel",

metadata:{
userId:userId
}

})

res.json({url:session.url})

}catch(err){

res.json({message:"Stripe error"})

}

})

module.exports = router