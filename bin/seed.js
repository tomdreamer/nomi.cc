//seed stuff into db
require("dotenv").config();

// importing mongo stuff
const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// fake data
const userData = require("./users.json");

mongoose
	.connect("mongodb://localhost/nomi", {
		useNewUrlParser: true
	})
	.then(x => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch(err => {
		console.error("Error connecting to mongo", err);
	});

const adminPassword = bcrypt.hashSync(process.env.ADMIN1_PASSWORD, 12);
const adminPassword2 = bcrypt.hashSync(process.env.ADMIN2_PASSWORD, 12);

var admin1 = {
	name: "Thomas",
	surname: "Lesage",
	email: process.env.ADMIN1_USERNAME,
	phoneNum: "+1 (871) 476-3584",
	description:
		"Ad ut qui laboris ut cupidatat ex aute enim laboris nisi tempor officia. Eiusmod irure laboris nisi consectetur ipsum id amet anim minim minim in duis eiusmod. Nisi cillum eu commodo laboris id. Magna ullamco excepteur exercitation incididunt aliquip proident magna elit nulla ad nisi.\r\nId aute non labore est ex sit incididunt aliquip. Consequat aute eu consectetur excepteur esse adipisicing qui in. Enim consequat Lorem dolore mollit deserunt dolore qui dolore fugiat laborum nisi ut aute duis. Ea deserunt ad Lorem commodo proident. Id reprehenderit nisi ad ut magna pariatur est non deserunt aliqua ad ea pariatur. Laborum deserunt dolor officia enim incididunt nulla irure sint consectetur dolor. Eiusmod id minim laborum incididunt qui officia ipsum velit non.\r\nSit velit dolor magna nisi commodo commodo ea. Aute voluptate tempor laborum laboris eiusmod. Cillum duis dolor cupidatat do incididunt culpa ipsum aliqua mollit do qui laborum labore. Aliqua consequat sint cillum do magna quis ex eiusmod.\r\n",
	picture:
		"https://dummyimage.com/600x600/cccccc/eeeeee.jpg&text=Admin+Pic+600%5E2",
	company: "Nomi",
	terms: true,
	isActive: true,
	role: "admin",
	encryptedPassword: adminPassword
};

var admin2 = {
	name: "Samuel",
	surname: "Bouaroua",
	email: process.env.ADMIN2_USERNAME,
	phoneNum: "+1 (871) 476-3584",
	description:
		"Ad ut qui laboris ut cupidatat ex aute enim laboris nisi tempor officia. Eiusmod irure laboris nisi consectetur ipsum id amet anim minim minim in duis eiusmod. Nisi cillum eu commodo laboris id. Magna ullamco excepteur exercitation incididunt aliquip proident magna elit nulla ad nisi.\r\nId aute non labore est ex sit incididunt aliquip. Consequat aute eu consectetur excepteur esse adipisicing qui in. Enim consequat Lorem dolore mollit deserunt dolore qui dolore fugiat laborum nisi ut aute duis. Ea deserunt ad Lorem commodo proident. Id reprehenderit nisi ad ut magna pariatur est non deserunt aliqua ad ea pariatur. Laborum deserunt dolor officia enim incididunt nulla irure sint consectetur dolor. Eiusmod id minim laborum incididunt qui officia ipsum velit non.\r\nSit velit dolor magna nisi commodo commodo ea. Aute voluptate tempor laborum laboris eiusmod. Cillum duis dolor cupidatat do incididunt culpa ipsum aliqua mollit do qui laborum labore. Aliqua consequat sint cillum do magna quis ex eiusmod.\r\n",
	picture:
		"https://dummyimage.com/600x600/cccccc/eeeeee.jpg&text=Admin+Pic+600%5E2",
	company: "Nomi",
	terms: true,
	isActive: true,
	role: "admin",
	encryptedPassword: adminPassword2
};

User.create(admin1, admin2, function(e) {
	if (e) {
		throw e;
	} else {
		console.log(`${admin1.name} ${admin1.name} were created !💃`);
	}
});

User.create(userData)
	.then(data => {
		console.log("🔥", userData.length, "users were added.");
	})
	.catch(err => {
		console.log("Something went wrong...", err);
	});

// TEMPLATES

// USER

// [
//   '{{repeat(5, 7)}}',
//   {
//     name: '{{firstName()}}',
//     surname: '{{surname()}}',
//     email: '{{email()}}',
//     phoneNum: '+1 {{phone()}}',
// 	description : '{{lorem(3, "paragraphs")}}',
//     picture: 'http://placehold.it/600x400',
//     company: '{{company()}}',
//     terms: '{{bool()}}',
//     isActive: '{{bool()}}',
//     role: '{{random("editor", "designer", "owner", "customer")}}',
//     encryptedPassword: 'TOCHANGE'
//   }
// ]
