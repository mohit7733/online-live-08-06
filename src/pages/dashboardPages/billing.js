import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import downloadpng from "../../assets/images/download.svg";
import warningicon from "../../assets/images/warning2.png";
import axios from "axios";
import { api, stripe_cancel_sub } from "../base_url";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Left_arrow from "../../assets/images/arrow-left (1).png";
import Right_arrow from "../../assets/images/arrow-right (1).png";
function Billing() {
	const [sidebar, setsidebar] = useState(true);
	const [billingdata, setbillingdata] = useState([]);
	const [showAlert, setShowAlert] = useState({ open: false });
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const navigate = useNavigate();

	const getdatabysort = (parameter) => {
		console.log("clicked");
		axios
			.get(
				api + "/api/billing-details?sortBy=" +
				parameter,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then((response) => {
				if (response?.status == 200) {
					setbillingdata(response.data?.data);
				}
				console.log(0);
				// Handle the response data here
				console.log(response.data, "this is data");
			})
			.catch((error) => {
				// Handle errors here
				toast.error(error?.message);

				console.error("An error occurred:", error);
			});
	};

	useEffect(() => {
		getBillingDetails();
	}, []);

	const getBillingDetails = () => {
		let config = {
			method: "get",
			url: api + "/api/billing-details",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				if (response?.status == 200) {
					setbillingdata(response.data?.data);
				}
			})
			.catch((error) => {
				toast.error(error?.message);
			});
	};

	const totalPages = Math.ceil(billingdata.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = billingdata.slice(indexOfFirstItem, indexOfLastItem);

	const handlePrevBtn = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextBtn = () => {
		setCurrentPage(currentPage + 1);
	};

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const cancelSubscription = async () => {
		let sk = showAlert?.subscriptionId;
		let id = showAlert?.id;
		try {
			let res1 = await axios.post(stripe_cancel_sub, {
				subscriptionId: sk,
			});
			console.log("res1.data", res1?.data);
			console.log("res1.data.data", res1?.data?.data);
			if (res1.status === 200) {
				let res2 = await axios.post(
					`${api}/api/cancel-recurring-subscription`,
					{
						subscription_id: sk,
						id: id,
						payment_json: res1?.data,
					}
				);
				if (res2?.status === 200) {
					toast.success("Plan canceled successfully");
					getBillingDetails();
				} else {
					toast.error("Fail to cancel plan");
				}
			} else {
				toast.error("Fail to cancel plan");
			}
			console.log(res1.status);
			setShowAlert({ open: false });
		} catch (error) {
			setShowAlert({ open: false });
			toast.error("Fail to cancel plan");
			console.log(error);
		}
	};

	return (
		<div className="product_showcase Billing_wrapper Meeting_wrap profile_popup">
			<div className="main">
				<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
				<div
					className={
						sidebar == true
							? "router-body billingInners active"
							: "router-body billingInners"
					}
				>
					<div className="breadcrumbs" data-aos="fade-down">
						<ul>
							<li>
								<a href="/dashboard"> Dashboard </a>
							</li>
							<li>
								<a href="#"> My Profile</a>
							</li>
							<li>
								<a href="#">
									<span> Administrative Informations</span>
								</a>
							</li>
							<li>
								<a href="#">
									<span> Billing</span>
								</a>
							</li>
						</ul>
					</div>

					<div className="add_product_wrap row justify-content-between billing">
						<div className="column">
							<h2>Billing</h2>
						</div>
						<div className="column justify-end">
							<div className="custom-select">
								<select
									onChange={(event) => {
										getdatabysort(event.target.value);
									}}
								>
									<option value="">Sorted by</option>
									<option value="0">Product Showcase</option>
									<option value="1">My Meeting </option>
								</select>
							</div>
						</div>
					</div>

					<div className="table_form billingTable">
						<table>
							<thead>
								<tr>
									<th>S.No.</th>
									<th>Payment Date</th>
									<th>Invoice Number</th>
									<th>Package Price</th>
									<th>Package Details</th>
									<th>Product Name</th>
									<th>Invoice</th>
									<th>Subscription</th>
								</tr>
							</thead>
							<tbody>
								{currentItems?.length == 0 ? (
									""
								) : (
									<>
										{currentItems?.map((item, index) => {
											const serialNumber =
												(currentPage - 1) * itemsPerPage + index + 1;

											return (
												<tr key={index}>
													<td>
														<span>{serialNumber}.</span>
													</td>
													<td>{moment(item?.date).format("DD-MM-YYYY")}</td>
													<td>{item?.invoice_number}</td>
													<td>€{(item?.amount)?.includes(".00") ? item?.amount?.split(".00")[0] : item?.amount }</td>
													<td>{item?.title}</td>
													<td>{item.productName?.product_name ?? ""}</td>
													<td>
														<img
															onClick={() =>
																navigate("/billing/invoice/" + item?.id)
															}
															src={downloadpng}
														/>
													</td>
													<td>
														{item?.productName?.renewal_status == 1 ? (
															<button
																className="btn btn-primary remove-primary"
																onClick={() => {
																	navigate("/company-subscription", {
																		state: {
																			product_id: item?.productName?.product_id,
																		},
																	});
																}}
															>
																Renew Plan
															</button>
														) :
															// item.endDate?.recurring_status === "active" ? (
															// 	<button
															// 		className="btn btn-primary remove-primary"
															// 		onClick={() => {
															// 			setShowAlert({
															// 				open: true,
															// 				subscriptionId:
															// 					item?.endDate?.recurring_subs_id,
															// 				id: item?.id,
															// 			});
															// 		}}
															// 	>
															// 		Cancel Plan
															// 	</button>
															// ) : 
															// item.endDate?.recurring_status ===
															//   "canceled" ? (
															// 	<button className="btn btn-primary remove-primary Done-meeting">
															// 		Plan Cancelled
															// 	</button>
															// ) :
															(
																""
															)}
													</td>
												</tr>
											);
										})}
									</>
								)}
							</tbody>
						</table>
					</div>
					<div className="pagination">
						{currentItems?.length === 0 ? (
							`You don't have any invoice yet.`
						) : (
							<ul>
								{currentPage !== 1 && (
									<li className="selected" onClick={handlePrevBtn}>
										<a>
											<img src={Left_arrow} title="" alt="" />
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
												className={currentPage === page ? "active" : ""}
											>
												<a style={{ cursor: "pointer" }}>{page}</a>
											</li>
										);
									}
								})}
								{currentPage !== totalPages && (
									<li className="selected" onClick={handleNextBtn}>
										<a>
											Next <img src={Right_arrow} title="" alt="" />
										</a>
									</li>
								)}
							</ul>
						)}
					</div>
				</div>
				{showAlert?.open && (
					<div className="alert_box">
						<div className="box_size">
							<img
								src={warningicon}
								style={{ paddingBottom: "14px" }}
								alt="warning"
							/>
							<br />
							<p>Are you sure , you want to cancel this plan ?</p>

							<div>
								<button
									className="btn btn-block btn-secondary"
									onClick={() => setShowAlert({ open: false })}
								>
									Cancel
								</button>
								<button
									className="btn btn-block btn-primary"
									onClick={() => cancelSubscription()}
								>
									Yes
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Billing;
