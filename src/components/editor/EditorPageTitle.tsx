import React, { useState, useEffect } from 'react';

interface PageTitleInputProps {
  initialTitle: string;
  onUpdateTitle: (newTitle: string) => void;
  className?: string;
}

export const EditorPageTitleInput: React.FC<PageTitleInputProps> = ({ initialTitle, onUpdateTitle, className }) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if(initialTitle) setTitle(initialTitle); // Set the initial title when the component mounts
  }, [initialTitle]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onUpdateTitle(newTitle); // Call the update function
  };

  return (
    <input
      type="text"
      value={title}
      onChange={handleChange}
      placeholder="Enter page title"
      className={className}
    />
  );
};