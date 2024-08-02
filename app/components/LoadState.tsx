import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import { text } from "../lib/util";

export default function LoadState() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const newState = editor.parseEditorState(
			localStorage.getItem("content") || text
		);
		editor.setEditorState(newState);
		editor.setEditable(true);
	}, [editor]);

	return <></>;
}
