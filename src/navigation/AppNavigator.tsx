import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { IntroScreen } from '../screens/IntroScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ChaptersScreen } from '../screens/library/ChaptersScreen';
import { DownloadsScreen } from '../screens/library/DownloadsScreen';
import { SavedScreen } from '../screens/library/SavedScreen';
import { ContinueListeningScreen } from '../screens/library/ContinueListeningScreen';
import { VoiceNoteDetailScreen } from '../screens/VoiceNoteDetailScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { CustomerServiceScreen } from '../screens/CustomerServiceScreen';
import { PurchaseScreen } from '../screens/PurchaseScreen';
import { AudioPreviewScreen } from '../screens/AudioPreviewScreen';
import { AudioPlayerScreen } from '../screens/AudioPlayerScreen';
import { AIResponseScreen } from '../screens/AIResponseScreen';
import { InfoAudemiaScreen } from '../screens/InfoAudemiaScreen';

const StackNavigator = stackNavigatorFactory();

export const AppNavigator = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="InfoAudemia"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                animationEnabled: true
            }}
        >
            <StackNavigator.Screen
                name="Intro"
                component={IntroScreen}
            />
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />
            <StackNavigator.Screen
                name="Library"
                component={LibraryScreen}
            />
            <StackNavigator.Screen
                name="Search"
                component={SearchScreen}
            />
            <StackNavigator.Screen
                name="Chapters"
                component={ChaptersScreen}
            />
            <StackNavigator.Screen
                name="Downloads"
                component={DownloadsScreen}
            />
            <StackNavigator.Screen
                name="Saved"
                component={SavedScreen}
            />
            <StackNavigator.Screen
                name="ContinueListening"
                component={ContinueListeningScreen}
            />
            <StackNavigator.Screen
                name="VoiceNoteDetail"
                component={VoiceNoteDetailScreen}
            />
            <StackNavigator.Screen
                name="Quiz"
                component={QuizScreen}
            />
            <StackNavigator.Screen
                name="SearchResults"
                component={SearchResultsScreen}
            />
            <StackNavigator.Screen
                name="CustomerService"
                component={CustomerServiceScreen}
            />
            <StackNavigator.Screen
                name="Purchase"
                component={PurchaseScreen}
            />
            <StackNavigator.Screen
                name="AudioPreview"
                component={AudioPreviewScreen}
            />
            <StackNavigator.Screen
                name="AudioPlayer"
                component={AudioPlayerScreen}
            />
            <StackNavigator.Screen
                name="AIResponse"
                component={AIResponseScreen}
            />
            <StackNavigator.Screen
                name="InfoAudemia"
                component={InfoAudemiaScreen}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);