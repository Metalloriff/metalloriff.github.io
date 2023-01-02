import _ from "lodash";
import React from "react";
import { Coffee, GitHub, MessageCircle, Twitter } from "react-feather";
import Logo from "../Assets/Logo.png";
import { useEventListener, usePromise } from "../Classes/Hooks";
import ProjectItem from "../Components/General/ProjectItem";
import InlineLoading from "../Components/InlineLoading";
import LinkWrapper from "../Components/LinkWrapper";
import Toasts from "../Components/Toasts";
import "./Home.scss";

export const age = Math.floor((Date.now() - new Date("05/20/2001")) / 3.154e+10);

function Projects() {
	const data = usePromise(
		() => fetch(
			"https://dl.dropboxusercontent.com/s/53aehv6kh5tqdk8/my_projects.json",
			{ cache: "no-cache" }
		).then(r => r.json()).catch(err => {
			console.error(err);
			Toasts.showToast("There was an error fetching projects!", "Failure");
		})
	);

	return data ? (
		<div className="Projects">
			<h1>Recent Commissions</h1>

			<div className="Commissions">
				{data.commissions.map((project, index) => (
					<div className="CommissionItem" key={index}>
						<h2 className="Name">{project.name}</h2>
						<a className="Link" href={project.link}>{project.link}</a>
					</div>
				))}
			</div>

			<h1>My Personal Projects</h1>

			{data.projects.map((project, index) => (
				<ProjectItem {...project} key={index} />
			))}
		</div>
	) : <InlineLoading />;
}

function Header() {
	return (
		<header className="Header FlexCenter Col">
			<div className="FlexCenter">
				<img src={Logo} alt="Rifu" className="Logo" />

				<h1 className="Title">kinzoku<span>.one</span></h1>
			</div>

			<div className="HeaderButtons FlexCenter">
				<LinkWrapper
					href="https://twitter.com/metalloriff"
					className="Button FlexCenter Col"
				>
					<Twitter />

					<h4>TWITTER</h4>
				</LinkWrapper>

				<LinkWrapper
					href="/contact"
					className="Button FlexCenter Col"
				>
					<MessageCircle />

					<h4>CONTACT</h4>
				</LinkWrapper>

				<LinkWrapper
					href="/donate"
					className="Button FlexCenter Col"
				>
					<Coffee />

					<h4>DONATE</h4>
				</LinkWrapper>

				<LinkWrapper
					href="https://github.com/metalloriff"
					className="Button FlexCenter Col"
				>
					<GitHub />

					<h4>GITHUB</h4>
				</LinkWrapper>
			</div>
		</header>
	);
}

function monthDiff(d1, d2) {
	const months = (((d2.getFullYear() - d1.getFullYear()) * 12) - d1.getMonth()) + d2.getMonth();
	return months <= 0 ? 0 : months;
}

const startedAt = Date.now();
let skipped = 0;
let lastArtificialScroll = Date.now() + 250;
let hasScrolled = false;

function HeadIntro() {
	const ref = React.createRef();

	React.useEffect(() => {
		const headers = ref.current.getElementsByTagName("h1");
		const speed = 50;
		let delay = speed;

		for (const header of headers) {
			header.style = `
				--target-size: ${header.getBoundingClientRect().width + 20}px;
				width: 0;
				
				animation-duration: ${(header.textContent.length || 1) * speed}ms;
				animation-timing-function: steps(${header.textContent.length}, end);
				animation-delay: ${delay}ms;
			`;

			delay += (header.textContent.length + 3) * speed;

			header.appendChild(
				Object.assign(
					document.createElement("div"),
					{
						className: "Caret",
						style: `animation-delay: ${delay}ms`
					}
				)
			);

			header.addEventListener("animationend", () => {
				if (header !== headers[headers.length - 1]) {
					header.getElementsByClassName("Caret")[0]?.remove();
				}

				if (header.getAttribute("data-scroll-to")
					&& document.documentElement.scrollTop < header.offsetTop) {
					lastArtificialScroll = Date.now();

					if (!hasScrolled) {
						header.scrollIntoView({ behavior: "smooth" });
					}
				}

				header.style["--target-size"] = `${parseFloat(header.style["--target-size"]) + 10}px`;
			});
		}
	}, []);

	useEventListener("scroll", _.debounce(() => {
		if (Date.now() - lastArtificialScroll < 1000) return;

		hasScrolled = true;

		const headers = ref.current.getElementsByTagName("h1");

		for (const header of headers) {
			const rect = header.getBoundingClientRect();

			if (rect.y < window.innerHeight && !header.getAttribute("data-has-skipped")) {
				header.style.animationDuration = "700ms";
				header.style.animationDelay = `${(Date.now() - startedAt) + 50}ms`;

				header.setAttribute("data-has-skipped", true);

				if (header === headers[headers.length - 1]) {
					const caret = header.getElementsByClassName("Caret")[0];
					if (caret) caret.style.animationDelay = "0ms";
				}

				skipped++;
			}
		}
	}, 10));

	return (
		<div className="HeadIntro" ref={ref}>
			<div className="TitleBarMockup FlexCenter">
				<div className="Title">
					Intro.one
				</div>

				<div className="Buttons FlexCenter">
					<div className="Button Minimize" />
					<div className="Button Restore" />
					<div
						className="Button Close"
						onClick={() => {
							Toasts.showToast(
								"Computer is frozen, can't close. :(",
								"Failure"
							);
						}}
					/>
				</div>
			</div>

			<h1>Hi,</h1>
			<h1>I'm <b>{"<"}<span><a href="#about_me">Israel</a></span> age<span>=</span><b>{`{${age}}`}</b>{"/>"}</b>;</h1>

			<h1><br /></h1>

			<h1>A passionate freelance <b>[</b></h1>
			<h1><b style={{ marginLeft: 40 }}><span>web</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>software</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>game </span></b></h1>
			<h1><b>]</b> developer <b>&&</b> designer;</h1>

			<h1><br /></h1>

			<h1 data-scroll-to={true}>I work with <b>[</b></h1>
			<h1><b style={{ marginLeft: 40 }}><i>// Fluently</i></b>   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>JavaScript</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>CSS <b>||</b> SCSS</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>ReactJS</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>HTML</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>C#</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Vector Design</span></b>,  </h1>

			<h1><br /></h1>

			<h1><b style={{ marginLeft: 40 }}><i>// Intermediate</i></b>   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Java</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Python</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Lua</span></b>,  </h1>
			<h1><b style={{ marginLeft: 40 }}><span>3D Modeling</span></b>,  </h1>
			<h1><b style={{ marginLeft: 40 }}><span><b>(</b>3D <b>||</b> 2D<b>)</b> Animation</span></b>,  </h1>
			<h1><b>]</b>;</h1>

			<h1><br /></h1>

			<h1>You can view my  </h1>
			<h1 data-scroll-to={true}>personal projects <b>below</b>.  </h1>

			<h1><br /></h1>

			<h1>Contact/hire me <b><a href="/contact">here</a></b>,</h1>
			<h1>or at my <b><a href="https://twitter.com/metalloriff">Twitter</a></b>!</h1>
			<h1><b><i>// Psst..</i></b></h1>
			<h1><b><i>// I'm looking for work! :)</i></b></h1>

			<h1><br /></h1>

			<h1>Any <b>donations</b> are    </h1>
			<h1>much appreciated! <b><span>{"<3"}</span></b>     </h1>
			<h1>You can donate <b><a href="/donate">here</a></b>.</h1>
		</div>
	);
}

export function randomRange(min, max) {
	return Math.floor(
		Math.random() * (
			max - min + 1
		) + min
	);
}

export default function HomePage() {
	return (
		<div className="HomePage">
			<div className="CrescentContainer">
				<div className="Crescent" />
			</div>

			<div className="Clouds">
				{Array.from(Array(20).keys()).map(key => (
					<div
						className="CloudWrapper"
						key={key}
						style={{
							"--size": randomRange(250, 600)
						}}
					>
						<div
							className="Cloud"
							style={{
								animationDuration: `${randomRange(24, 45)}s`,
								animationDelay: `-${randomRange(3, 50)}s`
							}}
						>
							{Array.from(Array(randomRange(2, 7)).keys()).map(key => (
								<div
									key={key}
									className="Sec"

									style={{
										animationDuration: `${randomRange(8, 35)}s`,
										animationDelay: `-${randomRange(3, 50)}s`
									}}
								/>
							))}
						</div>
					</div>
				))}
			</div>

			<Header />

			<div className="MainSection">
				<HeadIntro />
			</div>

			<Projects />
		</div>
	);
}