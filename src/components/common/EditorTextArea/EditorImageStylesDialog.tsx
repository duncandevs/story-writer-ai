import React from "react";
import { Button } from "@/components/ui/button";
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { EditorImageStyleItem } from "./EditorImageStyleItem";

interface EditorImageStylesDialogProps {
    children: React.ReactNode;
}

const imageSrcOne = require("../../../../public/images/image-style-art-toon-island.png")

export const EditorImageStylesDialog: React.FC<EditorImageStylesDialogProps> = ({ children }) => (
	<DialogRoot>
		<DialogTrigger asChild>
			{children}
		</DialogTrigger>
		<DialogContent>
            <DialogTitle>Testin</DialogTitle>
            <EditorImageStyleItem imgSrc={imageSrcOne} title="Island" onClick={()=>alert('handle image style')} />
		</DialogContent>
	</DialogRoot>
);