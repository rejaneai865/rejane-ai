const express = require("express")

const router = express.Router()

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const User = require("./userModel")

router.post("/signup",async(req,res)=>{

try{

const email = req.body.email
const password = req.body.password

const hashed = await bcrypt.hash(password,10)

const user = await User.create({
email:email,
password:hashed
})

res.json({
message:"User created"
})

}catch(err){

res.status(500).json({
error:"Signup failed"
})

}

})

router.post("/login",async(req,res)=>{

try{

const email = req.body.email
const password = req.body.password

const user = await User.findOne({email})

if(!user){

return res.status(401).json({
error:"User not found"
})

}

const valid = await bcrypt.compare(password,user.password)

if(!valid){

return res.status(401).json({
error:"Invalid password"
})

}

const token = jwt.sign(
{userId:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
)

res.json({
token:token
})

}catch(err){

res.status(500).json({
error:"Login failed"
})

}

})

module.exports = router