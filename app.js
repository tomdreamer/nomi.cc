require("dotenv").config();

const bodyParser 		= require("body-parser");
const cookieParser 	= require("cookie-parser");
const express 			= require("express");
const favicon 			= require("serve-favicon");
const hbs 					= require("hbs");
const mongoose 			= require("mongoose");
const logger 				= require("morgan");
const path 					= require("path");
const flash 				= require('connect-flash');
const session      	= require('express-session');
const MongoStore   	= require('connect-mongo')(session); 
const passport     	= require('passport');

mongoose
	.connect("mongodb://localhost/nomi", { useNewUrlParser: true })
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

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//make our Expres app create sessions (moe on this tomorow)
app.use(
  session({
  // "saveUninitialized & resave are just to avoid "
  saveUninitialized: true,
  resave: true,
  //secret should be a string  that's different for every app
  secret: "ca^khT8KYd,G73C7R9(;^atb?h>FTWdbn4pqEFUKs3",
  // store session data inside our MongoDB with the "connect-mongo" package
  store: new MongoStore({mongooseConnection: mongoose.connection}),
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
app.use((req, res, next)=>{
  // send flash messages to the hbs file
  // (req.flash()comes from the "connect-flash" npm package)
  res.locals.messages = req.flash();

  //send the logged-in user's info to hbs files for ALL pages
  //(req.user is defined by Passport and contains the logged-in user's info)
  res.locals.currentUser = req.user;

  //tel Express we are ready to move to the routes now
  // (you need this or your pages will stat loading forever)
  next();
});

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/authentification/user-auth");
app.use("/", auth);
module.exports = app;
