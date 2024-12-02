export interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    price: string;
    tags: string[];
    description?: string;
    coverImage?: string;
}