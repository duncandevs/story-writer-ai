import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import '@/components/ui/styles/dialog.css';


export const DialogRoot = DialogPrimitive.Root;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

export const DialogTitle = ({...props}) => <DialogPrimitive.Title className={cn("DialogTitle", props.className)} {...props} />;

export const DialogOverlay = ({...props}) => <DialogPrimitive.Overlay className={cn("DialogOverlay", props.className)} {...props} />;

export const DialogDescription = ({...props}) => <DialogPrimitive.Description className={cn("DialogDescription", props.className)} {...props} />;

export const DialogContentComp = ({ ...props }) => <DialogPrimitive.Content className={cn("DialogContent", props.className)} {...props}/>;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({ ...props }) => <DialogPortal>;
    <DialogOverlay />
    <DialogContentComp>
        {props.children}
    </DialogContentComp>
</DialogPortal>;
