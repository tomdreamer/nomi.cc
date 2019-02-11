const express = require("express");

const router = express.Router();

const Furniture = require("../models/furniture-model");

/* Furniture Add */
router.get("/furnitures/add", (req, res, next) => {
	res.render("./furniture/add");
});

/* GET Furnitures index  */
router.get("/furnitures", (req, res, next) => {
	Furniture.find()
		.sort({
			rating: -1
		})
		.limit(20)
		.then(queryResults => {
			res.locals.furnitureArray = queryResults;
			res.locals.isActive = {
				furnitureIndex: true
			};
			res.locals.isShopping = true;

			res.render("./furniture/index");
		})
		// catch next(err) skip straight to error
		.catch(err => next(err));
});

/* Furniture Show */
router.get("/furnitures/:furnitureId", (req, res, next) => {
	const { furnitureId } = req.params;

	Furniture.findById(furnitureId)
		.then(queryResult => {
			res.locals.furnitureItem = queryResult;
			res.locals.isShopping = true;
			res.render("./furniture/show");
		})

		.catch(err => next(err));
});

/* Furniture Show by Type */
router.get("/furnitures/category/:stringType", (req, res, next) => {
	const { stringType } = req.params;
	Furniture.find({
		type: stringType,
		isActive: true
	})
		.limit(10)
		.sort({ name: -1 })
		.then(queryResult => {
			res.locals.furnitureArray = queryResult;
			res.locals.isShopping = true;
			res.render("./furniture/index");
		})

		.catch(err => next(err));
});

// /* Book New Process */
// router.post('/books/new', (req, res, next) => {
// 	const {
// 		title,
// 		author,
// 		description,
// 		rating,
// 		isbn
// 	} = req.body;

// 	//	res.send(req.body); hardcode

// 	// create a new book instance
// 	const newBook = new Book({
// 		title,
// 		author,
// 		description,
// 		rating,
// 		isbn
// 	});

// 	// save it
// 	newBook.save()
// 		.then((book) => {
// 			console.log("Book has been saved 📚", book);
// 			res.redirect('/books'); // redirect to books index
// 			//res.redirect(`/book/${book._id}`); redirect to new book

// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

// /* Book Edit */
// router.get('/book/:bookId/edit', (req, res, next) => {

// 	const {
// 		bookId
// 	} = req.params;

// 	Book.findById(bookId)
// 		.then(queryResult => {

// 			res.locals.bookItem = queryResult;
// 			res.render('book-edit');
// 		})

// 		.catch(err => next(err));
// });

// /* Book Update Process */
// router.post('/book/:bookId/update', (req, res, next) => {
// 	//retrieve id from url param
// 	const {
// 		bookId
// 	} = req.params;

// 	// get the user input form data
// 	const {
// 		title,
// 		author,
// 		description,
// 		rating,
// 		isbn
// 	} = req.body;

// 	// check user input
// 	//	res.send(req.body);

// 	// 3 args : id, changes and settings
// 	Book.findByIdAndUpdate(bookId, {
// 			$set: {
// 				title,
// 				author,
// 				description,
// 				rating,
// 				isbn
// 			}
// 		}, {
// 			runValidators: true
// 		}) // so mongoose keep enforcing schema

// 		.then((queryResult) => {
// 			console.log("Book has been updated 📚");
// 			res.redirect(`/book/${queryResult._id}`);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

// /* Book Remove */
// router.get('/book/:bookId/delete', (req, res, next) => {

// 	const {
// 		bookId
// 	} = req.params;

// 	Book.findByIdAndRemove(bookId)
// 		.then(queryResult => {
// 			console.log("Book has been destroyed ❌", queryResult);
// 			res.redirect('/books');
// 		})

// 		.catch(err => next(err));
// });

// /* Book Review Add */
// router.post("/book/:bookId/process-review", (req, res, next) => {

// 	const {
// 		bookId_param
// 	} = req.params;

// 	const {
// 		userFullName,
// 		reviewText
// 	} = req.body;

// 	Book.findByIdAndUpdate(
// 			bookId_param, {
// 				$push: {
// 					reviews: {
// 						userFullName,
// 						reviewText
// 					}
// 				}
// 			}, {
// 				runValidators: true
// 			})
// 		.then(queryResult => {
// 			res.redirect(`/book/${queryResult._id}`)
// 		})
// 		.catch(err => next(err));

// });

module.exports = router;
