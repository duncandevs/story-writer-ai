import React, { CSSProperties, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  TextFormatType,
  $isTextNode,
  TextNode
} from "lexical";
import { RichTextAction } from "@/constants";
import { RichTextToolbarUI } from "@/components/editor/RichTextToolbarUI";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";
import { ImagePromptArea } from "@/components/editor/ImagePromptArea";
import StreamTextPlugin from "./StreamAITextPlugin";
import ImagePlugin from "./ImagePlugin";
import { TextPromptArea } from "@/components/editor/TextPromptArea";
import { cn } from "../utils";
import { css } from "@emotion/css";

interface ToolbarProps {
    className?: string;
}

const toolbarStyles: CSSProperties = {
    position: 'fixed', 
    left: 0, 
    right: 0, 
    bottom: '10%',
    marginInline: 'auto', 
    width: "fit-content",
};

const promptAreaStyles: CSSProperties = {
  position: 'fixed', 
  left: 0, 
  right: 0, 
  bottom: '8%',
};


const _mergeNodeStyle = (node: TextNode, styles = {}) => {
    // Get existing styles from the node
    let nodeStyles = node.__style || "";
  
    // Parse existing styles into an object
    const styleObj: { [key: string]: string } = {};
    nodeStyles.split(";").forEach((style) => {
      const [key, value] = style.split(":").map((s) => s.trim());
      if (key && value) {
        styleObj[key] = value;
      }
    });
  
    // Iterate through new styles and toggle them
    for (const [key, value] of Object.entries(styles)) {
      if (styleObj[key] === value) {
        // If the style exists with the same value, remove it
        delete styleObj[key];
      } else {
        // Otherwise, add or update the style
        styleObj[key] = value as string;
      }
    }
  
    // Convert the updated styles back into a CSS string
    const newStyleString = Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
  
    // Set the new style string to the node
    node.setStyle(newStyleString);
};
  

export const ToolbarPlugin: React.FC<ToolbarProps> = ({ className }) => {
  const [editor] = useLexicalComposerContext();
  const [selectionMap, setSelectionMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setSelectionMap({
        [RichTextAction.Bold]: selection.hasFormat("bold"),
        [RichTextAction.Italics]: selection.hasFormat("italic"),
        [RichTextAction.Underline]: selection.hasFormat("underline"),
      });
    }
  };

  const toggleStyle = (style: TextFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(style); // Use formatText directly on RangeSelection
      }
    });
  };

  const applyFontSize = (size: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const textNodes = selection.getNodes();
        textNodes.forEach((node) => {
            if($isTextNode(node)) {
                _mergeNodeStyle(node, { "font-size": size })
            }
        });
      }
    });
  };

  const applyUppercase= () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const textNodes = selection.getNodes();
        textNodes.forEach((node) => {
            if($isTextNode(node)) {
                console.log(node.__style)
                _mergeNodeStyle(node, { "text-transform": "uppercase" })
            }
        });
      }
    });
  };

  const onAddImage = () => {
    let src = "https://image.lexica.art/full_webp/29d41c95-42cf-428d-aefa-0c1405e371b6"
    editor.update(() => {
      const node = $createImageNode({ src, alt: "Dummy text", width: 1000 });
      $insertNodes([node]);
    });
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor]);

  const [msgs, setMsgs] = useState<string[]>([])
  const [imagePrompt, setImagePrompt] = useState<string>();
  const [activePromptArea, setActivePromptArea] = useState<"text" | "image" | null>(null);

  const toggleImagePrompt = () => setActivePromptArea("image");
  const toggleTextPrompt = () => setActivePromptArea("text");
  const onRemovePromptArea = () => setActivePromptArea(null);

  return (
    <div>
        {activePromptArea === null && 
            <RichTextToolbarUI 
                className={cn(className, css({...toolbarStyles}))}
                onAIImageAction={toggleImagePrompt}
                onAITextAction={toggleTextPrompt}
                onUppercaseAction={applyUppercase}
                onBoldAction={() => toggleStyle("bold")}
                onItalicAction={() => toggleStyle("italic")}
                onHeaderTypeAction={() => applyFontSize("40px")}
                onSubheaderTypeAction={() => applyFontSize("32px")}
            />
        }
        {activePromptArea === "image" && 
            <div className={css({...promptAreaStyles})}>
                <ImagePromptArea onSubmit={(prompt:string) => setImagePrompt(prompt)} onBack={onRemovePromptArea}/>
            </div>
        }
        {activePromptArea === "text" && 
            <div className={css({...promptAreaStyles})}>
                <TextPromptArea onSubmit={(prompt:string) => setMsgs([prompt])} onBack={onRemovePromptArea}/>
            </div>
        }
        <ImagePlugin prompt={imagePrompt} />
        <StreamTextPlugin userMessages={msgs} options={{}}/>
    </div>
  );
}
