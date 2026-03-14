const express = require("express")
const router = express.Router()

let stripe = null

try{

const Stripe = require("stripe")

if(process.env.STRIPE_SECRET_KEY){

stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

}

}catch(err){

console.log("Stripe not configured yet")

}

router.post("/create-checkout", async(req,res)=>{

if(!stripe){

return res.json({
message:"Stripe not configured yet"
})

}

try{

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

mode:"subscription",

line_items:[{

price_data:{
currency:"usd",
product_data:{
name:"REJANE AI PRO"
},
unit_amount:1000
},

quantity:1

}],

success_url:"http://localhost:3000/success",
cancel_url:"http://localhost:3000/cancel"

})

res.json({url:session.url})

}catch(err){

res.status(500).json({error:"Stripe error"})

}

})

module.exports = router