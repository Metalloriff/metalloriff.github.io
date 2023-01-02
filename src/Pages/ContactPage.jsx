import React from "react";
import { Send } from "react-feather";
import LinkWrapper from "../Components/LinkWrapper";
import "./ContactPage.scss";

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

function Window({ title, children }) {
	return (
		<div className="Window">
			<div className="TitleBarMockup FlexCenter">
				<div className="Title">
					{title}
				</div>

				<div className="Buttons FlexCenter">
					<div className="Button Minimize" />
					<div className="Button Restore" />

					<LinkWrapper
						className="Button Close"
						href="/"
					/>
				</div>
			</div>

			{children}
		</div>
	);
}

export default function ContactPage() {
	const [contactReason, setContactReason] = React.useState("Job Inquiries");
	const [subject, setSubject] = React.useState("");
	const [body, setBody] = React.useState("");

	return (
		<div className="ContactPage">
			<div className="Contents">
				<Window title="Discord">
					<LinkWrapper className="MainButton FlexCenter" href="https://discord.gg/Dfb96RJst6">Join Discord Server</LinkWrapper>

					<LinkWrapper className="MainButton FlexCenter" href="discord.com/users/264163473179672576">View Discord Profile</LinkWrapper>
				</Window>

				<Window title="Twitter">
					You can find me on Twitter, <a href="https://twitter.com/metalloriff">@metalloriff</a>.
				</Window>

				<Window title="Email Generator">
					<h3 className="Title">Contact Reason</h3>

					<p>
						What is your reason for contacting me?
					</p>

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
						If you're looking to commission me, a budget is very helpful. 💜
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