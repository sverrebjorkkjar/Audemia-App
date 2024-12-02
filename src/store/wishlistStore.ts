import { Book } from '../types/book';

let wishlistedBooks: Book[] = [];
const listeners: Set<() => void> = new Set();

export const wishlistStore = {
    addBook: (book: Book) => {
        if (!wishlistedBooks.find(b => b.id === book.id)) {
            wishlistedBooks = [...wishlistedBooks, book];
            notifyListeners();
        }
    },

    removeBook: (bookId: string) => {
        wishlistedBooks = wishlistedBooks.filter(book => book.id !== bookId);
        notifyListeners();
    },

    getBooks: () => wishlistedBooks,

    isBookWishlisted: (bookId: string) => {
        return wishlistedBooks.some(book => book.id === bookId);
    },

    subscribe: (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
};

function notifyListeners() {
    listeners.forEach(listener => listener());
}