import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { TopBar } from '../components/TopBar';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { Icons } from '../utils/icons';
import { wishlistStore } from '../store/wishlistStore';
import { Animation, Screen } from "@nativescript/core";

type AudioPreviewScreenProps = {
    route: RouteProp<NavigationParamList, "AudioPreview">,
    navigation: FrameNavigationProp<NavigationParamList, "AudioPreview">,
};

export function AudioPreviewScreen({ route, navigation }: AudioPreviewScreenProps) {
    const { book } = route.params;
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isInWishlist, setIsInWishlist] = React.useState(wishlistStore.isBookWishlisted(book.id));
    const [progress, setProgress] = React.useState(0);
    const [speed, setSpeed] = React.useState(1);
    const screenWidth = Screen.mainScreen.widthDIPs;
    
    // Generate random waveform data
    const waveformBars = React.useMemo(() => {
        return Array.from({ length: 40 }, () => Math.random() * 100);
    }, []);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setProgress(0);
        }
    };
    
    const handleSpeedChange = () => {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(speed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setSpeed(speeds[nextIndex]);
    };

    const toggleWishlist = () => {
        if (isInWishlist) {
            wishlistStore.removeBook(book.id);
        } else {
            wishlistStore.addBook(book);
        }
        setIsInWishlist(!isInWishlist);
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Lydprøve"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />

            <scrollView className="flex-grow mt-2">
                <stackLayout className="p-6">
                    {/* Book Cover and Info */}
                    <stackLayout className="mb-6 rounded-xl bg-white" style={{ elevation: 4 }}>
                        {/* Wishlist Button */}
                        <flexboxLayout
                            className="p-4"
                            justifyContent="flex-end"
                        >
                            <label
                                className="fas text-2xl"
                                text={isInWishlist ? Icons.heartSolid : Icons.heart}
                                color={isInWishlist ? '#DC2626' : AudemiaTheme.colors.primary}
                                onTap={toggleWishlist}
                            />
                        </flexboxLayout>
                        
                        <flexboxLayout className="px-6 pb-6">
                            {/* Book Cover */}
                            <gridLayout
                                className="rounded-lg mr-4"
                                style={{ width: 120, height: 160 }}
                            >
                                {book.coverImage ? (
                                    <CloudinaryImage
                                        url={book.coverImage}
                                        width={120}
                                        height={160}
                                        className="rounded-lg"
                                        format="webp"
                                    />
                                ) : (
                                    <stackLayout
                                        className="w-full h-full rounded-lg bg-gray-100"
                                    />
                                )}
                            </gridLayout>

                            {/* Book Details */}
                            <stackLayout flexGrow={1}>
                                <label
                                    text={book.title}
                                    className="text-xl font-bold mb-2"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                                <label
                                    text={book.author}
                                    className="text-base text-gray-600 mb-2"
                                    textWrap="true"
                                />
                                <label
                                    text={book.publisher}
                                    className="text-sm text-gray-500 mb-4"
                                    textWrap="true"
                                />
                                <label
                                    text={book.price}
                                    className="text-lg font-bold"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </stackLayout>
                        </flexboxLayout>
                    </stackLayout>

                    {/* Audio Player */}
                    <stackLayout className="mb-6 p-6 rounded-xl bg-white" style={{ elevation: 4 }}>
                        <flexboxLayout justifyContent="space-between" alignItems="center" className="mb-6">
                            <label
                                text="Lydprøve"
                                className="text-lg font-bold"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text={`${speed}x`}
                                className="text-sm font-bold px-3 py-1 rounded-lg bg-gray-100"
                                color={AudemiaTheme.colors.primary}
                                onTap={handleSpeedChange}
                            />
                        </flexboxLayout>

                        {/* Waveform Visualization */}
                        <flexboxLayout className="mb-6 h-24" justifyContent="space-between" alignItems="center">
                            {waveformBars.map((height, index) => (
                                <stackLayout
                                    key={index}
                                    className="mx-0.5"
                                    backgroundColor={AudemiaTheme.colors.primary}
                                    width={`${screenWidth / 50}`}
                                    height={`${isPlaying ? height : 30}%`}
                                    opacity={progress / 100 > index / waveformBars.length ? 1 : 0.3}
                                    style={{
                                        borderRadius: 4,
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </flexboxLayout>

                        {/* Progress Bar */}
                        <gridLayout rows="auto" columns="*, auto" className="mb-4">
                            <stackLayout col="0" className="h-2 rounded-full bg-gray-200">
                                <stackLayout
                                    className="h-2 rounded-full"
                                    backgroundColor={AudemiaTheme.colors.primary}
                                    width={`${progress}%`}
                                    style={{ transition: 'width 0.2s linear' }}
                                />
                            </stackLayout>
                            <label
                                col="1"
                                text="1:30"
                                className="text-sm ml-2"
                                color={AudemiaTheme.colors.primary}
                            />
                        </gridLayout>

                        {/* Playback Controls */}
                        <flexboxLayout justifyContent="center" alignItems="center">
                            {/* Play/Pause Button */}
                            <flexboxLayout
                                className="w-20 h-20 rounded-full bg-gray-100"
                                justifyContent="center"
                                alignItems="center"
                                onTap={togglePlayback}
                                style={{
                                    elevation: 8,
                                    transform: isPlaying ? 'scale(0.98)' : 'scale(1)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <label
                                    className="fas text-3xl"
                                    text={isPlaying ? Icons.pause : Icons.play}
                                    color={AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>
                        </flexboxLayout>
                    </stackLayout>

                    {/* Book Description */}
                    {book.description && (
                        <stackLayout className="p-6 rounded-xl bg-white" style={{ elevation: 4 }}>
                            <label
                                text="Om boken"
                                className="text-lg font-bold mb-4"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text={book.description}
                                className="text-base text-gray-600"
                                textWrap="true"
                            />
                        </stackLayout>
                    )}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}