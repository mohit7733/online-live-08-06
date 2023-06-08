import React, { useState, useEffect } from "react";
import downloadicon from "../../assets/images/download.svg";
import axios from "axios";
import {country} from '../../pages/dashboard/country'
import moment from 'moment-timezone'
function Supplierconfirmmeeting(props) {
  const [accept, setaccept] = useState(false);
  const [meetingData, setmeetingData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://adminbm.health-and-beauty.fr/api/v1/supplier-confrm-meeting",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        // Handle the response here
        console.log(response?.data?.data?.meetings);
        setmeetingData(response?.data?.data?.meetings);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, []);
  const data = meetingData?.map((detail) => ({
    id: detail?.id,
    supplier_id: detail?.supplier_id,
    status: detail?.status,
    meetingDateTimeStrings: detail.meetDateTime?.map(
      (time) => time.meet_date + " " + time.meet_time
    ),
    supplierCityName: detail?.supplierCityName?.city_name,
    buyerCityName: detail?.buyerCityName?.city_name,
    buyerCountryCode: detail?.buyerCountryCode?.countrycode,
    supplierCountryCode: detail?.supplierCountryCode?.countrycode,
    buyer_id: detail.buyer_id,
    buyername: detail?.buyerName?.buyername,
    countrycode:
      detail?.supplierCountryCode?.countrycode != null
        ? detail?.supplierCountryCode?.countrycode
        : "Not Added",
    meetingDates: detail.meetDateTime?.map((date) => date.meet_date) || [
      "Not Added",
    ],
    meetingTime: detail.meetDateTime?.map((time) => time.meet_time) || [
      "Not Added",
    ],
  }));
  console.log(data, "this is data");
  return (
    <>
      <div class={(props.sidebar ? "active " : " ") + "router-body"}>
        <div class="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#"> Dashboard </a>
            </li>
            <li>
              <a href="#"> Supplier </a>
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
        <div class="add_product_wrap row justify-content-between">
          <div class="column">
            <div class="search">
              <input type="text" class="form-control" placeholder="Type here" />
            </div>
            <button type="submit" class="btn btn-block btn-secondary">
              Search
            </button>
          </div>
          <div class="column justify-end">
            <div class="custom-select">
              <select>
                <option>Sorted by</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table_form">
          <table>
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Country Codes</th>
                <th>Meeting Date</th>
                <th>Meeting Time (Paris)</th>
                <th>Convert Time</th>
                <th>Buyer Profile</th>
                <th>Meeting Status</th>
                {/* <th>ICS</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((meeting, index) => (
                <tr>
                  <td>{meeting?.buyername}</td>
                  <td>{meeting?.countryCode}</td>
                  <td>
                    {meeting?.meetingDates?.map((date, index) => (
                      <div key={index}>{date}</div>
                    ))}
                  </td>

                  <td>
                    {" "}
                    {meeting?.meetingTime?.map((time, index) => (
                      <div key={index}>{time}</div>
                    ))}
                  </td>
                  <td>
                    {(() => {
                      const buyerCountry = country?.data?.find(
                        (c) => c?.code === meeting?.buyerCountryCode
                      );

                      const supplierCountry = country?.data?.find(
                        (c) => c.code === meeting?.supplierCountryCode
                      );

                      const buyerTimeZone = buyerCountry
                        ? buyerCountry?.country + "/" + meeting?.buyerCityName
                        : null;
                      const supplierTimeZone = supplierCountry
                        ? supplierCountry?.country +
                          "/" +
                          meeting?.supplierCityName
                        : null;
                      // console.log(supplierTimeZonexx`)

                      const meetingDateTimeStrings =
                        meeting?.meetingDateTimeStrings || [];

                      return meetingDateTimeStrings.map((time, index) => {
                        const buyerMeetingTime = moment.tz(
                          time,
                          "DD-MM-YYYY HH:mm",
                          buyerTimeZone
                        );
                        const timeDiffMinutes = moment
                          .tz(buyerMeetingTime, buyerTimeZone)
                          .diff(
                            moment.tz(buyerMeetingTime, supplierTimeZone),
                            "minutes"
                          );
                        const supplierMeetingTime = moment.tz(
                          buyerMeetingTime
                            .clone()
                            .add(timeDiffMinutes, "minutes"),
                          supplierTimeZone
                        );
                        const formattedSupplierMeetingTime =
                          supplierMeetingTime.format("h:mm A");
                        return (
                          <div key={index}>{formattedSupplierMeetingTime}</div>
                        );
                      });
                    })()}
                  </td>
                  <td className="roles">
                    <a href="#" className="btn btn-success">
                      View More
                    </a>
                  </td>
                  <td>
                    <div className="button_wrap row">
                      <a href="" className="btn btn-secondary">
                        {meeting?.status === 4
                          ? "Supplier confirm Meeting"
                          : meeting?.status === 5
                          ? "Completed"
                          : meeting?.status === 1
                          ? "In Progress"
                          : meeting?.status === 2
                          ? "Supplier confirm Meeting. Payment Pending"
                          : meeting?.status === 3
                          ? "Refused"
                          : ""}
                      </a>
                    </div>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Supplierconfirmmeeting;

// dummy code   

{
  /* <tr>
                <td>Buyer Short Name</td>
                <td>ALB</td>
                <td>17/1/2023</td>
                <td>16h00 17h00</td>
                <td>
                  Korean Time A <br /> Korean Time A1
                </td>
                <td class="roles">
                  <a href="#" class="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div class="button_wrap row">
                    <a href="" class="btn btn-secondary">
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
                <td class="roles">
                  <a href="#" class="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div class="button_wrap row">
                    <a href="" class="btn btn-primary">
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
                <td class="roles">
                  <a href="#" class="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div class="button_wrap row">
                    <a href="" class="btn btn-secondary">
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
                <td class="roles">
                  <a href="#" class="btn btn-success">
                    View More
                  </a>
                </td>
                <td>
                  <div class="button_wrap row">
                    <a href="" class="btn btn-secondary">
                      Meeting Accepted
                    </a>
                  </div>
                </td>
                <td>
                  <img src={downloadicon} alt="" />
                </td>
              </tr> */
}
