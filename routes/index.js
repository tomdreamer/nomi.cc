const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // req.user comes from Passport's 
  // (it's the document from the database of the logged-in user)
  if(req.user){
    console.log("We are log in!", req.user);
  }else{
    console.log("NOT logged in ", req.user);
  }
  res.render('index');
});

module.exports = router;

