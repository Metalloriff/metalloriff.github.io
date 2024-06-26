﻿import * as Feather from "react-feather";
import "./PageFooter.scss";

import Heart from "../../Assets/TwemojiHeart.svg";
import Icon from "../../Assets/icon50x50.png";
import { copyToClipboard } from "../Modals";
import Toasts from "../Toasts";
import Tooltip from "../Tooltip";

export default function PageFooter() {
	const contacts = {
		website: () => Toasts.showToast("You're already here 🌚"),
		github: () => window.open("https://github.com/metalloriff", "_blank"),
		twitter: () => window.open("https://twitter.com/Metalloriff", "_blank"),
		email: () => window.open("mailto:metalloriff@gmail.com", "_blank"),
		discord: () => copyToClipboard("Metalloriff 💕🌈#2891")
	};

	return (
		<footer>
			<div className="Flex">
				<div className="LeftSections">
					<div className="HeadSection FlexCenter">
						<img className="Logo" src={Icon} alt="Logo" />

						<div>
							<h2>Metalloriff</h2>
							<div>
								Made with <img src={Heart} alt="♥" width={15} height={15} />
							</div>
						</div>
					</div>

					<div className="ContactSection Flex">
						<div className="ContactEntry" onClick={contacts.website}>
							<Feather.Globe />
							<Tooltip>Website</Tooltip>
						</div>

						<div className="ContactEntry" onClick={contacts.github}>
							<Feather.GitHub />
							<Tooltip>GitHub</Tooltip>
						</div>

						<div className="ContactEntry" onClick={contacts.email}>
							<Feather.Mail />
							<Tooltip>Email</Tooltip>
						</div>

						<div className="ContactEntry" onClick={contacts.discord}>
							<Feather.MessageSquare />
							<Tooltip>Discord</Tooltip>
						</div>
					</div>
				</div>

				<div className="MiddleSection">
					{/*  TODO add some shit here.  */}
				</div>

				<div className="RightSections FlexCenter">
					<div className="LinksSection">
						<a href="https://github.com/Metalloriff/metalloriff.github.io">Source Code</a>
						<a href="https://feathericons.com/">Icons Used</a>
						<a href="https://metalloriff.github.io/city-fog">Color Palette</a>
						<a href="https://paypal.me/israelboone">
							<img src={Heart} alt="♥" width={15} height={15} />
							<span style={{ margin: "0 7px" }}>Donate</span>
							<img src={Heart} alt="♥" width={15} height={15} />
						</a>

						<div className="Copyright">
							Copyright © {new Date().getFullYear()} Israel Boone
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}