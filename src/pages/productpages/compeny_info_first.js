import React, { useState } from 'react'
import Left_menu from '../productpages/left_menu'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Company_information_first() {
    const [editcompany, seteditcompany] = useState(true)
    const navigate = useNavigate();
    return (
        <>
            <div className='company_wrapper product_section container'>
                {
                    editcompany == true ?
                        <div className={"router-body"}>

                            <div className="remark_wrap company_wrap row justify-content-between">
                                <div className="column">
                                    <h2>Company Information</h2>
                                </div>
                                <div className="column">
                                    {/* <p onClick={()=> seteditcompany(true)} >Edit Company Information<img src="images/edit (1).svg" alt="" /></p> */}
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Company Name</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Company Website</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="www.beautymeetings.co.uk" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Industry Name</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Registration Number</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="1245627561" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Main Office Address</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="123, Lorem ipsum dolor sit amet" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>Contact 1</label>
                                    </div>
                                    <div className="right pd-bt">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Richard D." />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Job Title" />
                                        </div>
                                        <div className="column">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="12456789451" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="tomallen@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>Contact 2</label>
                                    </div>
                                    <div className="right pd-bt">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Richard D." />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Job Title" />
                                        </div>
                                        <div className="column">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="12456789451" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="richardd22@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>About Company</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <textarea name="" className="form-control">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</textarea>
                                            <p
                                                style={{ textAlign: "right", color: "#999999" }}
                                            >0/250</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Facebook</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Twitter</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Instagram</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Linkedin</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Youtube</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Tiktok</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Wechat</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_wrapper row">
                                    <Link to="/login" className="btn btn-secondary"
                                    // onClick={e => {
                                    //     navigate("/login")
                                    // }}
                                    >Submit</Link>
                                    <a href="" className="btn btn-primary">Cancel</a>
                                </div>
                            </div>
                        </div> :


                        <div className={"router-body"}>

                            <div className="company_wrap2 remark_wrap company_wrap row justify-content-between">
                                <div className="column">
                                    <h2>Company Information</h2>
                                </div>
                                <div className="column">
                                    <p onClick={() => seteditcompany(true)} style={{ cursor: "pointer" }} >Edit Company Information<img src="images/edit (1).svg" alt="" /></p>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Company Name</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Company Website</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="www.beautymeetings.co.uk" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Industry Name</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Registration Number</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="1245627561" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Main Office Address</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="123, Lorem ipsum dolor sit amet" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>Contact 1</label>
                                    </div>
                                    <div className="right pd-bt">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Richard D." />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Job Title" />
                                        </div>
                                        <div className="column">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="12456789451" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="tomallen@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>Contact 2</label>
                                    </div>
                                    <div className="right pd-bt">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Richard D." />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Job Title" />
                                        </div>
                                        <div className="column">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="12456789451" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="richardd22@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-start">
                                    <div className="left">
                                        <label>About Company</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <textarea name="" className="form-control">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</textarea>
                                            <p
                                                style={{ textAlign: "right", color: "#999999" }}
                                            >0/250</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Facebook</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Twitter</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Instagram</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Linkedin</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Youtube</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Tiktok</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row align-items-center">
                                    <div className="left">
                                        <label>Wechat</label>
                                    </div>
                                    <div className="right">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_wrapper row">
                                    <Link to="/login" className="btn btn-secondary"
                                    // onClick={e => {
                                    //     navigate("/login")
                                    // }}
                                    >Submit</Link>
                                    <a href="" className="btn btn-primary">Cancel</a>
                                </div>
                            </div>
                        </div>
                }
                {/* </div>
            </div> */}
            </div>
        </>
    )
}

export default Company_information_first