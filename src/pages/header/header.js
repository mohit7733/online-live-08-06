import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usericon from "../../assets/images/icons8.png";
import { api } from "../base_url";
import axios from "axios";
function Header() {
	const navigate = useNavigate();
	const [show, setshow] = useState(false);
	const [showtoggle, setshowtoggle] = useState(false);
	const [showmenu, setshowmenu] = useState(false);
	const [showsub, setshowsub] = useState(false);
	const [showmenu2, setshowmenu2] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token") != null) {
			try {
				var myHeaders = new Headers();
				myHeaders.append(
					"Authorization",
					"Bearer " + localStorage.getItem("token")
				);

				axios
					.post(
						`${api}/api/check-api-token?token=${localStorage.getItem("token")}`,
						{},
						{
							headers: {
								Authorization: "Bearer " + localStorage.getItem("token"),
							},
						}
					)
					.then((res) => {
						if (res?.data?.message === "User Does Not Exist") {
							localStorage.clear();
							navigate("/login");
						} else if (res?.data?.message == "User Found") {
							localStorage.setItem("user_type", res?.data?.data?.user_type);
							localStorage.setItem("username", res?.data?.data?.username);
							localStorage.setItem("user_id", res?.data?.data?.user_id);
							localStorage.setItem("profile_pic", res?.data?.data?.profile_pic);
							localStorage.setItem("manage_type", res?.data?.data?.manage_type);
						}
					})
					.catch((err) => console.log(err, "error"));
			} catch (error) {}
		}
	}, []);

	const outsideClick = () => {
		setshow(false);
		setshowtoggle(false);
	};
	const profile_img =
		localStorage.getItem("profile_pic") == "null" ||
		localStorage.getItem("profile_pic") == "assets/images/users/default.png"
			? usericon
			: localStorage.getItem("profile_pic");
	const { pathname } = useLocation();

	useEffect(() => {
		setshow(false);
		if (
			window.location.pathname == "/product-details" ||
			window.location.pathname == "/product-details/"
		) {
			navigate("/product-view");
		}
	}, [pathname]);

	return (
		<>
			<div className="header">
				<div className="container" style={{maxWidth: '1250px'}}>
					<div
						className="outsideClick"
						onClick={() => outsideClick()}
						style={
							show == false && showtoggle == false ? { display: "none" } : {}
						}
					></div>
					<div className="row justify-content-between align-items-center">
						<div className="left d-flex align-items-center">
							<div className="logo">
								<Link to="/">
									<img
										src={window.location.origin + "/images/logo.svg"}
										title="Beauty Meetings"
										alt=""
									/>
								</Link>
							</div>
							<div
								className="nav"
								style={showtoggle == true ? { display: "block" } : {}}
							>
								<ul>
									<li onClick={() => showtoggle && setshowtoggle(false)}>
										<Link to="/how-does-it-work">How it works</Link>
									</li>
									<li onClick={() => showtoggle && setshowtoggle(false)}>
										<a href="https://events.beauty-forum.fr/BeautyMeetingsParis" target="_blank">
											Events
										</a>
									</li>
									<li onClick={() => showtoggle && setshowtoggle(false)}>
										<Link to="/buyers-at-a-glance">Buyers at a glance</Link>
									</li>
									<li onClick={() => {showtoggle && setshowtoggle(false); window.location.reload();}}>
										<Link to="/product-view">Showcased Products</Link>
									</li>
									<li className="dropdown2 dropdown">
										<Link to="#">
											Content Library{" "}
											<span>
												<i className="fa fa-angle-down" aria-hidden="true"></i>
											</span>
										</Link>
										<ul
											className="dropdown-menu"
											style={showsub == true ? { display: "block" } : {}}
										>
											<li>
												<Link to="/blogs">Blog</Link>
											</li>
											<li onClick={() => showtoggle && setshowtoggle(false)}>
												<Link to="/our-videos">Videos</Link>
											</li>
										</ul>
										<span
											className={
												showsub == true
													? "drop-button  active  "
													: "drop-button"
											}
											onClick={() => setshowsub(!showsub)}
										></span>
									</li>
									{/* <li>
                    <Link to="#">Events</Link>
                  </li> */}
									<li onClick={() => showtoggle && setshowtoggle(false)}>
										<Link to="/contact-us">Contact Us</Link>
									</li>
								</ul>
							</div>
						</div>
						{localStorage.getItem("username") != "" &&
						localStorage.getItem("username") != null &&
						localStorage.getItem("token") != "" ? (
							<>
								<div className="right d-flex product_buyer_wrap ">
									<a
										className="btn btn-primary row"
										onClick={() => setshow(!show)}
									>
										<figure style={{ lineHeight: 0 }}>
											<img className="user_oc" src={profile_img} alt="sdfsa" />
										</figure>
										{localStorage.getItem("username").length > 5 ? (
											<>{localStorage.getItem("username").slice(0, 5)}...</>
										) : (
											localStorage.getItem("username")
										)}
									</a>

									<div
										id="toggle"
										className={showtoggle == true ? "on" : ""}
										onClick={() => setshowtoggle(!showtoggle)}
									>
										<div className="one"></div>
										<div className="two"></div>
										<div className="three"></div>
									</div>
								</div>
							</>
						) : (
							<div className="right d-flex">
								<a href="/login" className="btn btn-primary">
									Sign in
								</a>
								<div
									id="toggle"
									className={showtoggle == true ? "on" : ""}
									onClick={() => setshowtoggle(!showtoggle)}
								>
									<div className="one"></div>
									<div className="two"></div>
									<div className="three"></div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div
				className="popup_box"
				style={show == true ? { display: "block", top: "68px" } : {}}
			>
				<div className="img-content-box row">
					<div className="img-box">
						<img
							style={{ height: "45px", width: "45px" }}
							className="user_oc"
							src={profile_img}
							alt="logo"
						/>
					</div>
					<div className="content-box">
						<h6> {localStorage.getItem("username")}</h6>
						<span>
							{localStorage.getItem("user_type")}{" "}
							{localStorage.getItem("manage_type")?.toLowerCase() ==
								"superadmin" && "(Admin)"}{" "}
							{localStorage.getItem("manage_type")?.toLowerCase() ==
								"shareduser" && "(Standard User)"}
						</span>
					</div>
				</div>
				<div className="nav">
					<li className="profile" style={{ padding: "12px 20px" }}>
						<a onClick={() => setshowmenu2(!showmenu2)}>
							My Profile
							<i
								style={
									showmenu2 == false ? { transform: "rotate(180deg)" } : {}
								}
								className="fa fa-angle-up"
								aria-hidden="true"
							></i>
						</a>
					</li>
					<ul
						className="sub__menu profile_sub"
						style={showmenu2 == false ? { display: "none" } : {}}
					>
						{localStorage.getItem("user_type") &&
						(localStorage.getItem("user_type").toLowerCase() === "supplier" ||
							localStorage.getItem("user_type").toLowerCase() === "both") ? (
							<li>
								<a href="/dashboard">My Dashboard</a>
							</li>
						) : (
							<li>
								<a href="/buyer-company-profile">My Dashboard</a>
							</li>
						)}

						<li>
							<a href="/company-Information">Company Information</a>
						</li>
                       {localStorage.getItem("user_type") &&
						(localStorage.getItem("user_type").toLowerCase() === "buyer" ||
							localStorage.getItem("user_type").toLowerCase() === "both")?(<li>
								<a href="/buyer-company-profile">My Company Profile</a>
							</li>):"" }
						
						<li>
							<a
								// style={{ color: "#999999" }}
								href={
									localStorage.getItem("user_type") != null
										? `/dashboard/user-management/${localStorage.getItem(
												"user_type"
										  )}`
										: ""
								}
							>
								User Management{" "}
							</a>
						</li>
						<li style={localStorage.getItem("manage_type")?.toLowerCase() ==
								"shareduser"?{display:"none"}:{display:"block"}
						}
						 className="information">
							<a onClick={() => setshowmenu(!showmenu)}>
								<span>Administrative Informations</span>

								<i
									style={
										showmenu == false ? { transform: "rotate(180deg)" } : {}
									}
									className="fa fa-angle-up"
									aria-hidden="true"
								></i>
							</a>
						</li>
						<ul
							className="sub__menu information_sub"
							style={showmenu == false ? { display: "none" } : {}}
						>
							<li>
								<a href="/contract">Contract Info </a>
							</li>
							{localStorage.getItem("user_type")?.toLowerCase() == "buyer" ? (
								""
							) : (
								<>
									<li>
										<a href="/billing">Billing</a>
									</li>
									<li style={{ display: "none" }}>
										<a href="#">Credit Card Info</a>
									</li>
								</>
							)}
						</ul>
					</ul>
					<li
						className="logout"
						onClick={() => {
							setshow(false);
							navigate("/login");
							localStorage.clear();
						}}
						style={{ padding: "12px 20px" }}
					>
						<a>
							Logout<i className="fa fa-sign-out" aria-hidden="true"></i>
						</a>
					</li>
					<ul className="sub__menu">
						<li>
							{/* <a> Privacy and Terms</a> */}
							<a href="/privacy-terms"> Privacy and Terms</a>
						</li>
						<li>
							{/* <a>Cookies Preferences</a> */}

							<a href="/cookies-policy">Cookies Preferences</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
