import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { BottomNavBar } from '../components/BottomNavBar';
import { TopBar } from '../components/TopBar';
import { QuizPreview } from '../components/QuizPreview';
import { VoiceNotesList } from '../components/VoiceNotesList';
import { ProfileSettings } from '../components/ProfileSettings';
import { MenuTools } from '../components/MenuTools';

type HomeScreenProps = {
    route: RouteProp<NavigationParamList, "Home">,
    navigation: FrameNavigationProp<NavigationParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [showProfileSettings, setShowProfileSettings] = React.useState(false);
    const [showMenuTools, setShowMenuTools] = React.useState(false);

    const handleMenuTap = () => {
        navigation.navigate('CustomerService');
    };

    const handleProfileTap = () => {
        setShowProfileSettings(!showProfileSettings);
    };

    const handleSettingSelect = (settingId: string) => {
        console.log(`Selected setting: ${settingId}`);
        if (settingId === 'logout') {
            // Handle logout
            console.log('Logging out...');
        }
    };

    const handleQuizSelect = (quizId: string) => {
        console.log(`Quiz valgt: ${quizId}`);
    };

    const handleToolSelect = (toolId: string) => {
        console.log(`Selected tool: ${toolId}`);
        // Implement tool functionality here
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            {/* TopBar */}
            <TopBar
                currentScreen="Hjem"
                onMenuTap={handleMenuTap}
                onProfileTap={handleProfileTap}
            />

            <MenuTools
                isVisible={showMenuTools}
                onClose={() => setShowMenuTools(false)}
                onToolSelect={handleToolSelect}
            />

            <ProfileSettings
                isVisible={showProfileSettings}
                onClose={() => setShowProfileSettings(false)}
                onSettingSelect={handleSettingSelect}
            />

            {/* Main Content Container */}
            <flexboxLayout
                flexDirection="column"
                flexGrow={1}
                opacity={showProfileSettings || showMenuTools ? 0 : 1}
                isEnabled={!showProfileSettings && !showMenuTools}
                isUserInteractionEnabled={!showProfileSettings && !showMenuTools}
            >
                {/* Container for VoiceNotesList */}
                <flexboxLayout
                    flexDirection="column"
                    style={{
                        backgroundColor: showProfileSettings ? 'transparent' : '#f9f9f9',
                        padding: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }}
                    height="300"
                >
                    <VoiceNotesList />
                </flexboxLayout>

                {/* Container for QuizPreview */}
                <flexboxLayout
                    flexDirection="column"
                    style={{
                        backgroundColor: showProfileSettings ? 'transparent' : '#fff',
                        padding: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }}
                    height="350"
                >
                    <QuizPreview onQuizSelect={handleQuizSelect} />
                </flexboxLayout>
            </flexboxLayout>

            {/* BottomNavBar */}
            <BottomNavBar
                currentRoute="Home"
                onNavigate={(screen) => navigation.navigate(screen)}
            />
        </flexboxLayout>
    );
}