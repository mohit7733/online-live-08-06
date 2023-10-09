import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { api } from "../../pages/base_url";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditRemark(props) {
	const { state } = useLocation();
  const navigate = useNavigate();
  // const { usertype } = useParams();
  const path = window.location.pathname;
  const remarkid = path.substring(path.lastIndexOf("/") + 1);
  // const state?.usertype = localStorage.getItem("user_type");
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    id: remarkid,
  });
  

  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl =
      `${api}/api/v1/` +
      (state?.usertype == "Buyer"
        ? `buyer-view-remark?id=${remarkid}`
        : `supplier-view-remark?id=${remarkid}`);

    axios
      .get(apiUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { data } = response?.data;
        const { remark } = data;

        const supplierRemark = JSON.parse(
          state?.usertype != "Buyer" ? remark?.supplier_remark : remark?.buyer_remark
        );
        const title = supplierRemark?.title;
        const description = supplierRemark?.description;

        const updatedFormData = {
          title: title || "",
          description: description || "",
          id: remarkid,
        };

        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if any of the form fields are empty
    if (formdata.title.trim() === "" || formdata.description.trim() === "") {
      toast.error("Please fill in all the fields.");
      return;
    }
    
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl =
      `${api}/api/v1/` +
      (state?.usertype == "Buyer" ? "buyer-add-remark" : "supplier-add-remark");

    const requestData = new FormData();
    requestData.append("id", formdata.id);
    requestData.append("title", formdata.title);
    requestData.append("description", formdata.description);

    axios
      .post(apiUrl, requestData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Remark Edited Successfully");
        console.log(response.data);
        setTimeout(() => {
          navigate(
            "/passed-meeting/" + (state?.usertype == "Buyer" ? "buyer" : "supplier")
          );
        }, 3000);
      })
      .catch((error) => {
        toast.error("something went wrong !");
        console.error(error);
      });
  };
  // console.log(props , "this is")
  return (
    <>
      <div className={(props.sidebar ? " active router-body " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#">Dashboard </a>
            </li>
            <li>
              <a href="#">
                {" "}
                {/* Supplier */}
               {state?.usertype === "Buyer" ? "Buyer" : "Supplier" }
              </a>
            </li>
            <li>
              <a href="#">
                <span> My Meetings </span>
              </a>
            </li>
            <li>
              <a
                onClick={() => props.setsection(21)}
                href={`/passed-meeting/${
                  state?.usertype === "Both" ? "supplier" : state?.usertype.toLowerCase()
                }`}
              >
                <span> Passed Meetings </span>
              </a>
            </li>
            <li>
              <a >
                <span> Edit Remark</span>
              </a>
            </li>
          </ul>
        </div>
        <h2>Edit Remark</h2>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <input
              type="text"
              value={formdata.title}
              className="form-control"
              placeholder=""
              onChange={(e) =>
                setFormData({ ...formdata, title: e.target.value })
              }
            />
          </div>
          <div className="form">
            <textarea
              name=""
              value={formdata.description}
              cols="30"
              rows="10"
              onChange={(e) =>
                setFormData({ ...formdata, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="btn_wrapper row">
            <button type="submit" className="btn btn-secondary">
              Resubmit
            </button>
            <a
              href=""
              className="btn btn-primary"
              onClick={() => {
                navigate(`/passed-meeting/${
                  state?.usertype === "Both" ? "supplier" : state?.usertype.toLowerCase()
                }`);
              }}
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditRemark;
