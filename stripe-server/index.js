const express = require("express");const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const list = stripe.taxRates
	.list({
		limit: 3,
	})
	.then((taxRates) => {
		console.log("Tax rates", taxRates);
	})
	.catch((error) => {
		console.log("Error while fetching tax rates", error);
	});
app.post("/stripe/charge", cors(), async (req, res) => {
	console.log("stripe-routes.js 9 | route reached", req.body);
	let { amount, id, currency, description } = req.body;
	console.log("stripe-routes.js 10 | amount and id", amount, id);
	try {
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: currency,
			description: description,
			payment_method: id,
			confirm: true,
		});
		console.log("stripe-routes.js 19 | payment", payment);
		res.json({
			message: "Payment Successful",
			success: true,
			payment: payment,
		});
	} catch (error) {
		console.log("stripe-routes.js 17 | error", error);
		res.json({
			message: "Payment Failed",
			success: false,
			error: error,
		});
	}
});

app.post("/cancel-subscription", cors(), async (req, res) => {
	try {
		// Delete the subscription
		const deletedSubscription = await stripe.subscriptions.del(
			req.body.subscriptionId
		);
		res.send(deletedSubscription);
	} catch (error) {
		if (error?.message) {
			return res.status(400).json({
				message: error?.message,
			});
		} else {
			return res.status(400).json({
				message: "Something went wrong",
			});
		}
	}
});

app.post("/stripe/subscription", cors(), async (req, res) => {
	console.log("stripe-routes.js 9 | route reached", req.body);
	// console.log("stripe-routes.js 10 | planId and email", planId, email);
	// const updatedSubscription = await stripe.subscriptions.update(
	// 	"sub_1NYniGCUBa9fLoA5dBM6hdOw",
	// 	{
	// 		cancel_at_period_end: true,
	// 	}
	// );

	// console.log("updatedSubscription", updatedSubscription);

	// return;
	try {
		let { paymentMethod, productId, amount, period, interval } = req.body;

		if (
			paymentMethod == undefined ||
			productId == undefined ||
			amount == undefined ||
			interval == undefined
		) {
			return res.status(400).json({
				message: "Missing parameters",
			});
		}

		let customer = await stripe.customers.create({
			email: paymentMethod?.billing_details?.email,
			name: paymentMethod?.billing_details?.name,
			payment_method: paymentMethod.id,
			invoice_settings: {
				default_payment_method: paymentMethod.id,
			},
		});
		let items = [];
		if (period != undefined) {
			items = [
				{
					// plan: planId,
					price_data: {
						currency: "EUR",
						product: productId,
						unit_amount: amount, //total amount in string
						recurring: {
							interval: interval,
							interval_count: period,
						},
					},
				},
			];
		} else {
			items = [
				{
					// plan: planId,
					price_data: {
						currency: "EUR",
						product: productId,
						unit_amount: amount, //total amount in string
						recurring: {
							interval: interval,
						},
					},
				},
			];
		}

		let subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: items,
			payment_settings: {
				payment_method_types: ["card"],
				save_default_payment_method: "on_subscription",
			},
			expand: ["latest_invoice.payment_intent"],
		});

		const paymentIntent = subscription?.latest_invoice?.payment_intent;

		return res.status(200).json({
			data: {
				clientSecret:
					subscription?.latest_invoice?.payment_intent?.client_secret,
				subscriptionId: subscription?.id,
				paymentIntent: paymentIntent,
			},
			message: "Subscription successfull.",
		});
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
});

const options = {
	key: fs.readFileSync("./private.key"),
	cert: fs.readFileSync("./certificate.crt"),
};
const port = process.env.PORT || 3001;

https.createServer(options, app).listen(port, () => {
	console.log("Server started...", port, list);
});
