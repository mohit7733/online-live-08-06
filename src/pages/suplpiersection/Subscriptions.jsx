import React, { useEffect, useState } from "react";import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../base_url";
import { toast } from "react-toastify";

export default function Subscriptions(props) {
	const [subscriptions, setSubscriptions] = useState([]);
	const navigate = useNavigate();
	const { state } = useLocation();

	const getSubscriptions = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/subscription", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const meetingSubscriptions = result.data.filter(
					(subscription) => subscription.type === "Product"
				);

				setSubscriptions(meetingSubscriptions);
			})
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		getSubscriptions();
	}, []);

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

	return (
		<div className={props.sidebar ? "router-body active " : "router-body"}>
			<div className="breadcrumbs aos-init aos-animate" data-aos="fade-down">
				<ul>
					<li>
						<a href="/dashboard">Dashboard </a>
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
							<span> Payment </span>
						</a>
					</li>
				</ul>
			</div>
			<h2>Payment</h2>
			<div className="payment_wrapper row justify-content-center">
				{subscriptions?.map((item) => {
					return (
						<>
							{item?.title?.toLowerCase() == "monthly" ? (
								<div className="column">
									<div className="button">Monthly</div>
									<p>
										<span>{item?.subtitle}</span>
									</p>
									<h3>{" €" + item?.price}</h3>
									{/* <p>{item?.title}</p> */}
									<button
										className="btn11 btn btn-secondary"
										onClick={() => {
											if (
												localStorage.getItem("manage_type").toLowerCase() ==
												"superadmin"
											) {
												navigate("/payment", {
													state: {
														amount: parseInt(item?.price),
														plan: item.recurring != null ? item?.recurring : "",
														subscription_plan_id: item?.id,
														planType:
															item.recurring != null ? null : item?.days,
														note: item?.note,
														product_id: state?.product_id,
													},
												});
											} else {
												toast.error("Only superadmin can do the payments !");
											}
										}}
									>
										Continue
									</button>
								</div>
							) : item?.title?.toLowerCase() == "yearly" ? (
								<div className="column col_right">
									<div className="button">Yearly</div>
									<p>{item?.subtitle}</p>
									<h3>{" €" + item?.price}</h3>
									{/* <p>
										<span>{item?.title}</span>
									</p> */}
									<button
										className="btn11 btn btn-primary"
										onClick={() => {
											if (
												localStorage.getItem("manage_type").toLowerCase() ===
												"superadmin"
											) {
												navigate("/payment", {
													state: {
														amount: parseInt(item?.price),
														plan: item.recurring != null ? item?.recurring : "",
														subscription_plan_id: item?.id,
														note: item?.note,
														planType:
															item.recurring != null ? null : item?.days,
														product_id: state?.product_id,
													},
												});
											} else {
												toast.error("Only superadmin can do the payments !");
											}
										}}
									>
										Continue
									</button>
								</div>
							) : (
								<div className="column col_right">
									<div className="button">{item?.title}</div>
									<p>{item?.subtitle}</p>
									<h3>{" €" + item?.price}</h3>
									{/* <p>
										<span>{item?.title}</span>
									</p> */}
									<button
										className="btn11 btn btn-primary"
										onClick={() => {
											if (
												localStorage.getItem("manage_type").toLowerCase() ===
												"superadmin"
											) {
												navigate("/payment", {
													state: {
														amount: parseInt(item?.price),
														plan: item.recurring != null ? item?.recurring : "",
														subscription_plan_id: item?.id,
														note: item?.note,
														planType:
															item.recurring != null ? null : item?.days,
														product_id: state?.product_id,
													},
												});
											} else {
												toast.error("Only superadmin can do the payments !");
											}
										}}
									>
										Continue
									</button>
								</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
}
