import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../stripe/Checkout";
import { useLocation } from "react-router-dom";
import { CheckoutForm2 } from "../stripe/Checkout2";
const stripePromise = loadStripe(
	"pk_live_51IG0LCCUBa9fLoA5Mh0299FJ2RBqbwTYrA0B30qbqTra9tDxXjyW1y57YIhkeCjh5UafhsMEu8z599KBSSm8c3fL00hVBFPicQ"
);
// "pk_test_51IG0LCCUBa9fLoA5hRaUzVfWF2LJE9MZaWN4PQI2kzN21B3mZ2QfT5wkZ45v83Qt6dgRIjYIqCLK4f13IQgeygXp00gM79GiG1"

function Payment(props) {
	const { state } = useLocation();
	return (
		<>
			<Elements stripe={stripePromise}>
				<CheckoutForm2
					data={"20"}
					note={state?.note}
					amount={state?.amount}
					plan={state?.plan}
					subscription_plan_id={state?.subscription_plan_id}
					planType={state?.planType}
					product_id={state?.product_id}
				/>
			</Elements>
			{/* state.amount */}
		</>
	);
}
export default Payment;
