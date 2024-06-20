import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Contract() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const [theytrusted, settheytrusted] = useState();
	const [showCompanyProfile, setShowCompanyProfile] = useState(false);
	const [check, setcheck] = useState(true);

	useEffect(() => {
		axios
			.get(`${api}/api/company-detail`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				// Handle the successful response here
				console.log(res.data.data, "this is data");
				if (res?.data?.data?.length === 0) {
					setShowCompanyProfile(true);
				}
			})
			.catch((error) => {
				// Handle any errors that occur during the request
				console.error(error);
			});
	}, []);

	const theytrusted_data = () => {
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
		fetch(api + "/api/v1/contracts", requestOptions)
			.then((response) => response.json())
			.then((result) => settheytrusted(result.data))
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		if (check) {
			theytrusted_data();
			setcheck(false);
		}
	}, [check]);
	// handle accept aggrement
	console.log(state, "this is state of uselocation");
	
	const handleAgreeButtonClick = () => {
		console.log("working");
		const userId = localStorage.getItem("user_id");
		const requestOptions = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.post(api + "/api/updateContracts", { userId }, requestOptions)
			.then((response) => {
				// Handle the response here
				console.log(response);
				if (localStorage.getItem("created_from") == "Superadmin") {
					var myHeaders2 = new Headers();
					myHeaders2.append(
						"Authorization",
						"Bearer " + localStorage.getItem("token")
					);

					var requestOptions2 = {
						method: "GET",
						headers: myHeaders2,
					};

					fetch(api + "/api/shared-user-login", requestOptions2)
						.then((response) => response.json())
						.then((res) => {
							if (res?.status === "true") {
								localStorage.removeItem("created_from");
								if (localStorage.getItem("user_type") === "Buyer") {
									navigate("/buyer-company-profile");
								} else {
									navigate("/dashboard");
								}
								// navigate(
								// 	`/dashboard/user-management/${localStorage.getItem(
								// 		"user_type"
								// 	)}`
								// );
							}
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					if (showCompanyProfile) {
						navigate("/company-Information-fill");
					} else {
						if (localStorage.getItem("user_type") === "Buyer") {
							navigate("/buyer-company-profile");
						} else {
							navigate("/dashboard");
						}
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	
	console.log("state", state);
	return (
		<>
			<div className="container">
				<div className="contract_wrapper Meeting_wrap profile_popup">
					<div className="main">
						<div
							className="left_wrapper left_desktop"
							id="left_wrapper"
							style={{ display: "none" }}
						>
							<div className="left_sidebar">
								<div className="box">
									<div className="sidebar_toggle">
										<span></span>
										<span></span>
										<span></span>
										<i className="fa fa-angle-left" aria-hidden="true"></i>
									</div>
									<h4>SUPPLIER</h4>
									<ul>
										<li>
											<a href="#">
												<img src="images/bell.svg" alt="" />
												Alert Notification
											</a>
										</li>
										<li>
											<a href="#">
												<img src="images/edit.svg" alt="" />
												Products Showcase
											</a>
										</li>
										<li>
											<a className="menu_submenu supplier">
												<img
													className="bgdrop-icon-hide"
													src="images/Meeting Schedule.svg"
													alt=""
												/>
												<img
													className="bgdrop-icon"
													src="images/calender_blue.png"
													alt=""
													// style="display:none;"
												/>
												My Meetings
												<i
													className="fa fa-angle-down drop"
													aria-hidden="true"
												></i>
											</a>
											<ul className="sub__menu supplier-meetings">
												<li>
													<a href="#">Pending Meetings</a>
												</li>
												<li>
													<a href="#">Confirmed Meetings</a>
												</li>
												<li className="active">
													<a href="#">Passed Meetings</a>
												</li>
											</ul>

											{/* <!-- <span className="icon-drop"></span> --> */}
										</li>
									</ul>
									<h4>BUYER</h4>
									<ul>
										<li>
											<a href="#">
												<img src="images/bell.svg" alt="" />
												Alert Notification
											</a>
										</li>
										<li>
											<a href="#">
												<img src="images/edit.svg" alt="" />
												Products Research Profile
											</a>
										</li>
										<li>
											<a className="menu_submenu buyer">
												<img
													className="bgdrop-icon-hide"
													src="images/Meeting Schedule.svg"
													alt=""
												/>
												<img
													className="bgdrop-icon"
													src="images/calender_blue.png"
													alt=""
													// style="display:none;"
												/>
												My Meetings
												<i
													className="fa fa-angle-down drop"
													aria-hidden="true"
												></i>
											</a>
											<ul className="sub__menu buyer-meeting">
												<li>
													<a href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">
														View All Products
													</a>
												</li>
												<li>
													<a href="#">Favourite List</a>
												</li>
												<li>
													<a href="#">Confirmed Meetings</a>
												</li>
												<li className="active">
													<a href="#">Passed Meetings</a>
												</li>
											</ul>
										</li>
										<li className="border">
											<a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html">
												<img src="images/CONTACT.png" alt="" />
												Contact Us
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div
							className="bg-light supplier-meetings dropdown-container"
							tabindex="-1"
						>
							<h4>
								My Meetings
								{/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
							</h4>
							<div className="dropdown-item-div">
								<a className="dropdown-item" href="#">
									Pending Meetings
								</a>
								<a className="dropdown-item" href="#">
									Confirmed Meetings
								</a>
								<a className="dropdown-item" href="#">
									Passed Meetings
								</a>
							</div>
						</div>
						<div
							className="bg-light buyer-meetings dropdown-container"
							tabindex="-1"
						>
							<h4>
								My Meetings
								{/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
							</h4>
							<div className="dropdown-item-div">
								<a
									className="dropdown-item"
									href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html"
								>
									View All Products
								</a>
								<a className="dropdown-item" href="#">
									Favourite List
								</a>
								<a className="dropdown-item" href="#">
									Confirmed Meetings
								</a>
								<a className="dropdown-item" href="#">
									Passed Meetings
								</a>
							</div>
						</div>
						<div className="">
							<div className="breadcrumbs" data-aos="fade-down">
								<ul>
									<li>
										<a href="/dashboard">Dashboard </a>
									</li>
									<li>
										<a href="#">My Profile</a>
									</li>
									<li>
										<a href="#">Administrative Informations</a>
									</li>
									<li>
										<a href="#">
											<span>Contract Info</span>
										</a>
									</li>
								</ul>
							</div>
							<div className="product_prfile">
								<h1>{theytrusted?.contactus?.title}</h1>
								<div
									className="Contract_section"
									dangerouslySetInnerHTML={{
										__html: theytrusted?.contactus?.discription,
									}}
								></div>
								<div className="button">
									<a
										onClick={handleAgreeButtonClick}
										className="btn btn-secondary"
									>
										I Agree
									</a>
								</div>
							</div>
						</div>
					</div>

					<span className="scroll-up">
						<i className="fa fa-chevron-up" aria-hidden="true"></i>
					</span>
				</div>
			</div>
		</>
	);
}

export default Contract;
