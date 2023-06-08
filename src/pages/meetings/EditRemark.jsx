import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditRemark(props) {
  const { usertype } = useParams();
  const path = window.location.pathname;
  const remarkid = path.substring(path.lastIndexOf("/") + 1);
  
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    id: remarkid,
  });

  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl = `https://adminbm.health-and-beauty.fr/api/v1/supplier-view-remark?id=${remarkid}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { data } = response?.data;
        const { remark } = data;

        const supplierRemark = JSON.parse(remark?.supplier_remark);
        const title = supplierRemark?.title;
        const description = supplierRemark?.description;

        const updatedFormData = {
          title: title || "",
          description: description || "",
          id: remarkid,
        };

        setFormData(updatedFormData);
        console.log(updatedFormData, "this is what we get");
        console.log(remarkid);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl = "https://adminbm.health-and-beauty.fr/api/v1/supplier-add-remark";

    const requestData = new FormData();
    requestData.append("id", formdata.id);
    requestData.append("title", formdata.title);
    requestData.append("desc", formdata.description);

    axios
      .post(apiUrl, requestData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#">Dashboard </a>
            </li>
            <li>
              <a href="#">
                {" "}
                Supplier
                {/* {localStorage.getItem("user_type") == "Both" ? props.supplier : localStorage.getItem("user_type")} */}
              </a>
            </li>
            <li>
              <a href="#">
                <span> My Meetings </span>
              </a>
            </li>
            <li>
              <a onClick={() => props.setsection(21)}>
                <span> Passed Meetings </span>
              </a>
            </li>
            <li>
              <a href="#">
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
            <a href="" className="btn btn-primary">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditRemark;
