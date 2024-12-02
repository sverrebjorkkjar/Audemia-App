import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';
import { AudemiaTheme } from '../../styles/theme';
import { TopBar } from '../../components/TopBar';

interface ContinueBook {
    id: string;
    title: string;
    author: string;
    chapter: string;
    progress: number;
    remainingTime: string;
    lastPlayed: string;
}

type ContinueListeningScreenProps = {
    route: RouteProp<NavigationParamList, "ContinueListening">,
    navigation: FrameNavigationProp<NavigationParamList, "ContinueListening">,
};

export function ContinueListeningScreen({ navigation }: ContinueListeningScreenProps) {
    const books: ContinueBook[] = [
        {
            id: '1',
            title: 'Digital Transformasjon',
            author: 'Erik Hansen',
            chapter: 'Kapittel 3: Digitale Forretningsmodeller',
            progress: 45,
            remainingTime: '32:15',
            lastPlayed: '2 timer siden'
        },
        {
            id: '2',
            title: 'Bærekraftig Ledelse',
            author: 'Maria Olsen',
            chapter: 'Kapittel 5: Grønn Omstilling',
            progress: 75,
            remainingTime: '15:45',
            lastPlayed: 'I går'
        },
        {
            id: '3',
            title: 'AI i Praksis',
            author: 'Thomas Berg',
            chapter: 'Kapittel 1: Introduksjon til AI',
            progress: 15,
            remainingTime: '42:30',
            lastPlayed: '3 dager siden'
        }
    ];

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Fortsett å Høre"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
            />
            
            <scrollView className="mb-4">
                <stackLayout className="p-4">
                    {books.map(book => (
                        <gridLayout
                            key={book.id}
                            className="mb-4 p-4 rounded-xl bg-white"
                            rows="auto, auto, auto, auto"
                            columns="auto, *, auto"
                            style={{ elevation: 2 }}
                        >
                            {/* Book Cover */}
                            <flexboxLayout
                                row="0"
                                col="0"
                                rowSpan="4"
                                className="w-16 h-16 rounded-lg bg-gray-100 mr-4"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <label
                                    className="fas text-2xl"
                                    text="&#xf02d;"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>

                            {/* Title and Author */}
                            <stackLayout row="0" col="1" colSpan="2">
                                <label
                                    text={book.title}
                                    className="font-bold mb-1"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                                <label
                                    text={book.author}
                                    className="text-sm text-gray-600"
                                />
                            </stackLayout>

                            {/* Chapter */}
                            <label
                                row="1"
                                col="1"
                                colSpan="2"
                                text={book.chapter}
                                className="text-sm my-2"
                                color={AudemiaTheme.colors.primary}
                                textWrap="true"
                            />

                            {/* Progress Bar */}
                            <gridLayout
                                row="2"
                                col="1"
                                colSpan="2"
                                rows="auto"
                                columns="*, auto"
                                className="mb-2"
                            >
                                <stackLayout col="0" className="h-2 rounded-full bg-gray-200">
                                    <stackLayout
                                        className="h-2 rounded-full"
                                        backgroundColor={AudemiaTheme.colors.primary}
                                        width={`${book.progress}%`}
                                    />
                                </stackLayout>
                                <label
                                    col="1"
                                    text={book.remainingTime}
                                    className="text-xs ml-2"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </gridLayout>

                            {/* Last Played */}
                            <label
                                row="3"
                                col="1"
                                text={`Sist spilt: ${book.lastPlayed}`}
                                className="text-xs text-gray-500"
                            />

                            {/* Play Button */}
                            <flexboxLayout
                                row="3"
                                col="2"
                                className="w-8 h-8 rounded-full bg-gray-100"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <label
                                    className="fas"
                                    text="&#xf04b;"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}