import React, { useEffect, useState } from 'react'
import { api } from './base_url';
import '../../src/style/reset.css'
import Left_arrow from '../assets/images/arrow-left (1).png'
import Right_arrow from '../assets/images/arrow-right (1).png'

function Theytrustedus() {
    const [theytrusted, settheytrusted] = useState()
    const [check, setcheck] = useState(true)
    const [pagination, setpagination] = useState(25);
    const [lastPage, setLastPage] = useState(1);
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/theytrustedus", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.logos.sort((a, b) => {
                    return a.ranking - b.ranking;
                });
                settheytrusted(result.data)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])
    const totalPages = Math.ceil(theytrusted?.logos?.length / 25);
    const currentPage = pagination / 25;
    const setPaginationAndLastPage = (newPagination) => {
        setLastPage(pagination / 25); // Store the current page value as the last selected page.
        setpagination(newPagination); // Update the pagination with the new value.
    };
    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container aos-init aos-animate" >
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>Buyers</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="buyers_wrapper"  >
                <div className="container" data-aos="fade-up" >
                    <div className="trust_section row justify-content-between"   >
                        <div className="col_left aos-init aos-animate"  >
                            <div className="buyers">
                                <h1 >{theytrusted?.theytrustedus.title}</h1>
                                <p className='font-fm'>{theytrusted?.theytrustedus.description}</p>
                            </div>
                        </div>
                        {
                            localStorage.getItem("token") != null ? "" :
                                <div className="col_right">
                                    <div className="button-wrapper">
                                        <a href="#"><h2>Do you want more information?</h2></a>
                                        <a href="/login" className="btn btn-secondary">Sign In</a>
                                        <p>Or</p>
                                        <a href="/login" className="btn btn-secondary btn-default">Create a new account</a>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="row grid-5">
                        {
                            theytrusted?.logos?.map((logos, index) => {
                                if (index < pagination && index >= (pagination - 25)) {
                                    return (
                                        <div className="grid-col aos-init aos-animate" data-aos="fade-in" key={index}>
                                            <div className="column">
                                                <img src={api + "/assets/cms/" + logos.logo} title="" alt="" />
                                            </div>
                                            <h5>{logos.country}</h5>

                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className="pagination">
                    <ul style={{ marginTop: "1rem" }}>
                        {currentPage !== 1 && (
                            <li
                                className="selected"
                                onClick={(e) => {
                                    setpagination(pagination - 25)
                                    const currentScrollPosition = window.scrollY;
                                    const scrollAmount = currentPage < lastpa ? -70 : 50; // Adjust 2 to any other threshold you want
                                    window.scrollTo(
                                        0,
                                        currentScrollPosition + scrollAmount * parseFloat(getComputedStyle(document.documentElement).fontSize)
                                    );
                                }}
                            >
                                <a>
                                    <img src={Left_arrow} title="" alt="" /> Previous
                                </a>
                            </li>
                        )}
                        {theytrusted?.logos?.length > 0
                            ? [...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                return (
                                    <li
                                        className={pagination === page * 25 ? "active" : ""}
                                        onClick={() => {
                                            setPaginationAndLastPage(page * 25);
                                            // Adjust 2 to any other threshold you want
                                            window.scrollTo(0, 200)
                                        }}
                                        key={i}
                                    >
                                        <a>{page}</a>
                                    </li>

                                );
                            })
                            : ""}
                        {currentPage !== totalPages && theytrusted?.logos?.length > 75 && (
                            <li className="selected" onClick={(e) => setpagination(pagination + 25)}>
                                <a>
                                    Next <img src={Right_arrow} title="" alt="" />
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Theytrustedus
