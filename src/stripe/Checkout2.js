import React, { useEffect, useState } from "react";
import {
	CardElement,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { country } from "../pages/dashboard/country";
import validator from "validator";
import {
	api,
	api2,
	stripe_cancel_sub,
	stripe_charge,
	stripe_costumer,
	stripe_recurring_subscription,
	stripe_tax_rate,
	Vat_check_api,
	vat_rate_api,
} from "../pages/base_url";
import Left_menu from "../pages/productpages/left_menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { CountryCodes } from "validator/lib/isiso31661alpha2";

// const paymentdata = { "plan_type": 1, "res": null, "payment_status": "succeeded", "billing_details": { "address": { "city": "test", "country": "IN", "line1": "test", "postal_code": "222333" }, "email": "madhuramnj@gmail.com", "name": "madhura joshi", "phone": "2233445566" }, "recurring_payment": null, "promo_code": null, "discount": null, "discount_amount": null, "payment_id": "pi_3O2xaFCUBa9fLoA50wlqNeLe", "amount": "0.50", "payment_json_data": { "id": "pi_3O2xaFCUBa9fLoA50wlqNeLe", "object": "payment_intent", "amount": 50, "amount_capturable": 0, "amount_details": { "tip": {} }, "amount_received": 50, "application": null, "application_fee_amount": null, "automatic_payment_methods": null, "canceled_at": null, "cancellation_reason": null, "capture_method": "automatic", "charges": { "object": "list", "data": [{ "id": "ch_3O2xaFCUBa9fLoA50b9CDzV7", "object": "charge", "amount": 50, "amount_captured": 50, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3O2xaFCUBa9fLoA50pFghb66", "billing_details": { "address": { "city": "test", "country": "IN", "line1": "test", "line2": null, "postal_code": "222333", "state": null }, "email": "madhuramnj@gmail.com", "name": "madhura joshi", "phone": "2233445566" }, "calculated_statement_descriptor": "HEALTH AND BEAUTY MKTG", "captured": true, "created": 1697727143, "currency": "eur", "customer": null, "description": "All Payments Done by madhura joshi", "destination": null, "dispute": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "invoice": null, "livemode": true, "metadata": {}, "on_behalf_of": null, "order": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": "pi_3O2xaFCUBa9fLoA50wlqNeLe", "payment_method": "pm_1O2xaCCUBa9fLoA51jIzXu7h", "payment_method_details": { "card": { "amount_authorized": 50, "brand": "mastercard", "checks": { "address_line1_check": "unavailable", "address_postal_code_check": "unavailable", "cvc_check": "pass" }, "country": "IN", "exp_month": 9, "exp_year": 2024, "extended_authorization": { "status": "disabled" }, "fingerprint": "ZOi9gGIK0LxJhHdC", "funding": "credit", "incremental_authorization": { "status": "unavailable" }, "installments": null, "last4": "7472", "mandate": null, "multicapture": { "status": "unavailable" }, "network": "mastercard", "network_token": { "used": false }, "overcapture": { "maximum_amount_capturable": 50, "status": "unavailable" }, "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcQARoXChVhY2N0XzFJRzBMQ0NVQmE5ZkxvQTUoqIXFqQYyBmx6hyi5azosFhPI_6JB5fp5hji0tigaB91W6nDZBu3eeRQ5aQWXTyzpkLFSyTwBZxlTXRA", "refunded": false, "refunds": { "object": "list", "data": [], "has_more": false, "total_count": 0, "url": "/v1/charges/ch_3O2xaFCUBa9fLoA50b9CDzV7/refunds" }, "review": null, "shipping": null, "source": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null }], "has_more": false, "total_count": 1, "url": "/v1/charges?payment_intent=pi_3O2xaFCUBa9fLoA50wlqNeLe" }, "client_secret": "pi_3O2xaFCUBa9fLoA50wlqNeLe_secret_dXRxxDgTWQKKvlQyPcrIGCvhE", "confirmation_method": "automatic", "created": 1697727143, "currency": "eur", "customer": null, "description": "All Payments Done by madhura joshi", "invoice": null, "last_payment_error": null, "latest_charge": "ch_3O2xaFCUBa9fLoA50b9CDzV7", "livemode": true, "metadata": {}, "next_action": null, "on_behalf_of": null, "payment_method": "pm_1O2xaCCUBa9fLoA51jIzXu7h", "payment_method_configuration_details": null, "payment_method_options": { "card": { "installments": null, "mandate_options": null, "network": null, "request_three_d_secure": "automatic" } }, "payment_method_types": ["card"], "processing": null, "receipt_email": null, "review": null, "setup_future_usage": null, "shipping": null, "source": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null }, "subscription_plan_id": 14, "vat_number": "N/A", "vat_amount": -40, "product_id": null }

const paymentdata = {
	"subscriptionId": "sub_1NyFpMCUBa9fLoA507oLKCyQ", "res": {
		"id": "sub_1NyFpMCUBa9fLoA507oLKCyQ",
		"object": "subscription",
		"application": null,
		"application_fee_percent": null,
		"automatic_tax": {
			"enabled": false
		},
		"billing_cycle_anchor": 1696605632,
		"billing_thresholds": null,
		"cancel_at": null,
		"cancel_at_period_end": false,
		"canceled_at": null,
		"cancellation_details": {
			"comment": null,
			"feedback": null,
			"reason": null
		},
		"collection_method": "charge_automatically",
		"created": 1696605632,
		"currency": "eur",
		"current_period_end": 1699284032,
		"current_period_start": 1696605632,
		"customer": "cus_OlnQ7hLgNrW0z1",
		"days_until_due": null,
		"default_payment_method": "pm_1NyFpKCUBa9fLoA5jBlMwmVD",
		"default_source": null,
		"default_tax_rates": [],
		"description": null,
		"discount": null,
		"ended_at": null,
		"items": {
			"object": "list",
			"data": [
				{
					"id": "si_OlnQRvX0MYa4ja",
					"object": "subscription_item",
					"billing_thresholds": null,
					"created": 1696605633,
					"metadata": {},
					"plan": {
						"id": "price_1NyFpMCUBa9fLoA5xQwJpUMy",
						"object": "plan",
						"active": false,
						"aggregate_usage": null,
						"amount": 150,
						"amount_decimal": "150",
						"billing_scheme": "per_unit",
						"created": 1696605632,
						"currency": "eur",
						"interval": "month",
						"interval_count": 1,
						"livemode": true,
						"metadata": {},
						"nickname": null,
						"product": "prod_OlP3rZAtHHm22L",
						"tiers_mode": null,
						"transform_usage": null,
						"trial_period_days": null,
						"usage_type": "licensed"
					},
					"price": {
						"id": "price_1NyFpMCUBa9fLoA5xQwJpUMy",
						"object": "price",
						"active": false,
						"billing_scheme": "per_unit",
						"created": 1696605632,
						"currency": "eur",
						"custom_unit_amount": null,
						"livemode": true,
						"lookup_key": null,
						"metadata": {},
						"nickname": null,
						"product": "prod_OlP3rZAtHHm22L",
						"recurring": {
							"aggregate_usage": null,
							"interval": "month",
							"interval_count": 1,
							"trial_period_days": null,
							"usage_type": "licensed"
						},
						"tax_behavior": "unspecified",
						"tiers_mode": null,
						"transform_quantity": null,
						"type": "recurring",
						"unit_amount": 150,
						"unit_amount_decimal": "150"
					},
					"quantity": 1,
					"subscription": "sub_1NyFpMCUBa9fLoA507oLKCyQ",
					"tax_rates": []
				}
			],
			"has_more": false,
			"total_count": 1,
			"url": "/v1/subscription_items?subscription=sub_1NyFpMCUBa9fLoA507oLKCyQ"
		},
		"latest_invoice": "in_1NyFpMCUBa9fLoA5ap7uoBmE",
		"livemode": true,
		"metadata": {},
		"next_pending_invoice_item_invoice": null,
		"on_behalf_of": null,
		"pause_collection": null,
		"payment_settings": {
			"payment_method_options": null,
			"payment_method_types": [
				"card"
			],
			"save_default_payment_method": "on_subscription"
		},
		"pending_invoice_item_interval": null,
		"pending_setup_intent": null,
		"pending_update": null,
		"plan": {
			"id": "price_1NyFpMCUBa9fLoA5xQwJpUMy",
			"object": "plan",
			"active": false,
			"aggregate_usage": null,
			"amount": 150,
			"amount_decimal": "150",
			"billing_scheme": "per_unit",
			"created": 1696605632,
			"currency": "eur",
			"interval": "month",
			"interval_count": 1,
			"livemode": true,
			"metadata": {},
			"nickname": null,
			"product": "prod_OlP3rZAtHHm22L",
			"tiers_mode": null,
			"transform_usage": null,
			"trial_period_days": null,
			"usage_type": "licensed"
		},
		"quantity": 1,
		"schedule": null,
		"start_date": 1696605632,
		"status": "active",
		"test_clock": null,
		"transfer_data": null,
		"trial_end": null,
		"trial_settings": {
			"end_behavior": {
				"missing_payment_method": "create_invoice"
			}
		},
		"trial_start": null
	},
	"plan_type": null, "payment_status": "succeeded", "billing_details": { "address": { "city": "pune", "country": "IN", "line1": "Nizarneshwar garden b wing", "postal_code": "222333" }, "email": "rupa.sds07@gmail.com", "name": "madhura joshi", "phone": "2233445566" }, "promo_code": null, "discount": null, "discount_amount": null, "payment_id": "pi_3O2zQICUBa9fLoA50c2Lmlkp", "amount": "0.50", "payment_json_data": { "id": "pi_3O2zQICUBa9fLoA50c2Lmlkp", "object": "payment_intent", "amount": 50, "amount_capturable": 0, "amount_details": { "tip": {} }, "amount_received": 0, "application": null, "application_fee_amount": null, "automatic_payment_methods": null, "canceled_at": null, "cancellation_reason": null, "capture_method": "automatic", "charges": { "object": "list", "data": [], "has_more": false, "total_count": 0, "url": "/v1/charges?payment_intent=pi_3O2zQICUBa9fLoA50c2Lmlkp" }, "client_secret": "pi_3O2zQICUBa9fLoA50c2Lmlkp_secret_KIhial1vHqNlmcWFMqtvZlT4l", "confirmation_method": "automatic", "created": 1697734214, "currency": "eur", "customer": "cus_OqgnfvXsFuYUPw", "description": "Subscription creation", "invoice": "in_1O2zQICUBa9fLoA5MQow1120", "last_payment_error": null, "latest_charge": null, "livemode": true, "metadata": {}, "next_action": { "type": "use_stripe_sdk", "use_stripe_sdk": { "directory_server_encryption": { "algorithm": "RSA", "certificate": "-----BEGIN CERTIFICATE-----\nMIIFADCCAuigAwIBAgIIDzMLWm4xrKMwDQYJKoZIhvcNAQELBQAwejELMAkGA1UE\nBhMCVVMxEzARBgNVBAoTCk1hc3RlckNhcmQxKDAmBgNVBAsTH01hc3RlckNhcmQg\nSWRlbnRpdHkgQ2hlY2sgR2VuIDMxLDAqBgNVBAMTI1BSRCBNYXN0ZXJDYXJkIDNE\nUzIgQWNxdWlyZXIgU3ViIENBMB4XDTIxMDYxNjIwNDgyNloXDTI0MDYxNTIwNDgy\nNlowgaYxJjAkBgNVBAMMHTNkczIuZGlyZWN0b3J5Lm1hc3RlcmNhcmQuY29tMScw\nJQYDVQQLDB5zZGstZGV2aWNlaW5mby1lbmNyeXB0LWRlY3J5cHQxHTAbBgNVBAoM\nFE1hc3RlckNhcmQgV29ybGRXaWRlMRQwEgYDVQQHDAtTYWludCBMb3VpczERMA8G\nA1UECAwITWlzc291cmkxCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOC\nAQ8AMIIBCgKCAQEAxhfEFuMQfwKcHwSm1rbHmT82eKSCmgpf+8QZwuIBCofl62Y5\nXDli5eOQeo5+iToJKKgEroMLrIjvvXDSp5MHu0mDmTChD4hiy9s4cAkJokBObgU9\nHorCOsjSwqNuFovO3jXMp4lgeCTFsF5iAJTZBPN0Nyg2mVZ4kjyAc/4V5oaKEmCg\nA+Kbi0UNum9n2wN/UYpNiZktk+lr0XrCoOs7KKxGQ2upI7Lr3pO0unIput0IcGQC\ncehQM4UYvd31x5u8harrun7c6H3jmpPoqEy3DqojvxR05B7zlkqUdbYGu579pCMR\nijXMyyRfrWEip44pEzJLz1kNCUcvPV8G3ltP3QIDAQABo10wWzAOBgNVHQ8BAf8E\nBAMCACgwCQYDVR0TBAIwADAdBgNVHQ4EFgQUPF7TGQqa5LaSVmu/3nSDvigAI4gw\nHwYDVR0jBBgwFoAUmpKiVMeAjf7OVuMDFP9e7ki4RbswDQYJKoZIhvcNAQELBQAD\nggIBAHoHWo3G9XEHGBc/L4JuW6ZZXvZmAThQb71WBxsvOMZOw/SDLO50ksG1y/Xt\nzCbpkM9PktiNx6+HDusJMhaop6jCkkKTJlG7TYxbN8sHpTI/G21nAgMBP5anePll\nO8Wcw/uMW9FzycyDMCryTVfriwxvLSeVcbB4N5x/wUBe54c+fVOBXw0Dczdw5/JE\nIcZs98O2rX+YQCaYMhxwJoil99ogIKEqFcHuSrqlpiXeaD8xC3gRewUyfr1roHNG\nr3KQWH3Kjdkk4TrXeAxdh0JfGJecHzm6oxekQOmm4jcxJoh84fRjCPsdq83r12Er\nLK2CuyXN0eTgz+VooM2lqU6YZorBAtLfVzckiCFFHek8kc2Jx7bTdreOO0vHQiwj\nNKdkVwge4hVDoVyp3rulBVFPTXduP0yGF/OYaUt84wz5I7Cjphw2d/MlZetXO0Bx\n7kXq+WRbgwrTi+aiL6TxOdONyrATODOP39rKLSpot4Jil4M4JeT9oy5g0JuTddwe\nFXmemcG1M0L2C6qGx79Hx8gpdEKRM4t6/vNia98kBFBFBHRwCr37hsiAmMeRRG2n\n7GtQFECJxVXkVbNXPjnPQkrY1fPFlTr9+CIKse2mtzG8nexhQUyIEvvuIDlNefmF\n+UrJ/C3zO2IlF0Um8Rk8L85gJNDMexmDx7Sx5aDj8zFC6hgI\n-----END CERTIFICATE-----\n", "directory_server_id": "A000000004", "key_id": "3c5ed3190a9ae4b692566bbfde7483be28002388", "root_certificate_authorities": ["-----BEGIN CERTIFICATE-----\nMIIFxzCCA6+gAwIBAgIQFsjyIuqhw80wNMjXU47lfjANBgkqhkiG9w0BAQsFADB8\nMQswCQYDVQQGEwJVUzETMBEGA1UEChMKTWFzdGVyQ2FyZDEoMCYGA1UECxMfTWFz\ndGVyQ2FyZCBJZGVudGl0eSBDaGVjayBHZW4gMzEuMCwGA1UEAxMlUFJEIE1hc3Rl\nckNhcmQgSWRlbnRpdHkgQ2hlY2sgUm9vdCBDQTAeFw0xNjA3MTQwNzI0MDBaFw0z\nMDA3MTUwODEwMDBaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpNYXN0ZXJDYXJk\nMSgwJgYDVQQLEx9NYXN0ZXJDYXJkIElkZW50aXR5IENoZWNrIEdlbiAzMS4wLAYD\nVQQDEyVQUkQgTWFzdGVyQ2FyZCBJZGVudGl0eSBDaGVjayBSb290IENBMIICIjAN\nBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxZF3nCEiT8XFFaq+3BPT0cMDlWE7\n6IBsdx27w3hLxwVLog42UTasIgzmysTKpBc17HEZyNAqk9GrCHo0Oyk4JZuXHoW8\n0goZaR2sMnn49ytt7aGsE1PsfVup8gqAorfm3IFab2/CniJJNXaWPgn94+U/nsoa\nqTQ6j+6JBoIwnFklhbXHfKrqlkUZJCYaWbZRiQ7nkANYYM2Td3N87FmRanmDXj5B\nG6lc9o1clTC7UvRQmNIL9OdDDZ8qlqY2Fi0eztBnuo2DUS5tGdVy8SgqPM3E12ft\nk4EdlKyrWmBqFcYwGx4AcSJ88O3rQmRBMxtk0r5vhgr6hDCGq7FHK/hQFP9LhUO9\n1qxWEtMn76Sa7DPCLas+tfNRVwG12FBuEZFhdS/qKMdIYUE5Q6uwGTEvTzg2kmgJ\nT3sNa6dbhlYnYn9iIjTh0dPGgiXap1Bhi8B9aaPFcHEHSqW8nZUINcrwf5AUi+7D\n+q/AG5ItiBtQTCaaFm74gv51yutzwgKnH9Q+x3mtuK/uwlLCslj9DeXgOzMWFxFg\nuuwLGX39ktDnetxNw3PLabjHkDlGDIfx0MCQakM74sTcuW8ICiHvNA7fxXCnbtjs\ny7at/yXYwAd+IDS51MA/g3OYVN4M+0pG843Re6Z53oODp0Ymugx0FNO1NxT3HO1h\nd7dXyjAV/tN/GGcCAwEAAaNFMEMwDgYDVR0PAQH/BAQDAgGGMBIGA1UdEwEB/wQI\nMAYBAf8CAQEwHQYDVR0OBBYEFNSlUaqS2hGLFMT/EXrhHeEx+UqxMA0GCSqGSIb3\nDQEBCwUAA4ICAQBLqIYorrtVz56F6WOoLX9CcRjSFim7gO873a3p7+62I6joXMsM\nr0nd9nRPcEwduEloZXwFgErVUQWaUZWNpue0mGvU7BUAgV9Tu0J0yA+9srizVoMv\nx+o4zTJ3Vu5p5aTf1aYoH1xYVo5ooFgl/hI/EXD2lo/xOUfPKXBY7twfiqOziQmT\nGBuqPRq8h3dQRlXYxX/rzGf80SecIT6wo9KavDkjOmJWGzzHsn6Ryo6MEClMaPn0\nte87ukNN740AdPhTvNeZdWlwyqWAJpsv24caEckjSpgpoIZOjc7PAcEVQOWFSxUe\nsMk4Jz5bVZa/ABjzcp+rsq1QLSJ5quqHwWFTewChwpw5gpw+E5SpKY6FIHPlTdl+\nqHThvN8lsKNAQg0qTdEbIFZCUQC0Cl3Ti3q/cXv8tguLJNWvdGzB600Y32QHclMp\neyabT4/QeOesqpx6Da70J2KvLT1j6Ch2BsKSzeVLahrjnoPrdgiIYYBOgeA3T8SE\n1pgagt56R7nIkRQbtesoRKi+NfC7pPb/G1VUsj/cREAHH1i1UKa0aCsIiANfEdQN\n5Ok6wtFJJhp3apAvnVkrZDfOG5we9bYzvGoI7SUnleURBJ+N3ihjARfL4hDeeRHh\nYyLkM3kEyEkrJBL5r0GDjicxM+aFcR2fCBAkv3grT5kz4kLcvsmHX+9DBw==\n-----END CERTIFICATE-----\n"] }, "directory_server_name": "mastercard", "merchant": "acct_1IG0LCCUBa9fLoA5", "one_click_authn": null, "server_transaction_id": "b126d766-30ad-41d6-b75d-a3658171b1ad", "three_d_secure_2_source": "payatt_3O2zQICUBa9fLoA5028M0drq", "three_ds_method_url": "https://secure-acs2ui-b2.wibmo.com/v1/acs/services/threeDSMethod/8111?cardType=M", "three_ds_optimizations": "kf", "type": "stripe_3ds2_fingerprint" } }, "on_behalf_of": null, "payment_method": "pm_1O2zQFCUBa9fLoA5r3aIMwuc", "payment_method_configuration_details": null, "payment_method_options": { "card": { "installments": null, "mandate_options": { "amount": 50, "amount_type": "maximum", "description": "subscription", "end_date": null, "interval": "month", "interval_count": 1, "reference": "sub_1O2zQICUBa9fLoA5P3AJlCCt - 1697734214", "start_date": 1697734214, "supported_types": ["india"] }, "network": null, "request_three_d_secure": "any" } }, "payment_method_types": ["card"], "processing": null, "receipt_email": null, "review": null, "setup_future_usage": "off_session", "shipping": null, "source": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "requires_action", "transfer_data": null, "transfer_group": null }, "subscription_plan_id": 15, "vat_number": "N/A", "vat_amount": -150, "product_id": null
}
export const CheckoutForm2 = (props) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isPaymentLoading, setPaymentLoading] = React.useState(false);
	const [texdata, settexdata] = React.useState([]);
	const [amount, setamount] = React.useState(props.amount);
	const [countryCode, setCountryCode] = useState();
	const [sidebar, setsidebar] = useState(true);
	const [showVat, setshowVat] = useState(false);
	const [vat, setVat] = useState("");
	const [country_name, setcountry_name] = useState("");
	const [vatError, setVatError] = useState(false);
	const [vatLoading, setVatLoading] = useState(false);
	const [loadingDiscount, setLoadingDiscount] = useState(false);
	const { state } = useLocation();
	const [paymentCardData, setPaymentCardData] = useState({});
	const [isValidCode, setIsValidCode] = useState(false);
	const [discountCodeError, setDiscountCodeError] = useState("");
	const [isValidVat, setIsValidVat] = useState(false);
	const [final_amount_show, setfinal_amount_show] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState("");
	const [amountIncludingVat, setAmountIncludingVat] = useState(null);
	const navigate = useNavigate();
	let billingdata = {};
	let e = true;
	const [detail_data, setdetail_data] = React.useState({
		address: {
			city: "",
			country: "",
			line1: paymentCardData?.charges?.data[0]?.billing_details?.address?.line1,
			postal_code: "",
		},
		email: paymentCardData?.charges?.data[0]?.billing_details?.email,
		name: paymentCardData?.charges?.data[0]?.billing_details?.name,
		phone: paymentCardData?.charges?.data[0]?.billing_details?.name,
	});
console.log("detail_data >>>>>>>>>>>>>>",detail_data)
	// const [isEmailValid, setIsEmailValid] = useState();
	// const [isName , setIsName] = useState()
	// const validateEmail = (email) => {
	//   setIsEmailValid(validator.isEmail(email.target.value));
	// };
	const [error, setError] = useState({
		isEmailValid: false,
		isName: false,
		isAddress: false,
		isCountry: false,
		isCity: false,
		isPostalcode: false,
		isMobile: false,
		vat: false,
	});
	const [checkbox, setCheckbox] = useState(true);

	let axiosConfig = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": true,
			"Access-Control-Allow-Credentials": true,
		},
	};
	let coutnry_list = [
		"AX",
		"AL",
		"AD",
		"DE",
		"AT",
		"BE",
		"BA",
		"BG",
		"SZ",
		"CY",
		"HR",
		"DK",
		"ES",
		"EE",
		"FI",
		"FO",
		"EL",
		"VA",
		"GG",
		"HU",
		"IE",
		"IM",
		"IT",
		"MK",
		"MD",
		"MC",
		"ME",
		"LV",
		"LI",
		"LT",
		"LU",
		"MT",
		"NL",
		"NO",
		"PL",
		"JE",
		"PT",
		"GI",
		"IS",
		"CZ",
		"RO",
		"RU",
		"SK",
		"SI",
		"CH",
		"UA",
		"YU",
		"SM",
		"GB",
		"SJ",
		"SE",
		"FR",
	];
	useEffect(() => {
		// console.log(country_name, detail_data, props, props?.subscription_plan_id);
	}, [detail_data]);
	useEffect(() => {
		// vat &&
		// 	showVat === true &&
		// 	axios
		// 		.get(`${Vat_check_api}=${vat}`)
		// 		.then(
		// 			(res) => {
		// 				if (res.data.valid === true) {
		// 					setCountryCode(res.data.country_code);
		// 					if (coutnry_list.includes(res.data.country_code)) {
		// 						setVatError(false);
		// 					}
		// 				} else {
		// 					setVatError(true);
		// 					e = true;
		// 				}
		// 			},
		// 			[vat]
		// 		)
		// 		.catch((error) => {
		// 			setVatError(true);
		// 			e = true;
		// 		});
	}, [vat]);

	useEffect(() => {
		if (countryCode != detail_data.address.country && vat != "" && isValidVat) {
			setVatError(true);
			setIsValidVat(false);
			setTimeout(() => setVatError(false), 5000);
		}
	}, [detail_data.address.country]);

	const checkVat = () => {
		setVatLoading(true);
		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append(
			"Cookie",
			"onlinebeauty_session=" + localStorage.getItem("token")
		);
		fetch(`${api}/api/v1/check-vat`, {
			method: "POST",
			body: JSON.stringify({ vat_number: vat }),
			headers: myHeaders,
			redirect: "follow",
		})
			.then((res) => res.json())
			.then((result) => {
				if (result?.Vies == true) {
					setCountryCode(result?.country_code);
					if (coutnry_list.includes(result?.country_code)) {
						setVatError(false);
						setIsValidVat(true);
					}
					if (result?.country_code != detail_data.address.country) {
						setVatError(true);
						setIsValidVat(false);
						setTimeout(() => setVatError(false), 2000);
					}
					setVatLoading(false);
				} else {
					setVatError(true);
					setIsValidVat(false);
					setTimeout(() => setVatError(false), 2000);
					e = true;
					setVatLoading(false);
				}
			})
			.catch((error) => {
				console.log("error", error);
				setVatError(true);
				setIsValidVat(false);
				setTimeout(() => setVatError(false), 2000);
				setVatLoading(false);
				e = true;
			});
			};

	// calculate ammount
	const handleTermsLinkClick = () => {
		navigate("/privacy-terms", { target: "_blank" }, { state: { state: 1 } });
	};

	const calculateAmount = () => {
		let _amount = amount;
		// Calculate the amount based on your conditions
		if (detail_data?.address?.country == "FR") {
			_amount =
				(texdata.filter(
					(data) => data.country === detail_data.address.country
				)[0]
					? _amount +
					  _amount *
							texdata.filter(
								(data) => data.country === detail_data.address.country
							)[0].percentage
					: _amount) *
					100 +
				_amount * 20;
			if (isValidCode != true) {
				setAmountIncludingVat(Math.round(_amount / 100));
			}
			setfinal_amount_show(Math.round(_amount / 100));
			return _amount;
		}
		if (!coutnry_list.includes(detail_data.address.country)) {
			_amount = texdata.filter(
				(data) =>
					data.country === detail_data.address.country &&
					detail_data.address.country !== "IN"
			)[0]?.percentage
				? _amount * 100 +
				  ((_amount *
						texdata.filter(
							(data) => data.country === detail_data.address.country
						)[0].percentage) /
						100) *
						100
				: _amount * 100;
		} else if (
			vatError === false &&
			showVat === true &&
			isValidVat &&
			coutnry_list.includes(detail_data.address.country)
		) {
			_amount = texdata.filter(
				(data) => data.country === detail_data.address.country
			)[0]?.percentage
				? _amount +
				  ((_amount *
						texdata.filter(
							(data) => data.country === detail_data.address.country
						)[0].percentage) /
						100) *
						100
				: _amount * 100;
		} else {
			_amount =
				(texdata.filter(
					(data) => data.country === detail_data.address.country
				)[0]
					? _amount +
					  _amount *
							texdata.filter(
								(data) => data.country === detail_data.address.country
							)[0].percentage
					: _amount) *
					100 +
				_amount * 20;
		}
		if (isValidCode != true) {
			setAmountIncludingVat(Math.round(_amount / 100));
		}
		setfinal_amount_show(Math.round(_amount / 100));
		// setfinal_amount_show(_amount)
		return Math.round(_amount);
	};
	const [discountCode, setDiscountCode] = useState("");

	useEffect(() => {
		if (isValidCode) {
		} else {
			setamount(props?.amount);
		}
	}, [isValidCode]);

	// let final_amount_show = 0;
	// console.log(calculateAmount(), "calculate_ammount");
	useEffect(() => {
		calculateAmount();
	}, [detail_data, vatError, isValidVat, showVat]);
	useEffect(() => {
		console.log(state.plan, "");
	}, [final_amount_show]);

	const validateFields = () => {
		const errors = {};

		if (detail_data?.name === "" || detail_data?.name === undefined) {
			errors.isName = true;
		} else {
			errors.isName = false;
		}

		if (detail_data?.email === undefined || detail_data?.email === "") {
			errors.isEmailValid = true;
		} else {
			errors.isEmailValid = false;
		}

		if (
			detail_data?.address?.line1 === undefined ||
			detail_data?.address?.line1 === ""
		) {
			errors.isAddress = true;
		} else {
			errors.isAddress = false;
		}

		if (detail_data?.address?.country === "") {
			errors.isCountry = true;
		} else {
			errors.isCountry = false;
		}

		if (detail_data?.address?.city === "") {
			errors.isCity = true;
		} else {
			errors.isCity = false;
		}

		if (detail_data?.address?.postal_code === "") {
			errors.isPostalcode = true;
		} else {
			errors.isPostalcode = false;
		}

		if (detail_data?.phone === undefined || detail_data?.phone === "") {
			errors.isMobile = true;
		} else {
			errors.isMobile = false;
		}

		if (showVat && vat == "") {
			errors.vat = true;
		} else {
			errors.vat = false;
		}

		document.querySelectorAll(".form-control.payformd").forEach(function (i) {
			if (i.classList.contains("StripeElement--empty")) {
				i.classList.add("error-active");
			}
		});

		return errors;
	};

	console.log("==================state==================");
	console.log(state);
	console.log("====================================");

	const handleSubmitNew = (event) => {
		event.preventDefault();
		purchase()
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const fieldErrors = validateFields();
		if (Object.keys(fieldErrors).length > 0) {
			setError((prevError) => ({ ...prevError, ...fieldErrors }));
		}
		if (
			fieldErrors?.isAddress === true ||
			fieldErrors?.isCity === true ||
			fieldErrors?.isCountry === true ||
			fieldErrors?.isEmailValid === true ||
			fieldErrors?.isPostalcode === true ||
			fieldErrors?.isMobile === true ||
			fieldErrors?.isName === true ||
			fieldErrors?.vat === true ||
			checkbox === true
		) {
			// code here for handling any of the error conditions
			let errorElement =
				document?.querySelector(".error-active")?.offsetTop - 20;
			window.scrollTo(0, errorElement);
			return;
		}
		if (vatError === true && showVat === true) {
			event.preventDefault();
			return;
		}
		if (
			(vatError === true && vat !== "") ||
			(countryCode !== detail_data.address.country && vat !== "")
		) {
			return;
		}

		event.preventDefault();
		setPaymentLoading(true);
		const cardNumberElement = elements.getElement(CardNumberElement);
		const cardExpiryElement = elements.getElement(CardExpiryElement);
		const cardCvcElement = elements.getElement(CardCvcElement);
		if(detail_data?.address?.country == "EL") {
			detail_data.address.country = "GB"
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardNumberElement,
			card: cardExpiryElement,
			card: cardCvcElement,
			// card: elements.getElement(CardElement),
			billing_details: detail_data,
		});

		if (error) {
			toast.error(error?.message || "Card detials are not correct");
			setPaymentLoading(false);
			return;
		}
		
		if (state?.plan != "" && typeof state?.plan === "string" && !error) {
			if (state?.plan === "month") {
				await recurringSubscription(paymentMethod, undefined, "month");
			} else if (state?.plan === "year") {
				await recurringSubscription(paymentMethod, undefined, "year");
			} else if (state?.plan === "day") {
				await recurringSubscription(paymentMethod, undefined, "day");
			} else if (state?.plan?.includes("6 months")) {
				await recurringSubscription(paymentMethod, 6, "month");
			} else if (state?.plan === "3 months") {
				await recurringSubscription(paymentMethod, 3, "month");
			} else if (state?.plan === "week") {
				toast.error("Currently not supported");
			} else {
				toast.error("This recurring payment option not supported");
			}
		} else {
			if (!error) {
				try {
					const { id } = paymentMethod;
					const response = await axios.post(
						`${stripe_charge}`,
						{
							amount: isValidCode
								? final_amount_show * 100
								: calculateAmount() * 100,
							id: id,
							currency: "EUR",
							description: "All Payments Done by " + detail_data.name,
						},
						axiosConfig
					);
					if (response.data.success) {
						stripe
							.confirmCardPayment(response?.data?.payment?.client_secret)
							.then(async (res2) => {
								if (
									res2?.paymentIntent != undefined &&
									res2?.paymentIntent != null
								) {
									// let _billingData = "";
									// if (response?.data?.payment?.charges?.data[0]
									// 	?.billing_details != undefined
									// ) {
									// 	_billingData =
									// 		response?.data?.payment?.charges?.data[0]
									// 			?.billing_details;
									// } else {
									// 	_billingData = detail_data
									// }

									purchase(response?.data?.payment, detail_data);
									toast.success("Payment Successful!");
								} else if (res2?.error?.message) {
									toast.error("Payment failed");
								} else {
									toast.error("Payment failed");
								}
							});
					} else {
						toast.error("Payment Failed!");
					}
				} catch (error) {
					window.scrollTo(0, 0);
					toast.error(error.message);
				}
			} else {
				let errorElement2 = document.querySelector(
					".StripeElement--invalid"
				)?.offsetTop;
				window.scrollTo(0, errorElement2);
			}
		}
		setPaymentLoading(false);
	};

	const handleDiscount = async (e) => {
		setDiscountCode(e.target.value);
		if (isValidCode) {
			setIsValidCode(false);
			setDiscount(0);
			setDiscountAmount(0);
			calculateAmount();
			e.target.value != "" && setDiscountCodeError("Invalid discount code");
		} else if (e.target.value == "") {
			setDiscountCodeError("");
			setDiscountAmount(0);
		}
		// await checkIsValidCode(e.target.value);
		// if (e.target.value?.length == 8) {
		// 	await checkIsValidCode(e.target.value);
		// } else {
		// 	setIsValidCode(false);
		// }
	};

	const checkIsValidCode = async (code) => {
		try {
			setLoadingDiscount(true);
			let res = await axios.get(
				`${api}/api/valid-promocode?promo_code=${code}&user_id=${localStorage.getItem(
					"user_id"
				)}`,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			setLoadingDiscount(false);
			console.log(res, "res");
			if (isValidCode) {
				return;
			}
			if (res?.data?.data?.discount != undefined) {
				setIsValidCode(true);
				setDiscountCodeError("");
				let discountPercentage = res?.data?.data?.discount;
				setDiscount(discountPercentage);
				let per = discountPercentage / 100;
				let newAmount = final_amount_show * per;
				let discountedAmount = final_amount_show - newAmount;
				setDiscountAmount(Math.round(final_amount_show - discountedAmount));
				setfinal_amount_show(Math.round(discountedAmount));
			} else {
				setIsValidCode(false);
				setDiscountCodeError(res?.data?.message || "Invalid promo code");
				setDiscount(0);
				setDiscountAmount(0);
			}
		} catch (error) {
			setIsValidCode(false);
			setDiscountCodeError(
				error?.response?.data?.message || "Invalid promo code"
			);
			setDiscount(0);
			setDiscountAmount(0);
			setLoadingDiscount(false);
		}
	};

	const recurringSubscription = async (paymentMethod, period, interval) => {
		try {
			let res1 = await axios.post(stripe_recurring_subscription, {
				paymentMethod: paymentMethod,
				amount: final_amount_show * 100,
				productId: "prod_OlP3rZAtHHm22L",
				period: period,
				interval: interval,
			});

			if (res1.status === 200) {
				stripe
					.confirmCardPayment(res1.data?.data?.clientSecret)
					.then(async (res2) => {
						if (res2?.paymentIntent?.status == "succeeded") {
							// let _billingData = ""
							// if (res1?.data?.data?.paymentIntent?.charges?.data[0]?.billing_details != undefined) {
							// 	_billingData = res1.data?.data?.paymentIntent?.charges?.data[0]?.billing_details;
							// } else {
							// 	_billingData = detail_data
							// }
							get_cus(
								res1.data?.data?.paymentIntent,
								detail_data,
								res1.data?.data?.subscriptionId
							);
							toast.success("Subscription Payment Successful!");
						} else if (res2?.error) {
							toast.error("Payment failed");
							let res3 = await axios.post(stripe_cancel_sub, {
								subscriptionId: res1?.data?.data?.subscriptionId,
							});
						} else {
							toast.error("Payment failed");
						}
					});
				window.scrollTo(0, 0);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const get_cus = async (data, _billingData, subscriptionIdd) => {
		let response = {};
		try {
			response = await axios.get(stripe_costumer + "/" + subscriptionIdd, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_TEST}`,
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
		purchase(data, _billingData, subscriptionIdd, response.data);
		console.log(response.data);
	};
	// console.log(detail_data.address.country , "hey budy")
	const purchase = (data, _billingData, subscriptionIdd, subscriptiondata) => {
		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append(
			"Cookie",
			"onlinebeauty_session=" + localStorage.getItem("token")
		);
		var vat_amount = vat !== "" ? final_amount_show - amount : "N/A";

		var raw = JSON.stringify({
			plan_type: props?.planType ? props?.planType : null,
			payment_status: "succeeded",
			billing_details: _billingData,
			res: props?.plan ? subscriptiondata : null,
			subscriptionId: props?.plan ? subscriptionIdd : null,
			promo_code: isValidCode ? discountCode : null,
			discount: isValidCode ? discount : null,
			discount_amount: isValidCode ? discountAmount : null,
			payment_id: data?.id,
			ProductId: state?.ProductId,
			amount: parseFloat(data?.amount / 100).toFixed(2),
			payment_json_data: data,
			subscription_plan_id: state.subscription_plan_id,
			meeting_id: state?.meeting_id,
			vat_number: vat !== "" ? vat : "N/A",
			vat_amount: amountIncludingVat - amount,
			product_id: state?.product_id ? state?.product_id : null,
			// total_amount : 200
		});

		fetch(
			`${api}/api/v1/${
				state?.meeting_id == undefined
					? "addpaymentsdetail"
					: "supplier-meeting-payment"
			} `,
			{
				method: "POST",
				body: raw,
				headers: myHeaders,
				redirect: "follow",
			}
		)
			.then((res) => res.json())
			.then((result) => {
				// toast.success("Purchase Successful");
				// setTimeout(function () { window.location.reload(false) }, 2000);
				if (state?.meeting_id == undefined) {
					navigate("/dashboard");
				} else {
					navigate("/confirmed-meeting/supplier");
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	};
	// axios.post('https://adminbm.health-and-beauty.fr/api/v1/supplier-meeting-payment')
	// let final_amount_show = 0;
	// console.log(error, detail_data)
	// useState(() =>{

	// } , [handleSubmit])
	// console.log(error)
	const checkSubscription = () => {
		return new Promise((resolve, reject) => {
			var myHeaders = new Headers();
			myHeaders.append(
				"Authorization",
				"Bearer " + localStorage.getItem("token")
			);
			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};
			fetch(api + "/api/v1/details", requestOptions)
				.then((response) => response.json())
				.then((result) => resolve(result.data))
				.catch((error) => console.log("error", error));
		});
	};

	useEffect(() => {
		fetch(`${stripe_tax_rate}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_TEST}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				settexdata(data.data);
			})
			.catch((error) => console.error(error));
	}, []);

	// useEffect(() => {
	//   window.scrollTo(0, 0);
	// }, [detail_data]);
	// console.log(props, "this is prop s")
	useEffect(() => {
		axios
			.get(api + "/api/payment-details", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				const { data } = response.data;
				const paymentJsonData = JSON.parse(data.payment_json_data);
				setPaymentCardData(paymentJsonData);
				setTimeout(() => {
					detail_data.name =
						paymentJsonData?.charges?.data[0]?.billing_details?.name;
					detail_data.email =
						paymentJsonData?.charges?.data[0]?.billing_details?.email;
					detail_data.phone =
						paymentJsonData?.charges?.data[0]?.billing_details?.phone;
					detail_data.address.city =
						paymentJsonData.charges?.data[0]?.billing_details?.address?.city;
					detail_data.address.postal_code =
						paymentJsonData.charges?.data[0]?.billing_details?.address?.postal_code;
					detail_data.address.country =
						paymentJsonData.charges?.data[0]?.billing_details?.address?.country;
					detail_data.address.line1 =
						paymentJsonData.charges?.data[0]?.billing_details?.address?.line1;
				}, 50);
				setTimeout(() => {
					setdetail_data({ ...detail_data });
				}, 150);
				setTimeout(() => {
					setdetail_data({ ...detail_data });
				}, 250);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// console.log(amount, final_amount_show - amount,
	//   "vat details")
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={4000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
			<div className="Payment_form_Wrapper Meeting_wrap profile_popup">
				<div className="main">
					<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
					<div className={sidebar ? "active router-body" : "router-body"}>
						<div
							className="breadcrumbs aos-init aos-animate"
							data-aos="fade-down"
						>
							<ul>
								{state.ProductId == undefined ? (
									<>
										<li>
											<a>Dashboard</a>
										</li>
										<li>
											<a href="#">Supplier </a>
										</li>
										<li>
											<a href="/supplier-product-showcase">
												<span> Product Showcase </span>
											</a>
										</li>
										<li>
											<a
												onClick={() => {
													checkSubscription().then((response) => {
														// console.log(response, "<<<<<<<,");
														if (response.subscription_status !== 0) {
															navigate("/add-new-product");
														} else {
															navigate("/company-subscription");
														}
													});
												}}
											>
												<span> Add New Product </span>
											</a>
										</li>
										<li>
											<a href="#">
												<span onClick={() => navigate("/company-subscription")}>
													{" "}
													Payment{" "}
												</span>
											</a>
										</li>
										<li>
											{" "}
											<a href="#">
												<span> Payment Form </span>
											</a>
										</li>
									</>
								) : (
									<>
										<li>
											<a>Dashboard</a>
										</li>
										<li>
											<a href="#">Supplier </a>
										</li>
										<li>
											<a href="/pending-meeting/supplier">
												<span> My Meetings </span>
											</a>
										</li>
										<li>
											{" "}
											<a href="#">
												<span> Payment Form </span>
											</a>
										</li>
									</>
								)}

								{/* <li>
                  <a href="/dashboard">Dashboard </a>
                </li>
                <li>
                  <a href="#">Supplier </a>
                </li>
                <li>
                  <a href="/pending-meeting/supplier">
                    <span> My Meetings </span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      checkSubscription().then((response) => {
                        // console.log(response, "<<<<<<<,");
                        if (response.subscription_status !== 0) {
                          navigate("/add-new-product");
                        } else {
                          navigate("/company-subscription");
                        }
                      });
                    }}
                  >
                    <span> Add New Product </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span onClick={() => navigate("/company-subscription")}>
                      {" "}
                      Payment{" "}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span> Payment Form </span>
                  </a>
                </li> */}
							</ul>
						</div>
						<h2>Payment Form</h2>
						<form className="payment_form_wrap">
							<div className="form-group">
								<input
									type="text"
									placeholder="Name *"
									className={`form-control ${
										error?.isName == true ? "error-active" : ""
									}`}
									value={detail_data?.name}
									name="name"
									onChange={(e) => {
										// console.log('onchange..', e.target.value)
										setdetail_data({
											...detail_data,
											name: e.target.value,
										});
										if (e.target.value === "" || e.target.value === undefined) {
											error.isName = true;
										} else {
											error.isName = false;
										}
									}}
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									placeholder="Email *"
									className={`form-control ${
										error?.isEmailValid == true ? "error-active" : ""
									}`}
									value={detail_data?.email}
									onChange={(e) => {
										setdetail_data({ ...detail_data, email: e.target.value });
										if (e.target.value === "" || e.target.value === undefined) {
											error.isEmailValid = true;
										} else {
											error.isEmailValid = false;
										}
									}}
									// required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									placeholder="Address *"
									value={detail_data?.address?.line1}
									className={`form-control ${
										error?.isAddress == true ? "error-active" : ""
									}`}
									onChange={(e) => {
										setdetail_data({
											...detail_data,
											address: {
												...detail_data.address,
												line1: e.target.value,
											},
										});
										if (e.target.value === "" || e.target.value === undefined) {
											error.isAddress = true;
										} else {
											error.isAddress = false;
										}
									}}
									// required
								/>
							</div>
							<div className="row justify-content-between">
								<div className="column pd-b">
									<div
										className={`form-control custom-select ${
											error?.isCountry == true ? "error-active" : ""
										}`}
									>
										<select
											value={detail_data.address.country}
											onChange={(e) => {
												setdetail_data({
													...detail_data,
													address: {
														...detail_data.address,
														country: e.target.value,
													},
												});
												if (
													e.target.value === "" ||
													e.target.value === undefined
												) {
													error.isCountry = true;
												} else {
													error.isCountry = false;
												}
											}}
										>
											<option value="" disabled>
												Country *
											</option>
											{country.data?.map((data, i) => {
												return (
													<option
														key={i}
														onClick={() => {
															setdetail_data({
																...detail_data,
																address: {
																	...detail_data.address,
																	country: data.code,
																},
															});
														}}
														value={data.code}
													>
														{data.country}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="column">
									<div className="form-group">
										<input
											type="text"
											placeholder="City *"
											value={detail_data?.address?.city}
											className={`form-control ${
												error?.isCity == true ? "error-active" : ""
											}`}
											onChange={(e) => {
												setdetail_data({
													...detail_data,
													address: {
														...detail_data.address,
														city: e.target.value,
													},
												});
												if (
													e.target.value === "" ||
													e.target.value === undefined
												) {
													error.isCity = true;
												} else {
													error.isCity = false;
												}
											}}
											// required
										/>
									</div>
								</div>

								<div className="column">
									<div className="form-group">
										<input
											type="text"
											placeholder="Postal Code *"
											value={detail_data?.address?.postal_code}
											className={`form-control ${
												error?.isPostalcode == true ? "error-active" : ""
											}`}
											onKeyPress={(e) => {
												const pattern = /[0-9a-zA-Z]/; // Updated pattern to include numerics (0-9) and alphabets (a-z, A-Z)
												const enteredValue = e.target.value + e.key;
												const isAllSelected =
													e.target.selectionStart === 0 &&
													e.target.selectionEnd === e.target.value.length;

												if (isAllSelected && enteredValue.length === 1) {
													e.target.value = ""; // Clear the input field
												} else if (isAllSelected && pattern.test(e.key)) {
													// Remove the selected text
													e.target.value = e.key;
												}

												if (!pattern.test(e.key) || enteredValue.length > 8) {
													e.preventDefault();
												}
											}}
											onChange={(e) => {
												setdetail_data({
													...detail_data,
													address: {
														...detail_data.address,
														postal_code: e.target.value,
													},
												});
												if (
													e.target.value === "" ||
													e.target.value === undefined
												) {
													error.isPostalcode = true;
												} else {
													error.isPostalcode = false;
												}
											}}
											// required
										/>
									</div>
								</div>
								<div className="column">
									<div className="form-group">
										<input
											type="tel"
											placeholder="Phone Number *"
											className={`form-control ${
												error?.isMobile == true ? "error-active" : ""
											}`}
											value={detail_data?.phone}
											onKeyPress={(e) => {
												const pattern = /[0-9]/;
												const enteredValue = e.target.value + e.key;
												const isAllSelected =
													e.target.selectionStart === 0 &&
													e.target.selectionEnd === e.target.value.length;

												if (isAllSelected && enteredValue.length === 1) {
													e.target.value = ""; // Clear the input field
												} else if (isAllSelected && pattern.test(e.key)) {
													// Remove the selected text
													e.target.value = e.key;
												}

												if (!pattern.test(e.key) || enteredValue.length > 10) {
													e.preventDefault();
												}
											}}
											onChange={(e) => {
												setdetail_data({
													...detail_data,
													phone: e.target.value,
												});
												if (
													e.target.value === "" ||
													e.target.value === undefined
												) {
													error.isMobile = true;
												} else {
													error.isMobile = false;
												}
											}}
											// required
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="paddCss" style={{ padding: "6px 10px 0" }}>
									<label>
										<strong> Card Number</strong>
										{"  "}
										<span
											className="required-field"
											style={{
												color: "red",
												fontSize: "1.2em",
												marginLeft: "0.2em",
											}}
										>
											*
										</span>
									</label>
								</div>
								<div
									className="col-sm-12 paddCss"
									style={{ padding: "6px 10px " }}
								>
									<CardNumberElement
										className="form-control payformd"
										onChange={() => {
											setTimeout(() => {
												document
													.querySelectorAll(".form-control.payformd")
													.forEach(function (i) {
														if (
															i.classList.contains("StripeElement--complete")
														) {
															i.classList.remove("error-active");
														}
													});
											}, 500);
										}}
									/>
								</div>
							</div>
							<div className="row justify-content-between">
								<div className="column">
									<div className="form-group">
										{/* <input
                      type="text"
                      placeholder="Expiry Date"
                      className="form-control"
                    /> */}
										<div
											className="col-sm-12 paddCss"
											style={{ padding: "6px 10px 0" }}
										>
											<label>
												<strong>Expiry</strong>
												{"  "}
												<span
													className="required-field"
													style={{
														color: "red",
														fontSize: "1.2em",
														marginLeft: "0.2em",
													}}
												>
													*
												</span>
											</label>
										</div>

										<div
											className="col-sm-12 paddCss"
											style={{ padding: "6px 10px" }}
										>
											<CardExpiryElement
												className="form-control payformd"
												onChange={() => {
													setTimeout(() => {
														document
															.querySelectorAll(".form-control.payformd")
															.forEach(function (i) {
																if (
																	i.classList.contains(
																		"StripeElement--complete"
																	)
																) {
																	i.classList.remove("error-active");
																}
															});
													}, 500);
												}}
											/>
										</div>
									</div>
								</div>
								<div className="column">
									<div
										className="col-sm-12 paddCss"
										style={{ padding: "6px 10px 0" }}
									>
										<label>
											<strong>CVC</strong>
											{"  "}
											<span
												className="required-field"
												style={{
													color: "red",
													fontSize: "1.2em",
													marginLeft: "0.2em",
												}}
											>
												*
											</span>
										</label>
									</div>
									<div
										className="col-sm-12 paddCss"
										style={{ padding: "6px 10px" }}
									>
										<CardCvcElement
											className="form-control payformd"
											placeholder="CVV"
											onChange={() => {
												setTimeout(() => {
													document
														.querySelectorAll(".form-control.payformd")
														.forEach(function (i) {
															if (
																i.classList.contains("StripeElement--complete")
															) {
																i.classList.remove("error-active");
															}
														});
												}, 500);
											}}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<input
									type="text"
									value={" €" + props.amount}
									className="form-control"
									required
									disabled={true}
								/>
							</div>
							<div className="radio_btn row">
								<p>
									Do you have VAT number?{" "}
									<span
										className="required-field"
										style={{
											color: "red",
											fontSize: "1.2em",
											marginLeft: "0.2em",
										}}
									>
										*
									</span>
								</p>
								<div className="row align-items-center">
									<input
										type="radio"
										id="buyer"
										name="fav_language"
										value="A buyer"
										// checked=""
										onChange={(e) => {
											setshowVat(true);
											// console.log(e);
										}}
									/>
									<label htmlFor="buyer" className="">
										Yes
									</label>
								</div>
								<div className="row mb-l align-items-center">
									<input
										type="radio"
										id="supplier"
										name="fav_language"
										value="A supplier"
										onChange={(e) => {
											setshowVat(false);
											setVat("");
											// console.log(e);
										}}
									/>
									<label htmlFor="A supplier" className="removeClass">
										No
									</label>
								</div>

								<div>
									<h6>VAT Information:</h6>
									<ul style={{ listStyleType: "disc" }}>
										<li style={{ marginBottom: "8px", listStyleType: "disc" }}>
											For companies based in France, VAT of 20% will
											automatically apply.
										</li>
										<li style={{ marginBottom: "8px", listStyleType: "disc" }}>
											For companies based in the European Union, VAT of 20% will
											apply if you do not have a valid VAT number.
										</li>
										<li style={{ marginBottom: "8px", listStyleType: "disc" }}>
											For companies based outside the European Union, no VAT
											will be charged.
										</li>
									</ul>
								</div>
							</div>
							<div
								className="form-group toggle-form-box"
								style={showVat ? {} : { display: "none" }}
							>
								<div style={{ position: "relative" }}>
									<input
										type="text"
										placeholder="VAT Number"
										// className="form-control"
										value={vat}
										onChange={(event) => {
											setVat(event.target.value);
											if (isValidVat) {
												setIsValidVat(false);
												setVatError(true);
												setTimeout(() => setVatError(false), 2000);
											}
										}}
										style={{
											borderBottom:
												vatError && !isValidVat ? "1px solid red" : "",
										}}
										className={`form-control ${
											error?.vat == true ? "error-active" : ""
										}`}
									/>
									<button
										onClick={(e) => {
											e.preventDefault();
											checkVat();
										}}
										className="hoverRemovebtn apply-btn btn btn-secondary"
									>
										{vatLoading ? "Loading.." : "Apply"}
									</button>
								</div>

								{vatError === true && vat === "" ? (
									<h6 style={{ color: "red" }}>Text field must not be empty</h6>
								) : (
									""
								)}
								{vatError && !isValidVat && vat != "" ? (
									<h6 style={{ color: "red" }}>VAT Number is Not Valid</h6>
								) : (
									isValidVat && <h6>Vat number is valid</h6>
								)}
							</div>
							<div className="form-group">
								<label>Discount Code: </label>
								<div style={{ position: "relative" }}>
									<input
										type="text"
										value={discountCode}
										className="form-control"
										onChange={async (e) => await handleDiscount(e)}
									/>
									<button
										onClick={(e) => {
											e.preventDefault();
											checkIsValidCode(discountCode);
										}}
										className="hoverRemovebtn apply-btn btn btn-secondary"
									>
										{loadingDiscount ? "Loading.." : "Apply"}
									</button>
								</div>
								{discount != 0 && isValidCode && (
									<div style={{ marginTop: "10px" }}>
										{discount}% discount applied successfully.
									</div>
								)}
								{discountCodeError && (
									<h6 style={{ color: "red" }}>{discountCodeError}</h6>
								)}
							</div>
							<div className="form-group">
								<input
									type="text"
									value={"Final Amount :  €" + final_amount_show}
									className="form-control"
									required
									disabled={true}
								/>
							</div>
							{state?.note && (
								<div style={{ marginBottom: "15px" }}>
									<b>Note:</b>
									<p>{state?.note}</p>
								</div>
							)}
							<div>
								<label style={{ fontSize: "18px ", marginBottom: "10px" }}>
									<input
										type="checkbox"
										// required
										onChange={() => setCheckbox(!checkbox)}
										style={{ transform: "scale(1.5)" }}
									/>
									<span
										className="required-field"
										style={{
											color: "red",
											fontSize: "1.2em",
											marginLeft: "0.2em",
										}}
									></span>{" "}
									I agree to general{" "}
									<a
										href="/privacy-terms"
										target="_blank"
										style={{
											color: "red",
											textDecoration: "underline",
											border: "none",
											background: "none",
											cursor: "pointer",
										}}
									>
										terms and conditions
									</a>
									<span
										className="required-field"
										style={{
											color: "red",
											fontSize: "1.2em",
											marginLeft: "0.2em",
										}}
									>
										*
									</span>
								</label>
							</div>
							<br></br>
							<div className="button row justify-content-center">
								<button
									className="btn btn-secondary pay-butto"
									disabled={isPaymentLoading}
									onClick={handleSubmit}
								>
									{isPaymentLoading ? "Loading..." : "Pay"}
								</button>
								<button
									className="btn btn-primary"
									style={{ marginLeft: "5rem" }}
									onClick={() =>
										props?.plan !== null
											? navigate("/company-subscription")
											: navigate("/pending-meeting/supplier")
									}
								>
									Cancel
								</button>
								{/* <a href="#" className="btn btn-secondary">
                  Pay
                </a> */}
							</div>
						</form>
					</div>
				</div>
			</div>

			<div
				className="row col-sm-12 card carddetail"
				style={{ display: "none" }}
			>
				<div className="col-sm-12 ">
					<div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
						{/* <<<<<<< HEAD */}
						{/* ======= */}
						<label>
							<strong>Subscription Plan :</strong> {props.plan}
						</label>
					</div>
					<div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
						{/* >>>>>>> fcff1acc5148440602396167bbe747bb33dfb4f9 */}
						<label>
							<strong>Subtotal :</strong> €{amount}
						</label>
					</div>
					<div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
						<label>
							<strong>
								Tax{" "}
								{texdata?.filter(
									(data) => data.country == detail_data.address.country
								)[0]
									? texdata?.filter(
											(data) => data.country == detail_data.address.country
									  )[0].percentage
									: 0}
								% (inclusive) :
							</strong>{" "}
							{texdata?.filter(
								(data) => data.country == detail_data.address.country
							)[0]
								? "€" +
								  (amount *
										texdata?.filter(
											(data) => data.country == detail_data.address.country
										)[0].percentage) /
										100
								: "€" + 0}
						</label>
					</div>
					<div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
						<label>
							<strong>Total :</strong>{" "}
							{texdata.filter(
								(data) => data.country == detail_data.address.country
							)[0]
								? "€" +
								  (amount +
										(amount *
											texdata.filter(
												(data) => data.country == detail_data.address.country
											)[0].percentage) /
											100)
								: "€" + amount}
						</label>
					</div>
				</div>
			</div>
		</>
	);
};
