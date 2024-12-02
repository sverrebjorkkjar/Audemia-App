import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { Icons } from '../../utils/icons';
import { CloudinaryImage } from '../CloudinaryImage';

interface LibraryBook {
    id: string;
    title: string;
    author: string;
    progress: number;
    lastPlayed: string;
    coverImage?: string;
}

interface LibraryBookCardProps {
    book: LibraryBook;
    onPlay: () => void;
}

export function LibraryBookCard({ book, onPlay }: LibraryBookCardProps) {
    return (
        <gridLayout
            className="mb-4 p-4 rounded-xl bg-white"
            rows="auto"
            columns="auto, *, auto"
            style={{ elevation: 2 }}
        >
            {/* Book Cover */}
            <gridLayout
                col="0"
                className="w-16 h-16 rounded-lg bg-gray-100"
            >
                {book.coverImage ? (
                    <CloudinaryImage
                        url={book.coverImage}
                        width={64}
                        height={64}
                        className="rounded-lg"
                        format="webp"
                    />
                ) : (
                    <flexboxLayout
                        className="w-full h-full"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <label
                            className="fas text-2xl"
                            text={Icons.book}
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                )}
            </gridLayout>

            {/* Book Info */}
            <stackLayout col="1" className="ml-4">
                <label
                    text={book.title}
                    className="font-bold mb-1"
                    color={AudemiaTheme.colors.primary}
                    textWrap="true"
                />
                <label
                    text={book.author}
                    className="text-sm text-gray-600 mb-2"
                    textWrap="true"
                />
                
                {/* Progress Bar */}
                <gridLayout rows="auto" columns="*, auto" className="mb-1">
                    <stackLayout col="0" className="h-2 rounded-full bg-gray-200">
                        <stackLayout
                            className="h-2 rounded-full"
                            backgroundColor={AudemiaTheme.colors.primary}
                            width={`${book.progress}%`}
                        />
                    </stackLayout>
                    <label
                        col="1"
                        text={`${book.progress}%`}
                        className="text-xs ml-2"
                        color={AudemiaTheme.colors.primary}
                    />
                </gridLayout>
                
                <label
                    text={`Sist spilt: ${book.lastPlayed}`}
                    className="text-xs text-gray-500"
                />
            </stackLayout>

            {/* Play Button */}
            <flexboxLayout
                col="2"
                className="w-10 h-10 rounded-full bg-gray-100"
                justifyContent="center"
                alignItems="center"
                onTap={onPlay}
            >
                <label
                    className="fas"
                    text={Icons.play}
                    color={AudemiaTheme.colors.primary}
                />
            </flexboxLayout>
        </gridLayout>
    );
}