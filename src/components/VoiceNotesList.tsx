import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';
import { useNavigation } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { CloudinaryImage } from './CloudinaryImage';

interface VoiceNote {
    id: string;
    chapter: string;
    pageReference: string;
    content: string;
    timestamp: string;
    duration: string;
}

interface Book {
    id: string;
    title: string;
    author: string;
    coverImage?: string;
    notes: VoiceNote[];
}

export function VoiceNotesList() {
    const navigation = useNavigation<FrameNavigationProp<NavigationParamList>>();
    const [expandedBook, setExpandedBook] = React.useState<string | null>(null);
    
    const books: Book[] = [
        {
            id: '1',
            title: 'Entreprenørskap',
            author: 'Dahle, Yngve',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215060699_bbfd04e17546d0db1c3b43c56f5e8e91_jols19.jpg', // Add your Cloudinary URL here
            notes: [
                {
                    id: '1',
                    chapter: 'Kapittel 3',
                    pageReference: 'Side 45, øvre del',
                    content: 'Digitale forretningsmodeller og deres påvirkning på tradisjonelle industrier',
                    timestamp: '15. mars',
                    duration: '0:45'
                },
                {
                    id: '2',
                    chapter: 'Kapittel 4',
                    pageReference: 'Side 72, midtre del',
                    content: 'Implementering av digitale løsninger i praksis',
                    timestamp: '16. mars',
                    duration: '1:15'
                }
            ]
        },
        {
            id: '2',
            title: 'In the legacy of Hans Nielsen Hauge',
            author: 'Liland, Truls',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050962/6954850_cee43u.jpg', // Add your Cloudinary URL here
            notes: [
                {
                    id: '3',
                    chapter: 'Kapittel 2',
                    pageReference: 'Side 28, nedre del',
                    content: 'Hovedprinsipper for bærekraftig forretningspraksis',
                    timestamp: '14. mars',
                    duration: '1:20'
                }
            ]
        },
        {
            id: '3',
            title: 'Hva er etikk',
            author: 'Vetlesen, Arne Johan',
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215007922_68551e43f5306e99398b53b0c2e865a4_ejgw6a.jpg', // Add your Cloudinary URL here
            notes: [
                {
                    id: '4',
                    chapter: 'Kapittel 1',
                    pageReference: 'Side 15, øvre del',
                    content: 'Nøkkelkonsepter innen maskinlæring',
                    timestamp: '13. mars',
                    duration: '0:55'
                }
            ]
        }
    ];

    const handleNotePress = (noteId: string) => {
        navigation.navigate('VoiceNoteDetail', { noteId });
    };

    const toggleBookExpansion = (bookId: string) => {
        setExpandedBook(expandedBook === bookId ? null : bookId);
    };

    return (
        <stackLayout className="mx-4 mt-8">
            <label
                text="Dine lydnotater"
                className="text-xl font-bold mb-4"
                color={AudemiaTheme.colors.primary}
            />
            
            <scrollView>
                <stackLayout>
                    {books.map(book => (
                        <stackLayout key={book.id} className="mb-4">
                            {/* Book Header */}
                            <gridLayout
                                className="p-4 rounded-t-xl bg-white"
                                columns="auto, *, auto"
                                onTap={() => toggleBookExpansion(book.id)}
                                style={{ elevation: 2 }}
                            >
                                <stackLayout
                                    col="0"
                                    className="w-10 h-10 rounded-lg bg-gray-100 mr-3"
                                    style={{ overflow: 'hidden' }}
                                >
                                    {book.coverImage ? (
                                        <CloudinaryImage
                                            url={book.coverImage}
                                            width={40}
                                            height={40}
                                            className="rounded-lg"
                                            format="webp"
                                        />
                                    ) : (
                                        <stackLayout
                                            className="w-10 h-10 rounded-lg bg-gray-200"
                                        />
                                    )}
                                </stackLayout>
                                
                                <stackLayout col="1">
                                    <label
                                        text={book.title}
                                        className="font-bold"
                                        color={AudemiaTheme.colors.primary}
                                        textWrap="true"
                                    />
                                    <label
                                        text={book.author}
                                        className="text-sm text-gray-600"
                                    />
                                </stackLayout>

                                <label
                                    col="2"
                                    className="fas text-lg"
                                    text={expandedBook === book.id ? Icons.arrowUp : Icons.arrowDown}
                                    color={AudemiaTheme.colors.primary}
                                />
                            </gridLayout>

                            {/* Notes List */}
                            {expandedBook === book.id && (
                                <stackLayout className="border-t border-gray-200">
                                    {book.notes.map(note => (
                                        <gridLayout
                                            key={note.id}
                                            className="p-4 bg-white"
                                            rows="auto"
                                            columns="auto, *, auto"
                                            onTap={() => handleNotePress(note.id)}
                                            style={{ elevation: 2 }}
                                        >
                                            <stackLayout col="0" className="mr-4">
                                                <label
                                                    text={note.chapter}
                                                    className="font-medium mb-4"
                                                    color={AudemiaTheme.colors.primary}
                                                />
                                            </stackLayout>
                                            
                                            <stackLayout col="1">
                                                <label
                                                    text={note.pageReference}
                                                    className="text-xs text-gray-600 mb-4"
                                                />
                                                <label
                                                    text={note.content}
                                                    className="text-sm mt-2"
                                                    style={{ lineHeight: 0 }}
                                                    color="#666666"
                                                    textWrap="true"
                                                />
                                            </stackLayout>

                                            <label
                                                col="2"
                                                text={note.duration}
                                                className="text-xs mb-4"
                                                color={AudemiaTheme.colors.primary}
                                            />
                                        </gridLayout>
                                    ))}
                                </stackLayout>
                            )}
                        </stackLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </stackLayout>
    );
}