const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const fileUploader = require("../config/file-upload.js")
const User = require("../models/user-model");

router.get("/users", (req, res, next) =>{
  //Whenever z user visits "/books" find all the books sorted by rating
  User.find()
  .sort({createdAt:-1})
  .then(userResults =>{
    res.locals.userArray = userResults;
    res.render("account-management/accounts-list.hbs");
  })
  // next(err) skips to the error handler in "bon/wwww" (error.hbs)
  .catch(err => next(err));
})
// router.get("/book/:bookId", (req, res, next) =>{
//   // res.json(req.params);
//   // get the ID from the adress (it's inside of req.params)
//   const {bookId} = req.params;

//   // find the book in the database using the ID from the adress
//   Book.findById(bookId)
//   .then(userDoc => {
//     //send the database query result to the hbs file as "userItem"
//     res.locals.userItem = userDoc;
//     res.render("book-details.hbs");
//   })
//   //next(err) skips to the error handler in "bin/www" (error.hbs)
//   .catch(err => next(err));
// })


// router.get("/book-add", (req, res, next)=>{
//   res.render("book-form.hbs");
// })

// router.post("/process-book", (req,res, next)=>{
//   // res.json(req.body);
//   const {title, author, description, rating} = req.body;

//   Book.create({title, author, description, rating})
//   .then(userDoc => {
//       //Always redirect if it's succesful to avoid Duplicate Data on refresh
//       // (redirect ONLY to ADRESSES - not to hbs files)
//       res.redirect(`/book/${userDoc._id}`)
//   })
//   .catch(err => next(err));
// })

router.get("/user/:userId/edit", (req, res, next)=> {
 
 const {userId} = req.params;
  User.findById(userId)
  .then(userDoc => {
      res.locals.userItem= userDoc;
      res.render("account-management/user-edit.hbs");
  })
  //next(err) skips to the error handler in "bin/www" (error.hbs)
  .catch(err =>next(err));
})

router.post("/user/:userId/process-edit", fileUploader.single("pictureUpload"), (req, res, next)=>{
  //  res.json(req.body);
  const  {userId}  = req.params;
  const   {email, originalPassword, name, surname, phoneNum, role, company}= req.body; //.body because it's the info that are given by the user on the hbs page 
  
  const encryptedPassword =  bcrypt.hashSync(originalPassword, 10);
    
  console.log(originalPassword==="");

  let picture;
  
  if (req.file) {
    picture = req.file.secure_url;
  }
  
    
  if(name.length <= 2 || name.length >= 64) {
    console.log("le nom est inf à 2", name);
    req.flash("danger", "The name must be grater than 2 letters and smaller than 64");
    res.redirect("/user/:userId/process-edit");  
    return;
  } 

  if(!phoneNum.match(/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/)){
    
    req.flash("danger", "number must have one of these formats +33698912549, +33 6 79 91 25 49, +33-6-79-91-25-49, (555)-555-5555, 555-555-5555");
    res.redirect("/user/:userId/process-edit");  
    return;
  }
  console.log(originalPassword);
 if(originalPassword===""){
  User.findByIdAndUpdate(
  userId, //ID of the document we want to update
  {$set: {email, name, surname, phoneNum, picture, role, company}},//changes to make to that document
  {runValidators: true} //additional settings (enforce the rules)
 )
 .then(userDoc =>{
    
    res.redirect(`/users`);
    req.flash("success", `${userDoc.email} account has been updated and email steel the same`);
 })
 .catch(err =>next(err));
}else{
  if( !originalPassword || !originalPassword.match(/[0-9]/)){
      
    req.flash("danger", "Password can't be blank and must contain a number");
    res.redirect("/user/:userId/process-edit");  
    return;
  }
  User.findByIdAndUpdate(
    userId, //ID of the document we want to update
    {$set: {email, encryptedPassword, name, surname, phoneNum, picture, role, company}},//changes to make to that document
    {runValidators: true} //additional settings (enforce the rules)
   )
   .then(userDoc =>{
      
      res.redirect(`/users`);
      req.flash("success", `${userDoc.email} account has been updated and email steel the same`);
   })
   .catch(err =>next(err));
}
})

router.get("/user/:userId/delete", (req, res, next)=>{
  const {userId} = req.params;

  User.findByIdAndRemove(userId)
  .then(userDoc =>{
      //redirect ONLY to ADRESSES - not to HBS files
      res.redirect("/users");
  })
  //next(er skips to the error handler in "bin/www")
  .catch(err =>next(err));
})

// router.post("/book/:userId/process-review", (req, res, next)=>{
//   const {userId} = req.params; //gets the ID
//   const {userFullName, reviewText} = req.body;// get the review author infos

//   Book.findByIdAndUpdate(
//       userId, // ID 
//       //changes to the document (push to the reviews array an object)
//       {$push : {reviews : {userFullName, reviewText}}},
//       { runValidators:true} //additional settings (enforce the rules)
//       )
//   .then(userDoc => {
//       //
//       res.redirect(`/book/${userDoc._id}`);
//   })
//   .catch(err =>next(err));
// })
module.exports = router;