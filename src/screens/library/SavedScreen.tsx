import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';
import { AudemiaTheme } from '../../styles/theme';
import { TopBar } from '../../components/TopBar';

import { wishlistStore } from '../../store/wishlistStore';
import { CloudinaryImage } from '../../components/CloudinaryImage';
import { Book } from '../../types/book';

type SavedScreenProps = {
    route: RouteProp<NavigationParamList, "Saved">,
    navigation: FrameNavigationProp<NavigationParamList, "Saved">,
};

export function SavedScreen({ navigation }: SavedScreenProps) {
    const [wishlistBooks, setWishlistBooks] = React.useState<Book[]>([]);

    React.useEffect(() => {
        setWishlistBooks(wishlistStore.getBooks());
        return wishlistStore.subscribe(() => {
            setWishlistBooks(wishlistStore.getBooks());
        });
    }, []);

    const handleRemoveFromWishlist = (bookId: string) => {
        wishlistStore.removeBook(bookId);
    };

    const handlePreviewBook = (book: Book) => {
        navigation.navigate('AudioPreview', { book });
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Ønskeliste"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
            />
            
            {wishlistBooks.length === 0 ? (
                <flexboxLayout
                    className="flex-grow"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    padding="20"
                >
                    <label
                        className="fas text-6xl mb-4"
                        text={Icons.heart}
                        color={AudemiaTheme.colors.primary}
                    />
                    <label
                        text="Din ønskeliste er tom"
                        className="text-xl font-bold mb-2"
                        color={AudemiaTheme.colors.primary}
                    />
                    <label
                        text="Legg til bøker i ønskelisten din ved å trykke på hjerteikonet når du utforsker bøker"
                        className="text-center text-gray-600"
                        textWrap="true"
                    />
                </flexboxLayout>
            ) : (
                <scrollView className="mb-4">
                    <stackLayout className="p-4">
                        {wishlistBooks.map(book => (
                        <gridLayout
                            key={book.id}
                            className="mb-4 rounded-xl bg-white"
                            rows="auto"
                            columns="auto, *, auto"
                            style={{ elevation: 2 }}
                            onTap={() => handlePreviewBook(book)}
                        >
                            {/* Book Cover */}
                            <gridLayout
                                row="0"
                                col="0"
                                className="m-4"
                                style={{ width: 80, height: 120 }}
                            >
                                {book.coverImage ? (
                                    <CloudinaryImage
                                        url={book.coverImage}
                                        width={80}
                                        height={120}
                                        className="rounded-lg"
                                        format="webp"
                                    />
                                ) : (
                                    <stackLayout
                                        className="w-full h-full rounded-lg bg-gray-100"
                                    />
                                )}
                            </gridLayout>

                            {/* Book Info */}
                            <stackLayout row="0" col="1" className="py-4">
                                <label
                                    text={book.title}
                                    className="font-bold mb-1"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                                <label
                                    text={book.author}
                                    className="text-sm text-gray-600 mb-2"
                                    textWrap="true"
                                />
                                <label
                                    text={book.price}
                                    className="text-sm font-bold"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </stackLayout>

                            {/* Remove Button */}
                            <flexboxLayout
                                row="0"
                                col="2"
                                className="p-4"
                                alignItems="center"
                            >
                                <label
                                    className="fas text-xl"
                                    text={Icons.heartSolid}
                                    color="#DC2626"
                                    onTap={(args) => {
                                        args.object.preventDefault();
                                        handleRemoveFromWishlist(book.id);
                                    }}
                                />
                            </flexboxLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
            )}
        </flexboxLayout>
    );
}