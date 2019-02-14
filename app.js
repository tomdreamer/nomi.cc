require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

require("./config/passport-setup");

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(x => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch(err => {
		console.error("Error connecting to mongo", err);
	});

const app_name = require("./package.json").name;
const debug = require("debug")(
	`${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
	require("node-sass-middleware")({
		src: path.join(__dirname, "public"),
		dest: path.join(__dirname, "public"),
		sourceMap: true
	})
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));
require("./helpers/hbs-helper.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//make our Expres app create sessions (moe on this tomorow)
app.use(
	session({
		// "saveUninitialized & resave are just to avoid "
		saveUninitialized: true,
		resave: true,
		//secret should be a string  that's different for every app
		secret: process.env.PASSPORT_SECRET,
		// store session data inside our MongoDB with the "connect-mongo" package
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
//PASSPORT LINES MUST BE BELOW SESSION
// set up Passeport's methods to use in our routes (properties and methods for "req")
app.use(passport.initialize());
//make Passport manage our user session
app.use(passport.session());
//allow our routes to use FLASH MESSAGES - Feedback messages before redirects
//(flash messages need sessions to work)
app.use(flash());
app.use((req, res, next) => {
	// send flash messages to the hbs file
	res.locals.messages = req.flash();

	//(req.user is defined by Passport and contains the logged-in user's info)
	res.locals.currentUser = req.user;

	// make ACL available for logged users in controllers and views.
	if (req.user !== undefined) {
		res.locals.role = req.user.role;

		switch (req.user.role) {
		case "admin":
			res.locals.isAdmin = true;
			break;

		case "editor":
			res.locals.isEditor = true;
			break;

		case "designer":
			res.locals.isDesigner = true;
			break;

		case "crafter":
			res.locals.isCrafter = true;
			break;

		default:
			res.locals.isCustomer = true;

			break;
		}
	}

	next();
});

// default value for title local
app.locals.title = "Nomi";

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/authentification/user-auth");
app.use("/", auth);

const userManagement = require("./routes/user-management-route");
app.use("/", userManagement);

const furniture = require("./routes/furniture-route");
app.use("/", furniture);

const manufacturer = require("./routes/manufacturer-route");
app.use("/", manufacturer);

const quote = require("./routes/user-quotes-route");
app.use("/", quote);

module.exports = app;
