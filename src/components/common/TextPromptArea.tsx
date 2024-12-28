import { ArrowLeft, Send } from 'lucide-react';
import { EditorTextarea, EditorTextareaLeftContent, EditorTextareaRightContent } from './EditorTextArea';
import { useState } from 'react';

interface TextPromptAreaProps {
    className?: string;
    onSubmit: (prompt: string) => void;
    onBack?: () => void;
};

export const TextPromptArea: React.FC<TextPromptAreaProps> = ({ onSubmit, onBack, className }) => {
    const [prompt, setPrompt] = useState("");
    const handleValueChange = (text: string) => setPrompt(text);
    const handleSubmit = () => onSubmit(prompt);

    return (
        <EditorTextarea onValueChange={handleValueChange} placeholder='describe a scene or character' className={className}>
            <EditorTextareaLeftContent>
                <button onClick={onBack}><ArrowLeft className='hover:stroke-amber-100'/></button>
            </EditorTextareaLeftContent>
            <EditorTextareaRightContent>
                <button onClick={handleSubmit}><Send className='hover:stroke-amber-100' /></button>
            </EditorTextareaRightContent>
        </EditorTextarea>
    )
};