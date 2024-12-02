import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { BottomNavBar } from '../components/BottomNavBar';
import { TopBar } from '../components/TopBar';
import { SearchHeader } from '../components/SearchHeader';
import { recommendedBooks, popularBooks, newReleases } from '../data/mockBooks';
import { Book } from '../types/book';
import { BookSection } from '../components/BookSection';

type SearchScreenProps = {
    route: RouteProp<NavigationParamList, "Search">,
    navigation: FrameNavigationProp<NavigationParamList, "Search">,
};

export function SearchScreen({ navigation }: SearchScreenProps) {
    const [searchText, setSearchText] = React.useState("");

    const allBooks = [...recommendedBooks, ...popularBooks, ...newReleases];

    const handleMenuTap = () => {
        console.log("Meny åpnet");
    };

    const handleProfileTap = () => {
        console.log("Profil åpnet");
    };

    const handleSearch = (text: string) => {
        setSearchText(text);
        console.log("Search initiated with text:", text); // Debugging log
        if (!text.trim()) return;

        const searchTerms = text.toLowerCase().split(' ');
        const results = allBooks.filter(book => {
            const searchableText = [
                book.title,
                book.author,
                book.publisher,
                ...book.tags,
                book.description || ''
            ].join(' ').toLowerCase();

            return searchTerms.every(term => searchableText.includes(term));
        });

        console.log("Results found:", results.length); // Log number of results

        if (results.length === 0) {
            console.log("No results found for:", text); // Debugging when no results are found
            return;
        }

        // Navigate to SearchResultsScreen with results
        console.log("Navigating to SearchResults with:", results); // Log results before navigating
        navigation.navigate('SearchResults', {
            results,
            searchQuery: text
        });
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Søk"
                onMenuTap={handleMenuTap}
                onProfileTap={handleProfileTap}
            />

            {/* Container for SearchHeader */}
            <flexboxLayout
                className="p-4 bg-white border-b border-gray-200"
                flexDirection="column"
                width="100%"
            >
                <SearchHeader
                    onSearch={handleSearch}
                    onFilterTap={() => console.log("Filter trykket")}
                />
            </flexboxLayout>

            {/* Scrollable content area */}
            <scrollView
                className="column"
                height="500"
                style={{ backgroundColor: '#f5f5f5' }}
            >
                <stackLayout>
                    {/* Book Section Containers */}
                    <flexboxLayout
                        className="p-4 bg-white mb-4"
                        flexDirection="column"
                    >
                        <BookSection
                            title="Anbefalte lydbøker"
                            books={recommendedBooks}
                        />
                    </flexboxLayout>

                    <flexboxLayout
                        className="p-4 bg-white mb-4"
                        flexDirection="column"
                    >
                        <BookSection
                            title="Populære bøker"
                            books={popularBooks}
                        />
                    </flexboxLayout>

                    <flexboxLayout
                        className="p-4 bg-white"
                        flexDirection="column"
                    >
                        <BookSection
                            title="Nye utgivelser"
                            books={newReleases}
                        />
                    </flexboxLayout>
                </stackLayout>
            </scrollView>

            <BottomNavBar
                currentRoute="Search"
                onNavigate={(screen) => navigation.navigate(screen)}
            />
        </flexboxLayout>
    );
}
