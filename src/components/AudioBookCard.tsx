import * as React from "react";
import { useNavigation } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { CloudinaryImage } from './CloudinaryImage';
import { Icons } from '../utils/icons';

interface AudioBookCardProps {
    id: string;
    title: string;
    author: string;
    publisher: string;
    price: string;
    coverImage?: string;
    description?: string;
    onPlayPreview: () => void;
}

export function AudioBookCard({
    id,
    title,
    author,
    publisher,
    price,
    coverImage,
    description,
    onPlayPreview
}: AudioBookCardProps) {
    const navigation = useNavigation<FrameNavigationProp<NavigationParamList>>();

    const authors = author.split(', ').join(', ');

    const handlePurchase = () => {
        navigation.navigate('Purchase', {
            book: {
                id,
                title,
                author,
                publisher,
                price,
                coverImage,
                description,
                tags: []
            }
        });
    };

    const handlePlayPreview = () => {
        navigation.navigate('AudioPreview', {
            book: {
                id,
                title,
                author,
                publisher,
                price,
                coverImage,
                description,
                tags: []
            }
        });
    };

    return (
        <gridLayout
            className="m-2 bg-white rounded-lg border border-gray-200"
            width="160"
            rows="160, auto, auto, auto"  // Dynamic content size
            style={{ elevation: 2, display: 'flex', flexDirection: 'column', minHeight: 450 }}
        >
            {/* Book Cover Image or Icon */}
            <gridLayout
                row="0"
                className="rounded-t-lg border-b border-gray-200"
                style={{ width: 160, height: 160 }}
            >
                {coverImage ? (
                    <CloudinaryImage
                        url={coverImage}
                        width={160}
                        height={160}
                        className="rounded-t-lg"
                        format="webp"
                    />
                ) : (
                    <stackLayout
                        className="bg-gray-100 w-full h-full"
                    />
                )}
            </gridLayout>

            {/* Book Details */}
            <stackLayout 
                row="1"
                className="p-4"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}
            >
                {/* Title */}
                <label 
                    text={title}
                    className="font-bold text-sm"
                    textWrap="true"
                    color={AudemiaTheme.colors.primary}
                    style={{ marginBottom: 4, lineHeight: 0, minHeight: 40 }} // For multi-line title
                />

                {/* Author */}
                <label 
                    text={authors}
                    className="text-xs text-gray-600"
                    textWrap="true"
                    style={{ marginBottom: 4 }}
                />
                
                {/* Publisher */}
                <label 
                    text={publisher}
                    className="text-xs text-gray-500"
                    textWrap="true"
                    style={{ marginBottom: 8 }}  // Space before price
                />


                {/* Price */}
                <label 
                    text={price}
                    className="text-sm font-bold"
                    color={AudemiaTheme.colors.primary}
                    style={{ marginBottom: 8 }}  // Space before buttons
                />

                {/* Preview and Purchase Buttons */}
                <button
                    text="Lydprøve"
                    className="text-xs p-2 mt-2 rounded-lg text-white"
                    backgroundColor={AudemiaTheme.colors.primary}
                    onTap={handlePlayPreview}
                    style={{ marginBottom: 8 }}  // Space between buttons
                />
                <button
                    text="Kjøp"
                    className="text-xs p-2 mt-2 rounded-lg"
                    backgroundColor={AudemiaTheme.colors.secondary}
                    color={AudemiaTheme.colors.primary}
                    onTap={handlePurchase}
                />
            </stackLayout>
        </gridLayout>
    );
}