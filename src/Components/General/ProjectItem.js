import _ from "lodash";
import React from "react";
import { joinClassNames } from "../../Classes/Constants";
import { useEventListener, useInterval } from "../../Classes/Hooks";
import { Modals, openImageModal } from "../Modals";
import Tooltip from "../Tooltip";
import "./ProjectItem.scss";

export default function ProjectItem(project) {
	const {
		name,
		type,
		description,
		buttons,
		images,
		flags = []
	} = project;

	const ref = React.useRef();

	const [index, _setIndex] = React.useState(0);
	const [targetIndex, setTargetIndex] = React.useState(0);
	const [isTransitioning, setTransitioningState] = React.useState(false);
	const [isInView, setIsInView] = React.useState(false);
	const [hasLargeDescription, setLargeDescription] = React.useState(false);
	const [ready, setReady] = React.useState(false);

	async function setIndex(newIndex) {
		if (isTransitioning || index === newIndex) return;
		setTransitioningState(true);
		setTargetIndex(newIndex);

		await new Promise(r => setTimeout(r, 300));

		_setIndex(newIndex);
		setTransitioningState(false);
	}

	React.useEffect(() => {
		// Load and cache all images
		Promise.all(
			images.map(async image => {
				return new Promise(r => {
					const img = _.assign(
						document.createElement("img"),
						{
							src: image,
							onload: () => r(img),
							onerror: () => r(img),
							style: "display:none"
						}
					);

					document.body.appendChild(img);
				}).then(img => img.remove());
			})
		).then(() => setReady(true));

		// If the images do not load in time, set ready to true
		setTimeout(() => {
			setReady(true);
		}, 3000);
	}, []);

	useInterval(
		() => isInView && ready && setIndex(images[index + 1] ? index + 1 : 0),
		3 * 1000,
		false,
		[index, targetIndex, isTransitioning, isInView, ready]
	);

	useEventListener("scroll", _.debounce(() => {
		const rect = ref.current.getBoundingClientRect();

		setIsInView(rect.y > rect.height / 2 && rect.y < window.innerHeight - (rect.height / 2));
	}, 100));

	function readMore() {
		Modals.push(
			<div className="BaseModal ReadMoreModal">
				<h1>{name}</h1>

				<div
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		);
	}

	return (
		<div className="ProjectItem Flex" ref={ref}>
			<div className="TypeLabelContainer FlexCenter">
				<h5>{type}</h5>
			</div>

			<div className="ImagesSection">
				<div className="ImageContainer" onClick={() => openImageModal(
					images[index],
					() => images
				)}>
					{isTransitioning &&
						<img
							src={images[targetIndex]}
							alt="Image"
						/>
					}

					<img
						src={images[index]}
						alt="Image"
						className={isTransitioning ? "Transitioning" : null}
					/>
				</div>

				<div className="ImageCarousel">
					{images.map((src, i) => (
						<div
							className={joinClassNames("ImgBlip",
								[index === i || targetIndex === i, "Selected"])}
							onClick={() => setIndex(i)}
							key={i}
						/>
					))}
				</div>
			</div>

			<div className="BodySection">
				<h2 className="Name FlexCenter">
					{name}

					{flags.includes("new") && (
						<div className="Tag" style={{ color: "var(--cf-purple)" }}>
							NEW!

							<Tooltip>
								This project is new!
							</Tooltip>
						</div>
					)}

					{flags.includes("wip") && (
						<div className="Tag" style={{ color: "var(--cf-green)" }}>
							WIP

							<Tooltip>
								Work in progress!
							</Tooltip>
						</div>
					)}

					{flags.includes("nsfw") && (
						<div className="Tag" style={{ color: "var(--cf-red)" }}>
							NSFW

							<Tooltip>
								This site contains 18+ content!
							</Tooltip>
						</div>
					)}

					{flags.includes("deprecated") && (
						<div className="Tag" style={{ color: "var(--cf-yellow)" }}>
							Deprecated

							<Tooltip>
								This project will receive no more updates, and is likely to be broken!
							</Tooltip>
						</div>
					)}
				</h2>

				<div
					ref={e => setTimeout(() => {
						// I am sorry for anyone who has to read this.

						e && e.firstElementChild?.getBoundingClientRect().height > 90
							&& !hasLargeDescription && setLargeDescription(true);
					}, 0)}
					className={joinClassNames("Description", [hasLargeDescription, "Large"])}
				>
					<div
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>

				<div className="Buttons">
					{hasLargeDescription && (
						<a style={{ border: "none" }} onClick={readMore}>
							Read More
						</a>
					)}

					{buttons.map((button, index) => (
						<a href={button.link} key={index}>
							{button.title}

							{button.tooltip && <Tooltip>{button.tooltip}</Tooltip>}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}