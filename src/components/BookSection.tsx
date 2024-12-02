import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { AudioBookCard } from './AudioBookCard';

interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    price: string;
    coverImage: string;
    description?: string;
}

interface BookSectionProps {
    title: string;
    books: Book[];
}

export function BookSection({ title, books }: BookSectionProps) {
    const handlePlayPreview = (bookId: string) => {
        console.log(`Spiller lydprøve for bok ${bookId}`);
    };

    const handlePurchase = (bookId: string) => {
        console.log(`Starter kjøp av bok ${bookId}`);
    };

    return (
        <stackLayout className="my-4">
            <label
                text={title}
                className="text-lg font-bold px-4 py-2 mb-2"
                color={AudemiaTheme.colors.primary}
            />
            <scrollView orientation="horizontal" className="px-2">
                <gridLayout columns="auto" className="py-2">
                    <stackLayout orientation="horizontal">
                        {books.map(book => (
                            <AudioBookCard
                                key={book.id}
                                title={book.title}
                                author={book.author}
                                publisher={book.publisher}
                                price={book.price}
                                coverImage={book.coverImage}
                                description={book.description}
                                onPlayPreview={() => handlePlayPreview(book.id)}
                                onPurchase={() => handlePurchase(book.id)}
                            />
                        ))}
                    </stackLayout>
                </gridLayout>
            </scrollView>
        </stackLayout>
    );
}