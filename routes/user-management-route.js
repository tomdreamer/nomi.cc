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

module.exports = router;