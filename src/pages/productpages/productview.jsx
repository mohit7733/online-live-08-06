import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../base_url";
import icon1 from "../../assets/images/list_icon3.png";
import gridicon from "../../assets/images/grid.svg";
import Productsvg from "../../assets/images/Product.svg";
import countrysvg from "../../assets/images/country.svg";
// import Left_Arrow from "../../../src/assets/images/left_arrow.png"
import Left_arrow from "../../assets/images/arrow-left (1).png";
import Right_arrow from "../../assets/images/arrow-right (1).png";
import Testmonial from "../middel/testmonial";
import { country } from "../dashboard/country";
// import Loader from "../LoaderPage/Loader";

function Productview() {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [grid, setgrid] = useState(false);
  const [pagination, setpagination] = useState(12);
  const [categoryparams, setcategoryparams] = useState("");
  const [subcategoryparama, setsubcategoryparama] = useState("");
  const { categorysearch, categorysearch2, sub_category } = useParams();
  const [madeinparams, setmadeinparams] = useState("");
  const [anyparams, setanyparams] = useState("");
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [categories, setcategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [resultshow, setresultshow] = useState(false);
  const [total, settotal] = useState("");
  const [check, setcheck] = useState(true);
  const [isCompanyProfileFilled, setIsCompanyProfileFilled] = useState(true);
  const [isCompanyDetailsFilled, setIsCompanyDetailsFilled] = useState(true);
  let user_type = localStorage.getItem("user_type");
  const homeproduc_data = () => {
    setloader(false);
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: 'follow'
    };
    fetch(
      api +
        `/api/productlist?${
          categoryparams
            ? `category=${categoryparams}`
            : categorysearch
            ? `category=${categorysearch?.replace(/\-+/g, " ")}`
            : "category="
        }&sub_cat=${subcategoryparama}&made_in=${madeinparams}`
      // requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          setloader(true);
          // setresultshow(true);
        }
        settotal(result?.data?.total_product);
        let arr = result?.message?.map((e) => ({
          ...e,
          ques_ans: e?.ques_ans?.map((a) => {
            const { objects, ...rest } = a;
            return rest;
          }),
        }));
        setProductData(arr);
      })
      .catch((error) => {
        if (error) {
          setloader(true);
        }
        console.log("error", error);
      });
  };

  const page = searching
    ? filteredProductData?.length / 12
    : productData.length / 12;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [subcategories, setsubcategories] = useState([]);
  const [acountbenifits, setacountbenifits] = useState([]);
  const getsub_category = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/category", requestOptions)
      .then((response) => response.json())
      .then((result) => setcategories(result?.category))
      .catch((error) => console.log("error", error));

    fetch(api + "/api/account-benifits", requestOptions)
      .then((response) => response.json())
      .then((result) => setacountbenifits(result?.data?.account_benifits))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (check) {
      homeproduc_data();
      getsub_category();
      setcheck(false);
    }
  }, [check]);

  const selcetcate = (e) => {
    // console.log(e, "<<<<<");
    setcategoryparams(e);

    categories.filter((itemId) => {
      if (itemId.category_name == e) {
        axios
          .get(`${api}/api/subcategory?category_id=${itemId?.id}`)
          .then((res) => {
            if (res.status == 200) {
              setsubcategories(res?.data?.subcategory);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  };

  useEffect(() => {
    if (categorysearch != "") {
      setcategoryparams(categorysearch);

      setTimeout(() => {
        homeproduc_data();
      }, 1000);
    }
    // window.location.reload();
    const getCompanyDetail = () => {
      return axios.get(`${api}/api/company-detail`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    };

    const getCompanyProfile = () => {
      return axios.get(`${api}/api/company-profile`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    };

    Promise.all([getCompanyDetail(), getCompanyProfile()])
      .then(([companyDetailRes, companyProfileRes]) => {
        if (
          companyDetailRes?.data?.data?.length === 0 &&
          companyProfileRes?.data?.data?.company === null
        ) {
          setIsCompanyDetailsFilled(false);
          setIsCompanyProfileFilled(false);
          if (user_type === "Both" || user_type === "Buyer") {
            setTimeout(() => {
              toast.error(
                "Please fill out your Part 1 : company information and Part 2 : company profile in order to see the product showcase."
              );
            }, [4000]);
            navigate("/company-information");
          }
        } else if (companyDetailRes?.data?.data?.length === 0) {
          if (companyDetailRes?.data?.data?.length === 0) {
            if (user_type === "Both" || user_type === "Buyer") {
              setTimeout(() => {
                toast.error(
                  "Please fill out your Part 1 : Company information in order to see the product showcase."
                );
              }, [4000]);
              navigate("/company-information");
            }
          }
        } else {
          setIsCompanyProfileFilled(true);
          setIsCompanyDetailsFilled(true);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, []);

  const resetbtnhandle = () => {
    navigate("/product-view");
    setcategoryparams("");
    setsubcategoryparama("");
    setmadeinparams("");
    setanyparams("");
    homeproduc_data();
    window.location.reload();
    // setTimeout(() => {

    // }, 50);
  };

  const searchInAll = (e) => {
    setanyparams(e.target.value);
    if (e.target.value == "") {
      homeproduc_data();
      setSearching(false);
    } else {
      setpagination(1 * 12);
      setSearching(true);
    }

    const exclude = [
      "category_id",
      "created_at",
      "deleted_at",
      "id",
      "renewal_status",
      "status",
      "subcategory_id",
      "thumb_index",
      "updated_at",
      "user_id",
      "youtube_link",
    ];
    // console.log("productData >>>>", productData[0]);
    function includesSearchTerm(value, searchTerm) {
      if (Array.isArray(value)) {
        return value.some((element) => includesSearchTerm(element, searchTerm));
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((nestedValue) =>
          includesSearchTerm(nestedValue, searchTerm)
        );
      } else {
        return (
          value
            ?.toString()
            .replace(/\s/g, "")
            ?.toLowerCase()
            ?.includes(searchTerm?.replace(/\s/g, "").toLowerCase()) || false
        );
      }
    }
    let arr1 = productData.map((item) => {
      const itemWithoutExcludedProperties = Object.fromEntries(
        Object.entries(item).filter(([key]) => !exclude.includes(key))
      );
      delete itemWithoutExcludedProperties.mediaFiles;
      return itemWithoutExcludedProperties;
    });
    arr1 = arr1.filter((item) => {
      return Object.values(item).some((value) =>
        includesSearchTerm(value, e.target.value)
      );
    });
    let newP = productData.filter((item) => {
      return arr1?.some(
        (value) =>
          value.product_name === item?.product_name &&
          value.product_short_name === item?.product_short_name
      );
    });
    setFilteredProductData(newP);
    // console.log(newP, "newP");
    // console.log(arr1, "arr1");
  };

  useEffect(() => {
    setFilteredProductData([]);
    if (sortBy == "" || sortBy == "Sorted by") {
      setSearching(false);
      setFilteredProductData([]);
    }
    if (sortBy == "Newest to oldest") {
      let arr = productData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setFilteredProductData([...arr]);
      setSearching(true);
    } else if (sortBy == "Oldest to newest") {
      let arr = productData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setFilteredProductData([...arr]);
      setSearching(true);
    } else if (sortBy == "A to Z") {
      let arr = productData.sort((a, b) =>
        a.product_short_name
          ?.split("")[0]
          .localeCompare(b.product_short_name?.split("")[0])
      );
      console.log("arr", arr);
      setFilteredProductData([...arr]);
      setSearching(true);
    } else if (sortBy == "Z to A") {
      let arr = productData.sort((a, b) =>
        b.product_short_name
          ?.split("")[0]
          .localeCompare(a.product_short_name?.split("")[0])
      );
      setFilteredProductData([...arr]);
      setSearching(true);
    }
  }, [sortBy]);
  return (
    <>
      <div className="product_wrapper">
        <div className="breadcrumbs" data-aos="fade-down">
          <div className="container aos-init aos-animate" data-aos="fade-down">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">
                  <span>Products</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product_section font-lg">
          <div className="serach_sectionset container" data-aos="fade-up">
            <h1 className="">Products</h1>
            <div className="categories row justify-content-around">
              <form
                id="search-form"
                className="category-search"
                action=""
                method="POST"
                encType="multipart/form-data"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="column">
                  <div className="custom-select">
                    <select
                      value={
                        categoryparams == "" ? "All Categories" : categoryparams
                      }
                      onClick={() => setresultshow(false)}
                      onChange={(e) => selcetcate(e.target.value)}
                    >
                      <option disabled selected>
                        All Categories
                      </option>
                      {categories?.map((data, index) => {
                        return (
                          <option
                            key={index}
                            value={data.category_name}
                            onClick={() =>
                              setcategoryparams(data.category_name)
                            }
                          >
                            {data.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="custom-select">
                    <select
                      value={subcategoryparama}
                      onChange={(e) => setsubcategoryparama(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Sub Category
                      </option>
                      {subcategories?.map((data, index) => {
                        return (
                          <option key={index} value={data?.subcategory_name}>
                            {data?.subcategory_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="custom-select">
                    <select
                      value={madeinparams}
                      onChange={(e) => setmadeinparams(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Made In
                      </option>
                      {country.data.map((data, i) => {
                        return (
                          <option key={i} value={data.country}>
                            {data.country}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="search">
                    <input
                      type="text"
                      value={anyparams}
                      onChange={(e) => {
                        searchInAll(e);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          homeproduc_data();
                          setresultshow(true);
                          setpagination(1 * 12);
                        }
                      }}
                      className="form-control"
                      placeholder="Type here keywords"
                    />
                  </div>
                </div>
                <div className="set_searchHandal column">
                  <button
                    type="button"
                    onClick={() => {
                      homeproduc_data();
                      setresultshow(true);
                      setpagination(1 * 12);
                    }}
                    className="btn btn-block btn-secondary"
                  >
                    Search
                  </button>
                </div>
                <div className="set_searchHandal column">
                  <button
                    type="reset"
                    id="reset"
                    onClick={resetbtnhandle}
                    className="btn btn-secondary btn-default"
                  >
                    Clear all
                  </button>
                </div>
              </form>
            </div>
            <div className="product_head">
              <div
                className="row justify-content-between align-items-center"
                data-aos="fade-up"
              >
                <div className="left">
                  <h2>
                    All Products{" "}
                    {/* {subcategoryparama == "" ? (
                      <>
                        {resultshow == true
                          ? `${categoryparams ? `"${categoryparams}"` : ""}`
                          : categorysearch
                          ? `${
                              productData[0]?.category != undefined
                                ? `"${productData[0]?.category}"`
                                : ""
                            }`
                          : ""}
                      </>
                    ) : (
                      ""
                    )} */}
                  </h2>
                  {resultshow == true ||
                  categorysearch ||
                  anyparams.length > 0 ? (
                    <p style={{ fontWeight: "600" }}>
                      {" "}
                      {anyparams == 0 &&
                        "Result : " + productData?.length + "/" + total}{" "}
                      {anyparams.length > 0 &&
                        "Result : " + filteredProductData?.length + "/" + total}
                    </p>
                  ) : (
                    ""
                  )}
                  {/* { categorysearch ? (
                    <p style={{ fontWeight: "600" }}>
                      {" "}
                      Result : {productData?.length+"/"+total}
                    </p>
                  ) : (
                    ""
                  )} */}
                </div>

                <div className="right d-flex">
                  <div className="column">
                    <div className="custom-select">
                      <select
                        value={sortBy == "" ? "" : sortBy}
                        // onClick={() => setresultshow(false)}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option
                          selected
                          onClick={() => setSortBy("Newest to oldest")}
                        >
                          Newest to oldest
                        </option>
                        <option onClick={() => setSortBy("Oldest to newest")}>
                          Oldest to newest
                        </option>
                        <option onClick={() => setSortBy("A to Z")}>
                          A to Z
                        </option>
                        <option onClick={() => setSortBy("Z to A")}>
                          Z to A
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="column">
                    <div className="icon-wrapper">
                      <ul className="row filter-buttons">
                        <li
                          className="grid-view-button"
                          onClick={() => setgrid(false)}
                        >
                          <span>
                            <img src={gridicon} alt="" />
                          </span>
                        </li>
                        <li
                          className="list-view-button"
                          onClick={() => setgrid(true)}
                        >
                          <span>
                            <img src={icon1} alt="" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {loader != false ? ( */}
            <ol
              className={
                grid == true
                  ? "sub_category list list-view-filter"
                  : "sub_category list grid-view-filter"
              }
              id="product"
            >
              {searching
                ? filteredProductData?.map((data, i) => {
                    if (i < pagination && i >= pagination - 12) {
                      return (
                        <li
                          className="row align-items-center"
                          key={i}
                          // data-aos="fade-up"
                        >
                          <div
                            className="img-wrapper"
                            onClick={() => {
                              if (localStorage.getItem("token") !== null) {
                                if (
                                  (localStorage
                                    .getItem("user_type")
                                    ?.toLowerCase() === "supplier" &&
                                    localStorage.getItem("user_id") ===
                                      data?.user_id) ||
                                  (
                                    localStorage
                                      .getItem("user_type")
                                      ?.toLowerCase() === "supplier" &&
                                    data?.sub_user_ids?.filter(
                                      (data) =>
                                        data == localStorage.getItem("user_id")
                                    )
                                  ).length != 0
                                ) {
                                  window.open(
                                    "/product-view/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    // "/"+ (data?.show_contact || 0),
                                    // {
                                    //   state: {
                                    //     id: data.id,
                                    //     show_contact: data?.show_contact || 0,
                                    //   },
                                    // },
                                    "_blank"
                                    // "rel=noopener noreferrer"
                                  );
                                } else if (
                                  localStorage
                                    .getItem("user_type")
                                    ?.toLowerCase() === "supplier"
                                ) {
                                  window.open(
                                    "/product-details/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    // {
                                    //   state: {
                                    //     id: data.id,
                                    //   },
                                    // },
                                    "_blank"
                                    // "rel=noopener noreferrer"
                                  );
                                } else {
                                  window.open(
                                    "/product-view/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    //  "/"+ (data?.show_contact || 0),
                                    "_blank"
                                  );
                                }
                              } else {
                                window.open(
                                  "/product-details/" +
                                    data.id +
                                    "/" +
                                    data?.product_short_name
                                      ?.replace(/\s+/g, "-")
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, ""),
                                  "_blank"
                                  // "rel=noopener noreferrer"
                                );
                              }
                            }}
                          >
                            <div className="col_img">
                              <figure style={{ height: "180px" }}>
                                {data.mediaFiles[Number(data?.thumb_index)]
                                  ?.media_type === "image" ? (
                                  <img
                                    src={
                                      data.mediaFiles[Number(data?.thumb_index)]
                                        ?.file_path
                                    }
                                    alt=""
                                  />
                                ) : data.mediaFiles?.media_type === "video" ? (
                                  <video
                                    src={data.mediaFiles?.file_path}
                                    alt=""
                                  />
                                ) : data.mediaFiles?.media_type === "doc" ? (
                                  <img
                                    src={
                                      data.mediaFiles[Number(data?.thumb_index)]
                                        ?.file_path
                                    }
                                    alt="no image"
                                  />
                                ) : null}
                              </figure>
                            </div>
                            <div className="col_category">
                              <h4 className="handle_wrap">
                                {data?.product_short_name &&
                                  data.product_short_name}
                              </h4>
                              <ul className="d-flex align-items-center">
                                <li className="made_inclass">
                                  <span>
                                    <img src={Productsvg} alt="" />
                                  </span>
                                  {data?.category}
                                </li>
                                <li className="made_inclass">
                                  <span>
                                    <img src={countrysvg} alt="" />
                                  </span>
                                  {data?.made_in}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })
                : productData?.map((data, i) => {
                    if (i < pagination && i >= pagination - 12) {
                      return (
                        <li
                          className="row align-items-center"
                          key={i}
                          // data-aos="fade-up"
                        >
                          <div
                            className="img-wrapper"
                            onClick={() => {
                              if (localStorage.getItem("token") !== null) {
                                if (
                                  (localStorage
                                    .getItem("user_type")
                                    ?.toLowerCase() === "supplier" &&
                                    localStorage.getItem("user_id") ===
                                      data?.user_id) ||
                                  (
                                    localStorage
                                      .getItem("user_type")
                                      ?.toLowerCase() === "supplier" &&
                                    data?.sub_user_ids?.filter(
                                      (data) =>
                                        data == localStorage.getItem("user_id")
                                    )
                                  )?.length != 0
                                ) {
                                  window.open(
                                    "/product-view/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    "_blank"
                                    //  "/"+ (data?.show_contact || 0),
                                    // {
                                    //   state: {
                                    //     id: data.id,
                                    //     show_contact: data?.show_contact || 0,
                                    //   },
                                    // }
                                  );
                                } else if (
                                  localStorage
                                    .getItem("user_type")
                                    ?.toLowerCase() === "supplier"
                                ) {
                                  window.open(
                                    "/product-details/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    "_blank"
                                    // {
                                    //   state: {
                                    //     id: data.id,
                                    //   },
                                    // }

                                    // "rel=noopener noreferrer"
                                  );
                                } else {
                                  let state = JSON.stringify({
                                    show_contact: data?.show_contact || 0,
                                  });

                                  window.open(
                                    "/product-view/" +
                                      data.id +
                                      "/" +
                                      data?.product_short_name
                                        ?.replace(/\s+/g, "-")
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, ""),
                                    // "/" + (data?.show_contact || 0),
                                    // encodeURIComponent(state),
                                    "_blank"
                                  );
                                }
                              } else {
                                window.open(
                                  "/product-details/" +
                                    data.id +
                                    "/" +
                                    data?.product_short_name
                                      ?.replace(/\s+/g, "-")
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, ""),
                                  "_blank"
                                  // "rel=noopener noreferrer"
                                );
                              }
                            }}
                          >
                            <div className="col_img">
                              <figure style={{ height: "180px" }}>
                                {data.mediaFiles[Number(data?.thumb_index)]
                                  ?.media_type === "image" ? (
                                  <img
                                    src={
                                      data.mediaFiles[Number(data?.thumb_index)]
                                        ?.file_path
                                    }
                                    alt=""
                                  />
                                ) : data.mediaFiles?.media_type === "video" ? (
                                  <video
                                    src={data.mediaFiles?.file_path}
                                    alt=""
                                  />
                                ) : data.mediaFiles?.media_type === "doc" ? (
                                  <img
                                    src={
                                      data.mediaFiles[Number(data?.thumb_index)]
                                        ?.file_path
                                    }
                                    alt="no image"
                                  />
                                ) : null}
                              </figure>
                            </div>
                            <div className="col_category">
                              <h4 className="handle_wrap">
                                {data?.product_short_name &&
                                  data.product_short_name}
                              </h4>
                              <ul className="d-flex align-items-center">
                                <li className="made_inclass">
                                  <span>
                                    <img src={Productsvg} alt="" />
                                  </span>
                                  {data?.category}
                                </li>
                                <li className="made_inclass">
                                  <span>
                                    <img src={countrysvg} alt="" />
                                  </span>
                                  {data?.made_in}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })}
            </ol>
            {/* ) : (
              <Loader />
            )} */}
            <div
              className="no-data-found"
              id="blank-data"
              style={{ display: "none" }}
              //   style={
              //     productData?.length == 0
              //       ? { display: "none" }
              //       : { display: "none" }
              //   }
            >
              <p>
                No Product Found. Please click on 'Clear all' button to see all
                products again.
              </p>
            </div>
            <div className="pagination">
              <ul style={{ marginTop: "1rem" }}>
                {pagination > 12 ? (
                  <li
                    className="hover_remove2 selected"
                    onClick={(e) => {
                      setpagination(pagination - 12);
                      // Apply the scroll-to-top function here
                      window.scrollTo({
                        top: 0,
                        behavior: "instant",
                      });
                    }}
                  >
                    <a>
                      <img src={Left_arrow} title="" alt="" />
                      Previous
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {productData.length > 0
                  ? [
                      ...Array(
                        parseInt(
                          JSON.stringify(page)
                            .substr(JSON.stringify(page).lastIndexOf("\\") + 1)
                            .split(".")[1]
                        )
                          ? parseInt(
                              JSON.stringify(page)
                                .substr(
                                  JSON.stringify(page).lastIndexOf("\\") + 1
                                )
                                .split(".")[0]
                            ) + 1
                          : parseInt(
                              JSON.stringify(page)
                                .substr(
                                  JSON.stringify(page).lastIndexOf("\\") + 1
                                )
                                .split(".")[0]
                            )
                      ),
                    ].map((data, i) => {
                      i += 1;
                      if (i - 3 < pagination / 12 && i + 2 > pagination / 12) {
                        return (
                          <li
                            key={i}
                            className={pagination === i * 12 ? "active" : ""}
                            onClick={() => {
                              setpagination(i * 12);
                              window.scrollTo({
                                top: 0,
                                behavior: "instant",
                              });
                            }}
                          >
                            <a>{i}</a>
                          </li>
                        );
                      } else {
                        return null; // Hide the pagination numbers outside the range
                      }
                    })
                  : ""}
                {productData?.length > 12 &&
                pagination + 2 <= productData?.length &&
                filteredProductData?.length > 12 &&
                pagination + 2 <= filteredProductData?.length ? (
                  <li
                    className="hover_remove2 selected"
                    onClick={(e) => {
                      setpagination(pagination + 12);
                      window.scrollTo({
                        top: 0,
                        behavior: "instant",
                      });
                    }}
                  >
                    <a>
                      Next <img src={Right_arrow} title="" alt="" />
                    </a>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>

        <Testmonial />
        <div className="benefit-section">
          <div className="container">
            <div
              className="howwork_section_padding  wrap row justify-content-between"
              style={
                localStorage.getItem("token") != null
                  ? { display: "block" }
                  : {}
              }
            >
              <div
                className="col_left"
                style={
                  localStorage.getItem("token") != null
                    ? { display: "contents" }
                    : {}
                }
              >
                <h2>
                  {/* Create your account and get the following benefits */}
                  {acountbenifits?.title}
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: acountbenifits?.description,
                  }}
                />

                {/* <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </li>
                </ul> */}
                <div className="row align-items-center">
                  <a href="/how-does-it-work">
                    Discover How It Works
                    <i
                      className="fa fa-arrow-right right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              {localStorage.getItem("token") != null ? (
                ""
              ) : (
                <div className="col_right">
                  <div className="button-wrapper">
                    <a href="#">
                      <h2>No account yet?</h2>
                    </a>
                    <div className="input-group">
                      <input
                        id="email"
                        name="email"
                        placeholder="Enter your email here"
                        className="form-control"
                        type="email"
                      />
                    </div>
                    <a href="/login" className="btn btn-secondary">
                      Sign In
                    </a>
                    <p>Or</p>
                    <a href="/login" className="btn btn-secondary btn-default">
                      Create a new account
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Productview;
