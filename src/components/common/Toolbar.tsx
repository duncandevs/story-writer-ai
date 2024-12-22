import React from 'react';
import { cn } from '@/lib/utils';

import './Toolbar.css';

interface ToolbarProps {
    children: React.ReactNode;
    classNames?: string
};

interface ToolbarContentProps {
    children: React.ReactNode;
    classNames?: string
};

interface ToolbarActionProps {
    children: React.ReactNode;
    onClick: () => void;
};

export const Toolbar: React.FC<ToolbarProps> = ({ ...props }) => (
    <div {...props} className={cn("Toolbar", props.classNames)}/>
);

export const ToolbarContent: React.FC<ToolbarContentProps> = ({ ...props }) => (
    <div {...props} className={cn("ToolbarContent flex space-x-5", props.classNames)}/>
);

export const ToolbarAction: React.FC<ToolbarActionProps> = ({ ...props }) => (
    <button {...props} className="ToolbarAction"/>
);

export const ToolbarDivider = () => (
   <div className="ToolbarDivider" />
);