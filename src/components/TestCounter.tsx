import { useState } from "react";

export default function TestCounter() {
	const [count, setCount] = useState(0);

	return (
		<button
			onClick={() => setCount((c) => c + 1)}
			style={{
				padding: "0.5rem 1rem",
				borderRadius: "8px",
				border: "1px solid currentColor",
				background: "transparent",
				cursor: "pointer",
			}}
		>
			Count: {count}
		</button>
	);
}
