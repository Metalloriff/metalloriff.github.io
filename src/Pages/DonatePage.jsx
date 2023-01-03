import { Clipboard } from "react-feather";
import QrCode from "../Components/General/QrCode";
import { copyToClipboard } from "../Components/Modals";
import "./DonatePage.scss";

const cryptoWallets = {
	"Bitcoin (BTC)": "3KdJ97q9vWZpSfKLT5HyXerpthh5eXxwLk",
	"Ethereum (ETH)": "0x69a9b0b6Ea7f33047F88701fF00c05631F39E645"
};

export default function DonatePage() {
	return (
		<div className="DonatePage">
			<div className="Contents">
				<h1 style={{ marginTop: 100 }}>PayPal</h1>

				<p>
					You can pay or donate to my PayPal account either through my PayPal.me, or directly through my email address.
				</p>

				<div className="Links Flex">
					<a href="https://paypal.me/israelboone">
						PayPal.me
					</a>

					<a href="#" onClick={() => copyToClipboard("itbchannel@gmail.com")}>
						Email Address
					</a>
				</div>

				<h1 style={{ marginTop: 100 }}>Ko-fi</h1>

				<p>
					I also have a Ko-fi, where you can make one-time or monthly donations.
				</p>

				<div className="Links Flex">
					<a href="https://ko-fi.com/metalloriff">
						Ko-fi.com/Metalloriff
					</a>
				</div>

				<h1 style={{ marginTop: 100 }}>Crypto</h1>

				<p>
					Lastly, I also accept payments and donations in BTC and ETH:
				</p>

				<div className="Wallets">
					{Object.keys(cryptoWallets).map(key => (
						<div key={key} className="Wallet">
							<div className="TitleBarMockup FlexCenter">
								<div className="Title">
									{key}
								</div>

								<div className="Buttons FlexCenter">
									<div className="Button Minimize" />
									<div className="Button Restore" />
									<div className="Button Close" />
								</div>
							</div>

							<p
								className="Address FlexCenter"
								onClick={() => {
									copyToClipboard(
										cryptoWallets[key]
									);
								}}
							>
								<Clipboard />
								<span>{cryptoWallets[key]}</span>
							</p>

							<QrCode>
								{cryptoWallets[key]}
							</QrCode>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}