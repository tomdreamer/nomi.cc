const passport = require("passport");

const User = require("../models/user-model.js");

//serialiazeUser: defines what data to save in the session
// (this happens when you log in sussefully)
passport.serializeUser((userDoc, done)=>{
  //call done() to give Passport the result of the function
  //call done() to give Passport the result of the function

  // null as the fist argument means NO ERRORS OCCURED
  // user's ID as the second argument is the RESULT we send Passport
  done(null, userDoc._id);
});

//deserializeUser: defines how to retrieve the user information from the DB
// (happens automatically on EVERY request once you are LOGGED-IN)
passport.deserializeUser((userId, done)=>{
  // userId is the result of serializeUser
  //call done() to give Passport the result
  User.findById(userId)
  .then(userDoc =>{
    //null as the first argument means NO ERRORS OCCURED
    // DB document as the second argument is the RESULT we send Passport
    done(null, userDoc);
  })
  // err as the first argument means we tell Passport there was an error
  .catch(err => done(err));
});