const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

const User = require("../auth/userModel")

passport.use(

new GoogleStrategy({

clientID:process.env.GOOGLE_CLIENT_ID,

clientSecret:process.env.GOOGLE_CLIENT_SECRET,

callbackURL:"/auth/google/callback"

},

async(accessToken,refreshToken,profile,done)=>{

let user = await User.findOne({
email:profile.emails[0].value
})

if(!user){

user = await User.create({
email:profile.emails[0].value,
password:"googleuser"
})

}

return done(null,user)

}

)

)

module.exports = passport