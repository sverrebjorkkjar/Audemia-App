import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';
import { TopBar } from '../components/TopBar';

interface Question {
    id: string;
    text: string;
    correctAnswer: string;
}

interface UserAnswer {
    questionId: string;
    transcription: string;
    isCorrect: boolean;
}

type QuizScreenProps = {
    route: RouteProp<NavigationParamList, "Quiz">,
    navigation: FrameNavigationProp<NavigationParamList, "Quiz">,
};

export function QuizScreen({ route, navigation }: QuizScreenProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [isRecording, setIsRecording] = React.useState(false);
    const [userAnswers, setUserAnswers] = React.useState<UserAnswer[]>([]);
    const [isQuizComplete, setIsQuizComplete] = React.useState(false);
    const [showAnswerSaved, setShowAnswerSaved] = React.useState(false);

    const questions: Question[] = [
        {
            id: '1',
            text: 'Forklar hovedprinsippene i digital transformasjon og hvordan det påvirker bedrifter.',
            correctAnswer: 'Digital transformasjon handler om å integrere digital teknologi i alle områder av en virksomhet. Dette fører til grunnleggende endringer i hvordan bedriften opererer og leverer verdi til kunder.'
        },
        {
            id: '2',
            text: 'Hvilke utfordringer møter bedrifter i implementeringen av bærekraftige praksiser?',
            correctAnswer: 'Bedrifter møter flere utfordringer, inkludert høye initielle kostnader, behov for kompetanseutvikling, og balansering av kortsiktige økonomiske mål med langsiktige bærekraftsmål.'
        },
        {
            id: '3',
            text: 'Beskriv hvordan kunstig intelligens kan forbedre kundeservice i moderne bedrifter.',
            correctAnswer: 'Kunstig intelligens kan forbedre kundeservice gjennom chatbots for døgnkontinuerlig support, personaliserte anbefalinger basert på kundedata, og automatisert håndtering av rutinehenvendelser.'
        }
    ];

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleStartRecording = () => {
        setIsRecording(true);
        console.log('Starter opptak...');
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setShowAnswerSaved(true);
        const mockTranscription = 'Dette er et simulert svar fra brukeren...';
        
        setUserAnswers(prev => [...prev, {
            questionId: questions[currentQuestionIndex].id,
            transcription: mockTranscription,
            isCorrect: Math.random() > 0.5
        }]);
    };

    const handleNextQuestion = () => {
        setShowAnswerSaved(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    const handleRetryAnswer = () => {
        setShowAnswerSaved(false);
        setUserAnswers(prev => prev.slice(0, -1));
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setIsQuizComplete(false);
        setShowAnswerSaved(false);
    };

    if (isQuizComplete) {
        return (
            <flexboxLayout flexDirection="column" height="100%">
                <TopBar
                    currentScreen="Quiz Resultater"
                    onMenuTap={() => navigation.goBack()}
                    onProfileTap={() => console.log("Profil")}
                    showBackButton={true}
                />
                
                <stackLayout className="p-6">
                    <stackLayout className="mb-6 p-6 rounded-2xl bg-white" style={{ elevation: 4 }}>
                        <label
                            text="Quiz Fullført!"
                            className="text-2xl font-bold text-center"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            text={`${userAnswers.filter(a => a.isCorrect).length} av ${questions.length} korrekte svar`}
                            className="text-lg text-center mt-2"
                            color={AudemiaTheme.colors.primary}
                        />
                        
                        <gridLayout rows="auto" columns="*, auto" className="mt-4">
                            <stackLayout col="0" className="h-3 rounded-full bg-gray-200">
                                <stackLayout
                                    className="h-3 rounded-full"
                                    backgroundColor={AudemiaTheme.colors.primary}
                                    width={`${(userAnswers.filter(a => a.isCorrect).length / questions.length) * 100}%`}
                                />
                            </stackLayout>
                            <label
                                col="1"
                                text={`${Math.round((userAnswers.filter(a => a.isCorrect).length / questions.length) * 100)}%`}
                                className="ml-2 font-bold"
                                color={AudemiaTheme.colors.primary}
                            />
                        </gridLayout>
                    </stackLayout>
                    
                    <scrollView>
                        <stackLayout>
                            {questions.map((question, index) => {
                                const userAnswer = userAnswers[index];
                                return (
                                    <stackLayout
                                        key={question.id}
                                        className="mb-6 p-6 rounded-2xl bg-white"
                                        style={{ elevation: 2 }}
                                    >
                                        <gridLayout rows="auto" columns="auto, *">
                                            <label
                                                col="0"
                                                text={`${index + 1}`}
                                                className="text-lg font-bold w-8 h-8 text-center bg-gray-100 rounded-full"
                                                color={AudemiaTheme.colors.primary}
                                            />
                                            <label
                                                col="1"
                                                text={question.text}
                                                className="ml-3 text-lg"
                                                textWrap="true"
                                                color={AudemiaTheme.colors.primary}
                                            />
                                        </gridLayout>

                                        <stackLayout className="mt-4 p-4 rounded-xl bg-gray-50">
                                            <gridLayout rows="auto" columns="auto, *">
                                                <label
                                                    col="0"
                                                    className="fas text-lg mr-2"
                                                    text={Icons.recording}
                                                    color={AudemiaTheme.colors.primary}
                                                />
                                                <label
                                                    col="1"
                                                    text="Ditt svar"
                                                    className="font-bold"
                                                    color={AudemiaTheme.colors.primary}
                                                />
                                            </gridLayout>
                                            <label
                                                text={userAnswer?.transcription}
                                                className="mt-2"
                                                textWrap="true"
                                                color={AudemiaTheme.colors.primary}
                                            />
                                        </stackLayout>

                                        <stackLayout className="mt-4 p-4 rounded-xl bg-gray-50">
                                            <gridLayout rows="auto" columns="auto, *">
                                                <label
                                                    col="0"
                                                    className="fas text-lg mr-2"
                                                    text={Icons.check}
                                                    color={AudemiaTheme.colors.primary}
                                                />
                                                <label
                                                    col="1"
                                                    text="Fasit"
                                                    className="font-bold"
                                                    color={AudemiaTheme.colors.primary}
                                                />
                                            </gridLayout>
                                            <label
                                                text={question.correctAnswer}
                                                className="mt-2"
                                                textWrap="true"
                                                color={AudemiaTheme.colors.primary}
                                            />
                                        </stackLayout>
                                    </stackLayout>
                                );
                            })}
                        </stackLayout>
                    </scrollView>
                    
                    <gridLayout rows="auto" columns="*, *" className="mt-4">
                        <button
                            col="0"
                            text="Avslutt"
                            className="m-1 p-4 rounded-xl"
                            backgroundColor={AudemiaTheme.colors.secondary}
                            color={AudemiaTheme.colors.primary}
                            onTap={() => navigation.goBack()}
                        />
                        <button
                            col="1"
                            text="Start på nytt"
                            className="m-1 p-4 rounded-xl text-white"
                            backgroundColor={AudemiaTheme.colors.primary}
                            onTap={handleRestartQuiz}
                        />
                    </gridLayout>
                </stackLayout>
            </flexboxLayout>
        );
    }

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Quiz"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />
            
            <stackLayout className="p-6 flex-grow">
                <stackLayout className="mb-6">
                    <gridLayout rows="auto" columns="*, auto">
                        <label
                            col="0"
                            text={`Spørsmål ${currentQuestionIndex + 1} av ${questions.length}`}
                            className="text-lg font-bold"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            col="1"
                            text={`${Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%`}
                            className="text-sm"
                            color={AudemiaTheme.colors.primary}
                        />
                    </gridLayout>
                    
                    <stackLayout className="mt-2 h-2 rounded-full bg-gray-200">
                        <stackLayout
                            className="h-2 rounded-full"
                            backgroundColor={AudemiaTheme.colors.primary}
                            width={`${((currentQuestionIndex + 1) / questions.length) * 100}%`}
                        />
                    </stackLayout>
                </stackLayout>

                <stackLayout className="p-6 rounded-2xl bg-white" style={{ elevation: 4 }}>
                    <gridLayout rows="auto" columns="auto, *">
                        <label
                            col="0"
                            text={`${currentQuestionIndex + 1}`}
                            className="text-lg font-bold w-8 h-8 text-center bg-gray-100 rounded-full"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            col="1"
                            text={questions[currentQuestionIndex].text}
                            className="ml-3 text-lg"
                            textWrap="true"
                            color={AudemiaTheme.colors.primary}
                        />
                    </gridLayout>

                    <button
                        className="mt-4 p-4 rounded-xl"
                        backgroundColor={AudemiaTheme.colors.secondary}
                        onTap={() => console.log("Spiller av spørsmål")}
                    >
                        <formattedString>
                            <span className="fas text-lg" text={Icons.play} color={AudemiaTheme.colors.primary} />
                            <span text=" Hør spørsmålet" color={AudemiaTheme.colors.primary} />
                        </formattedString>
                    </button>
                </stackLayout>

                {showAnswerSaved ? (
                    <stackLayout className="mt-6 p-6 rounded-2xl bg-white" style={{ elevation: 4 }}>
                        <gridLayout rows="auto" columns="auto, *">
                            <label
                                col="0"
                                className="fas text-xl mr-3"
                                text={Icons.check}
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                col="1"
                                text="Svar lagret!"
                                className="text-lg font-bold"
                                color={AudemiaTheme.colors.primary}
                            />
                        </gridLayout>
                        
                        <gridLayout rows="auto" columns="*, *" className="mt-4">
                            <button
                                col="0"
                                text="Svar på nytt"
                                className="m-1 p-4 rounded-xl"
                                backgroundColor={AudemiaTheme.colors.secondary}
                                color={AudemiaTheme.colors.primary}
                                onTap={handleRetryAnswer}
                            />
                            <button
                                col="1"
                                text={isLastQuestion ? "Avslutt quiz og se svar" : "Neste spørsmål"}
                                className="m-1 p-4 rounded-xl text-white"
                                backgroundColor={AudemiaTheme.colors.primary}
                                onTap={handleNextQuestion}
                            />
                        </gridLayout>
                    </stackLayout>
                ) : (
                    <flexboxLayout
                        className="mt-6"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <flexboxLayout
                            className={`p-8 rounded-full bg-white ${isRecording ? 'recording' : ''}`}
                            justifyContent="center"
                            alignItems="center"
                            onTap={isRecording ? handleStopRecording : handleStartRecording}
                            style={{ 
                                elevation: 8,
                                borderWidth: isRecording ? 2 : 0,
                                borderColor: '#DC2626'
                            }}
                        >
                            <label
                                className="fas text-4xl"
                                text={isRecording ? Icons.stopRecording : Icons.recording}
                                color={isRecording ? '#DC2626' : AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        <label
                            text={isRecording ? "Trykk for å stoppe" : "Trykk for å svare"}
                            className="mt-4 text-sm"
                            color={isRecording ? '#DC2626' : AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                )}
            </stackLayout>
        </flexboxLayout>
    );
}