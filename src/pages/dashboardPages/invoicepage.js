import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { api } from "../base_url";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { country } from "../dashboard/country";
import "./invoice.css";
import Logo from "./Invoice_logo.jpg";
function Invoicepage() {
	const componentRef = useRef();
	const { id } = useParams();
	const [billingdata, setbillingdata] = useState({});
	const [personaldata, setpersonal] = useState({});

	useEffect(() => {
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
				if (response?.status == 200) {
					console.log(response.data.data[0]);
					//   console.log(response.data);
					setbillingdata(
						response.data?.data?.filter((item) => {
							return item?.id == id;
						})[0]
					);

					setpersonal(
						JSON.parse(
							response.data?.data?.filter((item) => {
								return item?.id == id;
							})[0]?.billing_details
						)
					);
				}
			})
			.catch((error) => {
				toast.error(error?.message);
			});
	}, []);

	let country_Name = country?.data?.filter((data) => {
		return data?.code == personaldata?.address?.country;
	})[0];
	// console.log(
	//   billingdata,
	//   country?.data?.filter((data) => {
	//     return data?.code == personaldata?.address?.country;
	//   })[0],
	//   "<<<<<<<<",
	//   personaldata
	// );

	console.log("**************** invoice page *****************");

	return (
		<>
			<div className="mainDiv" ref={componentRef}>
				<table>
					<tr>
						<td>
							<table className="table_1">
								<tr>
									<td></td>
								</tr>
								<tr>
									<td>
										<p>Invoice</p>
									</td>
									<td>
										<p className="t-rt">
											<img src={Logo} className="mainLogo" />
										</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table className="table_2">
								<tr>
									<td className="oneText">
										<p>{personaldata?.name}</p>

										<p>
											{billingdata?.copy_billing_details == "1" ? (
												<>{billingdata?.address_line} </>
											) : (
												<></>
											)}
											{billingdata?.copy_billing_details != "1" ? (
												<>
													{" "}
													{personaldata.address?.line1}{" "}
													{", " + personaldata.address?.city + ","}{" "}
													{personaldata.address?.postal_code}{" "}
												</>
											) : (
												""
											)}
											{/* {"(" + personaldata.address?.city + ")"}{" "} */}
										</p>
										<p>
											{billingdata?.copy_billing_details != "1" ? (
												<>{country_Name?.country} </>
											) : (
												""
											)}

											{/* {country_Name?.country} */}
										</p>
										<p>
											<a href="tel:+91 80057 00764">
												{" "}
												{/* {country_Name?.dial_code + "-"} */}
												{personaldata?.phone}
											</a>
										</p>
										<p>
											<a
												href="mailto:mohitbeniwal68@gmail.com
                            "
											>
												{personaldata?.email}
											</a>
										</p>
									</td>
								</tr>
								<tr>
									<td className="ht"></td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table className="table_3">
								<tr>
									<td>
										<p>
											Date: {moment(billingdata?.date).format("MMM  DD, YYYY")}
										</p>
										<p>Invoice: {billingdata?.invoice_number}</p>
									</td>
									<td>
										<p>Payment type: Online payment</p>
										{/* <p>VAT: {billingdata?.vatno}</p> */}
									</td>
								</tr>

								<tr>
									<td className="ht"></td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table className="table_4" cellspacing="0" cellpadding="0">
								<thead>
									<tr>
										<td></td>
									</tr>
									<tr className="tr_1">
										<th>Article and description</th>
										<th>Qty</th>
										<th>Price €</th>
										<th>Amount €</th>
									</tr>
								</thead>
								<tbody>
									<tr className="tr_2">
										<td>
											<p>{billingdata?.title}</p>
											<p>
												{billingdata?.endDate?.start_date == null ? (
													<>
														{moment(billingdata?.date).format("MMM  DD, YYYY")}
													</>
												) : billingdata?.endDate?.recurring_subs_id != null ||
												  billingdata?.endDate?.recurring_subs_id !=
														undefined ? (
													<>
														{moment(billingdata?.endDate?.start_date).format(
															"MMM  DD, YYYY"
														)}
														–{" "}
														{moment(billingdata?.endDate?.end_date).format(
															"MMM  DD, YYYY"
														)}
													</>
												) : (
													moment(billingdata?.endDate?.start_date).format(
														"MMM  DD, YYYY"
													)
												)}
											</p>
										</td>
										<td>1</td>
										<td>{billingdata?.amount}</td>
										<td>{billingdata?.amount}</td>
									</tr>
									<tr>
										<td className="ht_40"></td>
									</tr>
									{/* <tr className="tr_2">
										<td></td>
										<td className="css_2">Sub total before VAT €</td>
										<td className="css_2"></td>
										<td className="css_2">
											{billingdata?.endDate?.discount_amount ? parseInt(billingdata?.amount) +
												parseInt(billingdata?.endDate?.discount_amount) -
												billingdata?.vatamt : billingdata?.amount - billingdata?.vatamt}
											.00
										</td>
									</tr> */}
									{/* <tr>
										<td></td>
										<td className="css_2">VAT €</td>
										<td className="css_2"></td>
										<td className="css_2"> {billingdata?.vatamt}.00</td>
									</tr> */}
									{/* <tr>
										<td></td>
										<td className="css_2">Total including VAT €</td>
										<td className="css_2"></td>
										<td className="css_2">
											{billingdata?.endDate?.discount_amount
												? parseInt(billingdata?.amount) +
												  parseInt(billingdata?.endDate?.discount_amount)
												: billingdata?.amount}
											.00
										</td>
									</tr> */}
									{billingdata?.endDate?.discount_amount && (
										<tr>
											<td></td>
											<td className="css_2">Discount €</td>
											<td className="css_2"></td>
											<td className="css_2">
												{billingdata?.endDate?.discount_amount}.00
											</td>
										</tr>
									)}
									<tr>
										<td></td>
										<td className="css_2">Amount Paid €</td>
										<td className="css_2"></td>
										<td className="css_2">{billingdata?.amount}</td>
									</tr>
									<tr>
										<td></td>
										<td className="css_2">Remaining due €</td>
										<td className="css_2"></td>
										<td className="css_2"> 00.00</td>
									</tr>
									<tr>
										<td className="ht_60px"></td>
									</tr>
								</tbody>
							</table>
							<p
								style={{ fontSize: 14, lineHeight: "1.4em", color: "#a7a7a7" }}
							>
								SARL au Capital de 10.000 € • Siège Social: HEALTH AND BEAUTY
								FRANCE, 5 rue Geoffroy Marie, 75009 Paris, France • Email:{" "}
								<a
									style={{
										fontSize: 14,
										lineHeight: "1.4em",
										color: "#a7a7a7",
									}}
									href="mailto:info@health-and-beauty.fr"
								>
									• info@health-and-beauty.fr
								</a>
								• RCS Paris • Siren 812 800 563 • N° TVA Intracommunautaire: FR
								84 812 800 563 • Code NAF: 8230Z • IBAN FR76 3006 6109 1200 0201
								1100 144 • BIC CMCIFRPP
							</p>
						</td>
					</tr>
				</table>
				<ReactToPrint
					trigger={() => <button className="print_btn">Download</button>}
					content={() => componentRef.current}
				/>
			</div>
		</>
	);
}

export default Invoicepage;
