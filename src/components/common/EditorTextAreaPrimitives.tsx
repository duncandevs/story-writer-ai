import React from "react";
import { cn } from "@/lib/utils";


interface EditorTextareaProps {
    className: string;
};
const EditorTextarea: React.FC<EditorTextareaProps> = ({ className, ...props }) => {
  return (
        <div {...props} className={cn("EditorTextarea", className)}>
            <textarea
                className={cn(
                    "EditorTextarea",
                    className
                )}
            />
        </div>
    )
};

interface EditorTextareaLeftContentProps {
    className: string;
};
const EditorTextareaLeftContent: React.FC<EditorTextareaLeftContentProps> = ({ className, ...props }) => {
    return (
        <div {...props} className={cn("EditorTextareaLeftContent", className)}/>
    )
};

interface EditorTextareaRightContentProps {
    className: string;
};
const EditorTextareaRightContent: React.FC<EditorTextareaRightContentProps> = ({ className, ...props }) => {
    return (
        <div {...props} className={cn("EditorTextareaRightContent", className)}/>
    )
};
 
export { EditorTextarea, EditorTextareaLeftContent, EditorTextareaRightContent };
