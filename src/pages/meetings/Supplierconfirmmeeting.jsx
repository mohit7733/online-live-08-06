import React, { useState, useEffect } from "react";
import downloadicon from "../../assets/images/download.svg";
import axios from "axios";
import { country } from "../../pages/dashboard/country";
import moment from "moment-timezone";
import { api } from "../base_url";
import warningicon from "../../assets/images/warning2.png";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Supplierconfirmmeeting(props) {
	const [accept, setaccept] = useState(false);
	const [meetingData, setmeetingData] = useState();
	const [noDataFound, setNoDataFound] = useState(false)
	const [meetingData2, setmeetingData2] = useState();
	const [alertshow, setalertshow] = useState(false);
	const path = window.location.pathname;
	console.log(path);
	const [acceptId, setAcceptId] = useState();
	const [shortby, setshortby] = useState("");
	const [searchdata, setsearchdata] = useState("");

	const navigate = useNavigate();
	useEffect(() => {
		setmeetingData([]);
		setNoDataFound(false)
		axios
			.get(
				api +
					"/api/v1/" +
					(path == "/requested-meeting/buyer"
						? "buyermeetingreqlist?sortBy=" +
						  shortby +
						  "&buyerName=" +
						  searchdata
						: "supplier-confrm-meeting?sortBy=" +
						  shortby +
						  "&buyerName=" +
						  searchdata),
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				// Handle the response here
				console.log(response?.data?.data?.meetings);
				if(response.data?.data?.meetings?.length === 0) {
					setNoDataFound(true)
				}
				let data = Object.values(response?.data?.data?.meetings).filter(
					(data, index) => {
						if (path === "/confirmed-meeting/supplier") {
							// console.log(data);
							if (data.buyer_status != 5 && data?.buyerName != undefined) {
								console.log(data);
								return data;
							}
						} else if (path === "/requested-meeting/buyer") {
							if (data.status != 5 && data?.supplierName != undefined) {
								console.log(data);
								return data;
							}
						}
					}
				);
				// Object.values(response?.data?.data?.meetings).map((data, index) => {
				//   console.log(data);
				//   if (path === "/passed-meeting/buyer" && data?.buyerStatus === 2) {
				//     console.log(Object.values(response?.data?.data?.meetings));
				//     meetingData.push(data)
				//     meetingData2.push(data)
				//   } else if (path === "/passed-meeting/supplier" && data?.status === 5) {
				//     console.log(Object.values(response?.data?.data?.meetings));
				//     meetingData.push(data)
				//     meetingData2.push(data)
				//   }
				// })
				setmeetingData(data);
				setmeetingData2(data);
				// setmeetingData(Object.values(response?.data?.data?.meetings));
				// setmeetingData2(Object.values(response?.data?.data?.meetings));
				if (shortby == "A-Z") {
					searchfilter();
				}
			})
			.catch((error) => {
				// Handle any errors here
				console.error(error);
			});
	}, [shortby]);
	useEffect(() => {
		if (path === "/confirmed-meeting/buyer") {
			navigate("/requested-meeting/buyer");
		}
	}, [path]);

	console.log(path, "this is path");
	const searchfilter = () => {
		if (path != "/requested-meeting/buyer") {
			const sortedData = [...meetingData].sort((a, b) => {
				if (
					a.buyerName.buyername != undefined &&
					b.buyerName.buyername != undefined
				) {
					return a.buyerName.buyername.localeCompare(b.buyerName.buyername);
				}
			});
			setmeetingData(sortedData);
			console.log(sortedData);
		} else {
			const sortedData = [...meetingData].sort((a, b) =>
				a.supplierName.suppliername.localeCompare(b.supplierName.suppliername)
			);
			setmeetingData(sortedData);
		}
	};

	const handleButtonClick = (id) => {
		const url = window.location.pathname;

		let apiEndpoint = "";
		if (url.includes("confirmed-meeting/supplier")) {
			apiEndpoint = `/api/v1/supplier-meeting-done`;
		} else if (url.includes("confirmed-meeting/buyer")) {
			apiEndpoint = `/api/v1/buyer-meeting-done`;
		}

		axios
			.get(api + apiEndpoint, {
				params: {
					meeting_id: id,
				},
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				toast.success("Meeting Done !");
				// Handle successful response here
				console.log(response.data);
				navigate("/passed-meeting/supplier");
				// Do something with the data
			})
			.catch((error) => {
				// Handle error here
				console.error(error);
				// Display an error message or perform any necessary actions
			});
	};

	const data = meetingData?.map((detail) => {
		const supplierAvailable = detail?.supplier_available
			? JSON.parse(detail.supplier_available)
			: [];
		const supplierAvailableDates = supplierAvailable.map(
			(availability) => availability.date
		);
		const supplierAvailableTimes = supplierAvailable.map(
			(availability) => availability.time
		);

		const meetingTimeBuyer = detail?.meetDateTime
			? detail?.meetDateTime.map(
					(dateTime) => `${dateTime.meet_date} ${dateTime.meet_time}`
			  )
			: "Not Added";

		const meetingSupplierTime = detail?.meetDateTime
			? detail?.meetDateTime.map(
					(dateTime) =>
						`${dateTime.supplier_timezone_date} ${dateTime.supplier_timezone_time}`
			  )
			: "Not Added";

		return {
			id: detail?.id,
			supplier_id: detail?.supplier_id,
			buyer_status: detail?.buyer_status,
			show_contact: detail?.show_contact,
			status: detail?.status,
			meetingDateTimeStrings: [
				`${supplierAvailableDates[0]} ${supplierAvailableTimes[0]}`,
			],
			supplieravailabledate:
				supplierAvailableDates.length > 0
					? supplierAvailableDates
					: ["Not Added"],
			supplieravailabletime:
				supplierAvailableTimes.length > 0
					? supplierAvailableTimes
					: ["Not Added"],
			supplier_Time_Zone: detail?.supplier_timezone,
			buyer_Time_Zone: detail?.buyer_timezone,
			supplierCityName: detail?.supplierCityName?.city_name,
			buyerCityName: detail?.buyerCityName?.city_name,
			buyerCountryCode:
				detail?.buyerCountryCode?.countrycode !== "undefined"
					? detail.buyerCountryCode.countrycode
					: "",
			supplierCountryCode: detail?.supplierCountryCode?.countrycode,
			buyer_id: detail?.buyer_id,
			buyername: detail?.buyerName?.buyername,
			countrycode:
				detail?.supplierCountryCode?.countrycode != null
					? detail?.supplierCountryCode?.countrycode
					: "Not Added",
			meetingDates: detail?.supplier_available
				? JSON.parse(detail?.supplier_available)?.map((date) => date.date)
				: ["Not Added"],
			meetingTime: detail?.supplier_available
				? JSON.parse(detail?.supplier_available).map((time) => time.time)
				: ["Not Added"],
			meetingTime2: detail?.buyer_availaible_timezone
				? JSON.parse(detail?.buyer_availaible_timezone).map((time) => time)
				: ["Not Added"],
			meetingBuyerTime: meetingTimeBuyer,
			meetingSupplierTime: meetingSupplierTime,
		};
	});
	console.log(data, "this is data");

	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(meetingData?.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = meetingData?.slice(indexOfFirstItem, indexOfLastItem);
	const handlePrevBtn = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextBtn = () => {
		console.log("handlenextbutton");
		console.log(currentPage);
		setCurrentPage(currentPage + 1);
	};
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	// console.log(data[0]?.countrycode, "this is data");
	return (
		<>
			{alertshow == true ? (
				<div className="alert_box">
					<div className="box_size">
						<img
							src={warningicon}
							style={{ paddingBottom: "14px" }}
							alt="warning"
						/>
						<br />
						<p> Is the meeting done?</p>

						<div>
							<button
								onClick={() => setalertshow(false)}
								className="btn btn-block btn-secondary"
							>
								Cancel
							</button>
							<button
								onClick={() => handleButtonClick(acceptId)}
								className="btn btn-block btn-primary"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<div className={(props.sidebar ? "active " : " ") + "router-body"}>
				<div className="breadcrumbs" data-aos="fade-down">
					<ul>
						<li>
							<a href="#"> Dashboard </a>
						</li>
						<li>
							<a href="#"> {path.endsWith("/buyer") ? "Buyer" : "Supplier"} </a>
						</li>
						<li>
							<a href="#">
								<span> My Meetings</span>
							</a>
						</li>
						<li>
							<span style={{ cursor: "pointer", paddingLeft: "5px" }}>
								{path?.includes("/buyer")
									? "Requested Meetings "
									: "Confirmed Meetings"}
							</span>
						</li>
					</ul>
				</div>
				<div className="add_product_wrap row justify-content-between">
					<div className="column">
						<div className="search">
							<input
								type="text"
								className="form-control"
								placeholder="Type here"
								onChange={(e) => setsearchdata(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className="btn btn-block btn-secondary"
							onClick={(e) => setshortby(shortby == " " ? "" : " ")}
						>
							Search
						</button>
					</div>
					<div className="column justify-end">
						<div className="custom-select">
							<select onChange={(e) => setshortby(e.target.value)}>
								<option value={""}>
									<span>Sorted by</span>
								</option>
								<option value={"A-Z"}>Alphabetic</option>
								<option value={"DESC"}>
									Latest{" "}
									{path == "/requested-meeting/buyer" ? "Suppliers" : "Buyers"}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div className="table_form  buyer_meeting">
					<table>
						<thead>
							<tr>
								<th>
									{path == "/requested-meeting/buyer" ? "Supplier" : "Buyer"}{" "}
									Name
								</th>
								<th>Country Codes</th>
								<th>
									{path != "/requested-meeting/buyer"
										? " Buyer Date / Time"
										: "Supplier Date / Time"}
								</th>
								<th>
									{path == "/requested-meeting/buyer"
										? " Buyer Date / Time"
										: "Supplier Date / Time"}{" "}
									{/* (
                  {data !== undefined
                    ? meetingData[0]?.buyerCountryCode.countrycode
                    : ""}
                  ) */}
									{/* ({" "}
                  {meetingData[0]?.supplierCountryCode?.countrycode}) */}
								</th>
								<th>
									{path == "/requested-meeting/buyer" ? "Supplier" : ""} Profile
								</th>
								<th>Meeting Status</th>
								{/* <th>Passed meeting</th> */}
								{/* <th>ICS</th> */}
							</tr>
						</thead>
						<tbody>
							{data?.map((meeting, index) => {
								if (currentPage * 5 > index && (currentPage - 1) * 5 <= index) {
									return [0, 1, 2, 3, 4].includes(meeting?.status) ? (
										<tr key={index}>
											<td>
												{path != "/requested-meeting/buyer"
													? meeting.buyername
													: meetingData[index]?.supplierName?.suppliername}
											</td>
											<td>
												{" "}
												{path == "/requested-meeting/buyer"
													? meeting?.supplierCountryCode
													: meeting?.buyerCountryCode}
											</td>

											{path === "/requested-meeting/buyer" ? (
												meeting?.status === 4 ? (
													<>
														<td>
															<div>
																{console.log(meeting?.meetingDateTimeStrings)}
																{meeting?.meetingDateTimeStrings.map(
																	(time, index) => (
																		<div key={index}>
																			{time.replace(/[\[\]]/g, "")}
																		</div>
																	)
																)}
															</div>
														</td>
														<td>
															<div>
																{meeting?.meetingTime2.map((time, index) => (
																	<div key={index}>
																		{time.replace(/[\[\]]/g, "")}
																	</div>
																))}
															</div>
														</td>
													</>
												) : (
													<>
														<td>
															<div>
																{console.log(meeting?.meetingSupplierTime)}
																{meeting?.meetingSupplierTime.map(
																	(time, index) => (
																		<div key={index}>
																			{time.replace(/[\[\]]/g, "")}
																		</div>
																	)
																)}
															</div>
														</td>
														<td>
															<div>
																{meeting?.meetingBuyerTime.map(
																	(time, index) => (
																		<div key={index}>
																			{time.replace(/[\[\]]/g, "")}
																		</div>
																	)
																)}
															</div>
														</td>
													</>
												)
											) : (
												<>
													<td>
														{meeting?.meetingTime2.map((date, index) => {
															return date;
														})}
													</td>
													<td>
														<div>
															{meeting?.meetingDates?.map((date, index) => {
																return date;
															})}{" "}
															{meeting?.supplieravailabletime?.map(
																(time, index) => {
																	return time;
																}
															)}
														</div>
													</td>
												</>
											)}

											<td className="roles">
												<a
													// href={`/buyer-profile/pending-meeting/${meeting?.buyer_id}`}
													className="btn btn-success"
													onClick={() => {
														path == "/requested-meeting/buyer"
															? navigate(
																	"/product-view/" +
																		meetingData[index].product_id +
																		"/" +
																		meetingData[index]?.product_name?.replace(
																			/\s+/g,
																			"-"
																		),
																	{
																		state: {
																			id: data.id,
																			path: path,
																			show_contact: data?.show_contact || 0,
																		},
																	}
															  )
															: navigate(
																	`/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
																	{
																		state: {
																			id: meeting?.id,
																			path: path,
																			buyer_id: meeting?.buyer_id,
																			time: meeting?.meetingDates,
																			date: meeting?.meetingTime,
																			supplier_id: meeting?.supplier_id,
																			show_contact: meeting?.show_contact || 0,
																		},
																	}
															  );
													}}
												>
													View More
												</a>
											</td>
											<td>
												<div className="button_wrap row">
													{path == "/confirmed-meeting/buyer" &&
													meeting.buyer_status == 1 ? (
														<a
															href=""
															className="btn btn-secondary"
															// onClick={(event) =>
															//   // handleButtonClick(meeting?.id, event)
															//   {
															//     setalertshow(true);
															//     setAcceptId(meeting?.id);
															//   }
															// }
														>
															Requested
														</a>
													) : (
														<a
															// href=""
															className={
																meeting?.buyer_status === 3
																	? "btn btn-primary Done-meeting"
																	: "btn btn-secondary remove-secondary"
															}
															// onClick={(event) =>
															//   // handleButtonClick(meeting?.id, event)
															//   {
															//     setalertshow(true);
															//     setAcceptId(meeting?.id);
															//   }
															// }
														>
															{path === "/requested-meeting/buyer"
																? meeting?.buyer_status === 1
																	? "Pending Meeting"
																	: meeting?.buyer_status === 2
																	? "Complete"
																	: meeting?.buyer_status === 3
																	? "Meeting Refused"
																	: "Meeting Accepted"
																: meeting?.status === 4
																? "Meeting Accepted"
																: meeting?.status === 5
																? "Completed"
																: meeting?.status === 1
																? "In Progress"
																: meeting?.status === 2
																? "Supplier confirm Meeting. Payment Pending"
																: meeting?.status === 3
																? "Refused"
																: ""}
														</a>
													)}
												</div>
											</td>
										</tr>
									) : (
										""
									);
								}
							})}
						</tbody>
					</table>
				</div>
				<div className="pagination">
					{noDataFound == true ? "Data not found" : currentItems?.length === 0 ? (
						`Please wait while we load your meetings.`
					) : (
						<ul>
							{currentPage !== 1 && (
								<li onClick={handlePrevBtn} className="selected">
									<a>
										{" "}
										<img
											src={window.location.origin + "/images/arrow-right.png"}
											title=""
											alt=""
											style={{ transform: "rotateY(180deg)" }}
										/>{" "}
										Previous{" "}
									</a>
								</li>
							)}
							{pages?.map((page, index) => {
								if (index > currentPage - 3 && index < currentPage + 2) {
									return (
										<li
											key={index}
											onClick={() => setCurrentPage(page)}
											className={
												currentPage === page
													? pages.length == 1
														? "active new"
														: "active"
													: ""
											}
										>
											<a style={{ cursor: "pointer" }}>{page}</a>
										</li>
									);
								}
							})}
							{currentPage !== totalPages &&
								currentPage > 1 &&
								totalPages > 3 && (
									<li className="selected" onClick={handleNextBtn}>
										<a>
											Next{" "}
											<img
												src={window.location.origin + "/images/arrow-right.png"}
												title=""
												alt=""
											/>
										</a>
									</li>
								)}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}

export default Supplierconfirmmeeting;
