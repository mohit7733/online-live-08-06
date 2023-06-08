import React, { useState } from "react";
import Left_menu from "../productpages/left_menu";
import downloadpng from "../../assets/images/download.svg"

function Billing() {
  const [sidebar, setsidebar] = useState(true);

  return (
    <div className="product_showcase Billing_wrapper Meeting_wrap profile_popup">
      <div className="main">
        <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <div
          className={
            sidebar == true
              ? "router-body billingInners active"
              : "router-body billingInners"
          }
        >
          <div class="breadcrumbs" data-aos="fade-down">
            <ul>
              <li>
                <a href="/dashboard"> Dashboard </a>
              </li>
              <li>
                <a href="#"> My Profile</a>
              </li>
              <li>
                <a href="#">
                  <span> Administrative Informations</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span> Billing</span>
                </a>
              </li>
            </ul>
          </div>
          <h2>Billing</h2>
          <div class="table_form billingTable">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Package</th>
                  <th>Price</th>
                  <th>Package Details</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>1.</span>
                  </td>
                  <td>Monthly</td>
                  <td>$10</td>
                  <td>Add Product Showcase</td>
                  <td>
                  <img src={downloadpng} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>2.</span>
                  </td>
                  <td>Monthly</td>
                  <td>$16</td>
                  <td>Add Product Showcase</td>
                  <td>
                    <img src={downloadpng} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>3.</span>
                  </td>
                  <td>Monthly</td>
                  <td>$10</td>
                  <td>Add Product Showcase</td>
                  <td>
                  <img src={downloadpng} />
                  </td>
                </tr>
             
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
