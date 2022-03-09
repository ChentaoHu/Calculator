const { authenticate } = require("passport/lib")
const LocalStrategy =require('passport-local').Strategy


function initialize(passport){
  const authenticateUser =(email, password,done) =>{
    
  }
  passport.use(new LocalStrategy({usernameField :'email'}), authenticateUser)
}