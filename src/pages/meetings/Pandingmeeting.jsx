import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../base_url";
import ReactPlayer from "react-player";
import img2 from "../../assets/images/banner_supplier.jpg";
import img3 from "../../assets/images/images-slider/image_slider_1.png";
import Modal from "../../components/modal";
import DatePicker from "../../components/datepicker";
import Timepicker from "../../components/timepicker";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Left_menu from "../productpages/left_menu";

function Pandingmeeting() {
  const [sidebar, setsidebar] = useState(true);
  const [showtime, setshowtime] = useState(false);
  const [main, setmain] = useState([]);
  const [link, setlink] = useState("");
  const [select, setselect] = useState(0);
  const [productData, setProductData] = useState([]);
  const [check, setcheck] = useState(true);
  const { id } = useParams();
  const [sDate, setSdate] = useState("");
  const [sTime, setSTime] = useState("");
  const [showTP, setShowTP] = useState();
  const [slots, setSlots] = useState([]);
  const [thumb, setthumb] = useState();
  const [thumbshow, setthumbshow] = useState(false);
  const [buyersector, setbuyersector] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [apiDateFormat, setApiDateFormat] = useState("");
  const [modalState, setModalState] = useState(false);
  const getProductDetails = () => {
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
    fetch(api + "/api/company-profile?id=" + id, requestOptions)
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
          setProductData(result.data);
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

  // useEffect(()=>{
  //   setTimeout(() => {
  //     setselect(productData?.company?.thumb_index)
  //   }, 1000);

  // },[])

  const addtofavvrate = () => {
    var myHeaders = new Headers();
    var formvalues = new FormData();

    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    formvalues.append("product_id", id);

    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: formvalues,
    };
    fetch(api + "/api/v1/favorites", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success == true) {
          toast.success("Add to favorite Successfully");
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (error) {
          toast.error(error.message);
        }
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

  const requestAdmin = (id) => {
    var formdata = new FormData();
    formdata.append("product_id", id);
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
    fetch(api + "/api/v1/sendrequest_productdetails", requestOptions)
      .then((response) => getProductDetails())
      .catch((error) => console.log("error", error));
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
    getProductDetails();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productData?.media_files) {
      setmain([productData?.media_files[0]]);
    }
  }, [link, productData]);

  let url2 = productData.product?.category?.replace(/\s+/g, "-");

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
      <div className="product_before_meeting profile_popup">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
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
                      <a href="/pending-meeting/supplier">
                        <span>My Meetings</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span> Pending Meetings </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span> Buyer A</span>
                      </a>
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
                                    style={{ height: "500px" }}
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
                                ? { display: "none" }
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
                            {/* <ReactPlayer url={productData?.product.youtube_link} width={"auto"} height={"300"} /> */}
                            {productData.company?.youtube_link == null ? (
                              ""
                            ) : (
                              <i
                                className="fa-brands fa-square-youtube thumbnail"
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
                        <button className=" btn_margin thiredbtn thiredbtn2 btn btn-secondar">
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <h2>{productData?.company?.company_name}</h2>
                  <h5>Company Country: {productData?.company?.country}</h5>
                  <h2>Company Profile</h2>
                  <p>{productData?.company?.company_dec}</p>
                  {pathname ==
                  `/profile-view/${localStorage.getItem("user_id")}` ? (
                    ""
                  ) : (
                    <div className="button-wrapper m-lft">
                      <a href="#" className="btn btn-primary">
                        <span>
                          <img src="images/thumbs-down.svg" alt="" />
                        </span>
                        I Refuse A Meeting
                      </a>
                      <a href="#" className="btn btn-secondary">
                        <span>
                          <img src="images/Payment.svg" alt="" />
                        </span>
                        Pending Payment
                      </a>
                    </div>
                  )}
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
                        {productData.questions?.map((item) => {
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
          <h3>Add your Availability</h3>
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
          className="btn btn-secondary"
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
