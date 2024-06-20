import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./base_url";
import FB from "../assets/images/facebook.png";
import twitter from "../assets/images/Twitter.png";
import moment from "moment";
import { Link } from "react-router-dom";
import Sharebtn from "./sharebtn";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import { Helmet } from "react-helmet";
import { InlineShareButtons } from "sharethis-reactjs";

function Blog_detail() {
	const slugdata = useParams();
	const id = slugdata.id;
	const navigate = useNavigate();
	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const [theytrusted, settheytrusted] = useState([]);
	const [theytrusted2, settheytrusted2] = useState([]);
	const [check, setcheck] = useState(true);

	const theytrusted_data = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/blogdetails?id=" + id, requestOptions)
			.then((response) => response.json())
			.then((result) => settheytrusted(result.data.blogs))
			.catch((error) => console.log("error", error));
	};
	const theytrusted_data2 = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/recent-blogs?id=" + id, requestOptions)
			.then((response) => response.json())
			.then((result) => settheytrusted2(result.data.blogs))
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		if (check) {
			theytrusted_data();
			// theytrusted_data2();
			setcheck(false);
		}
		window.scrollTo({
			top: 0,
			behavior: "instant",
		});
	}, [check, id]);

	return (
		<>
			<Helmet>
				<title>Beauty Meetings - Blogs</title>
				<meta name="title" content="Beauty Meetings for blogs" />
				<meta property="og:title" content={theytrusted?.title} />
				<meta property="og:description" content={theytrusted?.title} />
				<meta property="og:image" content={api + "/" + theytrusted?.Image} />
				<meta name="twitter:card" content="summary_large" />
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="breadcrumbs">
				<div className="container" data-aos="fade-up">
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/blogs">Blog</a>
						</li>
						{/* <li><a onClick={()=>navigate(-1)}>
                            Startup
                            {theytrusted?.category}

                            </a></li> */}
						<li>
							<a href="#">
								<span>{theytrusted?.title}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="blog-tags font-sm">
				<div className="container">
					<div
						className="row justify-content-between align-items-center"
						data-aos="fade-up"
					>
						<h4>
							<img
								src={api + "/" + theytrusted?.category_icon}
								title=""
								alt=""
							/>
							{theytrusted.cat_name}
						</h4>
						<p>
							Posted on
							{" " +
								month[new Date(theytrusted?.created_at).getMonth()] +
								" " +
								new Date(theytrusted?.created_at).getDate()}
							, {new Date(theytrusted?.created_at).getFullYear()}
							{/* 27th January 2022 */}
						</p>
					</div>
				</div>
			</div>

			<div className="blog-detail font-lg">
				<div className="container">
					<h2 data-aos="fade-up">By {theytrusted?.author && theytrusted?.author}</h2>
					<h1 data-aos="fade-up" data-aos-delay="200">
						{theytrusted?.title}
					</h1>
					<div
						style={{ textAlign: "center" }}
						className="img"
						data-aos="fade-up"
						data-aos-delay="300"
					>
						<img
							style={{ display: "inline-block" }}
							src={api + "/" + theytrusted?.Image}
							alt=""
						/>
					</div>
					<div className="text__box" data-aos="fade-up" data-aos-delay="100">
						{/* <h3>{}</h3> */}
						<div
							className="inner-text"
							dangerouslySetInnerHTML={{ __html: theytrusted?.description }}
						></div>
					</div>
				</div>
			</div>
			<div className="section-sm feature-section">
				<div className="container right-icon">
					<h2 data-aos="fade-up">What to read next</h2>
					<div class="right">
						<h5>Share to</h5>
						{/* <span>
                          
                            <a href="#">
                                <img src="https://onlinebeautymeeting.sdsstaging.co.uk/images/icon-o-share.svg" title="" alt=""/>
                            </a>
                        </span>          */}

						<span>
							<a href="#">
								<InlineShareButtons
									config={{
										url:
											window.location.origin +
											"/blog-detail/" +
											theytrusted?.id +
											"/" +
											theytrusted.title
												?.replace(/[^\w]+/g, "-")
												.normalize("NFD")
												.replace(/[\u0300-\u036f]/g, ""),
										networks: ["facebook"],
										title: "Test title",
										description: "Test Description",
										image: "https://bit.ly/2CMhCMC",
									}}
								>
									<img
										style={{
											background: "black",
											borderRadius: "50%",
											height: "60%",
											width: "60%",
										}}
										src="https://admin.beauty-meetings.com/assets/images/fb.png"
										title=""
										alt=""
									/>
								</InlineShareButtons>
							</a>
						</span>
						<span>
							<a href="#">
								<FacebookShareButton
									url={
										window.location.origin +
										"/blog-detail/" +
										theytrusted?.id +
										"/" +
										theytrusted.title
											?.replace(/[^\w]+/g, "-")
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "")
									}
								>
									<img
										style={{ height: "90%", width: "90%", marginTop: "3px" }}
										src={FB}
										title=""
										alt=""
									/>
								</FacebookShareButton>
							</a>
						</span>
						<span>
							<a href="#">
								<TwitterShareButton
									url={
										window.location.origin +
										"/blog-detail/" +
										theytrusted?.id +
										"/" +
										theytrusted.title
											?.replace(/[^\w]+/g, "-")
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "")
									}
									title={theytrusted.title}
								>
									<img
										style={{ height: "60%", width: "60%", marginTop: "7px" }}
										src={twitter}
										title=""
										alt=""
									/>
								</TwitterShareButton>
							</a>
						</span>
					</div>
					<div className="row grid-3">
						{theytrusted2?.map((data, i) => {
							return (
								<div key={data.id} className="grid-col" data-aos="fade-up">
									<div className="column">
										<figure>
											<img src={api + "/" + data.Image} alt="" />
											<figcaption>
												<div className="top d-flex justify-content-between align-items-center">
													<h5>{data.category}</h5>
													<Sharebtn
														title={data.title}
														id={data.id}
														url={
															window.location.origin +
															"/blog-detail/" +
															data?.id +
															"/" +
															data.title
																?.replace(/[^\w]+/g, "-")
																.normalize("NFD")
																.replace(/[\u0300-\u036f]/g, "")
														}
													/>
												</div>
												<div className="bottom">
													<ul>
														<li>By {data?.author && data?.author}</li>
														<li>
															{moment(data?.publish).format("MMM DD, YYYY")}
														</li>
													</ul>
													<div className="text">
														<Link
															onClick={(e) => {
																setcheck(true);
																window.scrollTo({
																	top: 0,
																});
																// id=data.id
															}}
															to={
																"/blog-detail/" +
																data?.id +
																"/" +
																data.title
																	?.replace(/[^\w]+/g, "-")
																	.normalize("NFD")
																	.replace(/[\u0300-\u036f]/g, "")
															}
															// target='_blank'
														>
															<h3>
																{data.title}
																<img
																	src={
																		window.location.origin +
																		"/images/arrow-right.png"
																	}
																/>
															</h3>
														</Link>
													</div>
												</div>
											</figcaption>
										</figure>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Blog_detail;
