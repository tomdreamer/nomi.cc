//seed stuff into db
require("dotenv").config();

// importing mongo stuff
const mongoose = require("mongoose");
const User = require("../models/user-model");
const Furniture = require("../models/furniture-model");
const Manufacturer = require("../models/manufacturer-model");
const bcrypt = require("bcrypt");

// fake data
const userData = require("./users.json");
const furnitureData = require("./furnitures.json");
const manufacturerData = require("./manufacturers.json");

mongoose
	.connect(process.env.MONGODB_URI, {
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
		console.log("Please fill .env file to setup defaults admins");
		throw e;
	} else {
		console.log(
			`Administrators ${admin1.name} and ${admin2.name} were created !`
		);
	}
});

User.create(userData)
	.then(data => {
		console.log("🤼‍", userData.length, "users were added.");
	})
	.catch(err => {
		console.log("Users are crying..something is wrong  💩", err);
	});

Furniture.create(furnitureData)
	.then(data => {
		console.log("🛋", furnitureData.length, "furnitures were added.");
	})
	.catch(err => {
		console.log("Chairs are flying..something is wrong 💩", err);
	});

Manufacturer.create(manufacturerData)
	.then(data => {
		console.log("🌟", manufacturerData.length, "fab labs were added.");
	})
	.catch(err => {
		console.log("Drills are singing..something is wrong 💩", err);
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
//     role: '{{random("editor", "designer", "crafter", "customer")}}',
//     encryptedPassword: 'TOCHANGE'
//   }
// ]

// FURNITURE
// [
// 	'{{repeat(50, 50)}}',
// 	{
// 		name: '{{company()}}',
// 		serialNumber: '{{guid()}}',
// 		type: '{{random("desk", "storage", "table", "lamp", "seating")}}',
// 		description: '{{lorem(1, "paragraphs")}}',
// 		size: {
// 			width: '{{integer(4, 150)}}',
// 			height: '{{integer(12, 255)}}',
// 			depth: '{{integer(32, 128)}}'
// 		},
// 		stdPrice: '{{integer(199, 2500)}}',
// 		pictures: {
// 			url: ['https://dummyimage.com/1920x1080/aed6ce/ffffff.jpg', 'https://dummyimage.com/1920x1080/d4aeae/ffffff.jpg', 'https://dummyimage.com/1920x1080/aeb3d4/ffffff.jpg', 'https://dummyimage.com/1920x1080/d4c9ae/ffffff.jpg']
// 		},
// 		material: '{{random("wood", "copper", "steel", "fiber", "cloth")}}',
// 		isActive: '{{bool()}}'
// 	}
// ]

// MANUFACTURERS
// [
// 	"{{repeat(128, 128)}}",
// 	{
// 		name: "{{city()}} {{random(\"Lab\", \"FabLab\", \"Fabric\")}}",
// 		address: {
// 			streetAddress: "{{integer(1, 115)}} {{street()}}",
// 			city: "{{city()}}",
// 			zipCode: "{{integer(10000, 99999)}}",
// 			country: "{{country()}}"
// 		},
// 		description: "{{lorem(2, \"paragraphs\")}}",
// 		email: "{{email()}}",
// 		phoneNum: "+1 {{phone()}}",
// 		position: {
// 			latitude: "{{floating(-90.000001, 90)}}",
// 			longitude: "{{floating(-180.000001, 180)}}"
// 		},
// 		pictures: ["https://dummyimage.com/1920x1080/323cc7/a3a3a3.jpg", "https://dummyimage.com/1920x1080/c73434/a3a3a3.jpg", "https://dummyimage.com/1920x1080/36b8c7/a3a3a3.jpg", "https://dummyimage.com/1920x1080/c9b042/a3a3a3.jpg"],
// 		isActive: "{{bool()}}",
// 		availableProcess: [
// 			"{{random(\"cutting\", \"drilling\", \"engraving\")}}",
// 			"{{random(\"wielding\", \"milling\", \"milling\")}}",
// 			"{{random(\"heating\", \"printing\", \"printing\")}}"
// 		]
// 	}
// ]
