import React from "react";
import * as Feather from "react-feather";
import "./App.scss";
import Heart from "./Assets/TwemojiHeart.svg";
import { joinClassNames } from "./Classes/Constants";
import { useEventListener, useMediaQuery } from "./Classes/Hooks";
import ContextMenu from "./Components/ContextMenuHandler";
import { Modals } from "./Components/Modals";
import PageFooter from "./Components/PageElements/PageFooter";
import Toasts from "./Components/Toasts";
import ContactPage from "./Pages/ContactPage";
import DonatePage from "./Pages/DonatePage";
import HomePage, { age, randomRange } from "./Pages/Home";
import "./city-fog-theme.css";

window.addEventListener("popstate", () => {
	App.forceUpdate?.();
});

function PageElement() {
	// Store the formatted hash in a variable.
	const [hash, ...args] = window.location.pathname.split("/").slice(1);

	// Set the app hash value.
	App.hash = hash;

	setTimeout(() => {
		if (Modals.instance?.state?.stack?.length === 0) {
			const hash = window.location.hash.slice(1);

			switch (hash) {
				case "about_me":
					Modals.push(
						<div className="BaseModal ReadMoreModal AboutMeModal" ref={e => !e && (window.location.hash = "")}>
							<h2>About me, personally.</h2>

							<br />

							<div className="HomePage"
								style={{ "--secondary-color": "var(--txt-color)" }}>
								<div className="HeadIntro">
									<h1><b><span>while</span></b> (<b>!</b><i>sleeping</i>) {"{"}</h1>
									<h1><b style={{ marginLeft: 40 }}>code</b>();</h1>
									<h1>{"}"}</h1>
								</div>
							</div>

							<br />

							<h4>
								<div className="Flex">
									<Feather.User /> Gender, Pronouns
								</div>

								<p>Male, He/Him</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Activity /> Age
								</div>

								<p>{age} years old</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Gift /> Birthday
								</div>

								<p>May 20th</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Flag /> Sexuality
								</div>

								<p>Gay</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Heart /> Relationship Status
								</div>

								<p>Engaged ♥</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Music /> Favorite Music Genres
								</div>

								<p>Metal and Synthwave</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Tv /> Favorite Shows
								</div>

								<p>Blue Exorcist, Fairy Tail, Edens Zero, My Hero Academia, Futurama</p>
							</h4>

							<h4 style={{ color: "var(--cf-purple)" }}>
								<div className="Flex">
									<Feather.Droplet /> Favorite Color
								</div>

								<p>Pastel Purple <img src={Heart} alt="♥" width={15} height={15} /></p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Truck /> Favorite Foods
								</div>

								<p>Burgers and ice cream. The healthy stuff.</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.Coffee /> Favorite Drink
								</div>

								<p>Seltzer. Seltzer. Seltzer.</p>
							</h4>

							<h4>
								<div className="Flex">
									<Feather.CloudLightning /> Favorite Weather
								</div>

								<p>Storms, rain, and snow ♥</p>
							</h4>
						</div>
					);
					break;
			}
		}
	}, 0);

	// Zhu Li, do the thing!
	switch (hash) {
		default: return <HomePage />;

		case "contact": {
			return <ContactPage />;
		}

		case "donate": {
			return <DonatePage />;
		}
	}
}

function StarField({ index }) {
	const size = React.useMemo(() => randomRange(1, 2) + (index / 2), []);
	const field = React.useMemo(() => {
		const field = [];

		for (let i = 0; i < randomRange((window.innerWidth / 1920) * 150, (window.innerWidth / 1920) * 220); i++) {
			field.push(
				`${randomRange(0, 100)}vw ${randomRange(0, 200)}vh var(--txt-color)`
			);
		}

		return field.join();
	}, []);

	const [offset, setOffset] = React.useState(0);

	useEventListener("scroll", () => {
		setOffset(-window.scrollY);
	});

	return (
		<div
			className="StarField"
			style={{
				width: size,
				height: size,
				boxShadow: field,
				transform: `translateY(${(offset / (window.outerHeight / 5)) * (index * 1.3)}vh)`,
				opacity: Math.max(0.5, index / 4)
			}}
		/>
	);
}

export default function App() {
	const isMobile = useMediaQuery("max-width", 1000);
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	App.forceUpdate = forceUpdate;

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className="Main">
				<StarField index={1} />
				<StarField index={2} />
				<StarField index={3} />
				<StarField index={4} />

				<PageElement />
			</div>

			<PageFooter />

			<Modals />
			<Toasts />
			<ContextMenu.Handler />
		</div>
	);
}