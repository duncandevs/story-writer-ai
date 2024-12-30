import * as React from "react";
import * as AvatarPrimitives from "@radix-ui/react-avatar";
import "./styles/avatar.css";
import { cn } from "@/lib/utils";

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export interface AvatarProps {
    /** Source URL for the avatar image */
    src?: string;
    /** Alternative text description for accessibility */
    alt?: string;
    /** Text displayed when image fails to load or isn't provided */
    fallback: string;
    /** Predefined size variant for the avatar */
    size?: AvatarSize;
    /** Additional CSS class names */
    className?: string;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, fallback, size = 'md', className }, ref) => {
      return (
        <div id="core-avatar" ref={ref}>
          <AvatarPrimitives.Root className={`avatar-root size-${size} ${className}`}>
            {src && (
              <AvatarPrimitives.Image
                className="avatar-image"
                src={src}
                alt={alt || fallback}
              />
            )}
          </AvatarPrimitives.Root>
          <span className={cn("status-dot", `size-${size}`)}></span>
        </div>
      );
    }
  );
  

export default Avatar;