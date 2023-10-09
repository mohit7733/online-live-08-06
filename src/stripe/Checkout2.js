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
		"DE",
		"AT",
		"BE",
		"BG",
		"CY",
		"HR",
		"DK",
		"ES",
		"EE",
		"FI",
		"GR",
		"HU",
		"IE",
		"IT",
		"LV",
		"LT",
		"LU",
		"MT",
		"NL",
		"PL",
		"PT",
		"CZ",
		"RO",
		"SK",
		"SI",
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

	const checkVat = () => {
		setVatLoading(true);
		axios
			.get(`${Vat_check_api}=${vat}`)
			.then(
				(res) => {
					if (res.data.valid === true) {
						setCountryCode(res.data.country_code);
						if (coutnry_list.includes(res.data.country_code)) {
							setVatError(false);
							setIsValidVat(true);
						}
						if (res.data.country_code != detail_data.address.country) {
							setVatError(true);
							setIsValidVat(false);
						}
						setVatLoading(false);
					} else {
						setVatError(true);
						setIsValidVat(false);
						e = true;
						setVatLoading(false);
					}
				},
				[vat]
			)
			.catch((error) => {
				setVatError(true);
				setIsValidVat(false);
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
			// _amount =
			// 	(texdata.filter(
			// 		(data) => data.country === detail_data.address.country
			// 	)[0]
			// 		? _amount +
			// 		  _amount *
			// 				texdata.filter(
			// 					(data) => data.country === detail_data.address.country
			// 				)[0].percentage
			// 		: _amount) *
			// 		100 +
			// 	_amount * 20;
			// if (isValidCode != true) {
			// 	setAmountIncludingVat(Math.round(_amount / 100));
			// }
			// setfinal_amount_show(Math.round(_amount / 100));
			// return _amount;
		}
		if (!coutnry_list.includes(detail_data.address.country)) {
			// _amount = texdata.filter(
			// 	(data) =>
			// 		data.country === detail_data.address.country &&
			// 		detail_data.address.country !== "IN"
			// )[0]?.percentage
			// 	? _amount * 100 +
			// 	  ((_amount *
			// 			texdata.filter(
			// 				(data) => data.country === detail_data.address.country
			// 			)[0].percentage) /
			// 			100) *
			// 			100
			// 	: _amount * 100;
		} else if (
			vatError === false &&
			showVat === true &&
			isValidVat &&
			coutnry_list.includes(detail_data.address.country)
		) {
			// _amount = texdata.filter(
			// 	(data) => data.country === detail_data.address.country
			// )[0]?.percentage
			// 	? _amount +
			// 	  ((_amount *
			// 			texdata.filter(
			// 				(data) => data.country === detail_data.address.country
			// 			)[0].percentage) /
			// 			100) *
			// 			100
			// 	: _amount * 100;
		} else {
			// _amount =
			// 	(texdata.filter(
			// 		(data) => data.country === detail_data.address.country
			// 	)[0]
			// 		? _amount +
			// 		  _amount *
			// 				texdata.filter(
			// 					(data) => data.country === detail_data.address.country
			// 				)[0].percentage
			// 		: _amount) *
			// 		100 +
			// 	_amount * 20;
		}
		// if (isValidCode != true) {
		// 	setAmountIncludingVat(Math.round(_amount / 100));
		// }
		setfinal_amount_show(Math.round(_amount));
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
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardNumberElement,
			card: cardExpiryElement,
			card: cardCvcElement,
			// card: elements.getElement(CardElement),
			billing_details: detail_data,
		});

		if (error) {
			toast.error(error?.message || "Card detials are not correct")
			setPaymentLoading(false);
			return
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
				// await recurringSubscription(paymentMethod, undefined, "month");
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
							amount: isValidCode ? final_amount_show * 100 : calculateAmount() * 100,
							id: id,
							currency: "EUR",
							description: "All Payments Done by " + detail_data.name,
						},
						axiosConfig
					);
					if (response.data.success) {
						billingdata = response.data.payment.charges.data[0].billing_details;
						purchase(response.data.payment);
						toast.success("Payment Successful!");
						window.scrollTo(0, 0);
						if (state?.meeting_id == undefined) {
							navigate("/dashboard");
						} else {
							navigate("/confirmed-meeting/supplier");
						}
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
				// window.scrollTo(0, 0);
				// toast.error(error.message);
				// console.log('payment error', error.message)
			}
		}
		setPaymentLoading(false);
	};

	const get_cus = async () => {
		try {
			const response = await axios.get(stripe_costumer, {
				headers: {
					Authorization:
						`Bearer ${process.env.REACT_APP_STRIPE_SECRET_TEST}`,
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
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
				// toast.error(res?.data?.message || "Invalid promo code");
				setIsValidCode(false);
				setDiscountCodeError(res?.data?.message || "Invalid promo code");
				setDiscount(0);
				setDiscountAmount(0);
			}
		} catch (error) {
			// toast.error(error?.response?.data?.message || "Invalid promo code");
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
				amount: final_amount_show,
				productId: "prod_OlP3rZAtHHm22L",
				period: period,
				interval: interval,
			});

			if (res1.status === 200) {
				let res2 = await stripe.confirmCardPayment(
					res1.data?.data?.clientSecret
				);
				billingdata = res1.data?.data;

				purchase(res1.data?.data.paymentIntent);
				toast.success("Subscription Payment Successful!");
				// // console.log(response.data.payment.charges.data[0].billing_details);
				window.scrollTo(0, 0);
				if (state?.meeting_id == undefined) {
					navigate("/dashboard");
				} else {
					navigate("/confirmed-meeting/supplier");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};





	// console.log(detail_data.address.country , "hey budy")
	const purchase = (data) => {
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
			payment_status: data?.status,
			billing_details: props?.plan
				? billingdata?.paymentIntent?.charges?.data[0]?.billing_details
				: billingdata,
			recurring_payment: props?.plan ? billingdata : null,
			promo_code: isValidCode ? discountCode : null,
			discount: isValidCode ? discount : null,
			discount_amount: isValidCode ? discountAmount : null,
			payment_id: data?.id,
			ProductId: state?.ProductId,
			amount: parseFloat(data?.amount / 100).toFixed(2),
			payment_json_data: data,
			subscription_plan_id: state.subscription_plan_id,
			address_line:
				billingdata?.paymentIntent?.charges?.data[0]?.billing_details?.address
					?.line1,
			meeting_id: state?.meeting_id,
			vat_number: vat !== "" ? vat : "N/A",
			vat_amount: amountIncludingVat - amount,
			product_id: state?.product_id ? state?.product_id : null,
			// total_amount : 200
		});

		fetch(
			`${api}/api/v1/${state?.meeting_id == undefined
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
			})
			.catch((error) => console.log("error", error));
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
				autoClose={2000}
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
							{/* <button onClick={get_cus}>jibuhyyu</button> */}
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
									className={`form-control ${error?.isName == true ? "error-active" : ""
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
									className={`form-control ${error?.isEmailValid == true ? "error-active" : ""
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
									className={`form-control ${error?.isAddress == true ? "error-active" : ""
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
										className={`form-control custom-select ${error?.isCountry == true ? "error-active" : ""
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
											className={`form-control ${error?.isCity == true ? "error-active" : ""
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
											className={`form-control ${error?.isPostalcode == true ? "error-active" : ""
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
											className={`form-control ${error?.isMobile == true ? "error-active" : ""
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
							{/* <div className="radio_btn row">
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
							</div> */}
							{/* <div
								className="form-group toggle-form-box"
								style={showVat ? {} : { display: "none" }}
							>
								<div style={{ position: "relative" }}>
									<input
										type="text"
										placeholder="VAT Number"
										className="form-control"
										value={vat}
										onChange={(event) => {
											setVat(event.target.value);
											if (isValidVat) {
												setIsValidVat(false);
												setVatError(true);
											}
										}}
										style={{
											borderBottom:
												vatError && !isValidVat ? "1px solid red" : "",
										}}
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
								{(vatError && !isValidVat && vat != "") ||
								(countryCode != detail_data.address.country &&
									vat != "" &&
									isValidVat) ? (
									<h6 style={{ color: "red" }}>VAT Number is Not Valid</h6>
								) : (
									isValidVat && <h6>Vat number is valid</h6>
								)}
							</div> */}
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
