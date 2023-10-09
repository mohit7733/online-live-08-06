import React from 'react'
import { useNavigate } from 'react-router-dom'
import contactimag  from "../../assets/images/CONTACT.png"
import Left_menu from './left_menu'

function Addproduct() {
    const navigate = useNavigate()
  return (
    <>
    <div className="product_research_wrap add_new_product Meeting_wrap profile_popup">

<div className="main">
            <div className="left_wrapper left_desktop active" id="left_wrapper">
                <div className="left_sidebar">
                    <div className="box">
                        <div className="sidebar_toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <h4>{localStorage.getItem("user_type")} </h4>
                        <ul>
                            <li>
                                <a href="/dashboard/4"><img src="images/bell.svg" alt="" />Alert Notification</a>
                            </li>
                            <li><a href="/dashboard"><img src="images/edit.svg" alt="" />Products Showcase</a></li>
                            <li>
                                <a className="menu_submenu supplier">
                                    <img className="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img className="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                        // style="display:none;"
                                        />My Meetings
                                    <i className="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul className="sub__menu supplier-meetings">
                                    <li><a href="#">Pending Meetings</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li className="active"><a href="#">Passed Meetings</a></li>
                                </ul>

                                {/* <!-- <span className="icon-drop"></span> --> */}
                            </li>
                           
                                 <li className="border"><a href="/contact-us"><img
                                 src={contactimag} alt="" />Contact Us</a>
                     </li>
                            
                        </ul>
                        {/* <h4>BUYER</h4>
                        <ul>
                            <li><a href="#"><img src="images/bell.svg" alt="" />Alert Notification</a></li>
                            <li><a href="#"><img src="images/edit.svg" alt="" />Products Research Profile</a></li>
                            <li>
                                <a className="menu_submenu buyer">
                                    <img className="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img className="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                        // style="display:none;"
                                        />My Meetings
                                    <i className="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul className="sub__menu buyer-meeting">
                                    <li><a href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">View
                                            All Products</a></li>
                                    <li><a href="#">Favourite List</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li className="active"><a href="#">Passed Meetings</a></li>
                                </ul>
                            </li>
                            <li className="border"><a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html"><img
                                        src="images/CONTACT.png" alt="" />Contact Us</a>
                            </li>
                        </ul> */}
                    </div>
                </div>

            </div>
            <div className="bg-light supplier-meetings dropdown-container" tabindex="-1">
                <h4>My Meetings
                    {/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
                </h4>
                <div className="dropdown-item-div">
                    <a className="dropdown-item" href="#">
                        Pending Meetings
                    </a>
                    <a className="dropdown-item" href="#">
                        Confirmed Meetings
                    </a>
                    <a className="dropdown-item" href="#">
                        Passed Meetings
                    </a>
                </div>
            </div>
            <div className="bg-light buyer-meetings dropdown-container" tabindex="-1">
                <h4>My Meetings
                    {/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
                </h4>
                <div className="dropdown-item-div">
                    <a className="dropdown-item" href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">
                        View All Products
                    </a>
                    <a className="dropdown-item" href="#">
                        Favourite List
                    </a>
                    <a className="dropdown-item" href="#">
                        Confirmed Meetings
                    </a>
                    <a className="dropdown-item" href="#">
                        Passed Meetings
                    </a>
                </div>
            </div>
            <div className="router-body active">
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="/dashboard">Dashboard </a></li>
                        <li><a href="/dashboard">  {localStorage.getItem("user_type")}</a></li>
                        <li><a href="#"><span>Product Showcase</span></a></li>
                        <li><a href="#"><span>Add New Product</span></a></li>
                    </ul>
                </div>
                <div className="product_prfile">
                    <h1>Add New Product</h1>
                    <div className="row">
                        <div className="col_left">
                            <div className="panel">
                                <div className="form-group full">
                                    <input type="text" placeholder="Product Full Name" className="form-control"/>
                                </div>
                                <div className="form-group full">
                                    <input type="text" placeholder="Product Short Name" className="form-control"/>
                                </div>
                                <div className="form_wrap row">
                                    <div className="column">
                                        <div className="custom-select">
                                            <select>
                                                <option>Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="custom-select">
                                            <select>
                                                <option>Sub-Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="custom-select">
                                            <select>
                                                <option>Country</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group full">
                                    <input type="text" placeholder="Company Name" className="form-control"/>
                                </div>
                                <textarea maxlength="50" className="form-control"
                                    placeholder="Company Profile Description"></textarea>
                                    <p className="limit">0/50</p>
                            </div>
                            <div className="button_wrap row">
                                <a href="" className="btn btn-secondary">Submit</a>
                                <a href="" className="btn btn-primary">Cancel</a>
                            </div>
                            <div className="error-button row justify-content-center">
                                <a className="error_icon" onClick={()=>navigate(-1)}><i className="fa fa-arrow-left left" aria-hidden="true"></i>Back to Product Showcase</a>
                            </div>

                        </div>
                        <div className="col_right">
                            <h6>Product Images</h6>
                            <div className="data_upload">
                                <img src="images/profile_upload.svg" alt="" />
                                <h4>Upload Image, Video or <br/>
                                    Document</h4>
                            </div>
                            <div className="thumbnail_section">
                                <h6>Set Thumbnail Image</h6>
                                <div className="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure className="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div className="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure className="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div className="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure className="center"><img src="images/thumbnail_2.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                            </div>
                            <div className="doc_upload">
                                <h6>Uploaded Documents</h6>
                                <div className="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                                <div className="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default Addproduct