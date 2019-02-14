const express = require("express");

const router = express.Router();

const Furniture = require("../models/furniture-model");

const fileUploader = require("../config/file-upload.js");

/* Furniture Add */
router.get("/furnitures/add", (req, res, next) => {
	res.render("./furniture/add");
	if(!req.user){
    req.flash("danger", "You must be login");
    res.redirect("/login");
    // use return to STOP the function here if you are NOT logged-in
    return;
  }
	
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

/* Furniture New (process) */
router.post("/furnitures/new", fileUploader.single("pictureUpload"), (req, res, next) => {
	const {
		name,
		width,
		height,
		depth,
		description,
		material,
		type,
		file
	} = req.body;

	let pictures;

		if (req.file) {
			pictures = req.file.secure_url;
		}
	const serialNumber = "037544f3-aebf-45c5-a8c9-107457712a6f";
	// TODO add SKU generator to handle delivries
	// https://www.npmjs.com/package/jsbarcode

	// validation and error detail TODO LATER
	// add express-validator https://stackoverflow.com/q/46906876
	// preserve first user input on error

	if (!req.user._id) {
		req.flash(
			"danger",
			"Please login. If you're already logged and experciencing difficulties, please contact Nomi's team for help."
		);

		return res.redirect("/login");
	}

	if (req.user.role !== "designer" && req.user.role !== "admin") {
		req.flash(
			"danger",
			"You lack the rights to do that, if experciencing difficulties, please contact Nomi's team for help."
		);
		return res.redirect("/login");
	}

	//const ownerOfDesign = req.user._id;
	console.log(req.user);

	Furniture.findOne({ name: name })
		.then(queryResult => {
			req.flash(
				"danger",
				`A Furniture called ${queryResult.name}  already exists.`
			);
			res.redirect("/dashboard");
		})

		.catch(err => next(err));
		const creator = req.user._id;
	const newFurniture = new Furniture({
		name,
		serialNumber,
		size: {
			width,
			height,
			depth
		},
		material,
		type,
		description,
		creator,
		pictures
	});

	newFurniture
		.save()
		.then(queryResult => {
			req.flash(
				"success",
				"Your Design has been submitted, you will receive our feedback soon !"
			);
			res.redirect(`/furnitures/${queryResult._id}`);
		})
		.catch(error => {
			// refill user form FIXME
			req.flash("danger", "Something went wrong..");
			console.log(error);
			res.redirect("/furnitures/add");
		});
});

/* Furniture Edit */
router.get("/furnitures/:furnitureId/edit", (req, res, next) => {
	const { furnitureId } = req.params;

	Furniture.findById(furnitureId)
		.then(queryResult => {
			res.locals.furnitureItem = queryResult;
			console.log(queryResult);
			res.render("./furniture/edit");
		})

		.catch(err => next(err));
});

/* Furniture Update (process) */
router.post("/furnitures/:furnitureId/update", (req, res, next) => {
	//retrieve id from url param
	const { furnitureId } = req.params;

	// get the user input form data
	const {
		name,
		width,
		height,
		depth,
		description,
		material,
		type,
		stdPrice
	} = req.body;

	let { isActive } = req.body;

	if (isActive === "on") {
		isActive = true;
	} else {
		isActive = false;
	}

	Furniture.findByIdAndUpdate(
		furnitureId,
		{
			$set: {
				name,
				size: {
					width,
					height,
					depth
				},
				material,
				type,
				description,
				stdPrice,
				isActive
			}
		},
		{
			runValidators: true
		}
	)
		.then(queryResult => {
			console.log("Furniture has been updated 🔥");
			req.flash(
				"success",
				`<bold>${queryResult.name}</bold> has been succuessfuly udpated !`
			);

			res.redirect(`/furnitures/${queryResult._id}`);
		})
		.catch(error => {
			console.log(error);
			req.flash("danger", `${error.message}`);
			res.redirect(`/furnitures/${req.params.furnitureId}/edit`);
		});
});

// /* Furniture Remove */
router.get("/furnitures/:furnitureId/delete", (req, res, next) => {
	const { furnitureId } = req.params;

	Furniture.findByIdAndRemove(furnitureId)
		.then(queryResult => {
			console.log("Furniture has been destroyed ❌", queryResult);
			res.redirect("/furnitures");
		})

		.catch(err => next(err));
});

module.exports = router;
