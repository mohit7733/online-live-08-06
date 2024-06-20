import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import Select from "react-select";
import moment from "moment";
import InputWithButton from "../../components/input-with-button/input-with-button";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import Left_menu2 from "./Left_menu2";
import { useNavigate, useParams } from "react-router-dom";
import pdficon from "../../assets/images/pdf_icon.png";
import trash from "../../assets/images/trash-2.svg";
import axios from "axios";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const options2 = [];
const url = RegExp(
	"^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"
);

function Company_profile_Edit(props) {
	const [image, setImage] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
	const [sidebar, setsidebar] = useState(true);
	const [psname, setpsname] = useState("");
	const [Addstyel, setAddstyel] = useState(false);
	const [Addstyel2, setAddstyel2] = useState(false);
	const [checkoption, setcheckoption] = useState(false);
	const [selectOptions, setSelectOptions] = useState([]);
	const [answerArray, setanswerArray] = useState([]);
	const [optionpush1, setoptionpush1] = useState(false);
	const [validlink, setvalidLink] = useState(false);
	const [otherValues, setOtherValues] = useState([]);

	const sectors_array = [];
	selectOptions?.map((item) => {
		if (item?.id == sectors_array?.map((item) => item)) {
		} else {
			sectors_array?.push(item?.value);
		}
		// sectors_array?.push(item?.value);
	});

	const [contact, setcontact] = useState({
		p_name: "",
		ps_name: "",
		category: "",
		s_category: "",
		country: "",
		c_name: "",
		Description: "",
		product_file3: [],
		product_file4: [],
		thumb_index: "",
		Policy: "",
		Quantity: "",
		sector_name: "",
		Creation: "",
		price_range: "",
		questions: [],
	});

	const [question, setquestion] = useState([]);
	const [emptyans_id, setemptyans_id] = useState([]);

	useEffect(() => {
		setvalidLink(matchYoutubeUrl());
	}, [contact.yt_link]);

	useEffect(() => {
		if (question?.length > 0) {
			get_companyinfo();
		}
	}, [question]);

	function matchYoutubeUrl(url) {
		let p =
			/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		if (contact.yt_link?.match(p)) {
			return true;
		}
		return false;
	}

	const question_data = () => {
		let myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		let requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/v1/company-profile-questions", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setquestion(result.data);
				result.data?.map((item) => {
					if (item?.mandatory != 0) {
						emptyans_id.push(item?.id);
					}
				});
			})
			.catch((error) => console.log("error", error));
	};

	const [errorfield, seterrorfield] = useState({
		p_name: "",
		ps_name: "",
		category: "",
		s_category: "",
		country: "",
		c_name: "",
		Description: "",
		product_file3: "",
		thumb_index: "",
		Policy: "",
		Quantity: "",
		sector_name: "",
		Creation: "",
	});
	const logins_field2 = (e) => {
		switch (e.target.name) {
			case "p_name":
				errorfield.p_name = e.target.value == "" ? "required" : "";
				break;
			case "ps_name":
				errorfield.ps_name = e.target.value == "" ? "required" : "";
				break;
			case "category":
				errorfield.category = e.target.value == "" ? "required" : "";
				break;
			case "s_category":
				errorfield.s_category = e.target.value == "" ? "required" : "";
				break;
			case "country":
				errorfield.country = e.target.value == "" ? "required" : "";
				break;
			case "c_name":
				errorfield.c_name = e.target.value == "" ? "required" : "";
				break;
			case "Description":
				errorfield.Description = e.target.value == "" ? "required" : "";
				break;
			case "Policy":
				errorfield.Policy = e.target.value == "" ? "required" : "";
				break;
			case "Quantity":
				errorfield.Quantity = e.target.value == "" ? "required" : "";
				break;
			case "Guarantee":
				errorfield.Guarantee = e.target.value == "" ? "required" : "";
				break;
			case "Creation":
				errorfield.Creation = e.target.value == "" ? "required" : "";
				break;
			case "thumb_index":
				errorfield.thumb_index = e.target.value == "" ? "required" : "";
				break;
			case "product_file3":
				errorfield.product_file3 =
					contact.product_file3?.length == 0 ? "required" : "";
				break;
			default:
				break;
		}
		seterrorfield({ ...errorfield });
		setcontact({ ...contact, [e.target.name]: e.target.value });
	};
	const logins_field = (e) => {
		switch (e) {
			case "p_name":
				errorfield.p_name = contact.p_name == "" ? "required" : "";
				break;
			case "ps_name":
				errorfield.ps_name = contact.ps_name == "" ? "required" : "";
				break;
			case "category":
				errorfield.category = contact.category == "" ? "required" : "";
				break;
			case "s_category":
				errorfield.s_category = contact.s_category == "" ? "required" : "";
				break;
			case "country":
				errorfield.country = contact.country == "" ? "required" : "";
				break;
			case "c_name":
				errorfield.c_name = contact.c_name == "" ? "required" : "";
				break;
			case "Description":
				errorfield.Description = contact.Description == "" ? "required" : "";
				break;
			case "product_file3":
				errorfield.product_file3 =
					contact.product_file3?.length == 0 ? "required" : "";
				break;
			case "Policy":
				errorfield.Policy = contact.Policy == "" ? "required" : "";
				break;
			case "Quantity":
				errorfield.Quantity = contact.Quantity == "" ? "required" : "";
				break;
			case "Guarantee":
				errorfield.Guarantee = contact.Guarantee == "" ? "required" : "";
				break;
			case "Creation":
				errorfield.Creation = contact.Creation == "" ? "required" : "";
				break;
			default:
				break;
		}
		seterrorfield({ ...errorfield });
		setcontact({ ...contact });
	};

	const [editData, setEditData] = useState([]);
	const [optionsedit, setoptions2] = useState([]);

	const handlequestion2 = (e, id, type, pqId) => {
		if (type?.toLowerCase() == "checkbox") {
			if (e.target.checked) {
				if (!optionsedit.find((item) => item.id === id)) {
					const newOption = { id: id, checkbox: [e.target.value] };
					setoptions2([...optionsedit, newOption]);
				  } else {
					setoptions2((prevOptions) =>
					  prevOptions.map((option) =>
						option.id === id &&
						!option.checkbox?.includes(e.target.value)
						  ? {
							  ...option,
							  checkbox: [...option.checkbox, e.target.value],
							}
						  : option
					  )
					);
				  }
			} else {
				// Unchecking the checkbox, set the corresponding option's value to null
				setoptions2((prevOptions) =>
					prevOptions.map((option) =>
						option.id === id
							? {
									...option,
									checkbox: option.checkbox.filter(
										(value) => value !== e.target.value
									),
							  }
							: option
					)
				);

				let a = otherValues?.filter((b) => b?.id != id);
				setOtherValues(a);
			}
			setoptions2((prevOptionsEdit) =>
            (prevOptionsEdit || []).filter((item) => item?.checkbox?.length)
        );
		}
	};


	const get_companyinfo = async (ignore_thumb_index, thumb_index) => {
		await axios
			.get(api + "/api/company-profile", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => {
				if (res?.data?.success == true) {
					setTimeout(() => {
						let obj = res.data?.data;
						if (question?.length > obj.questions?.length) {
							let ques = question
								?.filter(
									(e) =>
										!obj.questions.some((b) => b?.company_question_id == e?.id)
								)
								?.map((c) => {
									let obj = { ...c };
									if (c.type == "Checkbox" || c.type == "Objective") {
										obj.objects = JSON.parse(c.objects);
										return obj;
									} else if (c.type == "Subjective" || c.type == "Textarea") {
										obj.objects = null;
										return obj;
									}
									return c;
								});
							obj.questions = [...obj.questions, ...ques];
						}
						editData.questions = obj.questions;
						setEditData(obj);
						contact.p_name = res?.data?.data.company?.company_name;
						contact.ps_name = res?.data?.data.company?.company_short_name;
						contact.country = res?.data?.data.company?.country;
						contact.Description = res?.data?.data.company?.company_dec;
						if (ignore_thumb_index != true) {
							contact.thumb_index =
								res?.data?.data.company?.thumb_index != null &&
								res?.data?.data.company?.thumb_index != "null"
									? parseInt(res?.data?.data.company?.thumb_index)
									: 1;
						} else {
							contact.thumb_index = thumb_index;
						}
						if (
							/^[\],:{}\s]*$/.test(
								res?.data?.data.company?.sector
									?.replace(/\\["\\\/bfnrtu]/g, "@")
									?.replace(
										/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
										"]"
									)
									?.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
							)
						) {
							const arrayof = JSON.parse(res?.data?.data.company?.sector);

							if (optionpush1 == false) {
								arrayof.map((item) => {
									if (arrayof.length > selectOptions.length) {
										selectOptions.push({ value: item, label: item });
									}
								});
							}
						}

						contact.Creation = res?.data?.data.company?.company_short_name;

						if (contact?.product_file3?.length == 0) {
							contact.product_file3 = res.data?.data?.media_files?.filter(
								(e) => e?.media_type == "image"
							);
						}

						contact.product_file4 = res.data?.data?.media_files?.filter(
							(e) => e?.media_type == "doc"
						);
						contact.questions = res?.data?.data.questions;
						contact.yt_link =
							res?.data?.data.company?.youtube_link != null
								? res?.data?.data.company?.youtube_link
								: "";
						if (otherValues?.length == 0 && optionsedit?.length == 0) {
							let od = [];
							let oe = [];
							res?.data?.data.questions?.map((item) => {
								if (item.type?.toLowerCase() == "checkbox") {
									if (
										/^[\],:{}\s]*$/.test(
											item?.answer
												?.replace(/\\["\\\/bfnrtu]/g, "@")
												?.replace(
													/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
													"]"
												)
												?.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
										)
									) {
										const ans22 = JSON.parse(item?.answer);
										if (
											ans22?.filter((e) => e?.includes("Other:"))?.length > 0
										) {
											let v = ans22
												?.filter?.((e) => e?.includes("Other:"))[0]
												?.slice(7);
											od?.push({ id: item?.id, value: v });
											let v1 = [
												...ans22?.filter?.((e) => !e?.includes("Other:")),
												"Other",
											];
											oe?.push({
												id: item.id,
												checkbox: v1,
											});
										} else {
											oe?.push({
												id: item.id,
												checkbox: ans22,
											});
										}
									}
								}
							});
							setoptions2(oe);
							setOtherValues(od);

						}
					}, 50);

					setTimeout(() => {
						setcontact({ ...contact });
						setoptionpush1(true);
					}, 100);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const [submitStatus, setsubmitStatus] = useState(false);
	const edit_product = () => {
		setsubmitStatus(true)
		let myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		let formdata = new FormData();
		formdata.append("company_name", contact.p_name);
		formdata.append("company_short_name", contact.ps_name);
		formdata.append("company_dec", contact.Description);
		formdata.append("country", contact.country);
		formdata.append("sector", JSON.stringify(sectors_array));
		formdata.append("youtube_link", contact.yt_link);
		formdata.append("id", editData?.company?.id);
		formdata.append("thumb_index", contact?.thumb_index);

		let a = optionsedit?.filter(
			(a) =>
				a?.checkbox?.includes("Other") &&
				otherValues?.filter((b) => b?.id == a?.id)?.length == 0
		);

		if (a?.length > 0) {
			setsubmitStatus(false)
			toast.error("Please mention other option");
			// window.scrollTo(0, 0);
			return;
		}
		answerArray?.map((question, index) => {
			if (
				optionsedit?.filter((e) => e?.id == question?.questionId)?.length > 0
			) {
				let ans = [];
				if (
					otherValues?.filter((e) => e?.id == question?.questionId)?.length > 0
				) {
					optionsedit
						?.filter((e) => e?.id == question?.questionId)
						?.map((e) => {
							e?.checkbox
								?.filter((a) => a != "Other")
								?.map((b) => {
									ans.push(b);
								});
						});

						let a = otherValues
							?.filter((e) => e?.id == question?.questionId)
							?.map((e) => `Other: ${e?.value}`);

						if(a?.length > 0) {
							ans.push(a[0])
						}

					formdata.append(
						`company_question[${index}][id]`,
						question?.questionPqId == undefined ? null : question?.questionId
					);
					formdata.append(
						`company_question[${index}][answer]`,
						JSON.stringify(ans)
					);
					formdata.append(
						`company_question[${index}][pqid]`,
						question?.questionPqId == undefined
							? question?.questionId
							: question?.questionPqId
					);
				} else {
					formdata.append(
						`company_question[${index}][id]`,
						question?.questionPqId == undefined ? null : question?.questionId
					);
					formdata.append(
						`company_question[${index}][answer]`,
						JSON.stringify(
							optionsedit
								?.filter((e) => e?.id == question?.questionId)
								?.map((e) => e?.checkbox)[0]
						)
					);
					formdata.append(
						`company_question[${index}][pqid]`,
						question?.questionPqId == undefined
							? question?.questionId
							: question?.questionPqId
					);
				}
			} else {
				formdata.append(
					`company_question[${index}][id]`,
					question?.questionPqId == undefined ? null : question?.questionId
				);
				formdata.append(`company_question[${index}][answer]`, question?.answer);
				formdata.append(
					`company_question[${index}][pqid]`,
					question?.questionPqId == undefined
						? question?.questionId
						: question?.questionPqId
				);
			}

			// }
		});

		contact.product_file3.map((data) => {
			if (data?.media_type != "image") {
				formdata.append("documents[]", data);
			}
		});

		contact.product_file4.map((data) => {
			if (data?.media_type != "doc") {
				formdata.append("documents[]", data);
			}
		});

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		};

		let newQuestions = editData?.questions?.filter(
			(item) =>
				item?.mandatory === 0 &&
				(item?.answer == undefined ||
					item?.answer === "" ||
					item?.answer === null)
		);
		if (newQuestions?.length > 0) {
			let notAnswered = newQuestions?.filter(
				(a) => !answerArray?.some((b) => b?.questionId == a?.id)
			);
			console.log(notAnswered)
			if (notAnswered?.length > 0) {
				setsubmitStatus(false)
				toast.error("Please Fill required Answer!");
				window.scrollTo(0, 0);
				return;
			}
		}

		if (
			optionsedit.some((checkbox) => checkbox?.checkbox?.length === 0) ||
			answerArray?.filter(
				(item) =>
					item?.mandatory === 0 &&
					(item?.answer === "" || item?.answer === null)
			)?.length > 0
		) {
			console.log(optionsedit,answerArray)
			setsubmitStatus(false)
			toast.error("Please Fill required answer! 2");
		} else {
			// console.log(optionsedit,answerArray)
			// setsubmitStatus(false)
			// return;
			fetch(api + "/api/edit-company-profile", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					if (result.success == true) {
						setsubmitStatus(false)
						toast.success("Company profile updated successful!");
						setTimeout(() => {
							navigate("/buyer-company-profile");
							// window.location.reload();
						}, 2000);
						setImage(result.message);
					}
					if (result?.success == false) {
						setsubmitStatus(false)
						toast.error("Please fill all required fields !");
						window.scrollTo(0, 0);
						setTimeout(() => {
							setImage("");
						}, 5000);
					}
				})
				.catch((error) => {
					setsubmitStatus(false)
					toast.error("Please Fill all required answers !");
					console.log("error", error);
				});
		}
	};

	const imagelimt = contact?.product_file3?.length;

	const onImageChange = (event) => {
		// if (event.target.files && event.target.files[0]) {
		//   if (imagelimt2 <= 5) {
		//     if (event.target.files[0].size < 838000) {
		//       if (event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('\\') + 1).split('.')[1] != "jfif") {
		//         contact.product_file.push(event.target.files[0]);
		//       } else {
		//         toast.error("This is not supported!");
		//       }

		//     } else {
		//       toast.error("File size must not be more than 800 kB.");
		//     }

		//     setTimeout(() => {
		//       setcontact({ ...contact });
		//     }, 400);
		//   }
		// }
		if (event.target.files && event.target.files[0]) {
			if (
				contact?.product_file3?.length <= 5 &&
				event.target.files[0].type.split("/")[0] === "image"
			) {
				if (event.target.files[0].size < 838000) {
					if (
						event.target.files[0].name
							.substr(event.target.files[0].name.lastIndexOf("\\") + 1)
							.split(".")[1] != "jfif"
					) {
						// contact.product_file.push(event.target.files[0]);
						contact.product_file3.push(event.target.files[0]);
						if (errorfield?.product_file3 != "") {
							seterrorfield({ ...errorfield, product_file3: "" });
						}
					} else {
						toast.error("This is not supported!");
					}
				} else {
					toast.error("File size must not be more than 800 kB.");
				}
				setTimeout(() => {
					setcontact({ ...contact });
				}, 400);
			} else if (
				contact?.product_file4?.length < 1 &&
				event.target.files[0].type.split("/")[0] === "application"
			) {
				contact.product_file4.push(event.target.files[0]);
				setTimeout(() => {
					setcontact({ ...contact });
				}, 400);
			}
		}
	};
	const deletedata = (a) => {
		let i = contact.thumb_index;
		if (a == 0 && contact?.product_file3?.length > a) {
			i = i - 1;
		} else if (i == a && contact?.product_file3?.length > a && i != 0) {
			i = a - 1;
		} else if (i == a && contact?.product_file3?.length > a) {
		} else if (i > a && i != 0) {
			i = i - 1;
		}
		let x = contact?.product_file3;
		x.splice(a, 1);
		setcontact({ ...contact, product_file3: x, thumb_index: i });
		return i;
	};

	const check_data = [
		{ name: "p_name" },
		{ name: "ps_name" },
		{ name: "category" },
		{ name: "s_category" },
		{ name: "country" },
		{ name: "c_name" },
		{ name: "Description" },
		{ name: "sector_name" },
		{ name: "Policy" },
		{ name: "Quantity" },
		{ name: "Guarantee" },
		{ name: "Creation" },
		{ name: "product_file3" },
	];

	const delete_image = (id, index, isDoc) => {
		if (isDoc) {
			setcontact({ ...contact, product_file4: [] });
		}
		let myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		let requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(
			api + `/api/v1/compnay-profile-image-delete?image_id=${id}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result?.status == "success") {
					let thumb_index = contact?.thumb_index;
					if (index != undefined) {
						thumb_index = deletedata(index);
					}
					get_companyinfo(true, thumb_index);
				}
			})
			.catch((error) => console.log("error", error));
	};

	const handlequestion = (e, id, type, pq_id, mandatory) => {
		if (answerArray.filter((data) => data.questionId == id)[0]) {
			let {checked}=e.target
			if(checked && mandatory==0){
				answerArray.filter((data) => data.questionId == id)[0].answer = e.target.value
			}
			else if(checked==false && mandatory==0 && e.target.type=="checkbox"){
				answerArray.filter((data) => data.questionId == id)[0].answer = ""
			}
			else if(checked ==true || checked ==false && mandatory!=0){
				answerArray.filter((data) => data.questionId == id)[0].answer = e.target.value
			} 
			else{
				answerArray.filter((data) => data.questionId == id)[0].answer = e.target.value
			}
			console.log(answerArray)
	}else {
		let {checked}=e.target
		if(checked==false && optionsedit.filter((data) => data.id ==id)[0].checkbox.length==1){
			// setanswerArray((prev)=>
			// ({...prev,answer:e.target.value,questionId:id, mandatory:mandatory,questionPqId:pq_id}))
			answerArray.push({
					answer: "",
					questionId: id,
					questionPqId: pq_id,
					mandatory: mandatory,
				});	
			}
			else{
				answerArray.push({
					answer: e.target.value,
					questionId: id,
					questionPqId: pq_id,
					mandatory: mandatory,
				});	
			}
			// answerArray.push({
			// 	answer: e.target.value,
			// 	questionId: id,
			// 	questionPqId: pq_id,
			// 	mandatory: mandatory,
			// });
			console.log(answerArray)
		}
	};

	const [givenoptions, setgivenoptions] = useState();
	const companySectoroptions = [];
	givenoptions?.map((item) => {
		companySectoroptions.push({
			value: item?.category_name,
			label: item?.category_name,
		});
	});
	useEffect(() => {
		axios
			.get(api + "/api/sector-category")
			.then((response) => {
				const short_list = response.data.data;
				setgivenoptions(short_list);
			})
			.catch((error) => {
				console.log(error);
			});
		question_data();
	}, []);

	useEffect(() => {
		setpsname(editData?.product_name);
	}, []);

	const controlStyle = {
		control: (provided) => ({
			...provided,
			height: "48px",
			borderRadius: "33px",
			"&:hover": {
				border: "solid 1px #D9D9D9",
				boxShadow: "none",
				borderRadius: "33px",
			},
			"&:focus": {
				border: "solid 1px #D9D9D9",
				boxShadow: "none",
				borderRadius: "33px",
			},
			"&:acitve": {
				border: "solid 1px #D9D9D9",
				boxShadow: "none",
				borderRadius: "33px",
			},
		}),
	};
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
			<div className="product_research_wrap2 product_research_wrap add_new_product Meeting_wrap profile_popup">
				<div className="main">
					<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
					<div className={sidebar ? "active router-body" : "router-body"}>
						<div className="breadcrumbs" data-aos="fade-down">
							<ul>
								<li>
									<a href="/dashboard">Dashboard </a>
								</li>
								<li>
									<a href="/dashboard">Buyer</a>
								</li>
								<li>
									<a
										href="#"
										onClick={() => {
											navigate("/buyer-company-profile");
										}}
									>
										<span>My Company Profile</span>
									</a>
								</li>
								<li>
									<a href="#">
										<span>Edit Company Profile</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="product_prfile">
							<h1>Edit Company Profile</h1>
							<div className="row">
								<div className="col_left">
									<div className="panel">
										<div className="form-group full">
											<input
												type="text"
												placeholder="Company Full Name *"
												className="form-control"
												name="p_name"
												value={contact?.p_name}
												onChange={(e) => logins_field2(e)}
												style={
													errorfield?.p_name == ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group full">
											<input
												type="text"
												placeholder="Company Short Name *"
												className="form-control"
												name="ps_name"
												value={contact?.ps_name}
												onChange={(e) => logins_field2(e)}
												style={
													errorfield?.ps_name == ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											/>
										</div>
										<div className="form-group full">
											<div
												className="custom-select"
												style={
													errorfield?.country == ""
														? {}
														: { borderBottom: "1px solid red" }
												}
											>
												<select
													name="country"
													value={contact?.country}
													onChange={(e) => logins_field2(e)}
												>
													<option>Country *</option>
													{country.data.map((data, i) => {
														return (
															<option key={i} value={data.country}>
																{data.country}
															</option>
														);
													})}
													{/* <option>india</option> */}
												</select>
											</div>
										</div>

										<div
											className="form-group full"
											style={
												selectOptions.length == 0
													? {
															borderBottom: "1px solid red",
															borderRadius: "43px",
													  }
													: {}
											}
										>
											{/* <div className="Company_sector form-group "> */}
											<Select
												isObject={false}
												options={companySectoroptions}
												defaultValue={selectOptions}
												isMulti
												className="Company_sector2 basic-multi-select"
												classNamePrefix="select"
												onChange={(e) => setSelectOptions(e)}
												placeholder="Company Sector *"
												styles={controlStyle}
												//  value={companySectoroptions}
											/>
											{/* </div> */}
										</div>

										<textarea
											className="form-control"
											placeholder="Company Profile Description *"
											name="Description"
											maxLength={250}
											value={contact.Description}
											onChange={(e) => logins_field2(e)}
											style={
												errorfield?.Description == ""
													? {}
													: { borderBottom: "1px solid red" }
											}
										></textarea>
										<p className="limit">
											{contact.Description?.length + "/" + "250"}
										</p>
									</div>
									{editData?.questions
										?.sort(
											(a, b) => a.company_question_id - b.company_question_id
										)
										?.map((item, index) => {
											return (
												<div className="radio_section" key={index}>
													<p>
														Q {index + 1}.{" " + item?.question}
														<span style={{ color: "red", fontSize: "1.2em" }}>
															{item?.mandatory === null ? "" : "*"}
														</span>
													</p>
													<div className="radio_btn">
														{item?.type == "Subjective" ||
														item?.type?.toLowerCase() === "textarea" ? (
															<textarea
																className="form-control"
																name="Policy"
																placeholder={"Your Answer"}
																defaultValue={
																	contact?.questions?.filter(
																		(data) =>
																			data?.company_question_id ==
																			item?.company_question_id
																	)[0]?.answer == "null"
																		? ""
																		: contact?.questions?.filter(
																				(data) =>
																					data?.company_question_id ==
																					item?.company_question_id
																		  )[0]?.answer
																}
																onChange={(e) => {
																	handlequestion(
																		e,
																		item.id,
																		item?.type,
																		item?.company_question_id,
																		item?.mandatory
																	);
																	if (
																		answerArray?.filter(
																			(data) => data?.questionId == item?.id
																		)[0]?.answer == ""
																	) {
																		setAddstyel2(true);
																	} else {
																		setAddstyel2(false);
																	}
																}}
																style={
																	answerArray?.filter(
																		(data) => data?.questionId == item?.id
																	)[0]?.answer === "" &&
																	item?.mandatory != null &&
																	Addstyel2 == true
																		? { borderBottom: "1px solid red" }
																		: {}
																}
															></textarea>
														) : (
															""
														)}
														{item?.type?.toLowerCase() === "select" ? (
															<>
																<div
																	className="custom-select"
																	style={
																		answerArray?.filter(
																			(data) => data?.questionId == item?.id
																		)[0]?.answer === "" &&
																		item?.mandatory != null &&
																		Addstyel2 == true
																			? { borderBottom: "1px solid red" }
																			: {}
																	}
																>
																	<select
																		defaultValue={
																			contact?.questions?.filter(
																				(data) =>
																					data?.company_question_id ==
																					item?.company_question_id
																			)[0]?.answer
																		}
																		onChange={(e) => {
																			handlequestion(
																				e,
																				item.id,
																				item?.type,
																				item?.company_question_id,
																				item?.mandatory
																			);
																		}}
																		className=""
																	>
																		<option disabled={true}>Select</option>
																		{item?.objects?.map((option) => {
																			return (
																				<option value={option} key={index}>
																					{option}
																				</option>
																			);
																		})}
																	</select>
																</div>
															</>
														) : (
															<>
																{item?.objects &&
																	item?.objects?.map((option, indexkey) => {
																		if (
																			item?.type.toLowerCase() == "checkbox"
																		) {
																			try {
																				if (
																					/^[\],:{}\s]*$/.test(
																						item?.answer
																							?.replace(/\\["\\\/bfnrtu]/g, "@")
																							?.replace(
																								/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
																								"]"
																							)
																							?.replace(
																								/(?:^|:|,)(?:\s*\[)+/g,
																								""
																							)
																					)
																				) {
																					var ans = JSON.parse(item?.answer);
																				}
																			} catch (error) {
																				console.log(error);
																			}
																		}
																		if (option != null) {
																			return (
																				<div key={indexkey}>
																					<div className="align-items-center">
																						{item?.type.toLowerCase() ==
																						"objective" ? (
																							<>
																								<input
																									type={
																										item?.type.toLowerCase() !==
																										"objective"
																											? "Checkbox"
																											: "radio"
																									}
																									// id={"op" + index2}
																									value={option}
																									name={`question${item.id}`}
																									defaultChecked={
																										contact?.questions
																											?.filter(
																												(data) =>
																													data?.company_question_id ==
																													item?.company_question_id
																											)[0]
																											?.answer?.toLowerCase() ==
																										option.toLowerCase()
																									}
																									onClick={(e) => {
																										handlequestion(
																											e,
																											item.id,
																											item?.type,
																											item?.company_question_id,
																											item?.mandatory
																										);
																									}}
																								/>
																							</>
																						) : (
																							<input
																								type={
																									item?.type.toLowerCase() !==
																									"objective"
																										? "Checkbox"
																										: "radio"
																								}
																								id={"op" + indexkey}
																								name={`question${item.id}`}
																								defaultChecked={
																									ans
																										?.filter((item) => {
																											return (
																												item?.toUpperCase() ==
																												option?.toUpperCase()
																											);
																										})[0]
																										?.toUpperCase() ==
																										option?.toUpperCase() ||
																									(ans?.filter((item) => {
																										return item?.includes(
																											"Other:"
																										);
																									})[0]?.length > 0 &&
																										option
																											?.toUpperCase()
																											?.includes("OTHER"))
																								}
																								defaultValue={option}
																								onClick={(e) => {
																									handlequestion(
																										e,
																										item.id,
																										item?.type,
																										item?.company_question_id,
																										item?.mandatory
																									);
																									handlequestion2(
																										e,
																										item.id,
																										item?.type,
																										item?.company_question_id,
																										item?.mandatory
																									);

																									setcheckoption(true);
																									setAddstyel(true);
																								}}
																							/>
																						)}
																						<label
																							key={option}
																							style={
																								optionsedit?.length < 1 &&
																								Addstyel == true &&
																								item?.type.toLowerCase() ==
																									"checkbox"
																									? {
																											borderBottom:
																												"1px solid red",
																									  }
																									: optionsedit?.filter(
																											(item3) => {
																												return (
																													item3?.id == item.id
																												);
																											}
																									  )[0]?.checkbox?.length ==
																											0 &&
																									  optionsedit?.filter(
																											(item2) => {
																												return (
																													item2?.id == item.id
																												);
																											}
																									  )[0]?.id == item.id &&
																									  item?.type.toLowerCase() ==
																											"checkbox" && item?.mandatory !=null
																									? {
																											borderBottom:
																												"1px solid red",
																									  }
																									: {}
																							}
																						>
																							{option}
																						</label>
																					</div>
																					{/* Checkbox Others textarea display CODE */}
																					{option == "Other"
																						? optionsedit?.map((data) => {
																								return data?.checkbox?.map(
																									(other, index) => {
																										return other == "Other" &&
																											item.id === data.id ? (
																											<input
																												key={index}
																												className="form-control"
																												type="text"
																												placeholder={
																													"Please Specify"
																												}
																												style={
																													otherValues?.filter(
																														(a) =>
																															a?.id == item?.id
																													)?.length == 0
																														? {
																																borderBottom:
																																	"1px solid red",
																														  }
																														: {}
																												}
																												value={
																													otherValues?.length >
																													0
																														? otherValues?.filter(
																																(e) =>
																																	e?.id ==
																																	item?.id
																														  )[0]?.value || ""
																														: ""
																												}
																												onChange={(e) => {
																													if (
																														e.target.value == ""
																													) {
																														let arr =
																															otherValues?.filter(
																																(a) =>
																																	a?.id !=
																																	item?.id
																															);
																														setOtherValues(arr);
																													} else if (
																														e.target.value !=
																														" "
																													) {
																														if (
																															otherValues?.filter(
																																(e) =>
																																	e?.id ==
																																	item?.id
																															)?.length == 0
																														) {
																															setOtherValues([
																																...otherValues,
																																{
																																	id: item?.id,
																																	value:
																																		e.target
																																			.value,
																																},
																															]);
																														} else {
																															const updatedList =
																																otherValues.map(
																																	(i) =>
																																		i.id ===
																																		item?.id
																																			? {
																																					id: item.id,
																																					value:
																																						e
																																							.target
																																							.value,
																																			  }
																																			: i
																																);
																															setOtherValues(
																																updatedList
																															);
																														}
																													}

																													handlequestion(
																														e,
																														item.id,
																														item?.type,
																														item?.company_question_id,
																														item?.mandatory
																													);
																												}}
																											/>
																										) : (
																											""
																										);
																									}
																								);
																						  })
																						: ""}
																				</div>
																			);
																		}
																	})}
															</>
														)}
													</div>
												</div>
											);
										})}
								</div>
								<div className="col_right">
									<h6>Product Images</h6>
									<div
										className="data_upload"
										style={
											errorfield?.product_file3 == ""
												? {}
												: { borderBottom: "2px solid red" }
										}
									>
										<input
											type={"file"}
											name="product_file"
											disabled={imagelimt >= 5 ? true : false}
											onChange={(e) => {
												onImageChange(e);
											}}
											accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.pdf,application/msword ,application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
										/>
										<img src="images/profile_upload.svg" alt="" />
										<h4>
											Upload Company Logo{" "}
											<span style={{ color: "red" }}>*</span> or <br />
											Document
											<br />
											<p> Image , Document Size : 800kb </p>
											<p
												style={
													contact?.product_file3?.length >= 5
														? { color: "red" }
														: {}
												}
											>
												Can upload maximum 5 images and
												<span style={{ color: "#999999" }}>1 document.</span>
											</p>
										</h4>
									</div>
									<div className="thumbnail_section">
										<h6>Add Video Link</h6>
										<div className="form-group full">
											<input
												type="text"
												placeholder="https://youtu.be/yAoLSRbzxL"
												className="form-control"
												value={contact.yt_link == "null" ? "" : contact.yt_link}
												name="yt_link"
												onChange={(e) => logins_field2(e)}
											/>
										</div>
										{
											<p
												style={
													contact.yt_link == ""
														? { display: "none" }
														: {
																display: "block",
																color: "red",
																fontSize: "10px",
														  }
												}
											>
												{validlink != true ? "Please Enter A valid Link !" : ""}
											</p>
										}
									</div>
									<div className="thumbnail_section">
										<h6>Set Thumbnail Image</h6>
										{contact?.product_file3?.map((data, index) => {
											if (!data) {
												return;
											}
											if (data["type"]?.split("/")[0] === "image") {
												return (
													<div
														key={index}
														className="thumb_inner row align-items-center"
													>
														<input
															type="radio"
															id={"profile" + data?.image_id}
															value={index}
															defaultChecked={contact?.thumb_index == index}
															// checked={contact?.thumb_index == index}
															name="thumb_index"
															onChange={(e) => logins_field2(e)}
														/>
														<figure className="center">
															<img
																src={
																	URL.createObjectURL(data)
																		? URL.createObjectURL(data)
																		: data?.file_path
																}
																alt=""
															/>
														</figure>
														<p>{data?.name}</p>
														<figure
															onClick={(e) => {
																deletedata(index);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											} else if (data?.media_type == "image") {
												return (
													<div
														key={index}
														className="thumb_inner row align-items-center"
													>
														<input
															defaultChecked={contact?.thumb_index == index}
															// checked={contact?.thumb_index == index}
															type="radio"
															id={"profile" + index}
															name="thumb_index"
															onChange={(e) => logins_field2(e)}
															value={index}
														/>
														<figure className="center">
															<img src={data?.file_path} alt="" />
														</figure>
														<p>{"Uploaded images"}</p>
														<figure
															onClick={(e) => {
																delete_image(data?.id, index);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											}
										})}
										{/* {[...contact?.product_file2, ...contact?.product_file]?.map((data, index) => {
                       if(!data){
                        return
                       }
											if (data["type"]?.split("/")[0] === "image") {
												return (
													<div className="thumb_inner row align-items-center">
														<input
															type="radio"
															id={"profile" + data?.image_id}
															value={index}
															defaultChecked={contact?.thumb_index == index}
															name="thumb_index"
															onChange={(e) => logins_field2(e)}
														/>
														<figure className="center">
															<img
																src={
																	URL.createObjectURL(data)
																		? URL.createObjectURL(data)
																		: data?.file_path
																}
																alt=""
															/>
														</figure>
														<p>{data?.name}</p>

														<figure
															onClick={(e) => {
																deletedata(index);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											} else if (data?.media_type == "image") {
												return (
													<div className="thumb_inner row align-items-center">
														<input
															defaultChecked={contact?.thumb_index == index}
															type="radio"
															id={"profile" + index}
															name="thumb_index"
															onChange={(e) => logins_field2(e)}
															value={index}
														/>
														<figure className="center">
															<img src={data?.file_path} alt="" />
														</figure>
														<p>{"Uploaded images"}</p>
														<figure
															onClick={(e) => {
																delete_image(data?.id);
																deletedata(index);
																// setSelectOptions([])
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											}
										})} */}
										{/* {contact?.product_file2?.map((data, index) => {
											if (data?.media_type == "image") {
												return (
													<div className="thumb_inner row align-items-center">
														<input
															defaultChecked={contact?.thumb_index == index}
															type="radio"
															id={"profile" + index}
															name="thumb_index"
															onChange={(e) => logins_field2(e)}
															value={index}
														/>
														<figure className="center">
															<img src={data?.file_path} alt="" />
														</figure>
														<p>{"Uploaded images"}</p>
														<figure
															onClick={(e) => {
																delete_image(data?.id);
																deletedata(index);
																// setoptionpush2(true)
																// setSelectOptions([])
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											}
										})} */}
									</div>
									<div className="doc_upload">
										<h6>Uploaded Document</h6>
										{contact?.product_file4?.map((data, index) => {
											if (data["type"]?.split("/")[0] === "application") {
												return (
													<div
														className="inner_doc row align-items-center"
														key={index}
													>
														<figure>
															<img src={pdficon} alt="" />
														</figure>
														<p>{data.name}</p>
														<figure
															onClick={(e) =>
																setcontact({ ...contact, product_file4: [] })
															}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											} else if (data?.media_type == "doc") {

												return (
													<div
														className="inner_doc row align-items-center"
														key={index}
													>
														<figure>
															<img src={pdficon} alt="" />
														</figure>
														<p>{"Uploaded doc"}</p>
														<figure
															onClick={(e) => {
																delete_image(data?.id, undefined, true);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											}
										})}

										{/* {contact?.product_file?.map((data, index) => {
											if (data["type"]?.split("/")[0] === "application") {
												return (
													<div className="inner_doc row align-items-center">
														<figure>
															<img src={pdficon} alt="" />
														</figure>
														<p>{data.name}</p>
														<figure
															onClick={(e) => {
																deletedata(index);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											} else if (data?.media_type == "doc") {
												return (
													<div className="inner_doc row align-items-center">
														<figure>
															<img src={pdficon} alt="" />
														</figure>
														<p>{"Uploaded doc"}</p>
														<figure
															onClick={(e) => {
																delete_image(data?.id);
																deletedata(index);
															}}
														>
															<img src={trash} alt="" />
														</figure>
													</div>
												);
											}
										})} */}
									</div>
								</div>
							</div>
							{/* <p
                style={{ display: "block", color: "green", fontWeight: "700" }}
              >
                {image}
              </p> */}
							<div className="button_wrap row">
								<button
									disabled={submitStatus}
									style={submitStatus?{background:"grey"}:{}}
									className="btn btn-secondary"
									type="button"
									onClick={(e) => {
										if (
											// errorfield?.p_name == ""
											contact.product_file3?.length === 0 ||
											contact.p_name == "" ||
											contact.ps_name == "" ||
											contact.country == "" ||
											contact.Description == ""
											// errorfield?.c_name == ""
										) {
											check_data?.map((data) => {
												logins_field(data.name);
											});
											window.scrollTo(0, 100);
											setAddstyel2(true);
										} else {
											if (
												contact.product_file3?.length != 0 &&
												selectOptions.length != 0
											) {
												edit_product();
											} else {
												window.scrollTo(0, 100);
											}
										}
									}}
								>
									<a className={submitStatus?"loading-circle":""}>
                        			</a>
									{submitStatus ? "Loading..." : "Submit"}

								</button>
								<a
									onClick={() => {
										if (editData?.company != null) {
											navigate("/buyer-company-profile");
										} else {
											navigate("/");
										}
									}}
									className="btn btn-primary"
								>
									Cancel
								</a>
							</div>
							<div className="error-button row justify-content-center">
								{/* <a className="error_icon" href="/dashboard/user-management">
                  <i className="fa fa-arrow-left left" aria-hidden="true"></i>
                  Back to Product Showcase
                </a> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Company_profile_Edit;
