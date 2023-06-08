import React, { useState, useEffect } from "react";
import EditRemark from "./EditRemark";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";

function Add_remark(props) {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id,
    title: "",
    desc: "",
  });

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf("/") + 1);
    setFormData((prevFormData) => ({ ...prevFormData, id }));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl = api+ "/api/v1/supplier-add-remark";

    const requestData = new FormData();
    requestData.append("id", formData.id);
    requestData.append("title", formData.title);
    requestData.append("desc", formData.desc);

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
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">My Meetings</a>
            </li>
            <li>
              <a onClick={() => props.setsection(21)}>Passed Meetings</a>
            </li>
            <li>
              <a href="#">Add Remark</a>
            </li>
          </ul>
        </div>
        <div className="remark_wrap row justify-content-between">
          <div className="column">
            <h2>Add Remark</h2>
          </div>
          <div className="column"></div>
        </div>
        <form action="">
          <div className="form">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              className="form-control"
              placeholder="Title"
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <textarea
              name="desc"
              id="desc"
              value={formData.desc}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="btn_wrapper row">
            <a
              id="resubmit"
              href=""
              className="btn btn-secondary"
              onClick={handleSubmit}
            >
              Submit
            </a>

            <a id="cancel" href="" className="btn btn-primary">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add_remark;
