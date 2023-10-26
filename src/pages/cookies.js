import React, { useEffect, useState } from 'react'
import { api } from './base_url';

function Cookies() {
    const [theytrusted, settheytrusted] = useState()
    const [check, setcheck] = useState(true)
    const [cookiesData, setCookiesData] = useState({})
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

    useEffect(() => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/cookiespolicy", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCookiesData(result?.data?.cookiespolicy)
            })
            .catch(error => console.log('error', error));
      
    }, []);
    

    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>Cookies Policy</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="about font-sm">
                <div className="container">
                    <div className="inner" data-aos="fade-up">
                    <h1>
							{" "}
							{cookiesData?.title != undefined ? (
								<>{cookiesData?.title}</>
							) : (
								<></>
							)}
						</h1>

                        {cookiesData?.description != undefined ? (
							<div
								dangerouslySetInnerHTML={{ __html: cookiesData?.description }}
                                style={{paddingBottom: '30px'}}
							/>
						) : (
							<></>
						)}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cookies

