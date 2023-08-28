import _ from "lodash";
import React, { useState } from "react";
import { Coffee, GitHub, Home, MessageCircle } from "react-feather";
import { Window } from "../App";
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
			"https://raw.githubusercontent.com/Metalloriff/metalloriff.github.io/master/projects.json",
			{ cache: "no-cache" }
		).then(r => r.json()).catch(err => {
			console.error(err);
			Toasts.showToast("There was an error fetching projects!", "Failure");
		})
	);

	const [category, setCategory] = useState("featured");

	return data ? (
		<div className="Projects">
			<h1>Projects</h1>

			<div className="Tabs FlexCenter" onClick={e => {
				const cat = e.target.getAttribute("data-cat");
				if (!cat) return;

				setCategory(cat);

				[...e.currentTarget.childNodes].forEach(e => e.classList.remove("Current"));
				e.target.classList.add("Current");
			}}>
				<div className="Tab" data-cat="all">All</div>
				<div className="Tab Current" data-cat="featured">Featured</div>
				<div className="Tab" data-cat="websites">Websites</div>
				<div className="Tab" data-cat="games">Games</div>
				<div className="Tab" data-cat="software">Software</div>
				<div className="Tab" data-cat="dev">For Developers</div>
			</div>

			{data.projects.filter(project => category === "all" || (project.categories || []).includes(category)).map((project, index) => (
				<ProjectItem {...project} key={index} />
			))}

			{category !== "all" && (
				<div className="FlexCenter ThatsNotAllFolks">
					<Window title="That's not all!">
						<p>
							Scroll to the top of the projects section to see the different categories available!
						</p>
					</Window>
				</div>
			)}
		</div>
	) : <InlineLoading />;
}

export function Header() {
	return (
		<header className="Header FlexCenter Col">
			<div className="FlexCenter">
				<img src={Logo} alt="Rifu" className="Logo" />

				<h1 className="Title">kinzoku<span>.one</span></h1>
			</div>

			<div className="HeaderButtons FlexCenter">
				<LinkWrapper
					href="/"
					className="Button FlexCenter Col"
				>
					<Home />

					<h4>HOME</h4>
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

			<h1>A passionate hobbyist <b>[</b></h1>
			<h1><b style={{ marginLeft: 40 }}><span>Web</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Software</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Game </span></b></h1>
			<h1><b>]</b> developer <b>&&</b> designer;</h1>

			<h1><br /></h1>

			<h1 data-scroll-to={true}>Some of my hobbies include <b>[</b></h1>
			<h1><b style={{ marginLeft: 40 }}><a href="https://github.com/metalloriff">Programming</a></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><a href="https://www.printables.com/@Metalloriff_1158555">3D Printing</a></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Digital Art</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>AI Art</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><a href="https://soundcloud.com/metalloriff">Music Production</a></b></h1>
			<h1><b>]</b>;</h1>

			<h1><br /></h1>

			<h1 data-scroll-to={true}>I work with <b>[</b></h1>
			<h1><b style={{ marginLeft: 40 }}><i>// Fluent</i></b>   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>JavaScript</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>CSS <b>||</b> SCSS</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>ReactJS</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>HTML</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>C#</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Python</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span><b>(</b>3D <b>||</b> 2D<b>)</b> Animation</span></b>,  </h1>

			<h1><br /></h1>

			<h1><b style={{ marginLeft: 40 }}><i>// Intermediate</i></b>   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Java</span></b>,   </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Lua</span></b>,  </h1>
			<h1><b style={{ marginLeft: 40 }}><span>3D Modeling</span></b>,  </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Digital Art</span></b>,  </h1>
			<h1><b style={{ marginLeft: 40 }}><span>Vector Design</span></b>  </h1>
			<h1><b>]</b>;</h1>

			<h1><br /></h1>

			<h1>You can view my  </h1>
			<h1 data-scroll-to={true}>personal projects <b>below</b>.  </h1>

			<h1><br /></h1>

			<h1>Contact/hire me <b><a href="/contact">here</a></b>!</h1>

			<h1><br /></h1>

			<h1>Any <b>donations</b> are    </h1>
			<h1>much appreciated! <b><span>{"<3"}</span></b>     </h1>
			<h1>You can donate <b><a href="/donate">here</a></b>.</h1>
		</div>
	);
}

export function randomRange(min, max) {
	if (min > max) {
		[min, max] = [max, min];
	}

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