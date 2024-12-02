import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
const cld = new Cloudinary({
    cloud: {
        cloudName: 'your-cloud-name' // Replace with your cloud name
    },
    url: {
        secure: true // Force HTTPS
    }
});

export interface CloudinaryImage {
    url: string;
    width?: number;
    height?: number;
    format?: string;
}

export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
    if (!url) return '';
    
    // If it's already a Cloudinary URL, return as is
    if (url.includes('res.cloudinary.com')) {
        return url;
    }

    // For non-Cloudinary URLs, return the original URL
    return url;
};

export const formatImageUrl = (url: string, options: { width?: number; height?: number; format?: string } = {}): string => {
    const { width, height, format } = options;
    
    if (!url) return '';

    try {
        // Handle direct Cloudinary URLs
        if (url.includes('res.cloudinary.com')) {
            let optimizedUrl = url;
            
            // Add transformations if needed
            if (width || height) {
                optimizedUrl = optimizedUrl.replace('/upload/', `/upload/c_fill,${width ? 'w_' + width : ''},${height ? 'h_' + height : ''}/`);
            }
            
            // Change format if specified
            if (format) {
                optimizedUrl = optimizedUrl.replace(/\.[^/.]+$/, `.${format}`);
            }
            
            return optimizedUrl;
        }
        
        // Return original URL for non-Cloudinary images
        return url;
    } catch (error) {
        console.error('Error formatting image URL:', error);
        return url;
    }
};