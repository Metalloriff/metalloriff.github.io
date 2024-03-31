import "./SwitchItem.scss";

export default function SwitchItem({ children, defaultValue, callback }) {
	return (
		<div className="SwitchItem">
			<div className="Title">{children}</div>

			<input className="Switch"
				type="checkbox"
				defaultChecked={defaultValue}
				onInput={e => callback?.(e.currentTarget.checked)} />
		</div>
	);
}