import React, { useEffect, useState } from "react";
import { api } from "./base_url";

import { useLocation, useNavigate } from "react-router-dom";
function Privacy_terms() {
	const navigate = useNavigate();
	const [theytrusted, settheytrusted] = useState();
	const [check, setcheck] = useState(true);
	const [privacyData, setPrivacyData] = useState({});
	const location = useLocation();
	const state_data = location.state;
	console.log(state_data);
	const handleNavigateBack = () => {
		navigate(-1);
	};
	const theytrusted_data = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/theytrustedus", requestOptions)
			.then((response) => response.json())
			.then((result) => settheytrusted(result.data))
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		if (check) {
			theytrusted_data();
			setcheck(false);
		}
	}, [check]);

	useEffect(() => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/privacyterms", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setPrivacyData(result?.data?.privacyterms);
			})
			.catch((error) => console.log("error", error));
	}, []);

	return (
		<>
			<div className="breadcrumbs" data-aos="fade-down">
				<div className="container">
					<ul>
						{state_data?.state != 1 ? (
							<>
								<li>
									<a href="/">Home</a>
								</li>
								<li>
									<a href="#">
										<span>Privacy-Terms</span>
									</a>
								</li>
							</>
						) : (
							<>
								<li>
									<a>Dashboard</a>
								</li>
								<li>
									<a>Supplier</a>
								</li>
								<li>
									<a>Add New Product</a>
								</li>
								<li>
									<a>Payment</a>
								</li>
								<li>
									{" "}
									<span> Privacy_Terms</span>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
			<div className="about font-sm">
				<div className="container">
					<div className="inner" data-aos="fade-up">
						<h1>
							{" "}
							{privacyData?.title != undefined ? (
								<>{privacyData?.title}</>
							) : (
								<></>
							)}
						</h1>
						{privacyData?.description != undefined ? (
							<div
								dangerouslySetInnerHTML={{ __html: privacyData?.description }}
                                style={{paddingBottom: '30px'}}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Privacy_terms;
