import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { BottomNavBar } from '../components/BottomNavBar';
import { TopBar } from '../components/TopBar';
import { LibraryQuickAccess } from '../components/library/LibraryQuickAccess';
import { LibraryBookList } from '../components/library/LibraryBookList';

type LibraryScreenProps = {
    route: RouteProp<NavigationParamList, "Library">,
    navigation: FrameNavigationProp<NavigationParamList, "Library">,
};

export function LibraryScreen({ navigation }: LibraryScreenProps) {
    const handleMenuTap = () => {
        console.log("Meny åpnet");
    };

    const handleProfileTap = () => {
        console.log("Profil åpnet");
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            {/* TopBar */}
            <TopBar
                currentScreen="Bibliotek"
                onMenuTap={handleMenuTap}
                onProfileTap={handleProfileTap}
            />

            {/* Container for LibraryQuickAccess */}
            <flexboxLayout
                flexDirection="column"
                height="245" // Fast høyde for LibraryQuickAccess
                style={{ backgroundColor: '#f1f1f1', padding: 10 }}
            >
                <LibraryQuickAccess />
            </flexboxLayout>

            {/* Container for "Mine bøker" */}
            <flexboxLayout
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                height="40" // Fast høyde for overskriften
                style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}
            >
                <label
                    text="Mine lydbøker"
                    className="text-xl"
                    style={{
                        color: '#002855', // Blå tekstfarge
                        fontWeight: 'bold', // Fet skrift
                        fontSize: 18, // Justert skriftstørrelse
                    }}
                />
            </flexboxLayout>

            {/* Container for LibraryBookList */}
            <flexboxLayout
                flexDirection="column"
                height="350"
                style={{ marginTop: 0, overflowY: 'auto' }} // Aktiverer rulling for LibraryBookList
            >
                <scrollView>
                    <LibraryBookList />
                </scrollView>
            </flexboxLayout>

            {/* BottomNavBar */}
            <BottomNavBar
                currentRoute="Library"
                onNavigate={(screen) => navigation.navigate(screen)}
            />
        </flexboxLayout>
    );
}
