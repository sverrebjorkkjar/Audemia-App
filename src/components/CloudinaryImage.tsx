import * as React from "react";
import { Image } from "@nativescript/core";
import { formatImageUrl } from '../utils/cloudinary';

interface CloudinaryImageProps {
    url: string;
    width?: number;
    height?: number;
    className?: string;
    format?: string;
}

export function CloudinaryImage({ 
    url, 
    width, 
    height, 
    className = "",
    format
}: CloudinaryImageProps) {
    const optimizedUrl = formatImageUrl(url, { width, height, format });

    return (
        <image
            src={optimizedUrl}
            className={className}
            width={width}
            height={height}
            stretch="aspectFill"
        />
    );
}