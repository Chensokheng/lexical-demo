function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const text = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
export const loadingText = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"loading..","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
// Usage example with async/await
export function exampleUsage() {
	return text;
}
