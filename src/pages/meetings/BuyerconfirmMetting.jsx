import React from "react";
import downloadicon from "../../assets/images/download.svg";
function BuyerconfirmMetting(props) {
  return (
    <>
      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#"> Dashboard </a>
            </li>
            <li>
              <a href="#"> Buyer </a>
            </li>
            <li>
              <a href="#">
                <span> My Meetings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span> Confirmed Meetings </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="add_product_wrap row justify-content-between">
          <div className="column">
            <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="Type here"
              />
            </div>
            <button type="submit" className="btn btn-block btn-secondary">
              Search
            </button>
          </div>
          <div className="column justify-end">
            <div className="custom-select">
              <select>
                <option>Sorted by</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table_form">
          <table>
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Country Code</th>
                <th>Meeting Date</th>
                <th>Meeting Time (Paris)</th>
                <th>Convert Time</th>
                <th>Buyer Profile</th>
                <th>Meeting Status</th>
                <th>ICS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Buyer Short Name</td>
                <td>ALB</td>
                <td>17/1/2023</td>
                <td>16h00 17h00</td>
                <td>
                  Korean Time A <br /> Korean Time A1
                </td>
                <td className="roles">
                  <a href="#" className="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div className="button_wrap row">
                    <a href="" className="btn btn-secondary">
                      Meeting Accepted
                    </a>
                  </div>
                </td>
                <td>
                  <img src={downloadicon} alt="" />
                </td>
              </tr>
              <tr>
                <td>Buyer Short Name</td>
                <td>ALB</td>
                <td>14/1/2023</td>
                <td>16h00 </td>
                <td>IST</td>
                <td className="roles">
                  <a href="#" className="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div className="button_wrap row">
                    <a href="" className="btn btn-primary">
                      Meeting Refused
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Buyer Short Name</td>
                <td>ASM</td>
                <td>13/1/2023</td>
                <td>9h30 - 11h30 </td>
                <td>VN : 3pm - 5:30pm</td>
                <td className="roles">
                  <a href="#" className="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div className="button_wrap row">
                    <a href="" className="btn btn-secondary">
                      Meeting Accepted
                    </a>
                  </div>
                </td>
                <td>
                  <img src={downloadicon} alt="" />
                </td>
              </tr>
              <tr>
                <td>Buyer Short Name</td>
                <td>ASM</td>
                <td>13/1/2023</td>
                <td>14h00 17h30 </td>
                <td>Japan : 9am</td>
                <td className="roles">
                  <a href="#" className="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div className="button_wrap row">
                    <a href="" className="btn btn-secondary">
                      Meeting Accepted
                    </a>
                  </div>
                </td>
                <td>
                  <img src={downloadicon} alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BuyerconfirmMetting;
