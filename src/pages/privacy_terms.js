import React, { useEffect, useState } from 'react'
import { api } from './base_url';

import { useLocation, useNavigate } from 'react-router-dom';
function Privacy_terms() {
    const navigate = useNavigate()
    const [theytrusted, settheytrusted] = useState()
    const [check, setcheck] = useState(true)
    const location = useLocation();
    const state_data = location.state;
    console.log(state_data)
    const handleNavigateBack = () => {
        navigate(-1);
    };
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/theytrustedus", requestOptions)
            .then(response => response.json())
            .then(result => settheytrusted(result.data))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])
    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container">
                    <ul>
                        {state_data?.state != 1 ? (
                            <>
                                <li><a href="/">Home</a></li>
                                <li><a href="#"><span>Privacy-Terms</span></a></li>
                            </>
                        ) : (
                            <>
                                <li><a >Dashboard</a></li>
                                <li><a >Supplier</a></li>
                                <li><a >Add New Product</a></li>
                                <li><a >Payment</a></li>
                                <li> <span> Privacy_Terms</span></li>
                            </>
                        )}
                    </ul>

                </div>
            </div>
            <div className="about font-sm">
                <div className="container">
                    <div className="inner" data-aos="fade-up">
                        <h1>Privacy-Terms</h1>
                        <div className="inner-text">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="our-section privacy-policies">
                <div className="container">
                    <div className="col-text aos-init aos-animate" data-aos="fade-down">
                        <h5>1. Lorem Ipsum</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="col-text aos-init aos-animate" data-aos="fade-down">
                        <h5>2. Lorem Ipsum</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                    <div className="col-text aos-init aos-animate" data-aos="fade-down">
                        <h5>3. Lorem Ipsum</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
                        <ul className="privacy-ul">
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        </ul>
                    </div>

                    <div className="col-text aos-init aos-animate" data-aos="fade-down">
                        <h5>4. Lorem Ipsum</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>

                    <div className="col-text aos-init aos-animate last-child" data-aos="fade-down">
                        <h5>5. Lorem Ipsum</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div className="btn_wrapper row">
                        {/* <a id="back" href="" className="btn btn-secondary" onClick={handleNavigateBack}>Back</a> */}

                    </div>
                </div>

            </div>

        </>
    )
}

export default Privacy_terms

