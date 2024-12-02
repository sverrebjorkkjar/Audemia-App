import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { TopBar } from '../components/TopBar';
import { Book } from '../types/book';
import { AudioBookCard } from '../components/AudioBookCard';

type SearchResultsScreenProps = {
    route: RouteProp<NavigationParamList, "SearchResults">,
    navigation: FrameNavigationProp<NavigationParamList, "SearchResults">,
};

export function SearchResultsScreen({ route, navigation }: SearchResultsScreenProps) {
    const { results, searchQuery } = route.params || {}; // Handle fallback if params are missing

    console.log("SearchResultsScreen mounted with params:", route.params); // Log params to check if data is passed correctly

    if (!results) {
        console.log("No results passed or data is missing"); // Log error if results are missing
        return (
            <stackLayout>
                <label text="Ingen resultater funnet" color="red" /> {/* Fallback if no results */}
            </stackLayout>
        );
    }

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Søkeresultater"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />

            <stackLayout className="p-4">
                <label
                    text={`Søkeresultater for "${searchQuery}"`}
                    className="text-lg font-bold mb-2"
                    color={AudemiaTheme.colors.primary}
                />
                <label
                    text={`${results.length} treff`}
                    className="text-sm text-gray-600 mb-4"
                />
            </stackLayout>

            <scrollView className="flex-grow">
                <flexboxLayout flexWrap="wrap" justifyContent="space-around">
                    {results.map((book: Book) => {
                        console.log(`Rendering book: ${book.title}`); // Log each book being rendered
                        return (
                            <AudioBookCard
                                key={book.id}
                                title={book.title}
                                author={book.author}
                                publisher={book.publisher}
                                price={book.price}
                                onPlayPreview={() => console.log(`Playing preview for ${book.title}`)}
                                onPurchase={() => console.log(`Purchasing ${book.title}`)}
                            />
                        );
                    })}
                </flexboxLayout>
            </scrollView>
        </flexboxLayout>
    );
}
