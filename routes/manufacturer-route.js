const express = require("express");

const router = express.Router();

const Manufacturer = require("../models/manufacturer-model");

/* Manufacturer Add */
router.get("/workshops/add", (req, res, next) => {
	res.render("./manufacturer/add");
	if (!req.user) {
		req.flash("danger", "Please log-in.");
		res.redirect("/login");
		// use return to STOP the function here if you are NOT logged-in
		return;
	}
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
			res.render("./manufacturer/show");
		})

		.catch(err => next(err));
});

/* Manufacturer Show by Type */
router.get("/workshops/technique/:stringType", (req, res, next) => {
	const { stringType } = req.params;
	Manufacturer.find({
		availableProcess: stringType,
		isActive: true
	})
		.limit(10)
		.sort({ name: 1 })
		.then(queryResult => {
			res.locals.manufacturerArray = queryResult;
			res.locals.isSearchingPlace = true;
			res.render("./manufacturer/index");
		})

		.catch(err => next(err));
});

/* Manufacturer New (process) */
router.post("/workshops/new", (req, res, next) => {
	const {
		name,
		streetAddress,
		city,
		zipCode,
		country,
		email,
		phoneNum,
		description,
		availableProcess,
		files
	} = req.body;

	//	res.json(req.body);

	if (!req.user._id) {
		req.flash(
			"danger",
			"Please login. If you're already logged and experciencing difficulties, please contact Nomi's team for help."
		);

		return res.redirect("/login");
	}

	if (req.user.role !== "crafter" && req.user.role !== "admin") {
		req.flash(
			"danger",
			"You lack the rights to do that, if experciencing difficulties, please contact Nomi's team for help."
		);
		return res.redirect("/login");
	}

	Manufacturer.findOne({ name: name })
		.then(queryResult => {
			req.flash(
				"danger",
				`A Fab Lab called ${queryResult.name}  already exists`
			);
			return res.redirect("/workshops/add");
		})

		.catch(err => next(err));
	let creator = req.user._id;

	const newManufacturer = new Manufacturer({
		name,
		address: {
			streetAddress,
			city,
			zipCode,
			country
		},
		description,
		email,
		phoneNum,
		availableProcess,
		creator
	});

	newManufacturer
		.save()
		.then(queryResult => {
			console.log("Manufacturer has been saved ⚙️");
			req.flash(
				"success",
				"Your Fab Lab has been registred, you will receive our feedback soon !"
			);
			res.redirect(`/workshops/${queryResult._id}`);
		})
		.catch(error => {
			req.flash(
				"danger",
				"Something went wrong during the registration process, please, try again."
			);
			res.redirect("/workshops/add");

			console.log(error);
		});
});

/* Manufacturer Edit */
router.get("/workshops/:manufacturerId/edit", (req, res, next) => {
	const { manufacturerId } = req.params;

	Manufacturer.findById(manufacturerId)
		.then(queryResult => {
			res.locals.manufacturerItem = queryResult;
			console.log(queryResult);
			res.render("./manufacturer/edit");
		})

		.catch(err => next(err));
});

/* Manufacturer Update (process) */
router.post("/workshops/:manufacturerId/update", (req, res, next) => {
	const { manufacturerId } = req.params;

	const {
		name,
		streetAddress,
		city,
		zipCode,
		country,
		email,
		phoneNum,
		description,
		availableProcess
	} = req.body;

	let { isActive } = req.body;

	if (isActive === "on") {
		isActive = true;
	} else {
		isActive = false;
	}

	Manufacturer.findByIdAndUpdate(
		manufacturerId,
		{
			$set: {
				name,
				address: {
					streetAddress,
					city,
					zipCode,
					country
				},
				description,
				email,
				phoneNum,
				availableProcess,
				isActive
			}
		},
		{
			runValidators: true
		}
	)
		.then(queryResult => {
			console.log("Fab Lab has been updated 🔥");
			req.flash(
				"success",
				`<bold>${queryResult.name}</bold> has been succuessfuly udpated !`
			);

			res.redirect(`/workshops/${queryResult._id}`);
		})
		.catch(error => {
			console.log(error);
			req.flash("danger", `${error.message}`);
			res.redirect(`/workshops/${req.params.furnitureId}/edit`);
		});
});

/* Manufacturer Remove */
router.get("/workshops/:manufacturerId/delete", (req, res, next) => {
	const { manufacturerId } = req.params;

	Manufacturer.findByIdAndRemove(manufacturerId)
		.then(queryResult => {
			console.log("Manufacturer has been destroyed ❌", queryResult);
			req.flash(
				"info",
				`${queryResult.name} has been succuessfuly destroyed !`
				// FIXME output raw html as text
			);

			res.redirect("/workshops");
		})

		.catch(err => next(err));
});

module.exports = router;
