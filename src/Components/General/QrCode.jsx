import QRCode from "qrcode";
import React from "react";
import "./QrCode.scss";

export default function QrCode({ children, size = 200 }) {
	const canvasRef = React.useRef(null);

	React.useEffect(() => {
		if (canvasRef.current) {
			QRCode.toCanvas(canvasRef.current, children, {
				width: size,
				color: {
					dark: "#2c3946",
					light: "#c3ccd4"
				}
			});
		}
	}, [children]);

	return (
		<div className="QrCode">
			<canvas
				width={size}
				height={size}
				ref={canvasRef}
			/>
		</div>
	);
}