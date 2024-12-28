import React, { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";
import createImageFromPrompt from "../together/createImageFromPrompt";

interface ImagePluginProps {
  prompt?: string;
  width?: number;
}

const ImagePlugin: React.FC<ImagePluginProps> = ({ prompt, width=800}) => {
  const [editor] = useLexicalComposerContext();
  const [src, setImageSource] = React.useState<string>();
  
  useEffect(()=>{
    if(prompt) createImageFromPrompt(prompt).then(({ imageSource }) => {
      if(!imageSource) return null;
      setImageSource(imageSource)
    });
  }, [prompt]);
  

  useEffect(() => {
    if(src){
      editor.update(() => {
        const node = $createImageNode({ 
          src, 
          alt: "Editor Image", 
          width,
        });
        $insertNodes([node]);
      });
    }
  }, [editor, src]);

  return null
};

export default ImagePlugin;