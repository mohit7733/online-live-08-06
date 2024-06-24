// import './style/fontawesome.min.css'import "./style/slick.min.css";
import "./style/reset.css";
import "./style/style.css";
import "./style/stylemain.css";
import "./style/stylenew.css";
import "./style/responsive_new.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/csschanges.css";
import Header from "./pages/header/header";
import Home from "./pages/home";
import Footer from "./pages/header/footer";
import About from "./pages/about";
import Blog from "./pages/blog";
import Blog_detail from "./pages/blog_detail";
import Our_videos from "./pages/our-videos";
import Forgetpassword from "./pages/forgetpassword";
import How_it_work from "./pages/how_it_work";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Theytrustedus from "./pages/theytrustedus";
import Contact from "./pages/contact";
import Login from "./pages/middel/login";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./pages/payment";
import Productview from "./pages/productpages/productview";
import Productdetails from "./pages/productpages/Productdetails";
import ProductBuyer from "./pages/productpages/ProductBuyer";
import Productresearch from "./pages/productpages/Productresearch";
import Productbeforemeeting from "./pages/productpages/Productbeforemeeting";
import Productaftermeeting from "./pages/productpages/Productaftermeeting";
import Pandingmeeting from "./pages/meetings/Pandingmeeting";
import AcceptMeeting from "./pages/meetings/AcceptMeeting";
import Contract from "./pages/productpages/Contract";
import MeetingDone from "./pages/meetings/MeetingDone";
import Add_user from "./pages/dashboard/add_user";
import View_remark from "./pages/middel/view_remark";
import Product_meeting from "./pages/productpages/Product_meeting";
import ProductDetailView from "./pages/productpages/ProductDetailView";
import Privacy_terms from "./pages/privacy_terms";
import Cookies from "./pages/cookies";
import Company_informationNew from "./pages/dashboardPages/newusercompany_info";
import SubscriptionsPage from "./pages/dashboardPages/SubscriptionsPage";
import User_manegment_Both from "./pages/dashboardPages/User_manegment_Both";
import Product_Reseach_Buyer from "./pages/dashboardPages/product_researchBuyer";
import Edit_ProductS from "./pages/dashboardPages/edit_productS";
import Supplier_product_showcase from "./pages/dashboardPages/supplier_product_showcase";
import Alert_Buyer from "./pages/dashboardPages/buyer_alert";
import Favourite_products from "./pages/dashboardPages/buyer_fav_products";
import Supplier_addUser from "./pages/dashboardPages/supplier_addUser";
import Edit_user from "./pages/dashboardPages/edit_user";
import Company_info from "./pages/dashboardPages/company_info";
import Company_info_edit from "./pages/dashboardPages/company_info_edit";
import View_remarkBoth from "./pages/dashboardPages/view_remarkBoth";
import Edit_remarkboth from "./pages/dashboardPages/edit_remarkboth";
import Add_remarkBoth from "./pages/dashboardPages/add_remarkBoth";
import Supplier_pending_me from "./pages/dashboardPages/Supplier_pending_me";
import Supplier_passed_me from "./pages/dashboardPages/Supplier_passed_me";
import Supplier_confirmed_me from "./pages/dashboardPages/Supplier_confirmed_me";
import { ToastContainer } from "react-toastify";
import Add_product from "./pages/dashboardPages/add_new_productS";
import Buyer_company_profile from "./pages/dashboardPages/buyer_company_profile";
import Private_route from "./pages/middel/private_route";
import Create_password from "./pages/middel/createnew_pass";
import Company_profile_Edit from "./pages/dashboardPages/buyer_company_profileEdit";
import MeetingSubscriptionPage from "./pages/dashboardPages/meeting_subscriptionPage";
import Billing from "./pages/dashboardPages/billing";
import Invoicepage from "./pages/dashboardPages/invoicepage";
import NotFound404 from "./pages/notfound/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./pages/base_url";
import warningicon from "./assets/images/warning2.png";

// import Forgot_password from './pages/middel/forgot_password'
function App() {
	const [alertshow, setalertshow] = useState(false);

	useEffect(() => {
		if (
			window.location.pathname != "/company-information"
		) {
			axios
				.get(`${api}/api/company-detail`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((res) => {
					if (res?.data?.data?.length === 0) {
					} else if (
						res?.data?.data[0]?.company_name &&
						(res?.data?.data[0]?.timezone == null ||
							res?.data?.data[0]?.timezone == "null")
					) {
						setalertshow(true);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, []);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
			{alertshow == true ? (
				<div className="alert_box">
					<div className="box_size">
						<img src={warningicon} alt="warning" />
						<br />
						<p>
							Please update your timezone in company information to proceed
							further.
						</p>

						<div style={{ width: "100%" }}>
							<button
								onClick={() => {
									window.location.href = "/company-information";
									setalertshow(false);
								}}
								className="btn btn-block btn-primary"
							>
								Complete Now
							</button>
						</div>
					</div>
				</div>
			) : (
				""
			)}
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about-us" element={<About />} />
					<Route path="/blogs" element={<Blog />} />
					<Route path="/product-buyer" element={<ProductBuyer />} />
					<Route path="/notfound" element={<NotFound404 />} />
					<Route
						path="/add-new-product"
						element={<Private_route element={<Add_product />} />}
					/>
					<Route
						path="/add-new-user"
						element={<Private_route element={<Supplier_addUser />} />}
					/>
					<Route
						path="/add-new-user-edit/:id"
						element={<Private_route element={<Supplier_addUser />} />}
					/>
					<Route path="/contract" element={<Contract />} />
					{/* <Route path='/dashboard' element={<Productbuyer2 />} /> */}
					<Route
						path="/dashboard"
						element={<Private_route element={<Supplier_product_showcase />} />}
					/>

					<Route
						path="/company-Information"
						element={<Private_route element={<Company_info />} />}
					/>

					<Route
						path="/company-Information-fill"
						element={
							<Private_route
								element={<Company_informationNew pageType="new" />}
							/>
						}
					/>
					<Route path="/product-meetings" element={<Product_meeting />} />

					<Route
						path="/product-before-meeting"
						element={<Productbeforemeeting />}
					/>
					<Route
						path="/product-view/:id/:name"
						element={<ProductDetailView pageType="new" />}
					/>
					<Route
						path="/buyer-favourite-product/favourite-list/:id"
						element={
							<Private_route element={<ProductDetailView pageType="new" />} />
						}
					/>
					<Route
						path="/product-after-meeting"
						element={<Productaftermeeting />}
					/>
					<Route
						path="/profile-view/:id"
						element={<Private_route element={<Pandingmeeting />} />}
					/>
					<Route
						path="/buyer-profile/:meetingType/:id"
						element={<Pandingmeeting />}
					/>
					<Route path="/panding-accept" element={<AcceptMeeting />} />
					<Route path="/meeting-done" element={<MeetingDone />} />
					<Route path="/product-research" element={<Productresearch />} />
					<Route path="/product-view" element={<Productview />} />
					<Route
						path="/product-view/:categorysearch"
						element={<Productview />}
					/>
					<Route
						path="/product-view/:categorysearch2/:sub_category"
						element={<Productview />}
					/>
					<Route
						path="/product-details/:id/:name"
						element={<Productdetails />}
					/>
					<Route path="/blog-detail/:id/:title" element={<Blog_detail />} />
					<Route path="/our-videos" element={<Our_videos />} />
					<Route path="/forgot-password" element={<Forgetpassword />} />
					<Route
						path="/create-password/:verify_token"
						element={<Create_password />}
					/>
					<Route path="/how-does-it-work" element={<How_it_work />} />
					<Route path="/they-trusted-us" element={<Theytrustedus />} />
					<Route path="/buyers-at-a-glance" element={<Theytrustedus />} />
					<Route path="/contact-us" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/company-subscription"
						element={<Private_route element={<SubscriptionsPage />} />}
					/>
					{/* <Route path='/forgot-password' element={<Forgot_password />} /> */}
					<Route path="/view-remark" element={<View_remark />} />
					<Route path="/add-user" element={<Add_user />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/payment/discount_id/:id" element={<Payment />} />
					<Route path="/privacy-terms" element={<Privacy_terms />} />
					<Route path="/cookies-policy" element={<Cookies />} />
					<Route
						path="/tester/:id"
						element={<Private_route element={<Invoicepage />} />}
					/>

					{/* new routes for user mangment */}
					<Route
						path="/alert-notefication/:usertype"
						element={<Alert_Buyer />}
					/>
					<Route
						exact
						path="/buyer-company-profile"
						element={<Private_route element={<Buyer_company_profile />} />}
					/>
					<Route
						exact
						path="/buyer-company-profile-edit"
						element={<Private_route element={<Company_profile_Edit />} />}
					/>
					<Route
						path="/buyer-favourite-product"
						element={<Private_route element={<Favourite_products />} />}
					/>
					<Route
						path="/dashboard/user-management/:usertype"
						element={<Private_route element={<User_manegment_Both />} />}
					/>
					<Route
						path="/supplier-product-showcase/:filter"
						element={<Private_route element={<Supplier_product_showcase />} />}
					/>
					<Route
						path="/edit-product/:id"
						element={<Private_route element={<Edit_ProductS />} />}
					/>

					<Route
						path="/product-research/:id"
						element={<Product_Reseach_Buyer />}
					/>
					<Route
						path="/meeting-subscription"
						element={<MeetingSubscriptionPage />}
					/>
					<Route
						path="/dashboard"
						element={<Private_route element={<Supplier_product_showcase />} />}
					/>
					<Route path="/edit-user/:id" element={<Edit_user />} />

					<Route
						path="/dashboard/company-Information"
						element={<Private_route element={<Company_info />} />}
					/>
					<Route
						path="/dashboard/company-Information-edit"
						element={<Private_route element={<Company_info_edit />} />}
					/>

					<Route path="/add-remark/:usertype" element={<Add_remarkBoth />} />
					{/* <Route path='/forgot-password' element={<Forgot_password />} /> */}
					<Route
						path="/view-remark/:id/:usertype"
						element={<View_remarkBoth />}
					/>
					<Route
						path="/edit-remark/:id/:usertype"
						element={<Edit_remarkboth />}
					/>
					<Route
						path="/pending-meeting/:usertype"
						element={<Private_route element={<Supplier_pending_me />} />}
					/>
					<Route
						path="/billing"
						element={<Private_route element={<Billing />} />}
					/>
					<Route
						path="/billing/invoice/:id"
						element={<Private_route element={<Invoicepage />} />}
					/>
					<Route
						path="/passed-meeting/:usertype"
						element={<Supplier_passed_me />}
					/>
					<Route
						path="/confirmed-meeting/:usertype"
						element={<Supplier_confirmed_me />}
					/>
					<Route
						path="/requested-meeting/:usertype"
						element={<Supplier_confirmed_me />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
