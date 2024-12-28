import { ArrowLeft, Send } from 'lucide-react';
import { EditorTextarea, EditorTextareaLeftContent, EditorTextareaRightContent } from './EditorTextArea';
import { useState } from 'react';

interface ImagePromptAreaProps {
    onSubmit: (prompt: string) => void;
    onBack?: () => void;
    className?: string;
};


export const ImagePromptArea: React.FC<ImagePromptAreaProps> = ({ onSubmit, onBack, className }) => {
    const [prompt, setPrompt] = useState("");
    const handleValueChange = (text: string) => setPrompt(text);
    const handleSubmit = () => onSubmit(prompt);

    return (
        <EditorTextarea onValueChange={handleValueChange} placeholder='Describe a scene or character for image' className={className}>
            <EditorTextareaLeftContent>
                <button onClick={onBack}><ArrowLeft className='hover:stroke-amber-100' /></button>
            </EditorTextareaLeftContent>
            <EditorTextareaRightContent>
                <button onClick={handleSubmit}><Send className='hover:stroke-amber-100' /></button>
            </EditorTextareaRightContent>
        </EditorTextarea>
    )
};