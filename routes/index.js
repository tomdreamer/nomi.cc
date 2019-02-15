const express = require("express");
const router = express.Router();

const Furniture = require("../models/furniture-model");

/* GET home page */
router.get("/", (req, res, next) => {
	// req.user comes from Passport's
	// (it's the document from the database of the logged-in user)

	res.render("index");
});

/* GET shopping cart page */
router.get("/cart", (req, res, next) => {
	Furniture.find({ _id: { $in: req.session.cart } })
		.then(queryResult => {
			let finalPrice = 0;
			queryResult.forEach(item => {
				finalPrice += item.stdPrice;
			});
			res.locals.cartArray = queryResult;
			res.locals.finalPrice = finalPrice;
			res.render("cart");
		})
		.catch(err => next(err));
});

module.exports = router;
