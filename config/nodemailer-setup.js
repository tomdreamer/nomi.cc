// routes that needs to send email will be connected to this file

const nodemailer = require("nodemailer");

// transport is an email instance (Rails mailer)

const transport = nodemailer.createTransport({
	auth: {
		service: "Gmail",
		user: process.env.GMAIL_ID,
		pass: process.env.GMAIL_KEY
	}
});

// define a function to send each specific email (method)
function sendSignUpMail(email, name) {
	// return it to be able to make a then and catch to asset success inside the route
	return transport.sendMail({
		// from "Maya from Nomi <maya@nomi.com>" on sendgrid for the user to reply
		from: "Maya from Nomi",
		to: `${name} <${email}>`,
		subject: `Thank you for joining ${name}`,
		text: `<h4>Welcome ${name} </h4><br>Thank you for sign up on Nomi. TODO change according to user status`,
		html: "Foobar version email"
	});
}

// template for adding an other one later..
function sendResetMail(email, name) {
	return transport.sendMail({
		from: "Jules from Nomi",
		to: `${name} <${email}>`,
		subject: `Thank you for joining ${name}`,
		text: `<h4>Hi ${name} </h4><br>If you asked to reset your password please go <a href="#">here</a>`,
		html: "If you asked to reset your password please go here:  www.foo.bar"
	});
}

module.exports = { sendSignUpMail, sendResetMail };
