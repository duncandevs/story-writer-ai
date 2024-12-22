import React from 'react';
import './Toolbar.css';

interface ToolbarProps {};

interface ToolbarActionProps {
    children: React.ReactElement;
    onClick: () => void;
};

export const Toolbar: React.FC<ToolbarProps> = ({ ...props }) => (
    <div {...props} className="Toolbar"/>
);

export const ToolbarContent: React.FC<ToolbarProps> = ({ ...props }) => (
    <div {...props} className="ToolbarContent flex space-x-5"/>
);

export const ToolbarAction: React.FC<ToolbarActionProps> = ({ ...props }) => (
    <button {...props} className="ToolbarAction"/>
);

export const ToolbarDivider = () => (
   <div className="ToolbarDivider" />
);