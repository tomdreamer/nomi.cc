const express = require("express");

const router = express.Router();

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

// router.post("/book/:userId/process-edit", (req, res, next)=>{
//   // res.json(req.body);
//   const  {userId}  = req.params;
//   const   {title, rating, description, author}= req.body; //.body because it's the info that are given by the user on the hbs page 
//  Book.findByIdAndUpdate(
//   userId, //ID of the document we want to update
//   {$set: {title, rating, description, author}},//changes to make to that document
//   {runValidators: true} //additional settings (enforce the rules)
//  )
//  .then(userDoc =>{
//      res.redirect(`/book/${userDoc._id}`);
//  })
//  .catch(err =>next(err));
// })

// router.get("/book/:userId/delete", (req, res, next)=>{
//   const {userId} = req.params;

//   Book.findByIdAndRemove(userId)
//   .then(userDoc =>{
//       //redirect ONLY to ADRESSES - not to HBS files
//       res.redirect("/books");
//   })
//   //next(er skips to the error handler in "bin/www")
//   .catch(err =>next(err));
// })

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