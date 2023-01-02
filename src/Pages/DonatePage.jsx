import React from "react";
import { Clipboard } from "react-feather";
import QrCode from "../Components/General/QrCode";
import { copyToClipboard } from "../Components/Modals";
import "./DonatePage.scss";

const cryptoWallets = {
	"Bitcoin (BTC)": "3KdJ97q9vWZpSfKLT5HyXerpthh5eXxwLk",
	"Ethereum (ETH)": "0x69a9b0b6Ea7f33047F88701fF00c05631F39E645",
	"Shiba Inu (SHIB)": "0x10d7b6c5B932027baF19a249323E99e59F73EC2f",
	"Solana (SOL)": "3x9KYYFxMxkWJPbX5wpBiohZPan5PSHEBc5P8xjF45x5"
};

export default function DonatePage() {
	return (
		<div className="DonatePage">
			<div className="Contents">
				<h1>PayPal</h1>

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

				<h1>Crypto</h1>

				<p>
					I accept payments and donations in the following cryptocurrencies:
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