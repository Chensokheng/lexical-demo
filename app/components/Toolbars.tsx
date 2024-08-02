import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";

import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	createCommand,
	FORMAT_TEXT_COMMAND,
	LexicalCommand,
	REDO_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useLocalStorage from "../hook/useLocalStorage";

export default function Toolbars() {
	const [editor] = useLexicalComposerContext();
	const { setValue } = useLocalStorage("content");
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	let LowPriority = 1;
	const handleSearch = useDebouncedCallback((term) => {
		setValue(term);
	}, 500);

	const handleHeading = () => {
		editor.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$setBlocksType(selection, () => $createHeadingNode("h1"));
			}
		});
	};

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(
				({ editorState, dirtyElements, dirtyLeaves }) => {
					// Don't update if nothing changed
					if (dirtyElements.size === 0 && dirtyLeaves.size === 0)
						return;

					const serializedState = JSON.stringify(editorState);

					handleSearch(serializedState);
				}
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				1
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				1
			)
		);
	}, [editor, handleSearch]);

	return (
		<div className=" space-x-3 p-3 border-b">
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
				}}
				className={"size-8 bg-gray-200 rounded-md "}
			>
				B
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
				disabled={!canUndo}
				className={"size-8  rounded-md disabled:text-gray-400 "}
			>
				Undo
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined);
				}}
				disabled={!canRedo}
				className={"size-8  rounded-md disabled:text-gray-400 "}
			>
				Redo
			</button>
		</div>
	);
}
