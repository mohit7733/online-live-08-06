import React, { useState } from "react";import Subscriptions from "../suplpiersection/Subscriptions";
import Left_menu from "../productpages/left_menu";

function SubscriptionsPage() {
	const [sidebar, setsidebar] = useState(true);

	return (
		<>
			<div className=" product_research_wrap add_new_product Meeting_wrap profile_popup">
				<div className="main">
					<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
					<Subscriptions sidebar={sidebar} setsidebar={setsidebar} />
				</div>
			</div>
		</>
	);
}

export default SubscriptionsPage;
