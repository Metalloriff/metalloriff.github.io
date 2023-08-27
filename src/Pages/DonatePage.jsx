import { Window } from "../App";
import { copyToClipboard } from "../Components/Modals";
import "./DonatePage.scss";
import { Header } from "./Home";

const cryptoWallets = {
	"Bitcoin (BTC)": "3KdJ97q9vWZpSfKLT5HyXerpthh5eXxwLk",
	"Ethereum (ETH)": "0x69a9b0b6Ea7f33047F88701fF00c05631F39E645"
};

export default function DonatePage() {
	return (
		<div className="DonatePage">
			<Header />

			<div className="Contents">
				<Window title="PayPal">
					<p>
						PayPal is optimal for one-time donations. You can find my PayPal.me link below, or if it's more convenient for you, you can simply copy my email address directly.
					</p>

					<div className="Links FlexCenter">
						<a href="https://paypal.me/israelboone">
							PayPal.me
						</a>

						<a href="#" onClick={() => copyToClipboard("itbchannel@gmail.com")}>
							Copy Email Address
						</a>
					</div>
				</Window>

				<Window title="Ko-fi">
					<p>
						I also have a Ko-fi page, where you have the option to make one-time donations or set up monthly contributions.
					</p>

					<div className="Links FlexCenter">
						<a href="https://ko-fi.com/metalloriff">
							Ko-fi.com/Metalloriff
						</a>
					</div>
				</Window>

				<Window title="How your donations help ♥">
					<p>
						I strive to make as many projects as possible free of charge. Receiving donations helps me upkeep any database/server costs for projects that require it. Along with the yearly charge for domains.
					</p>

					<p>
						My aspiration in life is to earn enough income via donations to keep making these free projects. Donations from those who can afford it help me to keep my projects free for those who can't.
					</p>
				</Window>
			</div>
		</div>
	);
}