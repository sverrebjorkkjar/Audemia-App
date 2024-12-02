import { Book } from './book';

export type NavigationParamList = {
    Intro: undefined;
    Home: undefined;
    Library: undefined;
    Search: undefined;
    Chapters: undefined;
    Downloads: undefined;
    Saved: undefined;
    ContinueListening: undefined;
    VoiceNoteDetail: {
        noteId: string;
    };
    SearchResults: {
        results: Book[];
        searchQuery: string;
    };
    Quiz: {
        quizId: string;
    };
    CustomerService: undefined;
    Purchase: {
        book: Book;
    };
    AudioPreview: {
        book: Book;
    };
    InfoAudemia: undefined;
    AIResponse: {
        question: string;
    };
    AudioPlayer: {
        bookId: string;
    };
};