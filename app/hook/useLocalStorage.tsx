import React, { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
	const [value, updateValue] = useState<string | null>(null);

	const setValue = (content: string) => {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, content);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			updateValue(() => localStorage.getItem("content"));
		}
	}, [value, key]);

	return { value, setValue };
}
