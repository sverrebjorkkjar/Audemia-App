import * as React from "react";
import { AudemiaTheme } from '../styles/theme';

interface BookCardProps {
    title: string;
    author: string;
    publisher: string;
    price: string;
    rating: number;
    onPlayPreview: () => void;
    onToggleFavorite: () => void;
    isFavorite: boolean;
}

export function BookCard({
    title,
    author,
    publisher,
    price,
    rating,
    onPlayPreview,
    onToggleFavorite,
    isFavorite
}: BookCardProps) {
    return (
        <flexboxLayout 
            className="m-2 p-4 rounded-lg bg-white shadow-md"
            width="95%"
        >
            <flexboxLayout flexDirection="row">
                {/* Book cover placeholder */}
                <flexboxLayout 
                    className="rounded-lg bg-gray-100 justify-center items-center"
                    width="80" 
                    height="120"
                >
                    <label
                        className="fas text-3xl"
                        color={AudemiaTheme.colors.primary}
                    >
                        &#xf025;
                    </label>
                </flexboxLayout>

                {/* Book details */}
                <flexboxLayout flexDirection="column" flexGrow="1" marginLeft="12">
                    <flexboxLayout flexDirection="row" justifyContent="space-between">
                        <label 
                            text={title}
                            className="font-bold text-lg"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            className={`fas ${isFavorite ? 'text-yellow-500' : ''}`}
                            text={isFavorite ? '&#xf005;' : '&#xf006;'}
                            onTap={onToggleFavorite}
                        />
                    </flexboxLayout>

                    <label 
                        text={author}
                        className="text-sm text-gray-600"
                    />
                    
                    <label 
                        text={publisher}
                        className="text-xs text-gray-500 mb-2"
                    />

                    {/* Rating stars */}
                    <flexboxLayout flexDirection="row" marginTop="4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label
                                key={star}
                                className="fas text-sm mr-1"
                                color={star <= rating ? '#FFD700' : '#D3D3D3'}
                                text="&#xf005;"
                            />
                        ))}
                    </flexboxLayout>

                    <label 
                        text={price}
                        className="text-sm font-bold mt-2"
                        color={AudemiaTheme.colors.primary}
                    />

                    <button
                        text="Hør utdrag"
                        className="text-sm p-2 mt-2 rounded-lg text-white"
                        backgroundColor={AudemiaTheme.colors.primary}
                        onTap={onPlayPreview}
                    />
                </flexboxLayout>
            </flexboxLayout>
        </flexboxLayout>
    );
}