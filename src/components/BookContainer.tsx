import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { BookCard } from './BookCard';

interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    price: string;
    rating: number;
}

export function BookContainer() {
    const [favorites, setFavorites] = React.useState<string[]>([]);

    const recommendedBooks: Book[] = [
        {
            id: '1',
            title: 'Digital Transformasjon',
            author: 'Erik Hansen',
            publisher: 'Teknologisk Forlag',
            price: '299 kr',
            rating: 4
        },
        {
            id: '2',
            title: 'Bærekraftig Ledelse',
            author: 'Maria Olsen',
            publisher: 'Grønn Innsikt',
            price: '249 kr',
            rating: 5
        },
        // Add more books as needed
    ];

    const trendingBooks: Book[] = [
        {
            id: '3',
            title: 'AI i Praksis',
            author: 'Thomas Berg',
            publisher: 'Tech Books',
            price: '349 kr',
            rating: 4
        },
        {
            id: '4',
            title: 'Fremtidens Økonomi',
            author: 'Sofia Larsen',
            publisher: 'Økonomi Forlaget',
            price: '279 kr',
            rating: 5
        },
        // Add more books as needed
    ];

    const handleToggleFavorite = (bookId: string) => {
        setFavorites(prev => 
            prev.includes(bookId) 
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const handlePlayPreview = (bookId: string) => {
        console.log(`Playing preview for book ${bookId}`);
    };

    return (
        <scrollView orientation="vertical" flexGrow={1}>
            <stackLayout>
                {/* Recommended Section */}
                <label
                    text="Anbefalt for deg"
                    className="text-xl font-bold p-4"
                    color={AudemiaTheme.colors.primary}
                />
                {recommendedBooks.map(book => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        publisher={book.publisher}
                        price={book.price}
                        rating={book.rating}
                        isFavorite={favorites.includes(book.id)}
                        onPlayPreview={() => handlePlayPreview(book.id)}
                        onToggleFavorite={() => handleToggleFavorite(book.id)}
                    />
                ))}

                {/* Trending Section */}
                <label
                    text="Populære nå"
                    className="text-xl font-bold p-4"
                    color={AudemiaTheme.colors.primary}
                />
                {trendingBooks.map(book => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        publisher={book.publisher}
                        price={book.price}
                        rating={book.rating}
                        isFavorite={favorites.includes(book.id)}
                        onPlayPreview={() => handlePlayPreview(book.id)}
                        onToggleFavorite={() => handleToggleFavorite(book.id)}
                    />
                ))}
            </stackLayout>
        </scrollView>
    );
}