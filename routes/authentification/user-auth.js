const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../../models/user-model.js");
const Furniture = require("../../models/furniture-model");
const Manufacturer = require("../../models/manufacturer-model");
const Quote = require("../../models/quote-model");
const fileUploader = require("../../config/file-upload.js");

const router = express.Router();

router.get("/signup/custumer", (req, res, next) => {
	res.render("auth-views/user-custumer-signUp-form.hbs");
});

// depending on the number of files you upload you have to put:
// single() for ONE file
// or array() for MANY files  behind fileUploader
router.post(
	"/process-signUpCust",
	fileUploader.single("pictureUpload"),
	(req, res, next) => {
		const { email, originalPassword, name, surname, phoneNum } = req.body;
		//encrypt the user's password before saving
		const { role } = "customer";
		const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

		console.log("file upload is Always in req.file OR req.files", req.file);

		let picture;

		if (req.file) {
			picture = req.file.secure_url;
		}

		User.findOne({ email: { $eq: email } }).then(userDoc => {
			// redirect to login page if result is NULL (no account with the email)
			if (userDoc) {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("danger", "Email already used! Try a an other one.");

				res.redirect("/custumerSignup");
			}
		});

		//enforce password rules (can't be empty and MUST have a digit)
		if (!originalPassword || !originalPassword.match(/[0-9]/)) {
			req.flash("danger", "Password can't be blank and must contain a number");
			res.redirect("/custumerSignup");
			return;
		}

		if (name.length <= 2 || name.length >= 64) {
			console.log("le nom est inf à 2", name);
			req.flash(
				"danger",
				"The name must be grater than 2 letters and smaller than 64"
			);
			res.redirect("/custumerSignup");
			return;
		}

		if (
			!phoneNum.match(
				/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/
			)
		) {
			req.flash(
				"danger",
				"number must have one of these formats +33698912549, +33 6 79 91 25 49, +33-6-79-91-25-49, (555)-555-5555, 555-555-5555"
			);
			res.redirect("/custumerSignup");
			return;
		}
		User.create({
			email,
			encryptedPassword,
			name,
			surname,
			phoneNum,
			picture,
			role
		})
			.then(() => {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("success", "Sign up success!");
				// redirect to the HOME PAGE if the sign up WORKED
				res.redirect("/");
			})
			.catch(err => next(err));
	}
);

router.get("/login", (req, res, next) => {
	res.render("auth-views/user-custumer-logIn-form.hbs");
});

router.post("/process-logInCust", (req, res, next) => {
	const { email, originalPassword } = req.body;

	//Validate the email by searching in the database for an account with that email
	User.findOne({ email: { $eq: email } })
		.then(userDoc => {
			// redirect to login page if result is NULL (no account with the email)
			if (!userDoc) {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("error", "Email is incorrect!");

				res.redirect("/login");
			}
			//validate the password by using bcrypt.compareSync()
			const { encryptedPassword } = userDoc;

			if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("danger", "Password is incorrect");
				// redirect to LOGIN PAGE fi the password don't match
				res.redirect("/login");
				// use return to STOP the function here if the PASSWORD is BAD
				return;
			}
			//email & password are CORRECT!
			// if we are MANUALLY managed the user session
			// req.session.userId = userDoc._id;

			// instead we'll use PASSPORT - an npm package for managing user sessions
			// req.logIn() is a Passport method that calls serializeUser()
			// (that )
			req.logIn(userDoc, () => {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("success", "Log in success!");
				res.redirect("/");
			});
		})
		.catch(err => next(err));
});

router.get("/signout", (req, res, next) => {
	//req.logOut() is a Passport method that removes the USER ID from the session
	req.logOut();
	req.flash("success", "Logged out successfully! ");
	res.redirect("/");
});

//-----------------------------------------------------------------------------
//Routers for fablab and designers whiech be named CREATORS
//-----------------------------------------------------------------------------

router.get("/signup/creators", (req, res, next) => {
	res.render("auth-views/user-creators-signUp-form.hbs");
});

// depending on the number of files you upload you have to put:
// single() for ONE file
// or array() for MANY files  behind fileUploader
router.post(
	"/process-signUpCreators",
	fileUploader.single("pictureUpload"),
	(req, res, next) => {
		const { email, originalPassword, name, surname, phoneNum, role } = req.body;
		let { company } = req.body;
		//encrypt the user's password before saving

		const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

		console.log("file upload is Always in req.file OR req.files", req.file);

		let picture;

		if (!company) {
			company = "freelancer";
		}
		if (req.file) {
			picture = req.file.secure_url;
		}

		User.findOne({ email: { $eq: email } }).then(userDoc => {
			// redirect to login page if result is NULL (no account with the email)
			if (userDoc) {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("danger", "Email already used! Try a an other one.");

				res.redirect("/creatorsSignup");
			}
		});

		//enforce password rules (can't be empty and MUST have a digit)
		if (!originalPassword || !originalPassword.match(/[0-9]/)) {
			req.flash("danger", "Password can't be blank and must contain a number");
			res.redirect("/creatorsSignup");
			return;
		}

		if (name.length <= 2 || name.length >= 64) {
			console.log("le nom est inf à 2", name);
			req.flash(
				"danger",
				"The name must be grater than 2 letters and smaller than 64"
			);
			res.redirect("/creatorsSignup");
			return;
		}

		if (
			!phoneNum.match(
				/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/
			)
		) {
			req.flash(
				"danger",
				"number must have one of these formats +33698912549, +33 6 79 91 25 49, +33-6-79-91-25-49, (555)-555-5555, 555-555-5555"
			);
			res.redirect("/creatorsSignup");
			return;
		}

		User.create({
			email,
			encryptedPassword,
			name,
			surname,
			phoneNum,
			picture,
			role,
			company
		})
			.then(() => {
				// req.flash() sends by the "connect-flash" npm package
				//(it's defined by the "connect-flash" npm package)
				req.flash("success", "Sign up success!");
				// redirect to the HOME PAGE if the sign up WORKED
				res.redirect("/");
			})
			.catch(err => next(err));
	}
);

router.get("/signout", (req, res, next) => {
	//req.logOut() is a Passport method that removes the USER ID from the session
	req.logOut();
	req.flash("success", "Logged out successfully! ");
	res.redirect("/");
});

//--------------------------------------------------------------------------------------------
// dashboards for designers and crafters
//--------------------------------------------------------------------------------------------

/*Dashboard that present's when you log in depending on your role */
router.get("/dashboard", (req, res, next) => {
	if (req.user.role === "designer") {
		Furniture.find({ creator: { $eq: req.user._id } })
			.sort({ rating: -1 })
			.then(furnitureResult => {
				Quote.find({ designer: { $eq: req.user._id } })
					.populate("crafter")
					.then(quoteResult => {
						// group the crafters by furniture
						let groupedCrafters = {};
						quoteResult.forEach(element => {
							const furnitureId = element.furniture.toString();
							if (!groupedCrafters[furnitureId]) {
								groupedCrafters[furnitureId] = [];
							}
							groupedCrafters[furnitureId].push(element.crafter);
						});

						// combine furniture results with crafters
						const combinedResults = furnitureResult.map(oneFurniture => {
							const furnitureObject = oneFurniture.toObject();
							const furnitureId = oneFurniture._id.toString();

							if (groupedCrafters[furnitureId]) {
								furnitureObject.crafters = groupedCrafters[furnitureId];
							} else {
								furnitureObject.crafters = [];
							}

							return furnitureObject;
						});

						res.locals.furnitureArray = combinedResults;
						res.render("auth-views/user-designer-dashboard.hbs");
					})
					.catch(err => next(err));
			})
			.catch(err => next(err));
	}
	if (req.user.role === "crafter") {
		Manufacturer.find({ creator: { $eq: req.user._id } })
			.sort({ rating: -1 })
			.then(queryResults => {
				res.locals.manufacturerArray = queryResults;
				res.render("auth-views/user-crafter-dashboard.hbs");
			})
			// catch next(err) skip straight to error
			.catch(err => next(err));
	}
	// TODO DRY UP
	if (req.user.role === "admin") {
		res.redirect("/users");
	}
});

module.exports = router;
