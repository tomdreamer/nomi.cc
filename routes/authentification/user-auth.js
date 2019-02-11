const express = require("express");
const bcrypt = require("bcrypt");

const User= require("../../models/user-model.js");

const fileUploader = require("../../config/file-upload.js")

const router= express.Router();

router.get("/custumerSignup", (req,res,next)=>{
    res.render("auth-views/user-custumer-signUp-form.hbs");
})

// depending on the number of files you upload you have to put:
// single() for ONE file
// or array() for MANY files  behind fileUploader
router.post("/process-signUpCust", fileUploader.single("pictureUpload"), (req, res, next)=>{
    const {email, originalPassword, name, surname, phoneNum}= req.body;
    //encrypt the user's password before saving
    const encryptedPassword =  bcrypt.hashSync(originalPassword, 10);
    
    console.log("file upload is Always in req.file OR req.files", req.file);

    const picture= req.file.secure_url;

     //enforce password rules (can't be empty and MUST have a digit)
     // ! = if it is empty
    if( !originalPassword || !originalPassword.match(/[0-9]/)){
      // req.flash() sends by the "connect-flash" npm package
      //(it's defined by the "connect-flash" npm package)
      req.flash("error", "Password can't be blank and must contain a number");
      res.redirect("/custumerSignup");
      // use return to STOP the function here if the password is BAD
      return;
    }
  
     User.create({email, encryptedPassword, name, surname, phoneNum, picture})
     .then(()=>{
      // req.flash() sends by the "connect-flash" npm package
      //(it's defined by the "connect-flash" npm package)
      req.flash("success", "Sign up success!");
       // redirect to the HOME PAGE if the sign up WORKED
       res.redirect("/");
     })
     .catch(err => next(err));
  });

 
  
    router.post("/process-logInCust", (req, res, next)=>{
    const {email, originalPassword} = req.body;
  
    //Validate the email by searching in the database for an account with that email
    User.findOne({email :{$eq: email} })
    .then(userDoc => {
      // redirect to login page if result is NULL (no account with the email)
      if(!userDoc){
      // req.flash() sends by the "connect-flash" npm package
      //(it's defined by the "connect-flash" npm package)
      // req.flash("error", "Email is incorrect!");
  
      router.get("/login", (req,res, next)=>{
        res.render("auth-views/user-custumer-signUp-form.hbs");
      })
      }
      //validate the password by using bcrypt.compareSync()
      const {encryptedPassword} = userDoc;
  
      if(!bcrypt.compareSync(originalPassword, encryptedPassword)){
        // req.flash() sends by the "connect-flash" npm package
        //(it's defined by the "connect-flash" npm package)
      //req.flash("error", "Password is incorrect");
        // redirect to LOGIN PAGE fi the password don't match
        router.get("/login", (req,res, next)=>{
          res.render("auth-views/user-custumer-signUp-form.hbs");
        })
        // use return to STOP the function here if the PASSWORD is BAD
        return;
      }
      //email & password are CORRECT!
      //if we are MANUALLY managed the user session
      // req.session.userId = userDoc._id;
  
      // instead we'll use PASSPORT - an npm package for managing user sessions
      // req.logIn() is a Passport method that calls serializeUser()
      // (that )
      // req.logIn(userDoc, ()=>{
      // req.flash() sends by the "connect-flash" npm package
      //(it's defined by the "connect-flash" npm package)
      //req.flash("success", "Log in success!");
      //email & password are CORRECT!
      // HERE WE are missing something and it will come later
      res.redirect("/");
      // })
      
    })
    .catch(err => next(err));
  })
  

//   router.get("/logout", (req, res, next)=>{
//     //req.logOut() is a Passport method that removes the USER ID from the session
//     req.logOut();
//     req.flash("success", "Logged out successfully! ");
//     res.redirect("/");
//   })
  module.exports = router;