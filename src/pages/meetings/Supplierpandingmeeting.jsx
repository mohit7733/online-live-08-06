import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import editicon from "../../assets/images/edit (1).svg";
import Clear from "../../assets/images/Clear (2).png";
import Done from "../../assets/images/Done (1).png";
// modal view import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";
import { country } from "../../pages/dashboard/country";
import Modal from "../../components/modal";
import DatePicker from "../../components/datepicker";
import Timepicker from "../../components/timepicker";
import moment from "moment-timezone";
import momenttime from "moment";
import deleteicon from "../../assets/images/delete3.png";
import AcceptMeeting from "./AcceptMeeting";
import { Link } from "react-router-dom";
// import { countryContinent } from "country-continents";
function Supplierpandingmeeting(props) {
  const [accept, setaccept] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [sDate, setSdate] = useState("");
  const [sTime, setSTime] = useState("");
  const [showTP, setShowTP] = useState();
  const [slots, setSlots] = useState([]);
  const [apiDateFormat, setApiDateFormat] = useState("");
  const [meetingDetails, setmeetingDetails] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [meetingDetails2, setmeetingDetails2] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [supplierTime, setSupplierTime] = useState();
  const [click, setclick] = useState(false);
  const [meetingAccept, setAcceptMeeting] = useState([]);
  const [acceptdate, setacceptDates] = useState([]);
  const [accepttime, setacceptTime] = useState([]);
  const [acceptId, setacceptId] = useState();
  const [shortby, setshortby] = useState("");
  const [searchdata, setsearchdata] = useState("");
  const [notavailable, setnotavailable] = useState([]);
  const path = window.location.pathname;
  const [dateError, setDateError] = useState("");
  const [last, setLast] = useState("");
  const [dateError2, setDateError2] = useState("");
  const [productId, setProductId] = useState();
  const [modal1, setModal1] = useState({
    isOpen: false,
    id: "",
    date: [],
  });
  const usertype = localStorage.getItem("manage_type");
  // let acceptId = 0
  function showTimePicker(value) {
    if (slots.length >= 5) {
      setDateError("You can't select more than 5 availabilities");
      setTimeout(() => setDateError(""), 15000);
    } else {
      const dm = moment(value).format("MMM D");
      setApiDateFormat(moment(value).format("DD-MM-YYYY"));
      setShowTP(true);
      setSdate(dm);
    }
  }
  const navigate = useNavigate();
  // fetching the data
  const removeSlot = (item) => {
    const newSlots = slots.filter((slot) => slot !== item);
    setSlots(newSlots);
  };

  const confirmSlots = () => {
    const isAlreadySelected = slots.some((slot) => {
      return slot.sDate === sDate && slot.sTime === sTime;
    });

    if (slots.length == 4) {
      setDateError2("You can't select more than 5 availabilities ");
      setTimeout(() => setDateError2(""), 15000);
    }

    if (isAlreadySelected) {
      setDateError("The date and time have already been selected");
      // setSdate("");
      setSTime("");
      setTimeout(() => setDateError(""), 15000);
    } else if (slots.length >= 5) {
      setDateError("You can't select more than 5 availabilities");

      if (sDate !== "") {
        setSdate("");
        setSTime("");

        setTimeout(() => setDateError(""), 15000);
      }
    } else {
      const mergedSlots = [
        ...slots,
        { sDate: sDate, sTime: sTime, apiDate: apiDateFormat },
      ];
      setSlots(mergedSlots);
      // setSdate("");
      setSTime("");
      // setApiDateFormat("");
    }
  };
  useEffect(() => {
    if (slots.length == 5) {
      setDateError("You can't select more than 5 availabilities");
      setTimeout(() => setDateError(""), 15000);
    } else if (slots.length < 5) {
      setDateError2("");
    }
  }, [slots]);
  useEffect(() => {
    const isAlreadySelected = slots.some((slot) => {
      return slot.sDate === sDate && slot.sTime === sTime;
    });
    if (!isAlreadySelected) {
      setDateError("");
    }
  }, [slots]);

  useEffect(() => {
    setLast(sDate);
    if (slots.length == 4) {
      setSdate(last);
    } else if (modalState == false) {
      setSdate("");
    }
  }, [slots.length, slots]);

  useEffect(() => {
    if (slots.length >= 5) {
      setSdate("");
    }
  }, [slots]);

  useEffect(() => {
    if (slots.length >= 5) {
      setDisabledState(true);
      setSdate("");
      setSTime("");
    }
  }, [slots]);

  useEffect(() => {
    const isAlreadySelected = slots.some((slot) => {
      return slot.sDate === sDate && slot.sTime === sTime;
    });

    if (isAlreadySelected) {
      setDateError2("The date and time have already been selected");
      // setSdate("");
      setSTime("");

      setTimeout(() => setDateError2(""), 15000);
    }
  }, [slots, sDate, sTime]);
  // get meeting subscription details
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
        const meetingSubscriptions = result.data.filter(
          (subscription) => subscription.type === "Meeting"
        );

        setSubscriptions(meetingSubscriptions);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  React.useEffect(() => {
    setmeetingDetails([]);
    setNoDataFound(false);
    axios
      .get(
        `${api}/api/v1/${
          path.includes("/pending-meeting/supplier")
            ? "suppliermeetingreqlist"
            : "suppliermeetingreqlist"
        }?sortBy=${shortby}&buyerName=${searchdata}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (
            res.data?.data?.meetings?.filter((data) => data?.show_record != 0)
              .length === 0
          ) {
            setNoDataFound(true);
          }
          setmeetingDetails2(Object.values(res.data?.data.meetings));
          setmeetingDetails(
            Object.values(
              res.data?.data.meetings.filter((data) => data?.show_record != 0)
            )
          );
          if (shortby == "A-Z") {
            searchfilter();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shortby, deleteId]);

  const searchfilter = () => {
    const sortedData = [...meetingDetails].sort((a, b) => {
      if (a.buyerName != undefined && b.buyerName != undefined) {
        return a.buyerName.buyername.localeCompare(b.buyerName.buyername);
      }
    });
    setmeetingDetails(sortedData);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  const [showModal, setShowModal] = useState(false);

  const handleAcceptClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (deleteId) {
      axios
        .get(`${api}/api/v1/supplier-meeting-refused?meeting_id=${deleteId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error); // Handle any errors
        });
    }
  }, [deleteId]);
  const getContinent = async (countryName) => {
    const response = await axios.get(
      `https://restcountries.com/v3/name/${countryName}`
    );
    const ans = response.data[0].region;
    return ans;
  };

  const data = meetingDetails?.map((detail) => {
    const buyertimeDate = detail?.meetDateTime.map((meet) => {
      return `${meet.meet_date} ${meet.meet_time}`;
    });

    const suppliertimeDate = detail?.meetDateTime.map((meet) => {
      return `${meet.supplier_timezone_date} ${meet.supplier_timezone_time}`;
    });
    const buyerslots = detail?.buyerSlot.flatMap((slot) => {
      const slotData = JSON.parse(slot.supplier_available);
      return slotData.map((data) => `${data.date} ${data.time}`);
    });

    const supplierAvailable =
      detail?.supplier_available != null
        ? JSON.parse(detail.supplier_available)
        : [];

    return {
      id: detail?.id,
      supplier_id: detail?.supplier_id,
      show_contact: detail?.show_contact,
      status: detail?.status,
      product_Id: detail?.product_id,
      supplier_Time_Zone: detail?.supplier_timezone,
      buyer_Time_Zone: detail?.buyer_timezone,
      supplierCityName: detail?.supplierCityName?.city_name,
      buyerCityName: detail?.buyerCityName?.city_name,
      type: detail?.type,
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
          : "",
      buyertimeDate,
      suppliertimeDate,
      buyerslots,
      supplierAvailable,
    };
  });

  // accept meeting functionality
  const clickedAccept = () => {
    axios
      .post(api + "/api/v1/supplier-meeting-avaiblity", meetingAccept, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        navigate("/confirmed-meeting/supplier", {
          state: {
            meeting_id: acceptId,
            breadcrumb_satus: 2,
            ProductId: productId,
            amount: subscriptions[0]?.price,
            plan: subscriptions[0]?.days,
            subscription_plan_id: subscriptions[0]?.id,
          },
        });
      })
      .catch((error) => {
        // Handle error
      });
  };
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(meetingDetails.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (supplierTime) {
      const supplierData = {
        supplier_id: supplierTime,
        type: 1, //type:1 reschedule
        availability: slots.map((slot) => {
          return {
            date: slot.apiDate,
            time: slot.sTime,
          };
        }),
      };

      axios
        .post(api + "/api/v1/supplier-meeting-avaiblity", [supplierData], {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          toast.success("Availability added successfully");
          setSlots([]);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          setDateError("Something Went Wrong!");
          // handle error
        });
    }
  }, [click]);
  console.log(data);
  return (
    <>
      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard"> Dashboard </a>
            </li>
            <li>
              <a href="#"> Supplier </a>
            </li>
            <li>
              <a href="/pending-meeting/supplier">
                <span> My Meetings</span>
              </a>
            </li>
            <li>
              <span style={{ cursor: "pointer", paddingLeft: "5px" }}>
                Pending Meetings
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
                <option value={"DESC"}>Latest Buyers</option>
              </select>
            </div>
          </div>
        </div>

        {/* <div className="table_form">
					<table>
						<thead>
							<tr>
								<th>
									{path == "/passed-meeting/buyer" ? "Suppliers" : "Buyer"} Name
								</th>
								<th>Country Codes</th>
								<th>
									Buyer Date / Time
								</th>
								<th>Supplier Date / Time</th>

								<th>
									{path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"}{" "}
									Profile
								</th>
								<th>Meeting status</th>
								<th>Edit Avaibility</th>
							</tr>
						</thead>

						<tbody>
							{data.map((meeting, index) => {
								if (currentPage * 5 > index && (currentPage - 1) * 5 <= index) {
									return (
										<tr key={index}>
											<td>{meeting?.buyername}</td>
											<td>
												{path == "/passed-meeting/buyer"
													? meeting?.supplierCountryCode
													: meeting?.buyerCountryCode}
											</td>

											<td>
												<div>
													{console.log(meeting?.buyertimeDate)}
													{console.log(meeting?.status)}
													{console.log(meeting?.type)}
													{meeting?.buyertimeDate?.map((date, index) => (
														<div key={index}>{date}</div>
													))}
												</div>
											</td>
											<td>
												<div>
													{meeting?.suppliertimeDate?.map((date, index) => (
														<div key={index}>{date}</div>
													))}
												</div>
											</td>
											<td className="roles">
												<a
													className="btn btn-success"
													onClick={() => {
														navigate(
															`/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
															{
																state: {
																	id: meeting?.id,
																	path: path,
																	productId: meeting?.product_id,
																	buyer_id: meeting?.buyer_id,
																	time: meeting?.suppliertimeDate,
																	date: meeting?.suppliertimeDate,
																	supplier_id: meeting?.supplier_id,
																	meeting_id: meeting?.id,
																	amount: subscriptions[0]?.price,
																	plan: subscriptions[0]?.days,
																	subscription_plan_id: subscriptions[0]?.id,
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
													{accept == true ? (
														<a className="btn btn-secondary  hover-transblue">
															Payment Pending
														</a>
													) : (
														<div>
															<a
																className={`btn ${
																	meeting?.status === 3
																		? "btn-primary  Done-meeting"
																		: meeting?.status === 1
																		? "btn-secondary hover-transblue"
																		: meeting?.status === 2
																		? "btn-secondary hover-transblue"
																		: "btn-secondary hover-transblue"
																}`}
																href="#popup1"
																onClick={() => {
																	if (
																		meeting?.status === 1 ||
																		meeting?.status === 2
																	) {
																		handleAcceptClick(meeting?.id);
																		setacceptTime(meeting?.suppliertimeDate);
																		setnotavailable(meeting?.buyerslots);
																		setacceptId(meeting?.id);
																		setProductId(meeting?.product_Id);
																	}
																}}
															>
																{(() => {
																	switch (meeting?.status) {
																		case 1:
																			return "Accept";
																		case 2:
																			return "Pending Payment";
																		case 3:
																			return "Meeting Refused";
																		default:
																			return "";
																	}
																})()}
															</a>

															<a
																onClick={(e) => {
																	console.log("refuse");
																	setDeleteId(meeting.id);
																	// window.reload()
																}}
																className="btn btn-primary remove-primary"
																style={{
																	display:
																		meeting?.status === 3
																			? "none"
																			: "inline-block ",
																	width: meeting?.status === 2 ? "90%" : "",
																}}
															>
																Refuse
															</a>
															{showModal && (
																<div className="modal">
																	<div className="modal-content">
																		<span
																			className="close"
																			onClick={handleCloseModal}
																		>
																			&times;
																		</span>
																		<div>
																			<h3>Accept Meeting</h3>
																			<ul>
																				{accepttime?.map((dateTime, index) => {
																					const splitDateTime =
																						dateTime.split(" ");
																					const date = splitDateTime
																						.slice(0, -1)
																						.join(" ");
																					const time = splitDateTime
																						.slice(-2)
																						.join(" ");
																					const isDisabled =
																						notavailable.includes(dateTime);

																					return (
																						<li key={index}>
																							<input
																								type="radio"
																								id={`date${index}`}
																								name="selectedDate"
																								value={dateTime}
																								onChange={() =>
																									setAcceptMeeting([
																										{
																											supplier_id: acceptId,
																											type: 0,
																											availability: [
																												{
																													date: date.split(
																														" "
																													)[0],
																													time: time,
																												},
																											],
																										},
																									])
																								}
																								disabled={isDisabled}
																							/>
																							<label htmlFor={`date${index}`}>
																								{dateTime}
																								{isDisabled && (
																									<span
																										style={{
																											color: "red",
																										}}
																									>
																										*Slot no longer available
																									</span>
																								)}
																							</label>
																						</li>
																					);
																				})}
																			</ul>
																			<br />
																			<button
																				className="btn btn-secondary"
																				onClick={() => clickedAccept()}
																			>
																				Submit
																			</button>
																		</div>
																	</div>
																</div>
															)}
														</div>
													)}
												</div>
											</td>

											<td>
												<a
													onClick={() => {
														console.log(meetingDetails, "meetingid");
														if (meeting?.type !== 1 && meeting?.status !== 3) {
															console.log("clickedy");
															setModalState(true);
															setSupplierTime(meeting?.id);
														}
													}}
													className={`btn ${
														meeting?.status === 3 || meeting?.type === 1
															? "disabled"
															: ""
													}`}
													style={{
														cursor:
															meeting?.status === 3 || meeting?.type === 1
																? "not-allowed"
																: "pointer",
													}}
												>
													<img
														src={editicon}
														title="Reschedule Meeting Time"
														alt=""
														style={{
															filter:
																meeting?.status === 3 || meeting?.type === 1
																	? "grayscale(100%)"
																	: "none",
														}}
													/>
												</a>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div> */}

        <div className="table_form pending_meeting_table">
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    width: "120px",
                    minWidth: "80px",
                    paddingLeft: "40px",
                  }}
                >
                  No.
                </th>
                <th>Buyer Name</th>
                <th>Country Code</th>
                <th>Buyer Profile</th>
                <th>Meeting Schedule</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((meeting, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "120px",
                      minWidth: "80px",
                      paddingLeft: "40px",
                    }}
                  >
                    {(currentPage - 1) * 5 + (index + 1)}.
                  </td>
                  <td>{meeting.buyername}</td>
                  <td>{meeting.buyerCountryCode}</td>
                  <td className="roles">
                    <a
                      className="btn btn-success"
                      onClick={() => {
                        navigate(
                          `/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
                          {
                            state: {
                              id: meeting?.id,
                              path: path,
                              productId: meeting?.product_Id,
                              buyer_id: meeting?.buyer_id,
                              time: meeting?.suppliertimeDate,
                              date: meeting?.suppliertimeDate,
                              supplier_id: meeting?.supplier_id,
                              meeting_id: meeting?.id,
                              amount: subscriptions[0]?.price,
                              plan: subscriptions[0]?.days,
                              subscription_plan_id: subscriptions[0]?.id,
                              show_contact: meeting?.show_contact || 0,
                            },
                          }
                        );
                      }}
                    >
                      View More
                    </a>
                    <span
                      style={
                        meeting?.supplierAvailable?.length == 0 &&
                        meeting?.status == 1
                          ? localStorage.getItem("manage_type") == "Shareduser"
                            ? {
                                display: "block",
                                background: "grey",
                                cursor: "default",
                              }
                            : { display: "block" }
                          : // { display: "block"}
                            { display: "none" }
                      }
                    >
                      <a
                        style={
                          localStorage.getItem("manage_type") == "Shareduser"
                            ? { background: "grey", cursor: "default" }
                            : {}
                        }
                        onClick={() => {
                          localStorage.getItem("manage_type") != "Shareduser" &&
                            navigate("/payment", {
                              state: {
                                ProductId: meeting?.product_Id,
                                meeting_id: meeting?.id,
                                amount: subscriptions[0]?.price,
                                plan: subscriptions[0]?.days,
                                subscription_plan_id: subscriptions[0]?.id,
                              },
                            });
                        }}
                      >
                        <img
                          style={
                            localStorage.getItem("manage_type") == "Shareduser"
                              ? { background: "grey", cursor: "default" }
                              : {}
                          }
                          src={Done}
                          title=""
                        />
                      </a>
                    </span>
                    <span
                      style={
                        meeting?.supplierAvailable?.length == 0 &&
                        meeting?.status == 1
                          ? localStorage.getItem("manage_type") == "Shareduser"
                            ? {
                                display: "block",
                                background: "grey",
                                cursor: "default",
                              }
                            : { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <Link to="#">
                        <a
                          onClick={(e) => {
                            localStorage.getItem("manage_type") !=
                              "Shareduser" && setDeleteId(meeting.id);
                            window.reload();
                          }}
                          style={{
                            display:
                              meeting?.status === 3 ? "none" : "inline-block ",
                            width: meeting?.status === 2 ? "90%" : "",
                            cursor:
                              localStorage.getItem("manage_type") ==
                              "Shareduser"
                                ? "default"
                                : "pointer",
                          }}
                        >
                          <img
                            style={
                              localStorage.getItem("manage_type") ==
                              "Shareduser"
                                ? { background: "grey", cursor: "default" }
                                : {}
                            }
                            src={Clear}
                            title=""
                          />
                        </a>
                      </Link>
                    </span>
                  </td>
                  <td>
                    <div
                      className="button_wrap row"
                      style={{ justifyContent: "center" }}
                    >
                      {meeting?.status > 1 ? (
                        <span
                          onClick={() => {
                            usertype != "Shareduser"
                              ? (setacceptId(meeting?.id),
                                setModal1({
                                  isOpen: !modal1,
                                  id: meeting.id,
                                  date: meeting.suppliertimeDate,
                                }))
                              : "";
                          }}
                        >
                          <i
                            style={{
                              fontSize: "20px",
                              color:
                                localStorage.getItem("manage_type") ==
                                "Shareduser"
                                  ? "grey"
                                  : "",
                            }}
                            className={"fa fa-eye"}
                          ></i>
                        </span>
                      ) : (
                        <span>
                          <i
                            style={{ fontSize: "20px", color: "grey" }}
                            className="fa fa-eye-slash"
                          ></i>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={modal1.id ? { display: "block" } : { display: "none" }}
          className="modal-content"
        >
          <span
            className="close"
            style={{
              display: "inline-block",
              border: "solid 1px #1D1D1B",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              textAlign: "center",
              lineHeight: "38px",
              fontWeight: "100",
              marginTop: "16px",
              cursor: "pointer",
            }}
            onClick={() => setModal1({ isOpen: !modal1 })}
          >
            ×
          </span>
          <div style={{ marginTop: "10px" }}>
            <h6
              style={{
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              {currentItems
                .filter((e) => e.id === modal1?.id)
                .map((filteredData) => {
                  if (filteredData.supplierAvailable.length == 0) {
                    return "Choose your date & time";
                  } else {
                    return (
                      <div>
                        <h4 style={{ fontWeight: "bold" }}>
                          Rescheduled Availability Sent
                        </h4>
                        <p>Rescheduled times are</p>
                      </div>
                    );
                  }
                })}
            </h6>
            <ul>
              {currentItems
                .filter((e) => e.id === modal1?.id)
                .map((filteredData) => {
                  let reschduleDates = filteredData.supplierAvailable.sort();
                  let sortedDates = filteredData?.suppliertimeDate?.sort();
                  if (filteredData.supplierAvailable.length == 0) {
                    return (
                      <div key={filteredData?.id}>
                        {sortedDates?.map((date, index) => {
                          return (
                            <li
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "5px",
                                justifyContent: "center",
                              }}
                              key={index}
                            >
                              <input
                                onChange={() => {
                                  setAcceptMeeting([
                                    {
                                      supplier_id: acceptId,
                                      type: 0,
                                      availability: [
                                        {
                                          date: date.split(" ")[0],
                                          time:
                                            date.split(" ")[1] +
                                            date.split(" ")[2],
                                        },
                                      ],
                                    },
                                  ]);
                                }}
                                type="radio"
                                key={index}
                                value={date}
                                name="dategroup"
                                style={{ marginRight: "5px" }}
                              />
                              <div style={{ minWidth: "100px" }}>
                                {date.slice(0, 11)}
                              </div>
                              |{" "}
                              <div style={{ minWidth: "80px" }}>
                                {date.slice(10)}
                              </div>
                            </li>
                          );
                        })}
                      </div>
                    );
                  } else if (filteredData.supplierAvailable.length != 0) {
                    return (
                      <>
                        {reschduleDates.map((date, index) => {
                          return (
                            <li
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "5px",
                                justifyContent: "center",
                              }}
                              key={index}
                            >
                              <div style={{ minWidth: "100px" }}>
                                {date.date}
                              </div>{" "}
                              |
                              <div style={{ minWidth: "80px" }}>
                                {" "}
                                {date.time}
                              </div>
                            </li>
                          );
                        })}
                      </>
                    );
                  }
                })}
            </ul>
            {currentItems
              .filter((e) => e.id === modal1?.id)
              .map((filteredData) => {
                if (filteredData.supplierAvailable.length == 0) {
                  return (
                    <>
                      <button
                        onClick={() => clickedAccept()}
                        className="btn btn-secondary"
                      >
                        Submit
                      </button>
                      <span
                        style={{
                          border: "solid 2px #D9D9D9",
                          margin: "30px 0",
                          display: "block",
                        }}
                      ></span>
                      <p
                        style={{
                          fontWeight: "500",
                          color: "#1E1E1E",
                          paddingBottom: "20px",
                        }}
                      >
                        DO YOU WANT TO RESCHEDULE ?
                      </p>
                      <button
                        onClick={() => {
                          // if (meeting?.type !== 1 && meeting?.status !== 3) {
                          setModalState(true);
                          setSupplierTime(modal1?.id);
                          // }
                        }}
                        className="btn btn-secondary"
                      >
                        Yes, I reschedule
                      </button>
                    </>
                  );
                }
              })}
          </div>
        </div>

        <div className="pagination">
          {noDataFound == true ? (
            "You don't have any meetings yet"
          ) : currentItems?.length === 0 ? (
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
              {currentPage !== totalPages && (
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
      <Modal
        title="Request a meeting?"
        modalState={modalState}
        setModalState={setModalState}
      >
        <span
          className="close_modal"
          onClick={() => {
            setSlots([]);
            setModalState(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>{" "}
        </span>
        <div className="modal-header">
          <h3>Edit your availability</h3>
        </div>
        <div className=" calendar_fix calendar-wrapper">
          <DatePicker
            slots={slots}
            setDateError={setDateError}
            setDate={showTimePicker}
          />
          <div>
            {showTP ? (
              <Timepicker
                setTime={setSTime}
                sTime={sTime}
                setDateError2={setDateError2}
                setDateError={setDateError}
                sDate={sDate}
                slots={slots}
              />
            ) : null}
            <div>
              {sDate !== "" ? (
                <>
                  {sTime && sTime != "Select Time" ? (
                    <button
                      onClick={confirmSlots}
                      className="btn_confirm btn btn-primary"
                      style={{
                        filter: slots.length >= 5 ? "grayscale(100%)" : "none",
                        fontSize: "12px",
                        width: "100px",
                        minWidth: "100px",
                        maxWidth: "100px",
                      }}
                    >
                      Confirm ?
                    </button>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="selected-time">
          {slots.map((item) => {
            return (
              <p>
                {item.sDate + " - " + item.sTime}
                <span
                  style={{ marginLeft: "10px" }}
                  onClick={() => removeSlot(item)}
                >
                  {/* <button className=""> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                  </svg>{" "}
                  {/* </button> */}
                </span>
              </p>
            );
          })}

          {sDate !== "" ? (
            <>
              {`${sDate} - ${sTime == "" ? "Select Time" : sTime}`}
              {/* {sTime ? (
                <button
                  onClick={confirmSlots}
                  className="btn_confirm btn btn-primary"
                  style={{
                    filter: slots.length >= 5 ? "grayscale(100%)" : "none",
                  }}
                >
                  Confirm ?
                </button>
              ) : null} */}
            </>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {dateError2 && <span className="errorMessage">{dateError2}</span>}
          </div>
          <button
            className="btn btn-secondary appointment-btn"
            style={{ display: "block", minWidth: "240px" }}
            onClick={() => {
              setclick(true);
              setModalState(false);
            }}
          >
            Request Appointment
            {/* {sDate !== "" ? "on " + sDate + " at " + sTime : null} */}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Supplierpandingmeeting;

// <tr>
// <td>Buyer Short Name</td>
// <td>ALB</td>
// <td>14/1/2023</td>
// <td>16h00 </td>
// <td>IST</td>
// <td className="roles">
//   <a href="#" className="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div className="button_wrap row">
//     <a href="" className="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" className="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     className="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
// <tr>
// <td>Buyer Short Name</td>
// <td>ASM</td>
// <td>13/1/2023</td>
// <td>9h30 - 11h30 </td>
// <td>VN : 3pm - 5:30pm</td>
// <td className="roles">
//   <a href="#" className="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div className="button_wrap row">
//     <a href="" className="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" className="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     className="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
// <tr>
// <td>Buyer Short Name</td>
// <td>ASM</td>
// <td>13/1/2023</td>
// <td>14h00 17h30 </td>
// <td>Japan : 9am</td>
// <td className="roles">
//   <a href="#" className="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div className="button_wrap row">
//     <a href="" className="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" className="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     className="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
