import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';
import { AudemiaTheme } from '../../styles/theme';
import { TopBar } from '../../components/TopBar';

interface Chapter {
    id: string;
    bookTitle: string;
    chapterNumber: number;
    chapterTitle: string;
    duration: string;
    progress: number;
    lastPlayed: string;
}

type ChaptersScreenProps = {
    route: RouteProp<NavigationParamList, "Chapters">,
    navigation: FrameNavigationProp<NavigationParamList, "Chapters">,
};

export function ChaptersScreen({ navigation }: ChaptersScreenProps) {
    const chapters: Chapter[] = [
        {
            id: '1',
            bookTitle: 'Digital Transformasjon',
            chapterNumber: 1,
            chapterTitle: 'Introduksjon til Digital Transformasjon',
            duration: '45:30',
            progress: 100,
            lastPlayed: '2 timer siden'
        },
        {
            id: '2',
            bookTitle: 'Digital Transformasjon',
            chapterNumber: 2,
            chapterTitle: 'Teknologiske Drivere',
            duration: '38:15',
            progress: 75,
            lastPlayed: 'I går'
        },
        {
            id: '3',
            bookTitle: 'Bærekraftig Ledelse',
            chapterNumber: 1,
            chapterTitle: 'Grunnleggende Prinsipper',
            duration: '42:20',
            progress: 50,
            lastPlayed: '3 dager siden'
        }
    ];

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Mine Kapitler"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
            />
            
            <scrollView className="mb-4">
                <stackLayout className="p-4">
                    {chapters.map(chapter => (
                        <gridLayout
                            key={chapter.id}
                            className="mb-4 p-4 rounded-xl bg-white"
                            rows="auto, auto, auto"
                            columns="auto, *"
                            style={{ elevation: 2 }}
                        >
                            {/* Chapter Icon and Number */}
                            <flexboxLayout
                                row="0"
                                col="0"
                                rowSpan="3"
                                className="w-12 h-12 rounded-lg bg-gray-100 mr-4"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <label
                                    text={chapter.chapterNumber.toString()}
                                    className="text-lg font-bold"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>

                            {/* Book Title */}
                            <label
                                row="0"
                                col="1"
                                text={chapter.bookTitle}
                                className="text-sm text-gray-600 mb-1"
                            />

                            {/* Chapter Title */}
                            <label
                                row="1"
                                col="1"
                                text={chapter.chapterTitle}
                                className="font-bold mb-2"
                                color={AudemiaTheme.colors.primary}
                                textWrap="true"
                            />

                            {/* Progress and Duration */}
                            <gridLayout
                                row="2"
                                col="1"
                                rows="auto"
                                columns="*, auto"
                            >
                                <stackLayout col="0" className="h-2 rounded-full bg-gray-200">
                                    <stackLayout
                                        className="h-2 rounded-full"
                                        backgroundColor={AudemiaTheme.colors.primary}
                                        width={`${chapter.progress}%`}
                                    />
                                </stackLayout>
                                <label
                                    col="1"
                                    text={chapter.duration}
                                    className="text-xs ml-2"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </gridLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}