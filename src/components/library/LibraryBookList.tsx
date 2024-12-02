import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { LibraryBookCard } from './LibraryBookCard';
import { Icons } from '../../utils/icons';
import { CloudinaryImage } from '../CloudinaryImage';
import { useNavigation } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';

interface Book {
    id: string;
    title: string;
    author: string;
    progress: number;
    lastPlayed: string;
    coverImage?: string;
}

interface LibraryBook {
    id: string;
    title: string;
    author: string;
    progress: number;
    lastPlayed: string;
    coverIcon: string;
}

export function LibraryBookList() {
    const navigation = useNavigation<FrameNavigationProp<NavigationParamList>>();
    
    const books: Book[] = [
        {
            id: '1',
            title: 'Entreprenørskap',
            author: 'Dahle, Yngve',
            progress: 45,
            lastPlayed: '2 timer siden',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215060699_bbfd04e17546d0db1c3b43c56f5e8e91_jols19.jpg'
        },
        {
            id: '2',
            title: 'In the legacy of Hans Nielsen Hauge',
            author: 'Liland, Truls',
            progress: 75,
            lastPlayed: 'I går',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050962/6954850_cee43u.jpg'
        },
        {
            id: '3',
            title: 'Hva er etikk',
            author: 'Vetlesen, Arne Johan',
            progress: 15,
            lastPlayed: '3 dager siden',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215007922_68551e43f5306e99398b53b0c2e865a4_ejgw6a.jpg'
        }
    ];

    return (
        <stackLayout
            className="p-2"
            style={{
                maxHeight: '50vh', // Begrens høyden til 50% av skjermen
                overflow: 'auto', // Gjør listen rullbar
            }}
        >
            

            {books.map((book) => (
                <LibraryBookCard
                    key={book.id}
                    book={book}
                    onPlay={() => navigation.navigate('AudioPlayer', { bookId: book.id })}
                />
            ))}
        </stackLayout>
    );
}
