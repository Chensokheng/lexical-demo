"use client";
import {
	$getRoot,
	$getSelection,
	EditorState,
	FORMAT_TEXT_COMMAND,
} from "lexical";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import Toolbars from "./components/Toolbars";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import dynamic from "next/dynamic";
import useLocalStorage from "./hook/useLocalStorage";

import { exampleUsage } from "./lib/util";
import Editor from "./components/Editor";

const theme = {
	ltr: "ltr",
	rtl: "rtl",
	paragraph: "text-base text-blue-600",
	quote: "editor-quote",
	heading: {
		h1: "text-3xl font-bold",
		h2: "text-lg",
		h3: "text-base",
	},
	list: {
		nested: {
			listitem: "editor-nested-listitem",
		},
		ol: "editor-list-ol",
		ul: "editor-list-ul",
		listitem: "editor-listItem",
		listitemChecked: "editor-listItemChecked",
		listitemUnchecked: "editor-listItemUnchecked",
	},
	hashtag: "editor-hashtag",
	image: "editor-image",
	link: "editor-link",
	text: {
		bold: "font-bold",
		code: "editor-textCode",
		italic: "italic",
		strikethrough: "editor-textStrikethrough",
		subscript: "editor-textSubscript",
		superscript: "editor-textSuperscript",
		underline: "editor-textUnderline",
		underlineStrikethrough: "editor-textUnderlineStrikethrough",
	},
	code: "editor-code",
	codeHighlight: {
		atrule: "editor-tokenAttr",
		attr: "editor-tokenAttr",
		boolean: "editor-tokenProperty",
		builtin: "editor-tokenSelector",
		cdata: "editor-tokenComment",
		char: "editor-tokenSelector",
		class: "editor-tokenFunction",
		"class-name": "editor-tokenFunction",
		comment: "editor-tokenComment",
		constant: "editor-tokenProperty",
		deleted: "editor-tokenProperty",
		doctype: "editor-tokenComment",
		entity: "editor-tokenOperator",
		function: "editor-tokenFunction",
		important: "editor-tokenVariable",
		inserted: "editor-tokenSelector",
		keyword: "editor-tokenAttr",
		namespace: "editor-tokenVariable",
		number: "editor-tokenProperty",
		operator: "editor-tokenOperator",
		prolog: "editor-tokenComment",
		property: "editor-tokenProperty",
		punctuation: "editor-tokenPunctuation",
		regex: "editor-tokenVariable",
		selector: "editor-tokenSelector",
		string: "editor-tokenSelector",
		symbol: "editor-tokenProperty",
		tag: "editor-tokenProperty",
		url: "editor-tokenOperator",
		variable: "editor-tokenVariable",
	},
};

function onError(error: any) {
	console.error(error);
}

export default function Page() {
	return (
		<div className=" py-10  bg-slate-100 h-screen">
			<div className=" max-w-4xl mx-auto border focus:outline-none h-[70vh] p-5 rounded-md bg-white">
				<Editor />
			</div>
		</div>
	);
}
