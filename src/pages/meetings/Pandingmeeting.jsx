import React, { useState, useEffect } from "react";import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../base_url";
import ReactPlayer from "react-player";
// import meetingicon from "../../assets/images/meeting.svg";
// import meetingdone from "../../assets/images/check (1).svg";
// import pending_ap from "../../assets/images/pending_approval.png";
// import thumbsdown from "../../assets/images/thumbs-down.svg";
// import thumbs_up from "../../assets/images/thumbs-up.svg";
import Modal from "../../components/modal";
import DatePicker from "../../components/datepicker";
import Timepicker from "../../components/timepicker";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Left_menu from "../productpages/left_menu";
// import paymentimg from "../../assets/images/Payment.svg";
import axios from "axios";
// import AcceptMeeting from "./AcceptMeeting";
function Pandingmeeting() {
	const [sidebar, setsidebar] = useState(true);
	const [showtime, setshowtime] = useState(false);
	const [main, setmain] = useState([]);
	const [link, setlink] = useState("");
	const [select, setselect] = useState(0);
	const [productData, setProductData] = useState({});
	const [check, setcheck] = useState(true);
	const { id } = useParams();
	const [sDate, setSdate] = useState("");
	const [sTime, setSTime] = useState("");
	const [showTP, setShowTP] = useState();
	const [slots, setSlots] = useState([]);
	const [thumb, setthumb] = useState();
	const [thumbshow, setthumbshow] = useState(false);
	const [buyersector, setbuyersector] = useState([]);
	// const [isProfilePage, setIsProfilePage] = useState(false);
	const [companyContact, setCompanyContact] = useState({});
	const [companyDetails, setCompanyDetails] = useState({});
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [apiDateFormat, setApiDateFormat] = useState("");
	const [modalState, setModalState] = useState(false);
	const [acceptId, setacceptId] = useState();
	const [productId, setProductId] = useState();

	// set hide button
	const [hideButtons, setHideButtons] = useState(false);
	useEffect(() => {
		const pathname = window.location.pathname;
		console.log(pathname);

		const pattern = /^\/profile-view\/\d+$/;
		const isMatch = pattern.test(pathname);

		if (isMatch) {
			setHideButtons(true);
		} else {
			setHideButtons(false);
		}
	}, []);

	useEffect(() => {
		if (pathname == `/profile-view/${localStorage.getItem("user_id")}`) {
			let url = `${api}/api/company-profile`;
			getProductDetails(url, true);
		} else {
			let url =
				api +
				"/api/company-profile?id=" +
				state?.buyer_id +
				`&meeting_id=${state?.id}`;
			getProductDetails(url, false);
		}
		window.scrollTo(0, 0);
	}, []);

	const { state } = useLocation();
	const getProductDetails = (url, getCompanyDetails) => {
		setcheck(false);
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
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result?.success == false) {
					toast.error(result?.message);
					setTimeout(() => {
						if (
							pathname == `/profile-view/${localStorage.getItem("user_id")}`
						) {
							navigate("/buyer-company-profile");
						}
					}, 2000);
				} else {
					// setProductData(result.data);
					if (getCompanyDetails) {
						axios
							.get(`${api}/api/company-detail`, {
								headers: {
									Authorization: "Bearer " + localStorage.getItem("token"),
								},
							})
							.then((response) => {
								setCompanyDetails(response.data.data[0]);
							})
							.catch((error) => {
								// console.error(error);
							});
					}
					setCompanyContact(result?.data?.company_contact);
					setCompanyDetails(result?.data?.company_contact);
					setProductData((prev) => ({ ...prev, ...result.data }));
					setTimeout(() => {
						setthumb(
							result.data?.media_files[
								Number(
									result.data?.company?.thumb_index == "undefined"
										? "0"
										: result.data?.company?.thumb_index
								)
							]
						);
						result.data?.media_files.map((item, i) => {
							if (item?.media_type === "image") {
								setmain([item]);
								setlink("");
								setselect(Number(result.data?.company?.thumb_index));
							}
						});
					}, 100);
					if (
						/^[\],:{}\s]*$/.test(
							result.data?.company?.sector
								?.replace(/\\["\\\/bfnrtu]/g, "@")
								.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]"
								)
								.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
						)
					) {
						setbuyersector(JSON.parse(result.data?.company?.sector));
					}
				}
			})
			.catch((error) => {
				// console.log("error", error);
				if (pathname == `/profile-view/${localStorage.getItem("user_id")}`) {
					toast.error("Record Not Found !");
					// navigate("/buyer-company-profile");
				}
			});
	};
	console.log(state, "this is state");

	const handleRefuseMeeting = () => {
		axios
			.get(`${api}/api/v1/supplier-meeting-refused?meeting_id=${state.id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				toast.error("Meeting Refused");
				getProductDetails();
				console.log(response.data);
			})
			.catch((error) => {
				toast.error("Failed to refuse meeting");
				console.error(error);
			});
	};

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
	};
	var settings2 = {
		dots: false,
		infinite: false,
		speed: 500,
		autoplay: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
	};

	function requestMeeting(pid, sid) {
		var formdata = new FormData();
		formdata.append("product_id", pid);
		formdata.append("supplier_id", sid);
		slots.forEach((obj, i) => {
			formdata.append("meetings[meeting_date][" + i + "]", obj.apiDate);
			formdata.append(
				"meetings[meeting_time][" + i + "]",
				moment(obj.sTime, ["h:mm A"]).format("HH:mm")
			);
		});

		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: formdata,
		};
		fetch(api + "/api/v1/sendrequestformeeting", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.success) {
					toast.success(result.data.message);
					// console.log("Success", result);
					setModalState(false);
				} else {
					toast.error(result.message);
					console.log("Error", result);
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
			});
	}

	function showTimePicker(value) {
		const dm = moment(value).format("MMM D");
		setApiDateFormat(moment(value).format("DD-MM-YYYY"));
		setShowTP(true);
		setSdate(dm);
	}

	const confirmSlots = () => {
		const mergedSlots = [
			...slots,
			{ sDate: sDate, sTime: sTime, apiDate: apiDateFormat },
		];
		console.log(mergedSlots);
		setSlots(mergedSlots);
		setSdate("");
		setSTime("");
		setApiDateFormat("");
		console.log(slots);
	};

	useEffect(() => {
		if (productData?.media_files) {
			setmain([productData?.media_files[0]]);
		}
	}, [link, productData]);

	let url2 = productData.product?.category?.replace(/\s+/g, "-");

	// modal
	const [showModal, setShowModal] = useState(false);
	const [acceptdate, setacceptDates] = useState([]);
	const [meetingAccept, setAcceptMeeting] = useState([]);

	const handleAcceptClick = () => {
		// console.log('working')
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const [subscriptions, setSubscriptions] = useState([]);
	const getSubscriptions = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(`${api}/api/meetingsubscription`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result.data[0].type, "tan");

				const meetingSubscriptions = result.data.filter(
					(subscription) => subscription.type === "Meeting"
				);

				setSubscriptions(meetingSubscriptions);
			})
			.catch((error) => console.log("error", error));
	};

	const clickedAccept = () => {
		axios
			.post(api + "/api/v1/supplier-meeting-avaiblity", meetingAccept, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				toast.success("Availability added successfully");
				navigate("/payment", {
					state: {
						meeting_id: acceptId,
						breadcrumb_satus: 2,
						ProductId: productId,
						amount: subscriptions[0]?.price,
						plan: subscriptions[0]?.days,
						subscription_plan_id: subscriptions[0]?.id,
					},
				});
				setShowModal(false);
				console.log(response, "<<<<<<<");
			})
			.catch((error) => {
				toast.error("Something Went Wrong !");
				// handle error
			});
	};
	console.log(state?.meeting_id, "productdata is here");
	// handlechange
	const handleDateChange = (event) => {
		const { value } = event.target;
		const dateIndex = parseInt(value);

		const selectedDateTime = state?.time?.[dateIndex];
		const selectedDate = moment(selectedDateTime, "DD-MM-YYYY hh:mm A").format(
			"DD-MM-YYYY"
		);
		const selectedTime = moment(selectedDateTime, "DD-MM-YYYY hh:mm A").format(
			"hh:mm A"
		);

		setAcceptMeeting([
			{
				supplier_id: state?.meeting_id,
				type: 0,
				availability: [
					{
						date: selectedDate,
						time: selectedTime,
					},
				],
			},
		]);
	};

	useEffect(() => {
		getSubscriptions();
	}, []);

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
			{showModal && (
				<div className="modal">
					<div className="modal-content" style={{ position: "fixed" }}>
						<span
							className="close"
							onClick={handleCloseModal}
							style={{ right: "13px" }}
						>
							&times;
						</span>
						<div>
							<h3>Accept Meeting</h3>
							<ul>
								{state?.date?.map((dateTime, index) => {
									const splitDateTime = dateTime.split(" ");
									const date = splitDateTime.slice(0, -1).join(" ");
									const time = splitDateTime.slice(-1)[0];

									return (
										<li key={index}>
											<input
												type="radio"
												id={`date${index}`}
												name="selectedDate"
												value={index}
												onChange={handleDateChange}
											/>
											<label htmlFor={`date${index}`}>
												{date} {time}
											</label>
										</li>
									);
								})}
							</ul>
							<br />
							<button className="btn btn-secondary" onClick={clickedAccept}>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="product_before_meeting profile_popup">
				<div className="main">
					<Left_menu
						sidebar={sidebar}
						setsidebar={setsidebar}
						showContact={
							productData?.meeting_status?.status === 5 &&
							state?.show_contact === 1
						}
						companyDetails={companyDetails}
					/>

					<div
						className={sidebar == true ? "router-body active" : "router-body "}
					>
						<div className="breadcrumbs" data-aos="fade-down">
							<div className="head">
								{pathname ==
								`/profile-view/${localStorage.getItem("user_id")}` ? (
									<ul>
										<li>
											<a href="/dashboard">Dashboard </a>
										</li>

										<li>
											<a href="/buyer-company-profile">
												<span> Company Profile</span>
											</a>
										</li>
										<li>
											<a href="#">
												<span> View Profile</span>
											</a>
										</li>
									</ul>
								) : (
									<ul>
										<li>
											<a href="/dashboard">Dashboard </a>
										</li>

										<li>
											<a href="#">Supplier</a>
										</li>
										<li>
											<a href={`/${state?.path?.split("/")[1]}/supplier`}>
												<span>My Meetings</span>
											</a>
										</li>
										<li>
											<a href={`/${state?.path?.split("/")[1]}/supplier`}>
												<span style={{ textTransform: "capitalize" }}>
													{state?.path?.split("/")[1]?.replace(/-/g, " ") ||
														"Pending Meetings"}
												</span>
											</a>
										</li>

										<li>
											<span style={{ cursor: "pointer", paddingLeft: "5px" }}>
												{productData?.company?.company_name}
											</span>
										</li>
									</ul>
								)}
							</div>
						</div>
						<div className="product_detail product_supplier">
							<div className="row">
								<div className="col_img" data-aos="fade-right">
									<div className="slider-for">
										{thumbshow == false ? (
											<div>
												<figure>
													<img
														className="mainimg-display"
														src={thumb?.file_path}
														alt=""
													/>
												</figure>
											</div>
										) : (
											<Slider {...settings}>
												{main?.map((item) => {
													if (item.media_type === "image") {
														return (
															<div>
																<figure>
																	<img
																		className="mainimg-display"
																		src={item.file_path}
																		alt=""
																	/>
																</figure>
															</div>
														);
													} else if (item.media_type === "doc") {
														return (
															<div>
																<figure>
																	<iframe
																		src={
																			"https://view.officeapps.live.com/op/embed.aspx?src=" +
																			item.file_path +
																			"&embedded=true"
																		}
																		style={{
																			height: "500px",
																		}}
																	></iframe>
																</figure>
															</div>
														);
													}
												})}
												{link != "" ? (
													<div>
														<figure>
															<ReactPlayer
																url={productData?.company?.youtube_link}
																width={"auto"}
																height={"300"}
															/>
														</figure>
													</div>
												) : null}
											</Slider>
										)}
									</div>
									<div className="slider-nav">
										<Slider {...settings2}>
											{productData.media_files?.map((item, index) => {
												if (item.media_type === "image") {
													return (
														<div>
															<figure
																className={select == index ? "active" : ""}
															>
																<img
																	className="thumbnail"
																	src={item.file_path}
																	alt={item.file_path}
																	onClick={(e) => {
																		setlink("");
																		setmain([item]);
																		setselect(index);
																		setthumbshow(true);
																	}}
																/>
															</figure>
														</div>
													);
												} else if (item.media_type === "doc") {
													return (
														<div>
															<figure
																className={select == index ? "active" : ""}
																onClick={(e) => {
																	setlink("");
																	setTimeout(() => {
																		setlink("");
																		setmain([item]);
																		setselect(index);
																		setthumbshow(true);
																	}, 200);
																	setselect(index);
																	setmain([item]);
																	setthumbshow(true);
																}}
															>
																{/* <iframe src={"https://docs.google.com/gview?url=" + item.file_path + "&embedded=true"} ></iframe> */}
																<img
																	className="thumbnail"
																	src={"/images/pdf_icon.png"}
																	alt=""
																/>
															</figure>
														</div>
													);
												}
											})}

											{productData?.company?.youtube_link == "null" ? (
												""
											) : (
												<div>
													<figure
														style={
															productData.company?.youtube_link === "null"
																? {
																		display: "none",
																  }
																: {}
														}
														className={select == 100 ? "active" : ""}
														onClick={(e) => {
															setmain([]);
															setTimeout(() => {
																setmain([]);
																setselect(100);
															}, 200);
															setselect(100);
															setlink(productData.company?.youtube_link);
														}}
													>
														{productData.company?.youtube_link == null ? (
															""
														) : (
															<i
																className="turncating fa-brands fa-square-youtube thumbnail"
																style={{
																	color: "#E30613",
																	fontSize: "67px",
																	textAlign: "center",
																	cursor: "pointer",
																}}
															/>
														)}
													</figure>
												</div>
											)}
										</Slider>
									</div>
								</div>
								<div className="col_text" data-aos="fade-left">
									<div className="button">
										{buyersector?.map((item) => {
											return (
												<button className=" btn_margin thiredbtn thiredbtn2 btn ">
													{item}
												</button>
											);
										})}
									</div>
									<h2>{productData?.company?.company_name}</h2>
									<h5>Company Country: {productData?.company?.country}</h5>
									<h2>Company Profile</h2>
									<p>{productData?.company?.company_dec}</p>
									{hideButtons !== true ? (
										<div className="button-wrapper m-lft">
											<a
												className={
													productData?.meeting_status?.status == 3
														? "btn btn-primary  Done-meeting"
														: productData?.meeting_status?.status == 4 ||
														  productData?.meeting_status?.status == 5
														? " btn btn-secondary  Done-meeting"
														: " btn btn-secondary hovr_white hover-transblue"
												}
												onClick={() => {
													if (
														productData?.meeting_status?.status === 1 ||
														productData?.meeting_status?.status === 2
													) {
														handleAcceptClick();
														setacceptId(productData?.meeting_status?.id);
														setProductId(
															productData?.meeting_status?.product_Id
														);
													}
												}}
											>
												{(() => {
													switch (productData?.meeting_status?.status) {
														case undefined:
															return "Request a Meeting";
														case 1:
															return (
																<>
																	<span>
																		<svg
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
																				stroke="white"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			/>
																		</svg>
																	</span>
																	I Accept A Meeting
																</>
															);
														case 2:
															return (
																<>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="24"
																			height="24"
																			viewBox="0 0 24 24"
																			fill="none"
																		>
																			<path
																				d="M14.004 10.2452C13.909 10.2445 13.8174 10.2815 13.7496 10.3481C13.6817 10.4146 13.6429 10.5053 13.6416 10.6004V13.2548C13.6429 13.3501 13.6818 13.4409 13.75 13.5075C13.8182 13.5741 13.9099 13.6109 14.0052 13.61H22.0008C22.0961 13.6109 22.1878 13.5741 22.256 13.5075C22.3242 13.4409 22.3631 13.3501 22.3644 13.2548V10.6004C22.3631 10.5051 22.3242 10.4142 22.256 10.3477C22.1878 10.2811 22.0961 10.2442 22.0008 10.2452H14.0052H14.004ZM18.9072 1.80198C20.0136 1.85478 20.8092 2.07318 21.3132 2.53638C21.8112 2.99478 22.0668 3.65838 22.1172 4.53678V7.05318C22.1146 7.26749 22.0272 7.47202 21.8739 7.62187C21.7207 7.77172 21.5143 7.85462 21.3 7.85238C21.1938 7.85365 21.0884 7.83398 20.9898 7.7945C20.8911 7.75503 20.8013 7.69651 20.7253 7.62229C20.6493 7.54808 20.5886 7.45962 20.5468 7.36197C20.505 7.26433 20.4829 7.1594 20.4816 7.05318L20.4828 4.58238C20.4564 4.12638 20.3472 3.84318 20.1912 3.69918C20.04 3.55998 19.5792 3.43518 18.8676 3.39918H3.1764C2.532 3.42318 2.1132 3.54558 1.9104 3.71958C1.7544 3.85278 1.6368 4.21998 1.6356 4.85478L1.632 18.9788C1.692 19.5956 1.8276 20.0072 2.0016 20.2124C2.1336 20.3684 2.5428 20.5244 3.1452 20.6012H18.8844C19.6212 20.6156 20.0556 20.5052 20.202 20.3576C20.364 20.1932 20.4816 19.7612 20.4816 19.0544V16.6004C20.4816 16.16 20.8476 15.8012 21.3 15.8012C21.7512 15.8012 22.1172 16.16 22.1172 16.6004V19.0544C22.1172 20.1344 21.8964 20.942 21.3792 21.4664C20.8464 22.0064 19.9992 22.2224 18.8676 22.1984L3.048 22.1948C1.9716 22.07 1.2 21.7748 0.7404 21.2312C0.324 20.7392 0.0924 20.0372 0 19.0556V4.85358C0.0024 3.80238 0.2544 3.01158 0.8328 2.51718C1.3632 2.06118 2.1288 1.83918 3.1452 1.80078H18.9072V1.80198ZM22.0008 8.64678C23.1048 8.64678 24 9.52158 24 10.6004V13.2548C24 14.3336 23.1048 15.2084 22.0008 15.2084H14.0052C12.9012 15.2084 12.006 14.3324 12.006 13.2548V10.6004C12.006 9.52158 12.9012 8.64678 14.0052 8.64678H22.0008ZM16.0044 10.9748C15.4524 10.9748 15.0048 11.4068 15.0048 11.9384C15.0048 12.4712 15.4524 12.902 16.0044 12.902C16.5564 12.902 17.004 12.47 17.004 11.9384C17.004 11.4056 16.5564 10.9736 16.0044 10.9736V10.9748Z"
																				fill="#fff"
																			/>
																		</svg>
																	</span>
																	Pending Payment
																</>
															);
														case 3:
															return (
																<>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="22"
																			height="21"
																			viewBox="0 0 22 21"
																			fill="none"
																		>
																			<path
																				d="M15.9991 1.00036H18.6691C19.235 0.990352 19.785 1.1885 20.2145 1.55718C20.644 1.92586 20.9232 2.43942 20.9991 3.00036V10.0004C20.9232 10.5613 20.644 11.0749 20.2145 11.4435C19.785 11.8122 19.235 12.0104 18.6691 12.0004H15.9991M8.99905 14.0004V18.0004C8.99905 18.796 9.31512 19.5591 9.87773 20.1217C10.4403 20.6843 11.2034 21.0004 11.9991 21.0004L15.9991 12.0004V1.00036H4.71905C4.23673 0.994909 3.76868 1.16396 3.40115 1.47636C3.03362 1.78875 2.79138 2.22346 2.71905 2.70036L1.33905 11.7004C1.29555 11.987 1.31488 12.2797 1.39571 12.5581C1.47655 12.8365 1.61695 13.0941 1.8072 13.3128C1.99744 13.5316 2.23297 13.7064 2.49748 13.8251C2.76199 13.9439 3.04915 14.0036 3.33905 14.0004H8.99905Z"
																				stroke="white"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			/>
																		</svg>
																	</span>
																	Meeting Refused
																</>
															);
														case 4:
															return (
																<>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="18"
																			height="13"
																			viewBox="0 0 18 13"
																			fill="none"
																		>
																			<path
																				d="M17 1L6 12L1 7"
																				stroke="white"
																				stroke-width="2"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			/>
																		</svg>
																	</span>
																	Confirmed Meeting
																</>
															);
														case 5:
															return (
																<>
																	<span>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="18"
																			height="13"
																			viewBox="0 0 18 13"
																			fill="none"
																		>
																			<path
																				d="M17 1L6 12L1 7"
																				stroke="white"
																				stroke-width="2"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			/>
																		</svg>
																	</span>
																	Meeting Done
																</>
															);
														default:
															return "";
													}
												})()}
											</a>
											{(productData?.meeting_status?.status === 1 ||
												productData?.meeting_status?.status === 2) && (
												<a
													href="#"
													className="btn btn-primary"
													onClick={() => handleRefuseMeeting()}
												>
													<span>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="22"
															height="21"
															viewBox="0 0 22 21"
															fill="none"
														>
															<path
																d="M15.9991 1.00036H18.6691C19.235 0.990352 19.785 1.1885 20.2145 1.55718C20.644 1.92586 20.9232 2.43942 20.9991 3.00036V10.0004C20.9232 10.5613 20.644 11.0749 20.2145 11.4435C19.785 11.8122 19.235 12.0104 18.6691 12.0004H15.9991M8.99905 14.0004V18.0004C8.99905 18.796 9.31512 19.5591 9.87773 20.1217C10.4403 20.6843 11.2034 21.0004 11.9991 21.0004L15.9991 12.0004V1.00036H4.71905C4.23673 0.994909 3.76868 1.16396 3.40115 1.47636C3.03362 1.78875 2.79138 2.22346 2.71905 2.70036L1.33905 11.7004C1.29555 11.987 1.31488 12.2797 1.39571 12.5581C1.47655 12.8365 1.61695 13.0941 1.8072 13.3128C1.99744 13.5316 2.23297 13.7064 2.49748 13.8251C2.76199 13.9439 3.04915 14.0036 3.33905 14.0004H8.99905Z"
																stroke="white"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
															></path>
														</svg>{" "}
													</span>
													I Refuse A Meeting
												</a>
											)}
										</div>
									) : null}
								</div>
							</div>
						</div>
						{/* <div className="product_supplier_inner">
              <h2>Company (Questions & Answers)</h2>
              <p className="justify-para">{productData?.product?.product_dec}</p>
            </div> */}
						<div className="product-profile-wrapper" style={{ width: "100%" }}>
							{productData.questions?.length > 0 ? (
								<div
									className="product_supplir_profile"
									style={
										productData?.productownerstatus == true
											? { display: "contents" }
											: productData?.requeststatus == 1
											? { display: "contents" }
											: { display: "contents" }
									}
								>
									<div className="profile-list profile-brand">
										<h2>Company (Questions & Answers)</h2>
										<div className="row justify-content-between">
											<div className="col_left last-contnt">
												{productData?.questions
													?.sort((a, b) =>
														a.company_question_id > b.company_question_id
															? 1
															: -1
													)
													?.map((item) => {
														if (item?.answer != "null") {
															if (item?.type.toLowerCase() == "checkbox") {
																try {
																	if (
																		/^[\],:{}\s]*$/.test(
																			item?.answer
																				.replace(/\\["\\\/bfnrtu]/g, "@")
																				.replace(
																					/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
																					"]"
																				)
																				.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
																		)
																	) {
																		var ans = JSON.parse(item?.answer);
																	}
																} catch (error) {
																	console.log(error);
																}
															}
															return (
																<ul>
																	<li>
																		<h6>{item?.question}</h6>
																	</li>
																	<li>
																		<div
																			dangerouslySetInnerHTML={{
																				__html:
																					item?.type.toLowerCase() == "checkbox"
																						? item?.answer?.replace(
																								/[\\\n["{}:\]']+/g,
																								" "
																						  )
																						: item?.answer?.replace(
																								/[\\\n[{}:\]]+/g,
																								"<br>"
																						  ),
																			}}
																		/>
																	</li>
																</ul>
															);
														}
													})}
											</div>
										</div>
									</div>
								</div>
							) : null}

							{/* {productData?.requeststatus === null ||
              (productData?.requeststatus != 1 &&
                productData?.productownerstatus != true) ? (
                <div className="request-box-wrapper">
                  <div className="request-box">
                    <h3>Do you want more information?</h3>
                    {productData?.checkrequest === 0 ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => requestAdmin(productData?.product.id)}
                      >
                        Request to Admin
                      </button>
                    ) : (
                      <button className="btn btn-secondary disabled" disabled>
                        Request in Process
                      </button>
                    )}
                  </div>
                </div>
              ) : null} */}
						</div>
					</div>
				</div>

				<span className="scroll-up">
					<i className="fa fa-chevron-up" aria-hidden="true"></i>
				</span>
			</div>

			<Modal
				title="Request a meeting?"
				modalState={modalState}
				setModalState={setModalState}
			>
				<div className="modal-header">
					<h3>Add your Availability </h3>
				</div>
				<div className=" calendar_fix calendar-wrapper">
					<DatePicker setDate={showTimePicker} />
					{showTP ? <Timepicker setTime={setSTime} sTime={sTime} /> : null}
				</div>
				<div className="selected-time">
					{slots.map((item) => {
						return (
							<p onClick={() => setshowtime(true)}>
								{item.sDate + " - " + item.sTime}
							</p>
						);
					})}
					{sDate !== "" ? (
						<>
							{sDate + " - " + sTime}
							{sTime ? (
								<button
									onClick={confirmSlots}
									className="btn_confirm btn btn-primary"
								>
									Confirm??
								</button>
							) : null}
						</>
					) : null}
				</div>
				<button
					// className="btn btn-secondary appointment-btn" style="display: block;/ margin: 0px auto;
					className="btn btn-secondary appointment-btn "
					onClick={() =>
						requestMeeting(
							productData.product?.id,
							productData.product?.supplier_id
						)
					}
				>
					Request Appointment
					{/* {sDate !== "" ? "on " + sDate + " at " + sTime : null} */}
				</button>
			</Modal>
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
		</>
	);
}

export default Pandingmeeting;
