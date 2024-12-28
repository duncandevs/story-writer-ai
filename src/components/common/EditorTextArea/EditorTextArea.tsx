import React from "react";
import { cn } from "@/lib/utils";
import './EditorTextArea.css';


interface EditorTextareaProps {
    className?: string;
    children?: React.ReactNode;
    onValueChange: (text:string) => void; 
    placeholder: string;
};
const EditorTextarea: React.FC<EditorTextareaProps> = ({ className, onValueChange, placeholder, ...props }) => {
  return (
        <div {...props} className={cn("EditorTextarea", className)}>
            <textarea
                className={cn(
                    "EditorTextareaField",
                    className
                )}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
            />
            <div className="EditorTextareaTools">{props.children}</div>
        </div>
    )
};

interface EditorTextareaLeftContentProps {
    className?: string;
    children?: React.ReactNode; 
};
const EditorTextareaLeftContent: React.FC<EditorTextareaLeftContentProps> = ({ className, ...props }) => {
    return (
        <div {...props} className={cn("EditorTextareaLeftContent", className)}/>
    )
};

interface EditorTextareaRightContentProps {
    className?: string;
    children?: React.ReactNode; 
};
const EditorTextareaRightContent: React.FC<EditorTextareaRightContentProps> = ({ className, ...props }) => {
    return (
        <div {...props} className={cn("EditorTextareaRightContent", className)}/>
    )
};
 
export { EditorTextarea, EditorTextareaLeftContent, EditorTextareaRightContent };
