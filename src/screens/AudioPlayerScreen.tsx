import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';
import { sampleQuestions } from '../data/sampleQuestions';
import { Book } from '../types/book';

type AudioPlayerScreenProps = {
    route: RouteProp<NavigationParamList, "AudioPlayer">,
    navigation: FrameNavigationProp<NavigationParamList, "AudioPlayer">,
};

export function AudioPlayerScreen({ route, navigation }: AudioPlayerScreenProps) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
    const [progress, setProgress] = React.useState(0);
    const [isRecording, setIsRecording] = React.useState(false);
    const [activeActions, setActiveActions] = React.useState<string[]>([]);
    const [transcription, setTranscription] = React.useState<string | null>(null);
    const placeholderText = "Hei Sverre! Hva trenger du hjelp til";
    const [isReset, setIsReset] = React.useState(false);
    const [aiResponseProgress, setAiResponseProgress] = React.useState(0);
    const [isAiResponsePlaying, setIsAiResponsePlaying] = React.useState(false);
    const [isResponseActive, setIsResponseActive] = React.useState(false);
    
    const libraryBooks: Book[] = [
        {
            id: '1',
            title: 'Entreprenørskap',
            author: 'Dahle, Yngve',
            publisher: 'Fagbokforlaget',
            price: '299 kr',
            tags: ['entreprenørskap', 'innovasjon'],
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215060699_bbfd04e17546d0db1c3b43c56f5e8e91_jols19.jpg'
        },
        {
            id: '2',
            title: 'In the legacy of Hans Nielsen Hauge',
            author: 'Liland, Truls',
            publisher: 'Fagbokforlaget',
            price: '249 kr',
            tags: ['historie', 'etikk', 'næringsliv'],
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050962/6954850_cee43u.jpg'
        },
        {
            id: '3',
            title: 'Hva er etikk',
            author: 'Vetlesen, Arne Johan',
            publisher: 'Universitetsforlaget',
            price: '199 kr',
            tags: ['etikk', 'filosofi'],
            coverImage: 'https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215007922_68551e43f5306e99398b53b0c2e865a4_ejgw6a.jpg'
        }
    ];

    const book = libraryBooks.find(b => b.id === route.params?.bookId) || libraryBooks[0];

    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlaybackSpeedChange = () => {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRecording = () => {
        if (isReset) {
            setIsReset(false);
            setTranscription(null);
            setIsResponseActive(false);
        } else if (!isRecording) {
            setIsRecording(true);
            setTranscription(null);
        } else {
            setIsRecording(false);
            setIsReset(true);
            // Get a random question for the current book
            const bookQuestions = sampleQuestions[book.id];
            const randomIndex = Math.floor(Math.random() * bookQuestions.length);
            setTranscription(bookQuestions[randomIndex]);
            setIsResponseActive(true);
        }
    };

    const handleResponseTap = () => {
        if (transcription && isResponseActive) {
            navigation.navigate('AIResponse', { question: transcription });
        }
    };

    const handleActionTap = (actionId: string) => {
        setActiveActions(prev => 
            prev.includes(actionId) 
                ? prev.filter(id => id !== actionId)
                : [...prev, actionId]
        );
    };

    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isAiResponsePlaying) {
            interval = setInterval(() => {
                setAiResponseProgress(prev => {
                    if (prev >= 100) {
                        setIsAiResponsePlaying(false);
                        return 100;
                    }
                    return prev + 0.5;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAiResponsePlaying]);

    return (
        <flexboxLayout flexDirection="column" height="100%">
            {/* AI Assistant Section - 60% */}
            <flexboxLayout height="60%" className="px-4" backgroundColor="#002855">
                <flexboxLayout flexDirection="column" alignItems="center" justifyContent="center" width="100%" className="mt-8">
                    {/* Microphone Section */}
                    <flexboxLayout flexDirection="column" alignItems="center" width="100%">
                        <flexboxLayout
                            className={`w-24 h-24 rounded-full ${isRecording ? 'bg-red-500' : 'bg-white'}`}
                            justifyContent="center"
                            alignItems="center"
                            alignSelf="center"
                            onTap={handleRecording}
                            style={{ elevation: 4 }}
                        >
                            <label
                                className="fas text-4xl"
                                text={isReset ? Icons.reset : (isRecording ? Icons.stopRecording : Icons.microphone)}
                                color={isRecording ? 'white' : AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        
                        {/* Recording Status Text */}
                        <flexboxLayout className="mt-2 mb-8" alignItems="center" alignSelf="center">
                            <label
                                className="fas text-sm mr-2"
                                text={isReset ? Icons.reset : (isRecording ? Icons.stopRecording : Icons.microphone)}
                                color="white"
                            />
                            <label
                                text={isReset ? "Trykk for reset" : (isRecording ? "Trykk for å stoppe" : "Trykk for å spør")}
                                className="text-sm"
                                color="white"
                            />
                        </flexboxLayout>
                    </flexboxLayout>
                    
                    {/* Transcription Container */}
                    <flexboxLayout
                        className="mt-6 mb-4"
                        horizontalAlignment="center"
                        alignSelf="center"
                        alignItems="center"
                        width="85%"
                        height="50"
                        backgroundColor="white"
                        borderRadius="10"
                        style={{ elevation: 2, marginTop:1, marginLeft: 3 }}
                    >
                        <gridLayout columns="*, auto">
                            <label
                                col="0"
                                text={isRecording ? "Opptak pågår" : (transcription ? transcription : placeholderText)}
                                className={`${transcription ? 'text-sm' : 'text-base'} leading-none`}
                                color={isRecording || !transcription ? "#999999" : "#000000"}
                                textWrap="true"
                                style={{ marginLeft: 4 }}
                            />
                            {transcription && (
                                <label
                                    col="1"
                                    className="fas text-base"
                                    text={Icons.edit}
                                    color={AudemiaTheme.colors.primary}
                                    onTap={() => console.log("Modify question")}
                                    style={{ marginRight: 4 }}
                                />
                            )}
                        </gridLayout>
                    </flexboxLayout>

                    {/* AI Response Container */}
                    <flexboxLayout
                        className="mt-4 mb-4"
                        horizontalAlignment="center"
                        alignSelf="center"
                        alignItems="center"
                        width="90%"
                        padding="16"
                        backgroundColor="white"
                        borderRadius="10"
                        flexDirection="column"
                        style={{ elevation: 2 }}
                    >
                        {/* Play Button and Progress Bar */}
                        <gridLayout rows="auto" columns="auto, *" className="mb-4">
                            <flexboxLayout
                                col="0"
                                className="w-10 h-10 rounded-full bg-gray-100 self-center"
                                justifyContent="center"
                                alignItems="center"
                                marginRight="12"
                                onTap={() => setIsAiResponsePlaying(!isAiResponsePlaying)}
                            >
                                <label
                                    className="fas text-lg"
                                    text={isAiResponsePlaying ? Icons.pause : Icons.play}
                                    color={isResponseActive ? '#4CAF50' : AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>
                            
                            <stackLayout col="1" className="h-2 self-center">
                                <stackLayout className="h-2 rounded-full bg-gray-200">
                                    <stackLayout
                                        className="h-2 rounded-full"
                                        backgroundColor={AudemiaTheme.colors.primary}
                                        width={`${aiResponseProgress}%`}
                                        style={{ transition: 'width 0.2s linear' }}
                                    />
                                </stackLayout>
                            </stackLayout>
                        </gridLayout>
                        
                        {/* Action Icons Row */}
                        <flexboxLayout
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                            className="mt-6"
                            style={{ paddingLeft: 20, paddingRight: 20 }}
                        >
                            {/* Bookmark */}
                            <flexboxLayout
                                flexDirection="column"
                                alignItems="center"
                                onTap={() => handleActionTap('bookmark')}
                            >
                                <label
                                    className="fas text-xl mb-2"
                                    text={Icons.bookmark}
                                    color={activeActions.includes('bookmark') ? '#FFD700' : AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Bokmerke"
                                    className="text-xs leading-none"
                                    textAlignment="center"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                            </flexboxLayout>

                            {/* Voice Note */}
                            <flexboxLayout
                                flexDirection="column"
                                alignItems="center"
                                onTap={() => handleActionTap('voiceNote')}
                            >
                                <label
                                    className="fas text-xl mb-2"
                                    text={Icons.notes}
                                    color={activeActions.includes('voiceNote') ? '#FFD700' : AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Lydnotat"
                                    className="text-xs leading-none"
                                    textAlignment="center"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                            </flexboxLayout>

                            {/* Quiz */}
                            <flexboxLayout
                                flexDirection="column"
                                alignItems="center"
                                onTap={() => handleActionTap('quiz')}
                            >
                                <label
                                    className="fas text-xl mb-2"
                                    text={Icons.quiz}
                                    color={activeActions.includes('quiz') ? '#FFD700' : AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Quiz"
                                    className="text-xs leading-none"
                                    textAlignment="center"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                            </flexboxLayout>

                            {/* AI Response */}
                            <flexboxLayout
                                flexDirection="column"
                                alignItems="center"
                                onTap={handleResponseTap}
                                opacity={isResponseActive ? 1 : 0.5}
                            >
                                <label
                                    className="fas text-xl mb-2"
                                    text={Icons.text}
                                    color={isResponseActive ? '#4CAF50' : AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Se svar"
                                    className="text-xs leading-none"
                                    textAlignment="center"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                            </flexboxLayout>
                        </flexboxLayout>
                    </flexboxLayout>
                </flexboxLayout>
            </flexboxLayout>

            {/* Audio Player Section - 40% */}
            <flexboxLayout height="40%" backgroundColor="#002855" flexDirection="column">
                <flexboxLayout
                    flexDirection="column"
                    style={{ paddingTop: 8 }}
                >
                    <label
                        text={book.title}
                        className="bookTitleTextAudioPlayerScreen"
                        color="white"
                        textWrap="true"
                        style={{ marginBottom: 4, marginLeft: 5 }}
                    />
                    <label
                        text={book.author}
                        className="authorTextAudioPlayerScreen"
                        color="rgba(255,255,255,0.8)"
                        style={{ marginLeft: 5 }}
                    />
                </flexboxLayout>
                
                {/* Progress Bar */}
                <stackLayout className="items-center" style={{ padding: 0, marginBottom: 8, width: "100%" }}>
                    <stackLayout className="h-2 rounded-full bg-gray-700" style={{ width: "90%", marginTop: 8 }}>
                        <stackLayout
                            className="h-2 rounded-full"
                            backgroundColor="white"
                            width={`${progress}%`}
                            style={{ transition: 'width 0.2s linear' }}
                        />
                    </stackLayout>
                    <flexboxLayout className="justify-between mt-2" style={{ width: "90%" }}>
                        <label
                            text={formatTime(progress * 60)}
                            className="text-sm"
                            color="white"
                        />
                        <label
                            text={formatTime(6000)}
                            className="text-sm"
                            color="white"
                        />
                    </flexboxLayout>
                </stackLayout>

                {/* Playback Controls */}
                <flexboxLayout className="justify-center items-center mt-2">
                    <flexboxLayout
                        className="w-10 h-10 rounded-full bg-gray-700 mx-4"
                        justifyContent="center"
                        alignItems="center"
                        onTap={() => setProgress(Math.max(0, progress - 10))}
                    >
                        <label className="fas text-xl" text={Icons.backward10} color="white" />
                    </flexboxLayout>

                    <flexboxLayout
                        className="w-24 h-24 rounded-full bg-white mx-4"
                        justifyContent="center"
                        alignItems="center"
                        onTap={() => setIsPlaying(!isPlaying)}
                    >
                        <label
                            className="fas text-3xl"
                            text={isPlaying ? Icons.pause : Icons.play}
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>

                    <flexboxLayout
                        className="w-10 h-10 rounded-full bg-gray-700 mx-4"
                        justifyContent="center"
                        alignItems="center"
                        onTap={() => setProgress(Math.min(100, progress + 10))}
                    >
                        <label className="fas text-xl" text={Icons.forward10} color="white" />
                    </flexboxLayout>
                </flexboxLayout>

                {/* Bottom Controls */}
                <flexboxLayout className="justify-center items-center mt-4 mb-2">
                    <flexboxLayout
                        className="w-8 h-8 rounded-full bg-gray-700 mx-3"
                        justifyContent="center"
                        alignItems="center"
                        onTap={() => navigation.navigate('Library')}
                    >
                        <label className="fas text-xl" text={Icons.arrowLeft} color="white" />
                    </flexboxLayout>

                    <flexboxLayout
                        className="w-9 h-9 rounded-full bg-gray-700 mx-4"
                        justifyContent="center"
                        alignItems="center"
                        onTap={handlePlaybackSpeedChange}
                    >
                        <label
                            text={`${playbackSpeed}x`}
                            className="text-sm font-bold"
                            color="white"
                        />
                    </flexboxLayout>

                    <flexboxLayout
                        className="w-9 h-9 rounded-full bg-gray-700 mx-4"
                        justifyContent="center"
                        alignItems="center"
                        onTap={() => console.log("Timer")}
                    >
                        <label className="fas text-xl" text={Icons.clock} color="white" />
                    </flexboxLayout>
                </flexboxLayout>
            </flexboxLayout>
        </flexboxLayout>
    );
}