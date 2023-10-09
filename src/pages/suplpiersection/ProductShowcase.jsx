import React from 'react'

function ProductShowcase() {
  return (
    <>
        <div className="product_research_wrap add_new_product Meeting_wrap profile_popup">


<div className="router-body">
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Supplier</a></li>
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
                                <a className="error_icon" href="index.html"><i className="fa fa-arrow-left left" aria-hidden="true"></i>Back to Product Showcase</a>
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


    </>
  )
}

export default ProductShowcase