export function joinClassNames() {
	let final = "";

	for (let i = 0; i < arguments.length; i++) {
		switch (typeof (arguments[i])) {
			case (Array.isArray(arguments[i]) && typeof (arguments[i][0]) === "boolean" && "object"):
				if (arguments[i][0] === true)
					final += arguments[i][1];
				else if (arguments[i][2])
					final += arguments[i][2];
				break;

			default:
				final += arguments[i];
				break;
		}

		final += " ";
	}

	return final.trim();
}

export function openFileDialog(options = {}) {
	return new Promise(r => {
		const { type = "*", multiple = false } = options;
		const input = _.assign(document.createElement("input"), {
			type: "file",
			accept: type,
			style: "display:none",
			multiple,
			onchange: () => (
				r(input.files),

				document.body.removeChild(input)
			)
		});

		document.body.appendChild(input);
		input.click();
	});
}

/**
 * Converts a number of bytes into a user-readable string.
 * Totally not stolen from stackoverflow and tweaked because I've written this exact function 50 times and still can't remember how to do it because fuck math.
 * @param bytes
 * @param decimals
 * @returns {string}
 */
export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "N/A";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [" bytes", "KB", "MB", "GB", "TB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return (bytes / Math.pow(k, i)).toFixed(dm).toLocaleString() + (sizes[i] ?? sizes[sizes.length - 1]);
}

export function kib(value) {
	return value * 1024;
}

export function mib(value) {
	return kib(value) * 1024;
}

export function getAcronym(input) {
	const split = input.split(/\s/).slice(0, 2);

	return split.map(w => w[0]).join("").toUpperCase();
}

export function formatDateString(date, options = {}) {
	const { prependOn = true } = options;

	const day = 86400000;
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const daysPassed = Math.round(Math.round(Date.now() - date) / day);

	let returnValue;

	if (daysPassed < 0)
		returnValue = "in the future apparently";
	else if (daysPassed === 0)
		returnValue = "today";
	else if (daysPassed === 1)
		returnValue = "yesterday";
	else if (daysPassed < 7)
		returnValue = (prependOn ? "on " : "") + days[date.getDay()];
	else
		returnValue = (prependOn ? "on " : "") + date.toLocaleDateString();

	return returnValue;
}

export function fetchToBase64(url) {
	return new Promise(resolve =>
		fetch(url).then(res => res.blob())
			.then(blob => {
				const reader = new FileReader();

				reader.onload = () => resolve(reader.result);
				reader.readAsDataURL(blob);
			}));
}

const spaghettiAudioCache = {};

export function playSound(src, volume = 1) {
	return new Promise(async resolve => {
		const data = spaghettiAudioCache[src] ?? await fetchToBase64(src).then(base64 => spaghettiAudioCache[src] = base64);
		const audio = Object.assign(new Audio(data), { volume });

		audio.addEventListener("ended", resolve);
		audio.play().catch(err => console.error("Error playing sound!", src, err));
	});
}

export function playSoundLoop(src, volume = 1) {
	const audio = Object.assign(new Audio(spaghettiAudioCache[src]), { volume, loop: true });
	const play = () => audio.play().catch(err => console.error("Error playing sound!", src, err));

	if (spaghettiAudioCache[src] === undefined)
		fetchToBase64(src).then(base64 => [spaghettiAudioCache[src] = audio.src = base64, play()]);
	else play();

	return {
		stop: () => audio.pause(),
		get paused() { return audio.paused; },
		set paused(value) { value ? audio.pause() : audio.play(); }
	};
}

export function formatCamelCase(camelCase) {
	const r = camelCase.replace(/([A-Z])/g, " $1");

	return r.charAt(0).toUpperCase() + r.slice(1);
}

export function formatTimestamp(_time) {
	if (!_time) return "";
	const time = _time?.toDate?.() ?? _time;

	return `${formatDateString(time)} at ${time.toLocaleTimeString("en-US")}`;
}

export function getRandomKey() { return Math.random().toString(36).substring(7); }

export const ActionTypes = {
	UPDATE_ROUTE: "UPDATE_ROUTE",
	UPDATE_PAGE: "UPDATE_PAGE",
	QUEUE_TOAST: "QUEUE_TOAST",
	REMOVE_TOAST: "REMOVE_TOAST",
	CLEAR_TOASTS: "CLEAR_TOASTS"
};