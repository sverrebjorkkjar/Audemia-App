import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { TopBar } from '../components/TopBar';
import { ScrollView, Animation } from "@nativescript/core";

interface VoiceNote {
    id: string;
    bookTitle: string;
    chapter: string;
    timestamp: string;
    duration: string;
    conversation: {
        type: 'user' | 'assistant';
        content: string;
        timestamp: string;
        audioUrl?: string;
    }[];
    tags: string[];
}

type VoiceNoteDetailScreenProps = {
    route: RouteProp<NavigationParamList, "VoiceNoteDetail">,
    navigation: FrameNavigationProp<NavigationParamList, "VoiceNoteDetail">,
};

export function VoiceNoteDetailScreen({ route, navigation }: VoiceNoteDetailScreenProps) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState<number | null>(null);
    const [currentPlayingMessage, setCurrentPlayingMessage] = React.useState<number | null>(null);

    const note: VoiceNote = {
        id: route.params.noteId,
        bookTitle: 'Digital Transformasjon',
        chapter: 'Kapittel 3: Digitale Forretningsmodeller',
        timestamp: '15. mars',
        duration: '2:15',
        conversation: [
            {
                type: 'user',
                content: 'Kan du forklare hovedkonseptene i digitale forretningsmodeller og hvordan de påvirker tradisjonelle industrier?',
                timestamp: '14:30',
                audioUrl: 'path/to/audio1.mp3'
            },
            {
                type: 'assistant',
                content: 'Digitale forretningsmodeller er basert på flere nøkkelkonsepter:\n\n1. Plattformøkonomi: Skaper verdi ved å koble sammen ulike brukergrupper\n2. Data-drevet beslutningsstøtte: Bruker analyse for bedre beslutninger\n3. Digital verdikjede: Automatiserer og effektiviserer prosesser\n\nDette påvirker tradisjonelle industrier ved å:\n- Redusere mellommenn\n- Øke kundetilpasning\n- Muliggjøre nye inntektsstrømmer',
                timestamp: '14:31',
                audioUrl: 'path/to/audio2.mp3'
            }
        ],
        tags: ['Forretningsmodeller', 'Digital', 'Transformasjon', 'Eksempler']
    };

    const handleMessageTap = (index: number) => {
        setSelectedMessage(selectedMessage === index ? null : index);
    };

    const handlePlayAudio = (index: number) => {
        setCurrentPlayingMessage(index);
        setIsPlaying(!isPlaying);
        // Implementer faktisk lydavspilling her
        console.log(`Spiller av lyd for melding ${index}`);
    };

    const handleExport = () => {
        console.log('Eksporterer samtale');
    };

    const handleShare = () => {
        console.log('Deler samtale');
    };

    const handleAddTag = () => {
        console.log('Legger til ny tag');
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="AI Samtale"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />
            
            {/* Header med bokinfo og metadata */}
            <stackLayout className="p-4 border-b border-gray-200 bg-white" style={{ elevation: 2 }}>
                <gridLayout rows="auto, auto" columns="*, auto">
                    <stackLayout row="0" col="0">
                        <label
                            text={note.bookTitle}
                            className="text-xl font-bold mb-1"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            text={note.chapter}
                            className="text-sm text-gray-600"
                        />
                    </stackLayout>
                    <stackLayout row="0" col="1" horizontalAlignment="right">
                        <label
                            text={note.timestamp}
                            className="text-sm text-gray-500"
                        />
                        <label
                            text={note.duration}
                            className="text-xs text-gray-400"
                        />
                    </stackLayout>
                </gridLayout>

                {/* Tags */}
                <scrollView orientation="horizontal" className="mt-3">
                    <flexboxLayout>
                        {note.tags.map((tag, index) => (
                            <label
                                key={index}
                                text={tag}
                                className="text-xs mr-2 px-3 py-1 rounded-full bg-gray-100"
                                color={AudemiaTheme.colors.primary}
                            />
                        ))}
                        <flexboxLayout
                            className="px-3 py-1 rounded-full bg-gray-100"
                            onTap={handleAddTag}
                        >
                            <label
                                className="fas text-xs mr-1"
                                text="&#xf067;"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text="Legg til"
                                className="text-xs"
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                    </flexboxLayout>
                </scrollView>
            </stackLayout>

            {/* Samtalehistorikk */}
            <scrollView className="flex-grow">
                <stackLayout className="p-4">
                    {note.conversation.map((message, index) => (
                        <gridLayout
                            key={index}
                            className={`mb-4 rounded-xl ${
                                message.type === 'user' 
                                    ? 'ml-12' 
                                    : 'mr-12'
                            }`}
                            rows="auto, auto, auto"
                        >
                            {/* Meldingsheader */}
                            <flexboxLayout
                                row="0"
                                className="mb-2"
                                alignItems="center"
                            >
                                <flexboxLayout
                                    className="w-8 h-8 rounded-full bg-gray-100 mr-2"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <label
                                        className="fas text-sm"
                                        text={message.type === 'user' ? "&#xf130;" : "&#xf4fc;"}
                                        color={AudemiaTheme.colors.primary}
                                    />
                                </flexboxLayout>
                                <label
                                    text={message.type === 'user' ? 'Du' : 'AI Assistent'}
                                    className="text-sm font-bold"
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text={message.timestamp}
                                    className="text-xs text-gray-500 ml-auto"
                                />
                            </flexboxLayout>

                            {/* Meldingsinnhold */}
                            <gridLayout
                                row="1"
                                className={`p-4 rounded-xl ${
                                    message.type === 'user' 
                                        ? 'bg-white' 
                                        : 'bg-gray-50'
                                }`}
                                style={{ elevation: 2 }}
                            >
                                <scrollView
                                    orientation="vertical"
                                    height={selectedMessage === index ? "200" : "auto"}
                                >
                                    <label
                                        text={message.content}
                                        className="text-sm"
                                        textWrap="true"
                                        color={message.type === 'user' ? '#666666' : AudemiaTheme.colors.primary}
                                    />
                                </scrollView>
                            </gridLayout>

                            {/* Kontroller */}
                            <flexboxLayout
                                row="2"
                                className="mt-2"
                                horizontalAlignment="right"
                            >
                                <flexboxLayout
                                    className="mr-2 p-2 rounded-lg bg-gray-100"
                                    onTap={() => handlePlayAudio(index)}
                                >
                                    <label
                                        className="fas text-sm"
                                        text={currentPlayingMessage === index && isPlaying ? "&#xf04c;" : "&#xf04b;"}
                                        color={AudemiaTheme.colors.primary}
                                    />
                                </flexboxLayout>
                                <flexboxLayout
                                    className="p-2 rounded-lg bg-gray-100"
                                    onTap={() => handleMessageTap(index)}
                                >
                                    <label
                                        className="fas text-sm"
                                        text={selectedMessage === index ? "&#xf077;" : "&#xf078;"}
                                        color={AudemiaTheme.colors.primary}
                                    />
                                </flexboxLayout>
                            </flexboxLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>

            {/* Handlingsknapper */}
            <gridLayout
                rows="auto"
                columns="*, *, *"
                className="p-4 border-t border-gray-200 bg-white"
                style={{ elevation: 4 }}
            >
                <button
                    col="0"
                    className="text-sm p-3 rounded-lg mx-1"
                    backgroundColor={AudemiaTheme.colors.secondary}
                    onTap={handleExport}
                >
                    <formattedString>
                        <span className="fas text-sm" text="&#xf56e;" color={AudemiaTheme.colors.primary} />
                        <span text=" Eksporter" color={AudemiaTheme.colors.primary} />
                    </formattedString>
                </button>
                <button
                    col="1"
                    className="text-sm p-3 rounded-lg mx-1"
                    backgroundColor={AudemiaTheme.colors.secondary}
                    onTap={handleShare}
                >
                    <formattedString>
                        <span className="fas text-sm" text="&#xf1e0;" color={AudemiaTheme.colors.primary} />
                        <span text=" Del" color={AudemiaTheme.colors.primary} />
                    </formattedString>
                </button>
                <button
                    col="2"
                    className="text-sm p-3 rounded-lg mx-1"
                    backgroundColor={AudemiaTheme.colors.primary}
                >
                    <formattedString>
                        <span className="fas text-sm" text="&#xf130;" color="white" />
                        <span text=" Nytt spørsmål" color="white" />
                    </formattedString>
                </button>
            </gridLayout>
        </flexboxLayout>
    );
}