import React, { useState, useEffect } from "react";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
import pluscircle from "../../assets/images/plus-circle.svg";
import deleteicon from "../../assets/images/trash-2.svg";
import warningicon from "../../assets/images/warning2.png";
import editicon from "../../assets/images/edit (1).svg";
import { toast } from "react-toastify";
import axios from "axios";
import Left_arrow from "../../assets/images/arrow-left (1).png";
import Right_arrow from "../../assets/images/arrow-right (1).png";
function Product_showcase(props) {
	const [theytrusted, settheytrusted] = useState([]);
	const [noDataFound, setNoDataFound] = useState(false);
	const [check, setcheck] = useState(true);
	const [deleteid, setdeleteid] = useState("");
	// console.log(theytrusted, "<<<<<<");
	const navigate = useNavigate();
	const [alertshow, setalertshow] = useState(false);
	const [currentPage, setcurrentPage] = useState(1);
	const [itemsPerPage, setitemsPerPage] = useState(5);
	const [pageNumberLimit, setpageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
	const [companyDetail, setCompanydetail] = useState(true);
	const [companyProfile, setCompanyProfile] = useState(true);
	// check company detail

	useEffect(() => {
		if (localStorage.getItem("user_type") == "Buyer") {
			navigate("/buyer-company-profile")
		}
	}, []);


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
					setCompanydetail(false);
				}
			})
			.catch((error) => {
				// Handle any errors that occur during the request
				console.error(error);
			});

		axios
			.get(`${api}/api/company-profile`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				// Handle the successful response here
				console.log(res.data.data.company, "this is data of company profile");
				if (res?.data?.data?.company === null) {
					setCompanyProfile(false);
				}
			})
			.catch((error) => {
				// Handle any errors that occur during the request
				console.error(error);
			});
	}, []);
	const [companyinfo, setcompanyinfo] = useState([]);
	const handleNextbtn = () => {
		setcurrentPage(currentPage + 1);

		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevbtn = () => {
		if (currentPage != 1) {
			setcurrentPage(currentPage - 1);
		}
	};

	const pages = [];
	for (let i = 1; i <= Math.ceil(theytrusted?.length / itemsPerPage); i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = theytrusted?.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(theytrusted?.length / itemsPerPage);
	const [searchQuery, setSearchQuery] = useState("");

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
				.then((result) => resolve(result))
				.catch((error) => console.log("error", error));
		});
	};

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

		fetch(api + "/api/v1/supp_productlist", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setcheck(false);
				const filteredData = result.data?.filter((item) =>
					item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
				);
				settheytrusted(filteredData);
				if (filteredData == undefined) {
					setNoDataFound(true);
				}
			})
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		setNoDataFound(false);
		theytrusted_data();
	}, [searchQuery]);

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
				setcheck(false);
				if (result?.success == false) {
					toast.error("No records have found ! Please Fill");
				} else {
					setcompanyinfo(result.data);
				}
			})
			.catch((error) => {
				toast.error("No records have found");
			});
	}
	useEffect(() => {
		if (check) {
			getCompanyInfo();
			setNoDataFound(false);
			theytrusted_data();
		}
	}, [check]);

	const deletedata = (id) => {
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
		fetch(api + "/api/v1/supp_productdelete?id=" + id, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result?.type == "success") {
					toast.success(result?.message);
					setalertshow(false);
				}
				theytrusted_data();
			})
			.catch((error) => {
				if (error) {
					toast.error(error?.message);
				}
				console.log("error", error);
			});
	};
	console.log(totalPages, currentPage);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);

	const user_type = localStorage.getItem("user_type")?.toLowerCase();

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
						<p>Are you sure , you want to delete this product ?</p>

						<div>
							<button
								onClick={() => setalertshow(false)}
								className="btn btn-block btn-secondary"
							>
								Cancel
							</button>
							<button
								onClick={() => deletedata(deleteid)}
								className="btn btn-block btn-primary"
							>
								Delete
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
							<a href="/dashboard"> Dashboard </a>
						</li>
						<li>
							<a href="#">
								{user_type == "both"
									? "Supplier"
									: user_type == "buyer"
										? "Buyer"
										: user_type == "supplier"
											? "Supplier"
											: ""}
							</a>
						</li>
						<li>
							<a href="#">
								<span> Product Showcase</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="add_product_wrap row justify-content-between customFilterInput">
					<div className="column">
						<div className="search">
							<input
								type="text"
								className="form-control"
								placeholder="Type here"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-block btn-secondary">
							Search
						</button>
					</div>
					{console.log(companyinfo)}
					<div className="column justify-end">
						{/* <!-- <button type="submit" className="btn-block btn btn-primary row align-item-center"><img src="images/plus-circle.svg" alt=""/>Add New Product</button> --> */}

						<a
							disabled={
								companyinfo[0]?.timezone === "" ||
								companyinfo[0]?.timezone === null
							}
							style={
								check || companyinfo?.length === 0 ? { opacity: "0.5" } : {}
							}
							// href="/add-new-product"
							onClick={() => {
								if (!companyDetail && !companyProfile) {
									console.log("clicked");
									setTimeout(() => {
										if (localStorage.getItem("user_type") != "Supplier") {
											window.alert(
												"You did not fill the company information and company profile. Please fill the company information and company profile to add a product."
											);
										} else {
											window.alert(
												" You did not fill the company information. Please fill the company information to add a product."
											);
										}
										navigate("/company-information-fill", {
											state: { company_info: 2 },
										});
									}, 1000);
									return;
								} else if (
									!companyProfile &&
									localStorage.getItem("user_type") != "Supplier"
								) {
									setTimeout(() => {
										window.alert(
											" You did not fill the company profile. Please fill the company profile to add a product."
										);
										navigate("/buyer-company-profile");
									}, 1000);
									return;
								} else if (!companyDetail) {
									setTimeout(() => {
										window.alert(
											" You did not fill the company information. Please fill the company information to add a product."
										);
										navigate("/company-information-fill", {
											state: { company_info: 2 },
										});
									}, 1000);
									return;
								}
								//
								// if (!check) {
								checkSubscription().then((response) => {
									console.log(response);
									if (response?.data?.subscription_status !== 0) {
										navigate("/add-new-product");
										// navigate("/company-subscription");
									} else if (
										response?.message?.subscription_status != 0 &&
										response?.data.manage_type?.toLowerCase() == "shareduser"
									) {
										navigate("/add-new-product");
									} else {
										navigate("/company-subscription");
									}
								});
								// if (
								// 	companyinfo[0]?.timezone != "" &&
								// 	companyinfo[0]?.timezone != null
								// 	) {
								// 	console.log("..................................")
								// }
								// }
							}}
							className="btn-block btn btn-primary row align-item-center"
						>
							<img src={pluscircle} alt="" />
							Add New Product
						</a>

						<div className="custom-select">
							<p className="sortbyclass" style={{ paddingTop: "3px" }}>
								Sorted by
							</p>
							{/* <select>
                            <option>Sorted by</option>
                        </select> */}
						</div>
					</div>
				</div>
				<div className="table_form" data-aos="fade-up">
					<table>
						<thead>
							<tr>
								<th>S.No.</th>
								<th>Full Name</th>
								<th>Short Name</th>
								{/* <th>Published</th>
                            <th>Expiry</th> */}
								<th>Category</th>
								<th>Sub-category</th>
								<th>Made In</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((data, index) => {
								if (
									/^[\],:{}\s]*$/.test(
										data?.sub_cat
											?.replace(/\\["\\\/bfnrtu]/g, "@")
											?.replace(
												/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
												"]"
											)
											.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
									)
								) {
									var sub_cat = JSON.parse(data?.sub_cat);
								}
								const serialNumber =
									(currentPage - 1) * itemsPerPage + index + 1;

								return (
									<tr key={serialNumber}>
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											<span>{serialNumber}.</span>
										</td>
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											{data.product_name}
										</td>
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											{data.product_short_name}
										</td>
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											{data.category}
										</td>
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											{sub_cat?.length > 0 &&
												sub_cat?.map((item) => {
													return (
														<>
															{item} <br />
														</>
													);
												})}
										</td>
										{/* <td>{data.category}</td>
                                        <td>{data.sub_cat}</td> */}
										<td style={data?.status === 0 ? { opacity: "0.5" } : {}}>
											{data.made_in}
										</td>
										<td className="ssetspace">
											<img
												className="space"
												src={editicon}
												alt=""
												style={
													data?.status === 1
														? {}
														: { pointerEvents: "none", opacity: "0.5" }
												}
												onClick={() => {
													data?.status === 1
														? navigate("/edit-product/" + data?.id)
														: null;
												}}
											/>
											<img
												src={deleteicon}
												alt=""
												style={
													data?.status === 1
														? { opacity: "0.6" }
														: { pointerEvents: "none", opacity: "0.5" }
												}
											// onClick={(e) => {
											// 	if (data?.status === 1) {
											// 		setdeleteid(data.id);
											// 		setalertshow(true);
											// 	}
											// }}
											// onClick={(e) => deletedata(data.id)}
											/>
											{data?.renewal_status == 1 && (
												<button
													className="cance_sub btn btn-primary hoverRemovebtn"
													onClick={() => {
														navigate("/company-subscription", {
															state: {
																product_id: data?.id,
															},
														});
													}}
													style={{ margin: "0 10px" }}
												>
													Renew Plan
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="pagination">
					{currentItems?.length == 0 || noDataFound ? (
						`You don't have any products yet.`
					) : (
						<ul>
							{currentPage != 1 ? (
								<li className="selected" onClick={handlePrevbtn}>
									<a>
										<img src={Left_arrow} title="" alt="" />
										Previous
									</a>
								</li>
							) : (
								""
							)}
							{pages?.map((page, index) => {
								if (index > currentPage - 3 && index < currentPage + 2) {
									return (
										<li
											key={index}
											className={
												currentPage == page
													? pages?.length == 1
														? "active new"
														: "active"
													: ""
											}
											onClick={() => setcurrentPage(page)}
										>
											<a style={{ cursor: "pointer" }}>{page}</a>
										</li>
									);
								}
							})}
							{currentPage !== totalPages && (
								<li className="selected" onClick={handleNextbtn}>
									<a>
										Next <img src={Right_arrow} title="" alt="" />
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
export default Product_showcase;
