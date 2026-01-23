import { useState } from "react";

export default function TestCounter() {
	const [count, setCount] = useState(0);

	return (
		<button
			onClick={() => setCount((c) => c + 1)}
			className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.98]"
		>
			Count: {count}
		</button>
	);
}
