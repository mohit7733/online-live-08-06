import React from "react";
import downloadicon from "../../assets/images/download.svg";

const ZoomInvitation = (props) => {
  const generateICSFile = () => {
    const now = new Date();
    const meetingDetails = {
      title: props.title,
      startTime: props.startdate,
      endTime: props.enddate,
      location: props.link,
      description: `Online Beauty is inviting you to a scheduled Zoom meeting.\n\nJoin Zoom Meeting\n${props.link}\n\n`,
    };
    const icsContent = `
BEGIN:VCALENDAR
PRODID:-//zoom.us//iCalendar Event//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
CLASS:PUBLIC
BEGIN:VTIMEZONE
TZID:${props.timezone}
LAST-MODIFIED:20231222T233358Z
TZURL:https://www.tzurl.org/zoneinfo-outlook/${props.timezone}
X-LIC-LOCATION:${props.timezone}
BEGIN:STANDARD
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:${now
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z/, "")}
DTSTART;TZID=${props.timezone}:${meetingDetails?.startTime}
DTEND;TZID=${props.timezone}:${meetingDetails?.endTime}
SUMMARY:${meetingDetails.title}
UID:${now
      .toISOString()
      .replace(/[-:T.]/g, "")}-81222878826@fe80:0:0:0:dc0d:16ff:fe7d:1510eth0
TZID:${props.timezone}
DESCRIPTION:${meetingDetails.description}
LOCATION:${meetingDetails.location}

BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR
`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ZoomMeeting.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <img
        onClick={generateICSFile}
        src={downloadicon}
        alt="Download Zoom Meeting Invitation"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ZoomInvitation;
