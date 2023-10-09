import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import { api } from "../base_url";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { timeZoneCity } from "../dashboard/timezone";
import validator from "validator";

function Company_information(props) {
	const [editcompany, seteditcompany] = useState(false);
	const [cInfo, setCInfo] = useState([]);
	const [errMsg, setErrMsg] = useState("");
	const [SaveAdd, setSaveAdd] = useState(0);
	const [sidebar, setsidebar] = useState(true);
	const [successMsg, setSuccessMsg] = useState("");
	const [counrtcode, setcounrtcode] = useState("");
	const [counrtcode1, setcounrtcode1] = useState();
	const [contact_code1, setcontact_code1] = useState("");
	const [counrtcode2, setcounrtcode2] = useState("");
	const [contact_code2, setcontact_code2] = useState("");
	const [searchcode, setsearchcode] = useState("");
	const [searchcode2, setsearchcode2] = useState("");
	const [countrycodeshow, setcountrycodeshow] = useState(false);
	const [countrycodeshow2, setcountrycodeshow2] = useState(false);
	const [timeZone, setTimeZone] = useState([]);
	const [selectedTimeZone, setSeclectedTimeZone] = useState();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [valuetimezonecheck, setvaluetimezonecheck] =
		useState(selectedTimeZone);
	const [showtimezonemodal, setshowtimezonemodal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const utcDetails = timeZoneCity
			.map((city) => city.utc)
			.flat()
			.filter((zone, index, self) => self.indexOf(zone) === index);
		setTimeZone(utcDetails);
	}, []);

	console.log(timeZone, "timezone");
	function onChangeValues(e) {
		if (e.target.files) {
			setCInfo({ ...cInfo, [e.target.name]: e.target.files[0] });
		} else {
			setCInfo({ ...cInfo, [e.target.name]: e.target.value });
		}
	}
	function onchfunction(e) {
		const selectedValue = e.target.value;
		console.log(selectedValue, "onchange selection value");
		setSeclectedTimeZone(selectedValue);
	}

	console.log("cInfo >>>>>>>>>>>>>>>>", cInfo);

	function getCompanyInfo() {
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
		fetch(api + "/api/company-detail", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result?.success == false) {
					toast.error("No records have found ! Please Fill");
					setTimeout(() => {
						navigate("/company-Information-fill", {
							state: {
								fill_now: "details",
							},
						});
					}, 5000);
				} else {
					// setCInfo(result.data);
					// setcounrtcode1(result.data?.contact1_code);
					// setcounrtcode2(result.data?.contact2_code);
					if (result.data?.length != 0) {
						setSeclectedTimeZone(result?.data[0]?.timezone);
						setCInfo(result.data[0]);
						setSaveAdd(result.data[0].copy_billing_address);
						setcounrtcode1(result.data[0]?.contact1_code);
						setcounrtcode2(result.data[0]?.contact2_code);
					} else {
						toast.error("No records have found ! Please Fill");
						setTimeout(() => {
							navigate("/company-Information-fill", {
								state: {
									fill_now: "details",
								},
							});
						}, 3000);
					}
				}
			})
			.catch((error) => {
				toast.error("No records have found");

				console.log("error", error);
			});
	}

	const filtercode = country?.data?.filter((item) => {
		return item.country == cInfo.country;
	});

	useEffect(() => {
		setcounrtcode(filtercode[0]?.code);
	}, [cInfo.country]);



	function editCompanyInfo(event) {
		var formvalues = new FormData();
		delete cInfo?.created_at
		for (let key in cInfo) {
			formvalues.append(key, cInfo[key]);
		}
		formvalues.append("country_code", counrtcode);
		formvalues.append("contact1_code", contact_code1);
		formvalues.append("contact2_code", contact_code2);
		formvalues.append("copy_billing_address", SaveAdd);
		// if()
		if (valuetimezonecheck === undefined) {
			formvalues.append("timezone", selectedTimeZone);
		} else {
			formvalues.append("timezone", valuetimezonecheck);
		}
		formvalues.append(
			"brand_logo",
			cInfo?.brand_logo.name ? cInfo?.brand_logo : ""
		);
		formvalues.append(
			"contact2_image",
			cInfo?.contact2_image.name ? cInfo?.contact2_image : ""
		);
		formvalues.append(
			"contact1_image",
			cInfo?.contact1_image.name ? cInfo?.contact1_image : ""
		);


		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: formvalues,
		};
		fetch(api + "/api/company-information_edit", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if ((result.status = "true")) {
					toast.success(result.message);
					window.scrollTo(0, 0);
					getCompanyInfo();
					setTimeout(() => {
						seteditcompany(false);
						setSuccessMsg("");
						// window.location.reload();
					}, 2000);
				}

				if (result.success) {
					setCInfo(result.data);
				} else {
					// event.preventDefault();
					setSuccessMsg(result.message);
				}
			})
			.catch((error) => {
				// setErrMsg(error);
				if (error) {
					toast.error(error?.message);
					// window.location.reload();
					setTimeout(() => {
						seteditcompany(true);
					}, 1000);
				}
				console.log("error", error);
			});
			setSubmitting(false)
	}

	useEffect(() => {
		// console.log("props.pageType", props.pageType);
		if (props.pageType !== "new") {
			getCompanyInfo();
		} else {
			seteditcompany(true);
		}
		if (props.pageType === "edit") {
			seteditcompany(false);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);

	// useEffect(() =>{
	//   setvaluetimezonecheck(selectedTimeZone)
	// } , [getCompanyInfo])

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
			{/* <div style={{ width: "100%" }}> */}
			<div
				className="main"
				onClick={() => {
					if (countrycodeshow == true) {
						setcountrycodeshow(false);
					}

					if (countrycodeshow2 == true) {
						setcountrycodeshow2(false);
					}
				}}
			>
				<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
				{cInfo ? (
					<div className={sidebar ? "active router-body " : "router-body"}>
						<div className="breadcrumbs" data-aos="fade-down">
							<ul>
								<li>
									<a href="/dashboard">Dashboard </a>
								</li>
								<li>
									<a href="#">My Profile</a>
								</li>
								<li>
									<a
										onClick={() => seteditcompany(false)}
										style={{ cursor: "pointer" }}
									>
										<span> Company Information </span>
									</a>
								</li>
								{editcompany == true ? (
									<li>
										<a href="#">
											<span> Edit Company Information </span>
										</a>
									</li>
								) : (
									""
								)}
							</ul>
						</div>
						<div className="remark_wrap company_wrap row justify-content-between">
							<div className="column">
								<h2>Company Information</h2>
							</div>
							{editcompany ? null : (
								<div className="column">
									<p>
										<a onClick={() => {
											seteditcompany(true)}}>
											Edit Company Information
											<img src="images/edit (1).svg" alt="" />
										</a>
									</p>
								</div>
							)}
						</div>
						<div className="form-section">
							<form
								onSubmit={(e) => {
									if (cInfo?.address1 != "") {
										// e.preventDefault();
										editCompanyInfo(e);
									} else {
										console.log("error");
									}
								}}
							>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Company Name</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="company_name"
												value={cInfo?.company_name}
												onChange={onChangeValues}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Beauty Meetings *"
												disabled={!editcompany}
												style={
													cInfo?.company_name != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Brand Name</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												name="brand_name"
												onChange={onChangeValues}
												value={cInfo?.brand_name}
												placeholder="Beauty Meetings *"
												disabled={!editcompany}
												style={
													cInfo?.brand_name != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
									</div>
								</div>

								<div className="form-row align-items-center">
									<div className="left">
										<label>Brand Logo</label>
										<br />
										<span className="sub-label">
											File Type: JPEG, PNG <br />
											<span>Size: Max 800kb</span>{" "}
										</span>
									</div>
									<div className="right">
										<div className="form-group">
											{cInfo?.brand_logo && !editcompany ? (
												<input
													type="text"
													className={
														editcompany
															? "form-control"
															: "form-control disabled"
													}
													value={cInfo?.brand_logo}
													disabled
												/>
											) : (
												<>
													<div className="upload-files">
														<div className="button">Change</div>

														<div className="files">
															{cInfo?.brand_logo?.name
																? cInfo?.brand_logo?.name
																: cInfo?.brand_logo}{" "}
															{/* {cInfo?.brand_logo?.name}  */}
														</div>
														<div className="delete"></div>

														<input
															type="file"
															name="brand_logo"
															className="form-control"
															onChange={onChangeValues}
															placeholder="Choose Profile Photo"
															disabled={!editcompany}
															readOnly={editcompany}
														/>
													</div>
												</>
											)}
										</div>
									</div>
								</div>

								<div style={{ display: 'none'}} className="form-row align-items-center">
									<div className="left">
										<label>TimeZone</label>
									</div>

									<div className="right">
										<div className="custom_dropdown form-group">
											{editcompany ? (
												<input
													type="text"
													onClick={() => setshowtimezonemodal(true)}
													className="form-control"
													value={
														searchTerm ||
														(selectedTimeZone === "" ? null : selectedTimeZone)
													}
													required
													onChange={(e) => {
														setSearchTerm(e.target.value);
														setSeclectedTimeZone(e.target.value);
														setshowtimezonemodal(true); // This sets the modal to true when there is a change
													}}
													placeholder="Select a City"
												/>
											) : (
												<input
													type="text"
													className="form-control"
													value={selectedTimeZone}
													disabled
												/>
											)}
											{showtimezonemodal === true ? (
												<div className="custom_dropdown_inner">
													{timeZone
														.filter(
															(zone) =>
																zone.includes("/") &&
																!zone.startsWith("Etc/") &&
																zone
																	.toLowerCase()
																	.includes(searchTerm.toLowerCase())
														)
														.map((zone, index) => (
															<p
																key={index}
																onClick={() => {
																	// console.log(value);
																	setshowtimezonemodal(false);
																	setvaluetimezonecheck(zone);
																	setSearchTerm(zone);
																}}
																style={{ cursor: "pointer" }}
															>
																{zone}
															</p>
														))}
												</div>
											) : null}
										</div>
									</div>
								</div>

								<div className="form-row align-items-start">
									<div className="left">
										<label>Head Office Address</label>
									</div>
									<div className="right pd-bt">
										<div className="form-group">
											<input
												type="text"
												name="address1"
												onChange={onChangeValues}
												value={cInfo?.address1}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Address line 1 *"
												disabled={!editcompany}
												style={
													cInfo?.address1 != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="address2"
												onChange={onChangeValues}
												value={
													cInfo?.address2 == "null" || cInfo?.address2 == null
														? ""
														: cInfo?.address2
												}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Address line 2"
												disabled={!editcompany}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="address3"
												onChange={onChangeValues}
												value={
													cInfo?.address3 == "null" || cInfo?.address3 == null
														? ""
														: cInfo?.address3
												}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Address line 3"
												disabled={!editcompany}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="post_code"
												onChange={onChangeValues}
												value={cInfo?.post_code}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Postal Code"
												disabled={!editcompany}
												style={
													cInfo?.post_code != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="city"
												onChange={onChangeValues}
												value={cInfo?.city}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="City"
												disabled={!editcompany}
												style={
													cInfo?.city != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="state"
												onChange={onChangeValues}
												value={cInfo?.state}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="State"
												disabled={!editcompany}
												style={
													cInfo?.state != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div
											className="form-group"
											style={
												cInfo?.country != ""
													? {}
													: { borderBottom: "1px solid red" }
											}
										>
											<select
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												name="country"
												value={cInfo?.country}
												disabled={!editcompany}
												onChange={onChangeValues}
											>
												<option value="" disabled selected>
													Select Country
												</option>
												{country.data.map((data, index) => {
													// console.log(data.dial_code);
													return (
														<option key={index} value={data.country}>
															{data.country}
														</option>
													);
												})}
											</select>
										</div>

										<div className="form-group">
											<input
												type="text"
												name="country_code"
												onChange={onChangeValues}
												value={counrtcode}
												className={
													editcompany
														? "form-control disabled"
														: "form-control disabled"
												}
												placeholder="Country Code"
												disabled={true}
											/>
										</div>
										<div className="form-group">
											{console.log(SaveAdd != "0" ? "true" : "false")}
											<input
												checked={SaveAdd != 0 ? true : false}
												disabled={!editcompany}
												type="checkbox"
												onChange={(e) => {
													if (e.target.checked) {
														setSaveAdd(1);
													} else {
														setSaveAdd(0);
													}
												}}
											/>
											<label>Copy the address to Billing Information</label>
										</div>
									</div>
								</div>
								<div className="form-row align-items-start">
									<div className="left">
										<label>Contact 1</label>
									</div>
									<div className="right pd-bt">
										<div className="form-group">
											<input
												type="text"
												name="contact1_name"
												onChange={onChangeValues}
												value={cInfo?.contact1_name}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Full Name *"
												disabled={!editcompany}
												style={
													cInfo?.contact1_name != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="contact1_job"
												onChange={onChangeValues}
												value={cInfo?.contact1_job}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Job Title *"
												disabled={!editcompany}
												style={
													cInfo?.contact1_job != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="column">
											<div className="form-group">
												<input
													className={
														editcompany ? "countrycodeadd" : "countrycodeadd"
													}
													name="contact1_code"
													defaultValue={counrtcode1}
													value={searchcode == "" ? counrtcode1 : searchcode}
													disabled={!editcompany}
													onClick={() => {
														setcountrycodeshow(!countrycodeshow);
														setcounrtcode1("");
														setsearchcode("");
													}}
													onChange={(e) => {
														setsearchcode(e.target.value);
													}}
													placeholder="Country Code *"
													// style={
													//   errorfield.contact1_code == ""
													//     ? {}
													//     : { borderBottom: "1px solid red" }
													// }
												/>
												<input
													type="text"
													name="contact1_phone"
													onChange={onChangeValues}
													value={cInfo?.contact1_phone}
													placeholder="Phone Number *"
													className={
														editcompany
															? "countrycodeadd2 form-control"
															: "countrycodeadd2 form-control disabled"
													}
													disabled={!editcompany}
													style={
														cInfo?.contact1_phone != ""
															? {}
															: { borderBottom: "1px solid red" }
													}
												/>

												<ul
													style={
														countrycodeshow == true
															? { display: "block" }
															: { display: "none" }
													}
													className="country_codeflag"
												>
													{country.data
														?.filter((value) => {
															if (searchcode === "") {
																return value;
															} else if (
																value?.country
																	.toLowerCase()
																	.includes(searchcode.toLowerCase())
															) {
																return value;
															}
														})
														.map((data, i) => {
															// console.log(data);
															return (
																<li
																	name="contact1_code"
																	value={data.dial_code}
																	onClick={(e) => {
																		setcounrtcode1(
																			data.country + " " + data.dial_code
																		);
																		setsearchcode("");
																		setcontact_code1(data.dial_code);
																	}}
																>
																	<span>
																		<img
																			style={{ height: "12px" }}
																			src={
																				window.location.origin + "/" + data.flag
																			}
																			alt="logo"
																		/>
																	</span>
																	{data.country + " "}
																	{data.dial_code}
																</li>
															);
														})}{" "}
												</ul>
											</div>

											<div className="form-group">
												<input
													type="text"
													name="contact1_email"
													onChange={onChangeValues}
													value={cInfo?.contact1_email}
													className={
														editcompany
															? "form-control"
															: "form-control disabled"
													}
													placeholder="Email Address *"
													disabled={!editcompany}
													style={
														cInfo?.contact1_email != "" && validator.isEmail(cInfo?.contact1_email || "") 
															? {}
															: { borderBottom: "1px solid red" }
													}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Upload Profile Photo</label>
										<br />
										<span className="sub-label">
											File Type: JPEG, PNG <br />
											<span>Size: Max 800kb</span>{" "}
										</span>
									</div>
									<div className="right">
										<div className="form-group">
											{cInfo?.contact1_image && !editcompany ? (
												<input
													type="text"
													className={
														editcompany
															? "form-control"
															: "form-control disabled"
													}
													value={cInfo?.contact1_image}
													disabled
												/>
											) : (
												// cInfo?.contact1_image
												<>
													<div className="upload-files">
														<div className="button">Change</div>
														<div className="files">
															{" "}
															{cInfo?.contact1_image?.name
																? cInfo?.contact1_image?.name
																: cInfo?.contact1_image}{" "}
															{/* {cInfo?.contact1_image?.name}{" "} */}
														</div>
														<div className="delete"></div>

														<input
															disabled={!editcompany}
															readOnly={editcompany}
															type="file"
															name="contact1_image"
															className="form-control"
															onChange={onChangeValues}
															placeholder="Choose Profile Photo"
														/>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
								<div className="form-row align-items-start">
									<div className="left">
										<label>Contact 2</label>
									</div>
									<div className="right pd-bt">
										<div className="form-group">
											<input
												type="text"
												name="contact2_name"
												onChange={onChangeValues}
												value={
													cInfo?.contact2_name != "null"
														? cInfo?.contact2_name
														: ""
												}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Full Name"
												disabled={!editcompany}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												name="contact2_job"
												onChange={onChangeValues}
												value={
													cInfo?.contact2_job == "null"
														? ""
														: cInfo?.contact2_job
												}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="Job Title"
												disabled={!editcompany}
											/>
										</div>
										<div className="column">
											<div className="form-group">
												<input
													className={
														editcompany ? "countrycodeadd" : "countrycodeadd"
													}
													defaultValue={counrtcode2}
													value={searchcode2 == "" ? counrtcode2 : searchcode2}
													disabled={!editcompany}
													onClick={() => {
														setcountrycodeshow2(!countrycodeshow2);
														setcounrtcode2("");
														setsearchcode2("");
													}}
													onChange={(e) => {
														setsearchcode2(e.target.value);
													}}
													placeholder="Country Code "
													autoComplete="off"
												/>

												<input
													type="text"
													name="contact2_phone"
													onChange={onChangeValues}
													value={
														cInfo?.contact2_phone == "null"
															? ""
															: cInfo?.contact2_phone
													}
													className={
														editcompany
															? "countrycodeadd2 form-control"
															: "countrycodeadd2 form-control disabled"
													}
													placeholder="Phone Number"
													disabled={!editcompany}
												/>

												<ul
													style={
														countrycodeshow2 == true
															? { display: "block" }
															: { display: "none" }
													}
													className="country_codeflag"
												>
													{country.data
														?.filter((value) => {
															if (searchcode2 === "") {
																return value;
															} else if (
																value?.country
																	.toLowerCase()
																	.includes(searchcode2.toLowerCase())
															) {
																return value;
															}
														})
														.map((data, i) => {
															// console.log(data);
															return (
																<li
																	name="contact2_code"
																	value={data.dial_code}
																	onClick={(e) => {
																		setcounrtcode2(
																			data.country + " " + data.dial_code
																		);
																		setsearchcode2("");
																		setcontact_code2(data.dial_code);
																	}}
																>
																	<span>
																		<img
																			style={{ height: "12px" }}
																			src={
																				window.location.origin + "/" + data.flag
																			}
																			alt="logo"
																		/>
																	</span>
																	{data.country + " "}
																	{data.dial_code}
																</li>
															);
														})}{" "}
												</ul>
											</div>
											<div className="form-group">
												<input
													type="text"
													name="contact2_email"
													onChange={onChangeValues}
													value={
														cInfo?.contact2_email == "null"
															? ""
															: cInfo?.contact2_email
													}
													className={
														editcompany
															? "form-control"
															: "form-control disabled"
													}
													placeholder="Email Address"
													disabled={!editcompany}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Upload Profile Photo</label>
										<br />
										<span className="sub-label">
											File Type: JPEG, PNG <br />
											<span>Size: Max 800kb</span>{" "}
										</span>
									</div>
									<div className="right">
										<div className="form-group">
											{cInfo?.contact2_image && !editcompany ? (
												<input
													type="text"
													className={
														editcompany
															? "form-control"
															: "form-control disabled"
													}
													value={cInfo?.contact2_image}
													disabled
												/>
											) : (
												// cInfo?.contact2_image
												<>
													<div className="upload-files">
														<div className="button">Change</div>
														<div className="files">
															{" "}
															{cInfo?.contact2_image?.name
																? cInfo?.contact2_image?.name
																: cInfo?.contact2_image}{" "}
														</div>
														<div className="delete"></div>

														<input
															type="file"
															disabled={!editcompany}
															readOnly={editcompany}
															name="contact2_image"
															className="form-control"
															onChange={onChangeValues}
															placeholder="Choose Profile Photo"
														/>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Company Website</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="website"
												onChange={onChangeValues}
												value={cInfo?.website}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="www.beautymeetings.co.uk *"
												disabled={!editcompany}
												style={
													cInfo?.website != ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Facebook</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="facebook"
												onChange={onChangeValues}
												value={cInfo?.facebook == "null" ? "" : cInfo?.facebook}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="link here"
												disabled={!editcompany}
											/>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Instagram</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="instagram"
												onChange={onChangeValues}
												value={
													cInfo?.instagram == "null" ? "" : cInfo?.instagram
												}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="link here"
												disabled={!editcompany}
											/>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Linkedin</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="linkedin"
												onChange={onChangeValues}
												value={cInfo?.linkedin == "null" ? "" : cInfo?.linkedin}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="link here"
												disabled={!editcompany}
											/>
										</div>
									</div>
								</div>
								<div className="form-row align-items-center">
									<div className="left">
										<label>Youtube</label>
									</div>
									<div className="right">
										<div className="form-group">
											<input
												type="text"
												name="youtube"
												onChange={onChangeValues}
												value={cInfo?.youtube == "null" ? "" : cInfo?.youtube}
												className={
													editcompany ? "form-control" : "form-control disabled"
												}
												placeholder="link here"
												disabled={!editcompany}
											/>
										</div>
									</div>
								</div>

								{errMsg !== "" ? <p className="error">{errMsg}</p> : null}
								{editcompany ? (
									<div className="btn_wrapper row">
										<button
											className="btn btn-secondary"
											onClick={() => {
												if (
													(cInfo?.address1 !== "" &&
														cInfo?.company_name !== "" &&
														cInfo?.post_code !== "" &&
														cInfo?.brand_name !== "" &&
														cInfo?.website !== "" &&
														cInfo?.post_code !== "" &&
														cInfo?.state !== "" &&
														cInfo?.country !== "" &&
														cInfo?.contact1_email !== "" &&
														validator.isEmail(cInfo?.contact1_email || "") &&
														cInfo?.contact1_phone !== "" &&
														cInfo?.contact1_job !== "" &&
														cInfo?.contact1_name !== "" &&
														cInfo?.city !== "" 
														// &&
														// valuetimezonecheck !== ""
														) 
													// 	||
													// (selectedTimeZone !== "" &&
													// 	valuetimezonecheck !== "undefined" &&
													// 	valuetimezonecheck !== undefined)
												) {
													if (!submitting) {
														setSubmitting(true);
														editCompanyInfo();
													}
												} else {
													window.scrollTo(0, 0);
													toast.error("Please Fill All Required Fields!");
												}
											}}
											type="button"
										>
											Submit
										</button>
										<button onClick={() => seteditcompany(false)} className="btn btn-primary">Cancel</button>
									</div>
								) : null}
							</form>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}

export default Company_information;
