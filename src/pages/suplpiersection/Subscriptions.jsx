import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../base_url";

export default function Subscriptions(props) {
  const [subscriptions, setSubscriptions] = useState({});
  const navigate = useNavigate();
  const getSubcriptions = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/subscription", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSubscriptions(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getSubcriptions();
  }, []);

  const checkSubscription = () => {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(api + "/api/v1/details", requestOptions)
        .then((response) => response.json())
        .then((result) => resolve(result.data))
        .catch((error) => console.log("error", error));
    });
  };

  // console.log(props.sidebar,subscriptions );

  return (
    <div class={props.sidebar ? "router-body active " : "router-body"}>
      <div class="breadcrumbs aos-init aos-animate" data-aos="fade-down">
        <ul>
          <li>
            <a href="/dashboard">Dashboard </a>
          </li>
          <li>
            <a href="#">Supplier </a>
          </li>
          <li>
            <a href="/supplier-product-showcase">
              <span> Product Showcase </span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                checkSubscription().then((response) => {
                  // console.log(response, "<<<<<<<,");
                  if (response.subscription_status !== 0) {
                    navigate("/add-new-product");
                  } else {
                    navigate("/company-subscription");
                  }
                });
              }}
            >
              <span> Add New Product </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span> Payment </span>
            </a>
          </li>
        </ul>
      </div>
      <h2>Payment</h2>

      <p>
        We warmly thank you for your trust.
        <br />
        To go ahead and discover more about our coming steps write us at {"   "}
        <a style={{ paddingLeft: "4px", color: "#19a0dd" }} href="mailto:contact@beauty-meetings">
        {"   "} contact@beauty-meetings.
        </a>
      </p>
      <div class="payment_wrapper row justify-content-center">
        <div class="column">
          <div className="button">Monthly</div>
          <p>
            <span>{subscriptions?.monthlyTitle}</span>
          </p>
          <h3>{subscriptions?.monthlyprice}</h3>
          <p>{subscriptions?.montlysubtitle}</p>
          <button
            class="btn11 btn btn-secondar"
            style={{ background: "gray", color: "white" }}

            //  onClick={() => {
            //     navigate('/payment', {
            //         state: {
            //             amount: parseInt(subscriptions.monthlyprice?.substring(1)),
            //             plan: "Monthly"
            //         }
            //     })
            // }}
          >
            Continue
          </button>
        </div>
        <div class="column col_right">
          <div className="button">Yearly</div>
          <p>{subscriptions?.yearlysubtitle}</p>
          <h3>{subscriptions?.yearlyprice}</h3>
          <p>
            <span>{subscriptions?.yearlytitle}</span>
          </p>
          <button
            class="btn11 btn btn-"
            style={{ background: "gray", color: "white" }}

            //  onClick={() => {
            //     navigate('/payment', {
            //         state:
            //         {
            //             amount: parseInt(subscriptions.yearlyprice?.substring(1)),
            //             plan: "Yearly"
            //         }
            //     })
            // }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
