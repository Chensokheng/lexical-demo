import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_TEXT_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import React, { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { useDebouncedCallback } from "use-debounce";

export default function Toolbars() {
	const [editor] = useLexicalComposerContext();
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			// Update text format
			setIsBold(selection.hasFormat("bold"));
			setIsItalic(selection.hasFormat("italic"));
		}
	}, []);

	const handleSave = useDebouncedCallback((content) => {
		console.log(content);
	}, 500);

	useEffect(() => {
		mergeRegister(
			editor.registerUpdateListener(
				({ editorState, dirtyElements, dirtyLeaves }) => {
					editorState.read(() => {
						$updateToolbar();
					});
					if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
						return;
					}
					handleSave(JSON.stringify(editorState));
				}
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				1
			)
		);
	}, [editor, $updateToolbar]);

	const handleHeading = () => {
		editor.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				// Update text format
				$setBlocksType(selection, () => $createHeadingNode("h1"));
			}
		});
	};

	return (
		<div className=" space-x-3">
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
				}}
				className={` size-8 rounded-md ${isBold ? "bg-gray-200" : ""}`}
			>
				B
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
				}}
				className={` size-8 rounded-md italic ${
					isItalic ? "bg-gray-200" : ""
				}`}
			>
				i
			</button>
			<button onClick={handleHeading} className={` size-8 rounded-md `}>
				h1
			</button>
			<button
				disabled={!canUndo}
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
				className="toolbar-item spaced disabled:text-gray-500"
				aria-label="Undo"
			>
				undo
			</button>
		</div>
	);
}
