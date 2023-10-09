import React from 'react'

function Productresearch() {
  return (
    <>
    
    <div className="main">
            <div className="left_wrapper left_desktop" id="left_wrapper">
                <div className="left_sidebar">
                    <div className="box">
                        <div className="sidebar_toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <h4>SUPPLIER</h4>
                        <ul>
                            <li>
                                <a href="#"><img src="images/bell.svg" alt="" />Alert Notification</a>
                            </li>
                            <li><a href="#"><img src="images/edit.svg" alt="" />Products Showcase</a></li>
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
                        </ul>
                        <h4>BUYER</h4>
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
                        </ul>
                    </div>
                </div>

            </div>
            <div className="bg-light supplier-meetings dropdown-container" tabindex="-1">
                <h4>My Meetings
                <i className="fa fa-angle-up" aria-hidden="true"></i> 
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
                     <i className="fa fa-angle-up" aria-hidden="true"></i> 
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
            <div className="router-body">
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Buyer</a></li>
                        <li><a href="#"><span>Product Research Profile</span></a></li>
                    </ul>
                </div>
                <div className="product_prfile">
                    <h1>Product Research Profile</h1>
                    <div className="row">
                        <div className="col_left">
                            <div className="panel">
                                <div className="form-group full">
                                    <input type="text" placeholder="Company Full Name" className="form-control" />
                                </div>
                                <div className="form-group full">
                                    <input type="text" placeholder="Company Short Name" className="form-control"/>
                                </div>
                                <div className="form_wrap row">
                                    <div className="form-group">
                                        <div className="custom-select">
                                            <select>
                                                <option>Country</option>
                                                <option>india</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group Company_sector">
                                        <input type="text" placeholder="Company Sector" className="form-control"/>
                                    </div>
                                </div>
                                <textarea name="" className="form-control" placeholder="Company Profile Description"></textarea>
                            </div>
                            <div className="radio_section">
                                <p>Q 1. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div className="radio_btn">
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum A" name="fav_language" value="Lorem Ipsum A"/>
                                        <label htmlFor="Lorem Ipsum A">Lorem Ipsum A</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum B" name="fav_language" value="Lorem Ipsum B"/>
                                        <label htmlFor="Lorem Ipsum B">Lorem Ipsum B</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum C" name="fav_language" value="Lorem Ipsum C"/>
                                        <label htmlFor="Lorem Ipsum C">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div className="radio_section">
                                <p>Q 2. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div className="radio_btn">
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum A" name="fav_language" value="Lorem Ipsum A"/>
                                        <label htmlFor="Lorem Ipsum A">Lorem Ipsum A</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum B" name="fav_language" value="Lorem Ipsum B"/>
                                        <label htmlFor="Lorem Ipsum B">Lorem Ipsum B</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="Lorem Ipsum C" name="fav_language" value="Lorem Ipsum C"/>
                                        <label htmlFor="Lorem Ipsum C">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div className="radio_section">
                                <p>Q 3. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div className="radio_btn">
                                    <div className="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A"/>
                                        <label htmlFor="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label htmlFor="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label htmlFor="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div className="radio_section">
                                <p>Q 4. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div className="radio_btn">
                                    <div className="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A" />
                                        <label htmlFor="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label htmlFor="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label htmlFor="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div className="radio_section">
                                <p>Q 5. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div className="radio_btn">
                                    <div className="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A" />
                                        <label htmlFor="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label htmlFor="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div className="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label htmlFor="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div className="col_right">
                        <h6>Company Images</h6>
                        <div className="data_upload">
                            <img src="images/profile_upload.svg" alt="" />
                            <h4>Upload Image, Video or <br/>
                                Document</h4>
                        </div>
                        <div className="thumbnail_section">
                            <h6>Set Thumbnail Image</h6>
                            <div className="thumb_inner row align-items-center">
                                <input type="radio" id="profile" name="thumb" value="" />
                                <figure className="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                <figure><img src="images/trash-2.svg" alt="" /></figure>
                            </div>
                            <div className="thumb_inner row align-items-center">
                                <input type="radio" id="profile" name="thumb" value=""/>
                                <figure className="center"><img src="images/thumbnail_2.svg" alt="" /></figure>
                                <figure><img src="images/trash-2.svg" alt="" /></figure>
                            </div>
                        </div>
                        <div className="doc_upload">
                            <h6>Uploaded Documents</h6>
                            <div className="inner_doc row align-items-center">
                                <figure>
                                    <img src="images/pdf_icon.png" alt="" />
                                </figure>
                                <figure>
                                    <img src="images/trash-2.svg" alt="" />
                                </figure>
                            </div>
                
                        </div>
                    </div>        
                    
                    </div>
                    <div className="button">
                        <a href="" className="btn btn-secondary">Submit</a>
                    </div> 
                </div>
            </div>
        </div>

    
    
    
    </>
  )
}

export default Productresearch