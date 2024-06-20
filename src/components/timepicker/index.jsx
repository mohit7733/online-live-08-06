import React from "react";
import "./index.css";

export default function Timepicker(props) {
  const timeArray = () => {
    const options = [];
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;
    // let amOrPm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12 | | 12;
    hours = (hours < 10 ? "0" : "") + hours;

    let formattedTime = `${hours}:${minutes}`;
    let startTime = 9;
    let newStart = 9;
    let ampm = "AM";
    let gapMinutes = 0;
    let currentMonth = currentTime.toLocaleString("en", { month: "short" }); // Adding 1 to convert to human-readable month (1-12)
    let currentDay = currentTime.getDate();

    for (let i = 0; i <= 12; i++) {
      if (startTime > 12) startTime = 1;
      if (startTime >= 12) ampm = "PM";
      if (newStart > 24) newStart = 1;

      const iText = `${startTime.toString().padStart(2, "0")}:${gapMinutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      const newiText = `${newStart.toString().padStart(2, "0")}:${gapMinutes
        .toString()
        .padStart(2, "0")}`;

      // {
      //   console.log(
      //     "Current month",
      //     newiText,
      //     formattedTime,
      //     currentMonth + " " + currentDay == props.sDate &&
      //       newiText <= formattedTime
      //   );
      // }
      const isTimeDisabled =
        props.slots.some(
          (slot) => slot.sDate === props.sDate && slot.sTime === iText
        ) ||
        (currentMonth + " " + currentDay == props.sDate &&
          newiText <= formattedTime) ||
        props.sDate == "";
      options.push(
        <option
          style={
            isTimeDisabled
              ? { color: "grey", fontSize: "14px" }
              : { color: "black", fontSize: "14px" }
          }
          key={i}
          value={iText}
          disabled={isTimeDisabled}
        >
          {iText}
        </option>
      );

      gapMinutes += 45;
      if (gapMinutes >= 60) {
        startTime += 1;
        newStart += 1;
        gapMinutes -= 60;
      }
    }

    return options;
  };

  return (
    <div className="custom-select">
      <select
        style={{ fontSize: "12px" }}
        value={props.sTime}
        onChange={(e) => {
          props.setTime(e?.target?.value);
          props.setDateError2 && props.setDateError2("");
          if (props.slots.length >= 5) {
            props.setDateError("You can't select more than 5 availabilities");
            setTimeout(() => {
              setDateError("");
            }, 5000);
          } else {
            props.setDateError("");
          }
        }}
      >
        <option style={{ fontSize: "14px" }}>Select Time</option>
        {timeArray()}
      </select>
    </div>
  );
}
