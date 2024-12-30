import Image from "next/image";
import React from "react";
import { css } from "@emotion/css";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface EditorImagePromptPickerProps {

};


export const EditorImagePromptPicker: React.FC<EditorImagePromptPickerProps> = () => {
   return  <div className="EditorImagePromptPicker flex items-center gap-4 cursor-pointer group">
        <div className="flex">
            <Button size="icon" className="z-[3] w-[48px] h-[48px]">
                <ImageIcon className="group-hover:stroke-amber-100"/>
            </Button>
            <div className="flex ml-[-20px]">
                <Image alt="styles-1" src={require("../../../../public/images/image-styles-1.png")} width={48} height={48} className="z-[2] group-hover:animate-spreadAndTilt"/>
                <Image alt="styles-2" src={require("../../../../public/images/image-styles-2.png")} width={48} height={48} className="ml-[-20px] group-hover:animate-spreadAndTilt group-hover:delay-200"/>
            </div>
        </div>
        <p className="hover:text-amber-100">ART STYLES</p>
    </div>
};