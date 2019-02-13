const express = require("express");

const router = express.Router();

const Manufacturer = require("../models/manufacturer-model");

/* Manufacturer Add */
router.get("/workshops/add", (req, res, next) => {
	res.render("./manufacturer/add");
});

/* GET Manufacturers index  */
router.get("/workshops", (req, res, next) => {
	Manufacturer.find()
		.sort({
			name: 1
		})
		.limit(20)
		.then(queryResults => {
			res.locals.manufacturerArray = queryResults;
			res.locals.isActive = {
				manufacturerIndex: true
			};
			res.locals.isSearchingPlace = true;

			res.render("./manufacturer/index");
		})
		// catch next(err) skip straight to error
		.catch(err => next(err));
});

/* Manufacturer Show */
router.get("/workshops/:manufacturerId", (req, res, next) => {
	const { manufacturerId } = req.params;

	Manufacturer.findById(manufacturerId)
		.then(queryResult => {
			res.locals.manufacturerItem = queryResult;
			res.locals.isSearchingPlace = true;
			res.render("./manufacturer/show");
		})

		.catch(err => next(err));
});

// /* Furniture Show by Type */
// router.get("/manufacturer/category/:stringType", (req, res, next) => {
// 	const { stringType } = req.params;
// 	Furniture.find({
// 		type: stringType,
// 		isActive: true
// 	})
// 		.limit(10)
// 		.sort({ name: -1 })
// 		.then(queryResult => {
// 			res.locals.furnitureArray = queryResult;
// 			res.locals.isShopping = true;
// 			res.render("./furniture/index");
// 		})

// 		.catch(err => next(err));
// });

// /* Furniture New (process) */
// router.post("/furnitures/new", (req, res, next) => {
// 	const {
// 		name,
// 		width,
// 		height,
// 		depth,
// 		description,
// 		material,
// 		type,
// 		file
// 	} = req.body;

// 	const serialNumber = "037544f3-aebf-45c5-a8c9-107457712a6f";
// 	// TODO add SKU generator to handle delivries
// 	// https://www.npmjs.com/package/jsbarcode

// 	// validation and error detail TODO LATER
// 	// add express-validator https://stackoverflow.com/q/46906876
// 	// preserve first user input on error
// 	const userInput = {
// 		name: req.body.name,
// 		width: req.body.width,
// 		height: req.body.height,
// 		depth: req.body.depth,
// 		description: req.body.description,
// 		material: req.body.material,
// 		type: req.body.type
// 	};

// 	Furniture.findOne({ name: name })
// 		.then(queryResult => {
// 			req.flash(
// 				"danger",
// 				`A design called ${queryResult.name}  already exists`
// 			);
// 			res.redirect("/furnitures/add");
// 		})

// 		.catch(err => next(err));

// 	const newFurniture = new Furniture({
// 		name,
// 		serialNumber,
// 		size: {
// 			width,
// 			height,
// 			depth
// 		},
// 		material,
// 		type,
// 		description
// 	});

// 	newFurniture
// 		.save()
// 		.then(queryResult => {
// 			console.log("Furniture has been saved 🛋");
// 			res.redirect(`/furnitures/${queryResult._id}`);
// 		})
// 		.catch(error => {
// 			// refill user form FIXME
// 			res.locals.previousForm = userInput;
// 			req.flash("danger", "Something went wrong..");
// 			res.redirect("/furnitures/add");

// 			console.log(error);
// 		});
// });

// /* Furniture Edit */
// router.get("/furnitures/:furnitureId/edit", (req, res, next) => {
// 	const { furnitureId } = req.params;

// 	Furniture.findById(furnitureId)
// 		.then(queryResult => {
// 			res.locals.furnitureItem = queryResult;
// 			console.log(queryResult);
// 			res.render("./furniture/edit");
// 		})

// 		.catch(err => next(err));
// });

// /* Furniture Update (process) */
// router.post("/furnitures/:furnitureId/update", (req, res, next) => {
// 	//retrieve id from url param
// 	const { furnitureId } = req.params;

// 	// get the user input form data
// 	const {
// 		name,
// 		width,
// 		height,
// 		depth,
// 		description,
// 		material,
// 		type,
// 		stdPrice
// 	} = req.body;

// 	let { isActive } = req.body;

// 	if (isActive === "on") {
// 		isActive = true;
// 	} else {
// 		isActive = false;
// 	}

// 	Furniture.findByIdAndUpdate(
// 		furnitureId,
// 		{
// 			$set: {
// 				name,
// 				size: {
// 					width,
// 					height,
// 					depth
// 				},
// 				material,
// 				type,
// 				description,
// 				stdPrice,
// 				isActive
// 			}
// 		},
// 		{
// 			runValidators: true
// 		}
// 	)
// 		.then(queryResult => {
// 			console.log("Furniture has been updated 🔥");
// 			req.flash(
// 				"success",
// 				`<bold>${queryResult.name}</bold> has been succuessfuly udpated !`
// 			);

// 			res.redirect(`/furnitures/${queryResult._id}`);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 			req.flash("danger", `${error.message}`);
// 			res.redirect(`/furnitures/${req.params.furnitureId}/edit`);
// 		});
// });

// // /* Furniture Remove */
// router.get("/furnitures/:furnitureId/delete", (req, res, next) => {
// 	const { furnitureId } = req.params;

// 	Furniture.findByIdAndRemove(furnitureId)
// 		.then(queryResult => {
// 			console.log("Furniture has been destroyed ❌", queryResult);
// 			res.redirect("/furnitures");
// 		})

// 		.catch(err => next(err));
// });

module.exports = router;
