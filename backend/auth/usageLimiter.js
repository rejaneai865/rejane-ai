const Usage = require("../database/usageModel")

async function usageLimiter(req,res,next){

try{

const userId = req.body.userId || "demo-user"

let usage = await Usage.findOne({userId})

if(!usage){

usage = new Usage({
userId:userId
})

await usage.save()

}

const now = new Date()

const diffHours = (now - usage.lastReset)/(1000*60*60)

if(diffHours >= 24){

usage.queriesToday = 0
usage.lastReset = now

}

if(usage.plan === "free" && usage.queriesToday >= 75){

return res.status(403).json({
error:"Daily limit reached (75 queries)"
})

}

usage.queriesToday += 1

await usage.save()

next()

}catch(err){

res.status(500).json({
error:"Limiter error"
})

}

}

module.exports = usageLimiter