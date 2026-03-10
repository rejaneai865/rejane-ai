const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("./userModel")

const router = express.Router()



router.post("/register", async(req,res)=>{

try{

const {email,password} = req.body

const hashedPassword = await bcrypt.hash(password,10)

const user = await User.create({
email,
password:hashedPassword
})

res.json({message:"User created"})

}catch(err){

res.json({message:"Registration error"})

}

})



router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.json({message:"User not found"})
}

const valid = await bcrypt.compare(password,user.password)

if(!valid){
return res.json({message:"Wrong password"})
}

const token = jwt.sign(
{id:user._id,email:user.email},
process.env.JWT_SECRET
)

res.json({
token:token
})

}catch(err){

res.json({message:"Login error"})

}

})

module.exports = router