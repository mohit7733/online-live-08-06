import React, { useEffect, useState } from "react";
import contactimag from "../../assets/images/CONTACT.png";
import bell from "../../assets/images/bell.svg";
import edit from "../../assets/images/edit.svg";
import Schedule from "../../assets/images/Meeting Schedule.svg";
import calender_blue from "../../assets/images/calender_blue.png";
import contact from "../../assets/images/contact_1.svg";
import contact_2 from "../../assets/images/contact_2.svg";
import company_contact from "../../assets/images/company-contact.png";
import comany_name from "../../assets/images/comany_name.svg";
import office from "../../assets/images/office.svg";
import facebook from "../../assets/images/FB 3.svg";
import twitter from "../../assets/images/TWITTER 3.svg";
import instagram from "../../assets/images/INSTA 3.svg";
import linkedin from "../../assets/images/LINKEDIN 3.svg";
import youtube from "../../assets/images/youtube 1.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../base_url";
import FavoriteImage from "../../assets/images/favourite.svg";
import axios from "axios";
import { prettyDOM } from "@testing-library/dom";

export default function Left_menu(props) {
  const [sidebarstatus, setSidebarstatus] = useState(
    localStorage.getItem("sidebarstatus")
      ? JSON.parse(localStorage.getItem("sidebarstatus"))
      : true
  );
  const [submenu, setsubmenu] = useState(
    localStorage.getItem("submenu")
      ? JSON.parse(localStorage.getItem("submenu"))
      : false
  );
  const [submenu2, setsubmenu2] = useState(
    localStorage.getItem("submenu2")
      ? JSON.parse(localStorage.getItem("submenu2"))
      : false
  );
  const [submenu3, setsubmenu3] = useState(
    localStorage.getItem("submenu3")
      ? JSON.parse(localStorage.getItem("submenu3"))
      : false
  );
  const [submenu4, setsubmenu4] = useState(
    localStorage.getItem("submenu4")
      ? JSON.parse(localStorage.getItem("submenu4"))
      : false
  );
  const [openMeeting, setopenMeeting] = useState(false);
  const [openMeeting2, setopenMeeting2] = useState(false);
  const [products, setProducts] = useState(false);
  const [coprofile, setCoprofile] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (openMeeting) {
      setopenMeeting2(false);
      setProducts(false);
      setCoprofile(false);
    }
  }, [openMeeting]);
  useEffect(() => {
    if (openMeeting2) {
      setProducts(false);
      setCoprofile(false);
      setopenMeeting(false);
    }
  }, [openMeeting2]);
  useEffect(() => {
    if (products) {
      setCoprofile(false);
      setopenMeeting(false);
      setopenMeeting2(false);
    }
  }, [products]);
  useEffect(() => {
    if (coprofile) {
      setProducts(false);
      setopenMeeting(false);
      setopenMeeting2(false);
    }
  }, [coprofile]);
  // console.log(props.requeststatus, "meeting status from the props");
  useEffect(() => {
    if (
      !pathname?.includes("supplier") &&
      !pathname?.includes("buyer-profile/pending-meeting")
    ) {
      axios
        .get(`${api}/api/v1/products_details?product_id=${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response?.data?.data?.company_contact != null) {
            setShow(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (localStorage.getItem("sidebarstatus")) {
      props.setsidebar(JSON.parse(localStorage.getItem("sidebarstatus")));
    }
  }, []);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${api}/api/company-detail`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setCompanyData(response.data.data[0]);
        })
        .catch((error) => {
          // console.error(error);
        });
    };

    if (props?.companyDetails != undefined) {
      setCompanyData(props?.companyDetails);
    } else if (props?.companyDetails == undefined) {
      fetchData();
    }
  }, [props?.companyDetails]);

  const { pathname } = useLocation();
  // const [companyData, setCompanyData] = useState({});
  // console.log(pathname.substr(pathname.lastIndexOf('\\') + 1).split('/')[1], "this is pathname")
  return (
    <>
      <div
        className={
          "left_wrapper left_desktop" + (sidebarstatus ? " active" : "")
        }
        id="left_wrapper"
      >
        <div className="left_sidebar">
          <div className="box">
            <div
              className="sidebar_toggle"
              onClick={(e) => {
                props.setsidebar(!props.sidebar);
                setSidebarstatus(!props.sidebar);
                localStorage.setItem("sidebarstatus", !props.sidebar);
                setopenMeeting(false);
                setopenMeeting2(false);
                setProducts(false);
                setCoprofile(false);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            {localStorage.getItem("user_type") == "Supplier" ||
            localStorage.getItem("user_type") == "Both" ? (
              <>
                <h4
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  {" "}
                  SUPPLIER{" "}
                </h4>
                <ul>
                  <li>
                    <a
                      // href="/alert-notefication/supplier"
                      style={{ cursor: "pointer" }}
                    >
                      <img src={bell} alt="" />
                      Alert Notification
                    </a>
                  </li>
                  <li
                    className={
                      submenu4 == true && props?.sidebar != true
                        ? "backdrop"
                        : products === true && props.sidebar === true
                        ? "active_list"
                        : pathname ==
                            "/supplier-product-showcase/all-products" ||
                          pathname ==
                            "/supplier-product-showcase/actual-products" ||
                          pathname ==
                            "/supplier-product-showcase/expired-products"
                        ? "active_list"
                        : ""
                    }
                  >
                    <a
                      // className={
                      // 	submenu4
                      // 		? " active_list"
                      // 		: pathname == "/supplier-product-showcase/all-products" ||
                      // 		  pathname ==
                      // 				`/profile-view/${localStorage.getItem("user_id")}`
                      // 		? " active_list"
                      // 		: ""
                      // }
                      href="#"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setsubmenu4(!submenu4);
                        localStorage.setItem("submenu4", !submenu4);
                        setProducts(!products);
                      }}
                    >
                      <img
                        src={edit}
                        alt=""
                        onClick={() => setProducts(!products)}
                      />
                      Products Showcase
                      <i
                        className="fa fa-angle-down drop"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <ul
                      className="sub__menu buyer-meeting"
                      style={
                        submenu4 ? { display: "block" } : { display: "none" }
                      }
                    >
                      <li
                        className={
                          pathname == "/supplier-product-showcase/all-products"
                            ? "active_list"
                            : ""
                        }
                      >
                        <a href="/supplier-product-showcase/all-products">
                          {" "}
                          All Products
                        </a>
                      </li>
                      <li
                        className={
                          pathname ==
                          "/supplier-product-showcase/actual-products"
                            ? " active_list"
                            : ""
                        }
                      >
                        <a href="/supplier-product-showcase/actual-products">
                          {" "}
                          Actual Products
                        </a>
                      </li>
                      <li
                        className={
                          pathname ==
                          "/supplier-product-showcase/expired-products"
                            ? " active_list"
                            : ""
                        }
                      >
                        <a href="/supplier-product-showcase/expired-products">
                          {" "}
                          Expired Products
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      submenu == true && props?.sidebar != true
                        ? "backdrop"
                        : openMeeting2 === true && props.sidebar === true
                        ? "active_list"
                        : pathname == "/pending-meeting/supplier" ||
                          pathname == "/confirmed-meeting/supplier" ||
                          pathname == "/passed-meeting/supplier"
                        ? "active_list"
                        : ""
                    }
                  >
                    <a
                      className=""
                      // "menu_submenu supplier"
                      onClick={(e) => {
                        setopenMeeting2(!openMeeting2);
                        setsubmenu(!submenu);
                        localStorage.setItem("submenu", !submenu);
                      }}
                    >
                      <img
                        className="bgdrop-icon-hide"
                        onClick={() => setopenMeeting2(!openMeeting2)}
                        src={Schedule}
                        alt=""
                      />
                      {/* <img
												onClick={() => setopenMeeting2(!openMeeting2)}
												className="bgdrop-icon"
												src={calender_blue}
												alt=""
												style={{ display: "none" }}
											/> */}
                      My Meetings
                      <i
                        className="fa fa-angle-down drop"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <ul
                      className="sub__menu supplier-meetings"
                      style={
                        submenu ? { display: "block" } : { display: "none" }
                      }
                    >
                      <li
                        className={
                          pathname == "/pending-meeting/supplier"
                            ? " active_list"
                            : ""
                        }
                        style={{ marginTop: "2px" }}
                      >
                        <a
                          href="/pending-meeting/supplier"
                          style={{ cursor: "pointer" }}
                        >
                          Pending Meetings
                        </a>
                      </li>
                      <li
                        className={
                          pathname == "/confirmed-meeting/supplier"
                            ? " active_list"
                            : ""
                        }
                      >
                        <a
                          href="/confirmed-meeting/supplier"
                          style={{ cursor: "pointer" }}
                        >
                          Confirmed Meetings
                        </a>
                      </li>
                      <li
                        className={
                          pathname == "/passed-meeting/supplier"
                            ? " active_list"
                            : ""
                        }
                      >
                        <a
                          href="/passed-meeting/supplier"
                          style={{ cursor: "pointer" }}
                        >
                          Passed Meetings
                        </a>
                      </li>
                    </ul>
                  </li>

                  {localStorage.getItem("user_type") == "Both" ? (
                    ""
                  ) : (
                    <li className="border">
                      <a href="/contact-us">
                        <img src={contactimag} alt="" />
                        Contact Us
                      </a>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              ""
            )}
            {localStorage.getItem("user_type") == "Buyer" ||
            localStorage.getItem("user_type") == "Both" ? (
              <>
                <h4
                  onClick={() => {
                    // navigate("/dashboard/user-management/buyer");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  BUYER
                </h4>
                <ul>
                  <li>
                    <a
                      // href="/alert-notefication/buyer"
                      style={{ cursor: "pointer" }}
                    >
                      <img src={bell} alt="" />
                      Alert Notification
                    </a>
                  </li>
                  <li
                    className={
                      submenu3 == true && props?.sidebar != true
                        ? "backdrop"
                        : coprofile === true && props.sidebar === true
                        ? "active_list"
                        : pathname == "/buyer-company-profile" ||
                          pathname ==
                            `/profile-view/${localStorage.getItem("user_id")}`
                        ? "active_list"
                        : ""
                    }
                  >
                    <a
                      className={
                        submenu3
                          ? ""
                          : pathname == "/buyer-company-profile" ||
                            pathname ==
                              `/profile-view/${localStorage.getItem(
                                "user_id"
                              )}` ||
                            pathname == "/profile-view"
                          ? " active_list"
                          : ""
                      }
                      onClick={() => {
                        setsubmenu3(!submenu3);
                        localStorage.setItem("submenu3", !submenu3);
                        // setsubmenu2(false);
                        setCoprofile(!coprofile);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={edit}
                        alt=""
                        onClick={() => setCoprofile(!coprofile)}
                      />
                      Company Profile
                      {/* <span className="profilesetionAdd">  */}
                      <i
                        className="fa fa-angle-down drop"
                        aria-hidden="true"
                      ></i>
                      {/* </span> */}
                    </a>
                    <ul
                      className="sub__menu buyer-meeting"
                      style={
                        submenu3 ? { display: "block" } : { display: "none" }
                      }
                    >
                      <li
                        style={{ marginTop: "2px" }}
                        className={
                          pathname ==
                          `/profile-view/${localStorage.getItem("user_id")}`
                            ? " active_list"
                            : ""
                        }
                      >
                        <a
                          href="#"
                          // href={`/profile-view/${localStorage.getItem(
                          //   "user_id"
                          // )}`}
                          onClick={() => {
                            navigate(
                              `/profile-view/${localStorage.getItem(
                                "user_id"
                              )}`,
                              {
                                state: {
                                  buyer_id: `${localStorage.getItem(
                                    "user_id"
                                  )}`,
                                },
                              }
                            );
                          }}
                        >
                          View Profile
                        </a>
                      </li>
                      <li
                        className={
                          pathname == "/buyer-company-profile"
                            ? " active_list"
                            : ""
                        }
                      >
                        <a href="/buyer-company-profile"> My Company Profile</a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      openMeeting === true && props.sidebar === true
                        ? "active_list"
                        : submenu2 == true && props.sidebar != true
                        ? "backdrop"
                        : pathname == `/requested-meeting/buyer` ||
                          pathname == `/passed-meeting/buyer`
                        ? "active_list"
                        : ""
                    }
                  >
                    <a
                      className={
                        submenu2
                          ? ""
                          : pathname == `/requested-meeting/buyer` ||
                            pathname == `/passed-meeting/buyer`
                          ? "active_list"
                          : ""
                      }
                      // "menu_submenu buyer"
                      style={
                        pathname == "/buyer-favourite-product" &&
                        openMeeting != true
                          ? {}
                          : {}
                      }
                      onClick={() => {
                        setopenMeeting(!openMeeting);
                        // setsubmenu3(false);
                        setsubmenu2(!submenu2);
                        localStorage.setItem("submenu2", !submenu2);
                      }}
                    >
                      <img
                        className="bgdrop-icon-hide"
                        onClick={() => setopenMeeting(!openMeeting)}
                        src={Schedule}
                        alt=""
                      />
                      {/* <img
												className="bgdrop-icon"
												onClick={() => setopenMeeting(!openMeeting)}
												src={calender_blue}
												alt=""
												style={{ display: "none" }}
											/> */}
                      My Meetings
                      <i
                        className="fa fa-angle-down drop"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <ul
                      className="sub__menu buyer-meeting"
                      style={
                        submenu2 ? { display: "block" } : { display: "none" }
                      }
                    >
                      <li
                        className={
                          pathname == `/requested-meeting/buyer`
                            ? "active_list"
                            : ""
                        }
                      >
                        <a
                          href="/requested-meeting/buyer"
                          style={{ cursor: "pointer" }}
                        >
                          Requested Meetings
                        </a>
                      </li>
                      <li
                        className={
                          pathname == `/passed-meeting/buyer`
                            ? "active_list"
                            : ""
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          href="/passed-meeting/buyer"
                          style={{ cursor: "pointer" }}
                        >
                          Passed Meetings
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      pathname == "/buyer-favourite-product"
                        ? " active_list"
                        : ""
                    }
                  >
                    <a href="/buyer-favourite-product">
                      {/* <a href="/buyer-favourite-product"> */}
                      <img src={FavoriteImage} alt="" />
                      Favourite List
                    </a>
                  </li>
                  <li className="border">
                    <a href="/contact-us">
                      <img src={contactimag} alt="" />
                      Contact Us
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* {show === true ? (
					pathname.substr(pathname.lastIndexOf('\\') + 1).split('/')[1] == "product-view" ? */}
        {props?.showContact && (
          <div
            style={{ marginTop: "60px" }}
            className="product_supplier_inner product_card"
          >
            {props?.showContact && (
              <div
                className="sidebar_toggle"
                onClick={(e) => {
                  props.setsidebar(!props.sidebar);
                  setSidebarstatus(!props.sidebar);
                  localStorage.setItem("sidebarstatus", !props.sidebar);
                }}
              >
                <div
                  style={{ marginTop: "55px" }}
                  className="icon-companycontact"
                >
                  <img src={company_contact} />
                  <h4>Company Contact</h4>
                </div>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
              </div>
            )}
            <div className="contact_comapny">
              <h4>Company Contact</h4>
              <ul>
                <li>
                  <div>
                    {companyData?.brand_logo != "" && (
                      <img src={api + "/" + companyData?.brand_logo} alt="" />
                    )}
                    <h5>Name: {companyData?.company_name} </h5>
                  </div>
                </li>
                <li>
                  <h6>
                    {/* Website:{" "} */}
                    {companyData?.website === "null" ? (
                      ""
                    ) : (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={companyData?.website}
                        // href={companyData?.website}
                      >
                        {companyData?.website}
                      </a>
                    )}
                  </h6>
                </li>
                <li>
                  <h6>
                    {/* Country:{" "} */}
                    {companyData?.country === "null"
                      ? ""
                      : companyData?.country || companyData?.county}
                  </h6>
                </li>
              </ul>
              <ul>
                <li>
                  <div>
                    <img
                      style={
                        companyData?.brand_logo != "" ? {} : { display: "none" }
                      }
                      src={api + "/" + companyData?.brand_logo}
                      alt=""
                    />
                    <h5>Main Office</h5>
                  </div>
                </li>
                <li>
                  <h6>
                    {" "}
                    {companyData?.address1 === "null"
                      ? ""
                      : companyData?.address1}
                  </h6>
                </li>
                <li>
                  <h6>
                    {" "}
                    {companyData?.address2 === "null"
                      ? ""
                      : companyData?.address2}
                  </h6>
                </li>
                <li>
                  <h6>
                    {" "}
                    {companyData?.address3 === "null"
                      ? ""
                      : companyData?.address3}
                  </h6>
                </li>
              </ul>
              <ul>
                <li>
                  <div>
                    <img
                      style={
                        companyData?.contact1_image != ""
                          ? {}
                          : { display: "none" }
                      }
                      src={api + "/" + companyData?.contact1_image}
                      alt=""
                    />
                    <h5>
                      {companyData?.contact1_name === "null"
                        ? ""
                        : companyData?.contact1_name}
                    </h5>
                  </div>
                </li>
                <li>
                  <label htmlFor="Tel">
                    {" "}
                    {companyData?.contact1_job === "null"
                      ? ""
                      : companyData?.contact1_job}
                  </label>
                </li>
                {/* <li>
								<label htmlFor="Tel">Tel fix: </label>
							</li> */}

                {companyData?.contact1_phone != "null" &&
                  companyData?.contact1_phone && (
                    <li>
                      <label htmlFor="phone">
                        {companyData?.contact1_phone}
                      </label>
                    </li>
                  )}
                <li>
                  <label htmlFor="email">
                    {companyData?.contact1_email === "null"
                      ? ""
                      : companyData?.contact1_email}
                  </label>
                </li>
              </ul>
              <ul className="border-bottom">
                <li>
                  {companyData?.contact2_image && (
                    <div>
                      <img
                        style={
                          companyData?.contact2_image != ""
                            ? {}
                            : { display: "none" }
                        }
                        src={api + "/" + companyData?.contact2_image}
                        alt=""
                      />
                      <h5>
                        {companyData?.contact2_name === "null"
                          ? ""
                          : companyData?.contact2_name}
                      </h5>
                    </div>
                  )}
                </li>
                <li>
                  <label htmlFor="Tel">
                    {companyData?.contact2_job === "null"
                      ? ""
                      : companyData?.contact2_job}
                  </label>
                </li>
                {companyData?.contact2_phone != "null" &&
                  companyData?.contact2_phone && (
                    <li>
                      <label htmlFor="phone">
                        Mobile: {companyData?.contact2_phone}
                      </label>
                    </li>
                  )}

                <li>
                  <label htmlFor="email">
                    {companyData?.contact2_email === "null"
                      ? ""
                      : companyData?.contact2_email}
                  </label>
                </li>
              </ul>
              <div className="icon-bottom">
                <ul>
                  {/* Check if the Facebook URL is defined and not null */}
                  {companyData?.facebook && companyData?.facebook != "null" && (
                    <li>
                      <a
                        href={`${companyData?.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={facebook} alt="Facebook" />
                      </a>
                    </li>
                  )}

                  {/* Check if the Twitter URL is defined and not null */}
                  {companyData?.twitter && companyData?.twitter != "null" && (
                    <li>
                      <a
                        href={`${companyData.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={twitter} alt="Twitter" />
                      </a>
                    </li>
                  )}

                  {/* Check if the Instagram URL is defined and not null */}
                  {companyData?.instagram &&
                    companyData?.instagram != "null" && (
                      <li>
                        <a
                          href={`${companyData.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={instagram} alt="Instagram" />
                        </a>
                      </li>
                    )}

                  {/* Check if the LinkedIn URL is defined and not null */}
                  {companyData?.linkedin && companyData?.linkedin != "null" && (
                    <li>
                      <a
                        href={`${companyData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={linkedin} alt="LinkedIn" />
                      </a>
                    </li>
                  )}

                  {companyData?.youtube && companyData?.youtube != "null" && (
                    <li>
                      <a
                        href={`${companyData.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={youtube} alt="YouTube" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* : ""
				) : (
					""
				)} */}

        {/* ) : (
          ""
        )} */}
      </div>
      <div
        style={
          openMeeting2 == true && props?.sidebar != false
            ? { display: "block" }
            : { display: "none" }
        }
        className="bg-light supplier-meetings dropdown-container"
        tabIndex="-1"
      >
        <h4>
          My Meetings
          <i
            onClick={(e) => setopenMeeting2(false)}
            className="fa fa-angle-up"
            aria-hidden="true"
            style={{ transform: "rotate(180deg)" }}
          ></i>
        </h4>
        <div className="dropdown-item-div">
          <a className="dropdown-item" href="/pending-meeting/supplier">
            Pending Meetings
          </a>
          <a className="dropdown-item" href="/confirmed-meeting/supplier">
            Confirmed Meetings
          </a>
          <a className="dropdown-item" href="/passed-meeting/supplier">
            Passed Meetings
          </a>
        </div>
      </div>
      <div
        style={
          openMeeting == true && props?.sidebar != false
            ? { display: "block" }
            : { display: "none" }
        }
        className={
          localStorage.getItem("user_type")?.toLowerCase() == "buyer"
            ? "bg-light supplier-meetings dropdown-container"
            : "bg-light buyer-meetings dropdown-container"
        }
        // tabIndex="-1"
      >
        <h4>
          My Meetings
          <i
            onClick={() => {
              setopenMeeting(!openMeeting);
              // props.sidebar = true
            }}
            className="fa fa-angle-up"
            aria-hidden="true"
            style={{ transform: "rotate(180deg)" }}
          ></i>
        </h4>
        <div className="dropdown-item-div">
          <a className="dropdown-item" href="/requested-meeting/buyer">
            Requested meetings
          </a>
          <a className="dropdown-item" href="/passed-meeting/buyer">
            Passed Meetings
          </a>
        </div>
      </div>
      <div
        style={
          products == true && props?.sidebar != false
            ? { display: "block" }
            : { display: "none" }
        }
        className={"bg-light products-showcase dropdown-container"}
        // tabIndex="-1"
      >
        <h4>
          Products Showcase
          <i
            onClick={() => {
              setProducts(!products);
              // props.sidebar = true
            }}
            className="fa fa-angle-up"
            aria-hidden="true"
            style={{ transform: "rotate(180deg)" }}
          ></i>
        </h4>
        <div className="dropdown-item-div">
          <a
            className="dropdown-item"
            href="/supplier-product-showcase/all-products"
          >
            All Products
          </a>
          <a
            className="dropdown-item"
            href="/supplier-product-showcase/actual-products"
          >
            Actual Products
          </a>
          <a
            className="dropdown-item"
            href="/supplier-product-showcase/expired-products"
          >
            Expired Products
          </a>
        </div>
      </div>

      <div
        style={
          coprofile == true && props?.sidebar != false
            ? { display: "block" }
            : { display: "none" }
        }
        className={
          localStorage.getItem("user_type")?.toLowerCase() != "buyer"
            ? "bg-light company-profile dropdown-container"
            : "bg-light buyer company-profile dropdown-container"
        }
        // tabIndex="-1"
      >
        <h4>
          Company Profile
          <i
            onClick={() => {
              setCoprofile(!coprofile);
              // props.sidebar = true
            }}
            className="fa fa-angle-up"
            aria-hidden="true"
            style={{ transform: "rotate(180deg)" }}
          ></i>
        </h4>
        <div className="dropdown-item-div">
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigate(`/profile-view/${localStorage.getItem("user_id")}`, {
                state: {
                  buyer_id: `${localStorage.getItem("user_id")}`,
                },
              });
            }}
          >
            View Profile
          </a>
          <a className="dropdown-item" href="/buyer-company-profile">
            My Company Profile
          </a>
        </div>
      </div>
    </>
  );
}
