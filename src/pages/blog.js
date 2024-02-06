import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./base_url";
import moment from "moment";
import Sharebtn from "./sharebtn";
import axios from "axios";

function Blog() {
	const [pagination, setPagination] = useState(9);
	const [theytrusted, settheytrusted] = useState([]);
	const [featured, setfeatured] = useState([]);
	const [cateValue, setcateValue] = useState("");
	const [check, setcheck] = useState(true);
	const [search, setSearch] = useState("");
	const [searchparam, setSearchparam] = useState("");
	const [sortBy, setSortBy] = useState("Newest to oldest");
	const [brandCat, SetbrandCat] = useState([]);
	const theytrusted_data = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + `/api/blogs?cat_id=${cateValue}`, requestOptions)
			.then((response) => response.json())
			.then((result) => settheytrusted(result.data.blogs))
			.catch((error) => console.log("error", error));

		fetch(api + "/api/featuredpost", requestOptions)
			.then((response) => response.json())
			.then((result) => setfeatured(result.data.featuredpost))
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		if (check) {
			theytrusted_data();
			setcheck(false);
		}
	}, [check]);

	function searchbtn(e) {
		e.preventDefault();
		setSearchparam(search);
	}
	useEffect(() => {
		if (search == "") {
			setSearchparam(search);
		}
	}, [search, searchbtn]);
	useEffect(() => {
		if (sortBy == "Newest to oldest") {
			let arr = theytrusted.sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at)
			);
			settheytrusted([...arr]);
		} else if (sortBy == "Oldest to newest") {
			let arr = theytrusted.sort(
				(a, b) => new Date(a.created_at) - new Date(b.created_at)
			);
			settheytrusted([...arr]);
		} else if (sortBy == "A to Z") {
			let arr = theytrusted.sort((a, b) =>
				a.title
					.toString()
					?.split("")[0]
					.localeCompare(b.title?.toString().split("")[0])
			);
			settheytrusted([...arr]);
		} else if (sortBy == "Z to A") {
			let arr = theytrusted.sort((a, b) =>
				b.title
					.toString()
					?.split("")[0]
					.localeCompare(a.title?.toString().split("")[0])
			);
			settheytrusted([...arr]);
		}
	}, [sortBy]);
	useEffect(() => {
		theytrusted_data();
	}, [cateValue]);
	const getCategory = () => {
		axios
			.get(api + "/api/blogsCategory")
			.then((res) => {
				SetbrandCat(res.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		getCategory();
	}, []);
	return (
		<>
			<div className="breadcrumbs" data-aos="fade-down">
				<div className="container">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/blogs">
								<span>Blog</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="blog-panel font-lg font-sm">
				<div className="container">
					<h1 data-aos="fade-down">Blogs</h1>
					{featured?.map((data, i) => {
						if (i < 1) {
							return (
								<div key={data.id} className="row">
									<div className="col-img" data-aos="fade-right">
										<figure>
											<img
												src={
													// image2
													api + "/" + data?.file_path
												}
												title=""
												alt=""
												style={{ width: "100%" }}
											/>
											<figcaption>
												<div className="top d-flex justify-content-between align-items-center">
													<Link
														to={
															"/blog-detail/" +
															data?.id +
															"/" +
															data.title
																?.replace(/[^\w]+/g, "-")
																.normalize("NFD")
																.replace(/[\u0300-\u036f]/g, "")
														}
														target="_blank"
													>
														<h5>{data?.category}</h5>
													</Link>
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
											</figcaption>
										</figure>
									</div>
									<div className="col-text" data-aos="fade-left">
										<h5>Featured Blog</h5>
										<h2>{data?.title}</h2>
										<h6 className="auther">
											By <span>{data?.author}</span> |{" "}
											{moment(data?.created_at).format("MMM DD, YYYY")}
										</h6>
										<p
											className="inner-text"
											dangerouslySetInnerHTML={{
												__html: data?.description?.slice(0, 250) + " ...",
											}}
										></p>
										<Link
											to={
												"/blog-detail/" +
												data?.id +
												"/" +
												data.title
													?.replace(/[^\w]+/g, "-")
													.normalize("NFD")
													.replace(/[\u0300-\u036f]/g, "")
											}
											className="btn btn-secondary"
										>
											Read More
										</Link>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
			<div className="filter-section">
				<div className="container">
					<div
						className="row justify-content-between align-items-center"
						data-aos="fade-up"
					>
						<div className="left">
							<h2>All Posts</h2>
						</div>
						<div className="right d-flex">
							<div className="column">
								<form onSubmit={searchbtn} className="search">
									<input
										type="text"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="form-control"
										placeholder="Type here keywords"
									/>
									<button
										type="button"
										onClick={searchbtn}
										className="btn_blogs btn btn-secondary"
									>
										Search
									</button>
								</form>
							</div>
							<div className="column">
								<div className="custom-select">
									<select
										value={cateValue}
										onChange={(e) => {
											setcateValue(e.target.value);
										}}
									>
										<option value="">Category</option>
										{brandCat?.map((cat) => (
											<option value={cat.id}>{cat.cat_name}</option>
										))}
									</select>
								</div>
							</div>
							<div className="column">
								<div className="custom-select">
									<select
										value={sortBy == "" ? "" : sortBy}
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
										<option onClick={() => setSortBy("A to Z")}>A to Z</option>
										<option onClick={() => setSortBy("Z to A")}>Z to A</option>
									</select>
									{/* <select>
                                        <option>Sorted By</option>
                                    </select> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="feature-section">
				<div className="container">
					<div className="row grid-3">
						{theytrusted
							?.filter((item) => {
								return searchparam === ""
									? item
									: item.author
											.toLowerCase()
											.includes(searchparam.toLowerCase()) ||
											item.title
												.toLowerCase()
												.includes(searchparam.toLowerCase()) ||
											item.category
												.toLowerCase()
												.includes(searchparam.toLowerCase()) ||
											item.description
												.toLowerCase()
												.includes(searchparam.toLowerCase());
							})
							.map((data, i) => {
								if (i < pagination && i >= pagination - 9) {
									return (
										<div key={data.id} className="grid-col" data-aos="fade-up">
											<div className="column">
												<figure>
													<img src={api + "/" + data?.Image} alt="" />
													<figcaption>
														<div className="top d-flex justify-content-between align-items-center">
															<Link
																to={
																	"/blog-detail/" +
																	data?.id +
																	"/" +
																	data.title
																		?.replace(/[^\w]+/g, "-")
																		.normalize("NFD")
																		.replace(/[\u0300-\u036f]/g, "")
																}
																target="_blank"
															>
																<h5>{data?.category}</h5>
															</Link>
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
																<li>By {data?.author}</li>
																<li>
																	{moment(data?.created_at).format(
																		"MMM DD, YYYY"
																	)}
																</li>
															</ul>
															<div className="text">
																<Link
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
																		{data?.title}
																		<img src="images/arrow-right.png" />
																	</h3>
																</Link>
															</div>
														</div>
													</figcaption>
												</figure>
											</div>
										</div>
									);
								}
							})}
					</div>
				</div>
			</div>
			<div className="pagination" data-aos="fade-up">
				<ul>
					{pagination > 9 ? (
						<li
							className="hover_remove2 selected"
							onClick={(e) => {
								setPagination(pagination - 9);
								// Apply the scroll-to-top function here
								window.scrollTo({
									top: 0,
									behavior: "instant",
								});
							}}
						>
							<a>
								<img src="images/arrow-left.png" title="" alt="" />
								Previous
							</a>
						</li>
					) : (
						""
					)}
					{theytrusted?.length > 0
						? [
								...Array(
									parseInt(
										JSON.stringify(theytrusted.length / 9)
											.substr(
												JSON.stringify(theytrusted.length / 9).lastIndexOf(
													"\\"
												) + 1
											)
											.split(".")[1]
									)
										? parseInt(
												JSON.stringify(theytrusted.length / 9)
													.substr(
														JSON.stringify(theytrusted.length / 9).lastIndexOf(
															"\\"
														) + 1
													)
													.split(".")[0]
										  ) + 1
										: parseInt(
												JSON.stringify(theytrusted.length / 9)
													.substr(
														JSON.stringify(theytrusted.length / 9).lastIndexOf(
															"\\"
														) + 1
													)
													.split(".")[0]
										  )
								),
						  ].map((data, i) => {
								i += 1;
								if (i - 3 < pagination / 9 && i + 2 > pagination / 9) {
									return (
										<li
											key={i}
											className={pagination === i * 9 ? "active" : ""}
											onClick={() => {
												setPagination(i * 9);
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
					{theytrusted?.length > 9 && pagination + 2 <= theytrusted?.length ? (
						<li
							className="hover_remove2 selected"
							onClick={(e) => {
								setPagination(pagination + 9);
								window.scrollTo({
									top: 0,
									behavior: "instant",
								});
							}}
						>
							<a>
								Next <img src="images/arrow-right.png" title="" alt="" />
							</a>
						</li>
					) : (
						""
					)}
				</ul>
			</div>
		</>
	);
}

export default Blog;
