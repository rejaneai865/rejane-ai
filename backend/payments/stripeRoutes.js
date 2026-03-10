const express = require("express")
const router = express.Router()

const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const Usage = require("../database/usageModel")

router.post("/create-checkout-session", async (req,res)=>{

try{

const userId = req.body.userId

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

mode:"subscription",

line_items:[{

price_data:{

currency:"usd",

product_data:{
name:"REJANE AI Pro"
},

unit_amount:1000,

recurring:{
interval:"month"
}

},

quantity:1

}],

success_url:"https://rejane-ai.vercel.app/success",

cancel_url:"https://rejane-ai.vercel.app/cancel",

metadata:{
userId:userId
}

})

res.json({
url:session.url
})

}catch(err){

res.status(500).json({
error:"Stripe session failed"
})

}

})

router.post("/webhook",express.raw({type:"application/json"}),async(req,res)=>{

const event = req.body

if(event.type === "checkout.session.completed"){

const session = event.data.object

const userId = session.metadata.userId

await Usage.findOneAndUpdate(

{userId:userId},

{plan:"pro"},

{upsert:true}

)

}

res.json({received:true})

})

module.exports = router