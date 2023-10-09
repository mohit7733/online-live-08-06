import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { country } from "../../pages/dashboard/country";
import { api } from "../base_url";
function Supplierpassedmeeting(props) {
	const [accept, setaccept] = useState(false);
	const [meetingData, setMeetingData] = useState([]);
	const [meetingData2, setmeetingData2] = useState([]);
	const [noDataFound, setNoDataFound] = useState(false)
	const navigate = useNavigate();
	const path = window.location.pathname;
	const [shortby, setshortby] = useState("");
	const [searchdata, setsearchdata] = useState("");

	useEffect(() => {
		setMeetingData([]);
		setNoDataFound(false)
		axios
			.get(
				api +
					"/api/v1/" +
					(path == "/passed-meeting/buyer"
						? "buyermeetingreqlist?sortBy=" +
						  shortby +
						  "&buyerName=" +
						  searchdata
						: "supplier-complete-meeting?sortBy=" +
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
				if(response.data?.data?.meetings?.length === 0) {
					setNoDataFound(true)
				}
				// Handle the response here
				let data = Object.values(response?.data?.data?.meetings).filter(
					(data, index) => {
						if (path === "/passed-meeting/buyer") {
							// console.log(data);
							if (data.buyer_status == 2) {
								console.log(data);
								return data;
							}
						} else if (path === "/passed-meeting/supplier") {
							if (data.status == 5) {
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
				setMeetingData(data);
				setmeetingData2(data);
				if (shortby == "A-Z") {
					searchfilter();
				}
			})
			.catch((error) => {
				// Handle any errors here
				console.error(error);
			});
	}, [shortby]);

	const searchfilter = () => {
		if (path != "/passed-meeting/buyer") {
			console.log("else condition");
			const sortedData = [...meetingData].sort((a, b) => {
				if (
					a.buyerName != undefined &&
					b.buyerName != undefined &&
					a.buyerName != null &&
					b.buyerName != null
				) {
					return a.buyerName.buyername.localeCompare(b.buyerName.buyername);
				}
			});
			setMeetingData(sortedData);
			console.log(sortedData);
		} else {
			const sortedData = [...meetingData].sort((a, b) => {
				if (
					a.supplierName != undefined &&
					b.supplierName != undefined &&
					a.supplierName != null &&
					b.supplierName != null
				) {
					return a.supplierName.suppliername.localeCompare(
						b.supplierName.suppliername
					);
				}
			});
			setMeetingData(sortedData);
		}
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

		return {
			id: detail?.id,
			show_contact: detail?.show_contact,
			supplier_id: detail?.supplier_id,
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
			remarks_supplier: detail?.supplier_remark,
			remarks_buyer: detail?.buyer_remark,
			buyerCityName: detail?.buyerCityName?.city_name,
			buyerStatus: detail?.buyer_status,
			buyerCountryCode:
				detail?.buyerCountryCode?.countrycode !== "undefined"
					? detail?.buyerCountryCode?.countrycode
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
		};
	});

	const handleViewRemark = (id) => {
		navigate(`/add-remark/${id}`, {
			state: {
				usertype: path === "/passed-meeting/buyer" ? "Buyer" : "Supplier",
				path: path,
			},
		});
	};
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(meetingData.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = meetingData?.slice(indexOfFirstItem, indexOfLastItem);
	const handlePrevBtn = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextBtn = () => {
		setCurrentPage(currentPage + 1);
	};

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	// console.log(pages, data, "this is data");
	return (
		<>
			<div className={(props.sidebar ? "active " : " ") + "router-body"}>
				<div className="breadcrumbs" data-aos="fade-down">
					<ul>
						<li>
							<a href="/dashboard"> Dashboard </a>
						</li>
						<li>
							<a href="/">
								{path == "/passed-meeting/buyer" ? "Buyer" : "Supplier"}
							</a>
						</li>
						<li>
							<a
								href={`/passed-meeting${
									path === "/passed-meeting/buyer" ? "/buyer" : "/supplier"
								}`}
							>
								<span> My Meetings</span>
							</a>
						</li>
						<li>
							<span style={{ cursor: "pointer", paddingLeft: "5px" }}>
								Passed Meetings
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
									{path == "/passed-meeting/buyer" ? "Suppliers" : "Buyers"}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div className="table_form">
					<table>
						<thead>
							<tr>
								<th>
									{path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"} Name
								</th>
								<th>Country Codes</th>
								<th>
									{" "}
									{path != "/passed-meeting/buyer"
										? " Buyer Date / Time"
										: "Supplier Date / Time"}{" "}
								</th>
								<th>
									{path == "/passed-meeting/buyer"
										? " Buyer Date / Time"
										: "Supplier Date / Time"}
									{/* (
									{data !== undefined
										? meetingData[0]?.buyerCountryCode.countrycode
										: ""}
									) */}
									{/* ({" "}
                  {meetingData[0]?.supplierCountryCode?.countrycode}) */}
								</th>
								<th>
									{path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"}{" "}
									Profile
								</th>
								<th>Remarks</th>
								<th>Meeting Status</th>
							</tr>
						</thead>
						<tbody>
							{data?.map((meeting, index) => {
								if (currentPage * 5 > index && (currentPage - 1) * 5 <= index) {
									return (
										<tr>
											<td>
												{path === "/passed-meeting/buyer"
													? meetingData[index]?.supplierName?.suppliername
													: meetingData[index]?.buyerName?.buyername}
											</td>
											<td>
												{" "}
												{path === "/passed-meeting/buyer"
													? meeting?.supplierCountryCode
													: meeting?.buyerCountryCode}
											</td>

											{path === "/passed-meeting/buyer" ? (
												<>
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
													<td>
														{meeting?.meetingTime2.map((date, index) => {
															return date;
														})}
													</td>
												</>
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

											<td>
												<a
													// href={`/buyer-profile/pending-meeting/${meeting?.buyer_id}`}
													className="btn btn-success"
													onClick={() => {
														path === "/passed-meeting/buyer"
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
																			show_contact: meeting?.show_contact,
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
											<td className="remark_passed">
												{path !== "/passed-meeting/buyer" ? (
													!meeting?.remarks_supplier ? (
														<a
															onClick={() => handleViewRemark(meeting?.id)}
															className="btn22 btn btn-warning"
														>
															Add Remark
														</a>
													) : (
														<a
															onClick={() =>
																navigate(
																	`/view-remark/${meeting?.id}/${meeting?.id}`,
																	{
																		state: {
																			path: path,
																			usertype:
																				path === "/passed-meeting/buyer"
																					? "Buyer"
																					: "Supplier",
																		},
																	}
																)
															}
															className="btn22 btn btn-warnings "
														>
															View Remarks
														</a>
													)
												) : !meeting?.remarks_buyer ? (
													<a
														onClick={() => handleViewRemark(meeting?.id)}
														className="btn22 btn btn-warning"
													>
														Add Remark
													</a>
												) : (
													<a
														onClick={() =>
															navigate(
																`/view-remark/${meeting?.id}/${meeting?.id}`,
																{
																	state: {
																		path: path,
																		usertype:
																			path === "/passed-meeting/buyer"
																				? "Buyer"
																				: "Supplier",
																	},
																}
															)
														}
														className="btn22 btn btn-warnings"
													>
														View Remarks
													</a>
												)}
											</td>
											<td>
												<div className="button_wrap row">
													<a
														onClick={(event) => {
															event.preventDefault();
														}}
														style={{ pointerEvents: "none" }}
														href=""
														className="btn btn-secondary remove-secondary"
													>
														{meeting?.status === 4
															? "Supplier confirm Meeting"
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
												</div>
											</td>
										</tr>
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
								if (index > currentPage - 3 && index < currentPage + 3) {
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
							{currentPage !== totalPages && currentPage > 1 && (
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

export default Supplierpassedmeeting;
