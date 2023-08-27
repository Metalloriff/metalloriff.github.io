import React from "react";
import { Send } from "react-feather";
import { Window } from "../App";
import LinkWrapper from "../Components/LinkWrapper";
import { copyToClipboard } from "../Components/Modals";
import "./ContactPage.scss";
import { Header } from "./Home";

function Dropdown({ children = [], callback }) {
	const [opened, setOpened] = React.useState(false);
	const [selected, setSelected] = React.useState(0);

	return (
		<div className="DropdownContainer">
			<div className="Selected" onClick={() => setOpened(!opened)}>
				<div className="SelectedText">{children[selected] || "SELECT"}</div>
			</div>

			{opened && (
				<div className="Dropdown">
					{children.map((child, index) => (
						<div
							key={index}
							className="DropdownItem"
							onClick={() => {
								setSelected(index);
								setOpened(false);

								callback?.(child, index);
							}}
						>{child}</div>
					))}
				</div>
			)}
		</div>
	);
}

export default function ContactPage() {
	const [contactReason, setContactReason] = React.useState("Job Inquiries");
	const [subject, setSubject] = React.useState("");
	const [body, setBody] = React.useState("");

	return (
		<div className="ContactPage">
			<Header />

			<div className="Contents">
				<Window title="Telegram">
					You can find me on Telegram at <a href="https://telegram.me/metalloriff">telegram.me/metalloriff</a>
				</Window>

				<Window title="Discord">
					You can join my Discord server with invite link <a href="https://discord.gg/Dfb96RJst6">Dfb96RJst6</a>, visit my profile directly <a href="https://discord.com/users/264163473179672576">here</a>, or copy my Discord username <a href="#" onClick={() => copyToClipboard("metalloriff")}>metalloriff</a>.
				</Window>

				<Window title="Email Generator">
					<h3 className="Title">Contact Reason</h3>

					<Dropdown callback={r => setContactReason(r)}>
						{[
							"Job Inquiries",
							"One-time Commission",
							"Other"
						]}
					</Dropdown>

					<h3 className="Title">Subject</h3>

					<p>
						A brief description of what you would like to talk about.<br />
						Ex: Need a website, need a logo, I have a question, etc.
					</p>

					<input
						type="text"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						maxLength={48}
						placeholder="Subject"
					/>

					<h3 className="Title">Message Body</h3>

					<p>
						The message you would like to send.<br />
						If you're looking to commission me, a general budget is very helpful, but not necessary.
					</p>

					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						maxLength={1024}
						placeholder="Message Body"
					/>

					<LinkWrapper
						className="MainButton FlexCenter"
						href={`mailto:metalloriff+kinzoku@gmail.com?subject=${encodeURIComponent(`${contactReason}: `)}${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
					>
						<Send /> Send
					</LinkWrapper>
				</Window>
			</div>
		</div>
	);
}