import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';
import { AudemiaTheme } from '../../styles/theme';
import { TopBar } from '../../components/TopBar';

interface Download {
    id: string;
    title: string;
    author: string;
    size: string;
    progress: number;
    status: 'completed' | 'downloading' | 'paused' | 'queued';
}

type DownloadsScreenProps = {
    route: RouteProp<NavigationParamList, "Downloads">,
    navigation: FrameNavigationProp<NavigationParamList, "Downloads">,
};

export function DownloadsScreen({ navigation }: DownloadsScreenProps) {
    const downloads: Download[] = [
        {
            id: '1',
            title: 'Digital Transformasjon',
            author: 'Erik Hansen',
            size: '245 MB',
            progress: 100,
            status: 'completed'
        },
        {
            id: '2',
            title: 'Bærekraftig Ledelse',
            author: 'Maria Olsen',
            size: '180 MB',
            progress: 65,
            status: 'downloading'
        },
        {
            id: '3',
            title: 'AI i Praksis',
            author: 'Thomas Berg',
            size: '210 MB',
            progress: 0,
            status: 'queued'
        }
    ];

    const getStatusIcon = (status: Download['status']) => {
        switch (status) {
            case 'completed':
                return '&#xf00c;'; // check
            case 'downloading':
                return '&#xf019;'; // download
            case 'paused':
                return '&#xf04c;'; // pause
            case 'queued':
                return '&#xf017;'; // clock
            default:
                return '&#xf128;'; // question
        }
    };

    const getStatusColor = (status: Download['status']) => {
        switch (status) {
            case 'completed':
                return '#4CAF50';
            case 'downloading':
                return AudemiaTheme.colors.primary;
            case 'paused':
                return '#FFA000';
            case 'queued':
                return '#757575';
            default:
                return '#757575';
        }
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Nedlastninger"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
            />
            
            <scrollView className="mb-4">
                <stackLayout className="p-4">
                    {downloads.map(download => (
                        <gridLayout
                            key={download.id}
                            className="mb-4 p-4 rounded-xl bg-white"
                            rows="auto, auto, auto"
                            columns="auto, *, auto"
                            style={{ elevation: 2 }}
                        >
                            {/* Book Icon */}
                            <flexboxLayout
                                row="0"
                                col="0"
                                rowSpan="3"
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
                            <stackLayout row="0" col="1">
                                <label
                                    text={download.title}
                                    className="font-bold mb-1"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                                <label
                                    text={download.author}
                                    className="text-sm text-gray-600"
                                />
                            </stackLayout>

                            {/* Status Icon */}
                            <flexboxLayout
                                row="0"
                                col="2"
                                className="w-8 h-8 rounded-full"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <label
                                    className="fas"
                                    text={getStatusIcon(download.status)}
                                    color={getStatusColor(download.status)}
                                />
                            </flexboxLayout>

                            {/* Progress Bar */}
                            <gridLayout
                                row="1"
                                col="1"
                                colSpan="2"
                                rows="auto"
                                columns="*, auto"
                                className="mt-2"
                            >
                                <stackLayout col="0" className="h-2 rounded-full bg-gray-200">
                                    <stackLayout
                                        className="h-2 rounded-full"
                                        backgroundColor={getStatusColor(download.status)}
                                        width={`${download.progress}%`}
                                    />
                                </stackLayout>
                                <label
                                    col="1"
                                    text={download.size}
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