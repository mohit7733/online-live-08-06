import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, TwitterShareButton, XIcon } from "react-share";
import { FacebookButton } from "react-social";

export default function Sharebtn(props) {
	const [share, setShare] = useState({});
	const handleShareToggle = (itemId) => {
		setShare((prev) => ({
			...prev,
			[itemId]: !prev[itemId] || false,
		}));
	};
	return (
		<Link
			onClick={() => handleShareToggle(props.id)}
			className="btn-icon"
			style={{ display: "flex", flexDirection: "column" }}
		>
			<img
				style={share[props.id] ? { marginTop: "93px" } : { marginTop: "0px" }}
				src={window.location.origin + "/images/icon-share.png"}
				title=""
				alt=""
			/>
			<ul style={share[props.id] ? { display: "block" } : { display: "none" }}>
				<li style={{ marginTop: "20px" }}>
					<FacebookButton
						style={{
							background: "transparent",
							border: "none",
							cursor: "pointer",
						}}
						message={props.title}
						media={props.media}
						title={props.title}
						url={props.url}
						appId={3384521628485216}
					>
						<FacebookIcon
							size="30px"
							logofillcolor="white"
							round="true"
						></FacebookIcon>
					</FacebookButton>
					{/* <FacebookShareButton quote={props.title} url={props.url}>
            <FacebookIcon
              size="30px"
              logofillcolor="white"
              round="true"
            ></FacebookIcon>
          </FacebookShareButton> */}
					<TwitterShareButton title={props.title} url={props.url}>
						<XIcon size="30px" logofillcolor="white" round="true"></XIcon>
					</TwitterShareButton>
				</li>
			</ul>
		</Link>
	);
}
