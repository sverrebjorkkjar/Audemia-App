import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { Icons } from '../utils/icons';

interface Quiz {
    id: string;
    title: string;
    category: string;
    questionCount: number;
    estimatedTime: string;
    difficulty: string;
}

interface QuizPreviewProps {
    onQuizSelect: (quizId: string) => void;
}

export function QuizPreview({ onQuizSelect }: QuizPreviewProps) {
    const navigation = useNavigation<FrameNavigationProp<NavigationParamList>>();
    
    const featuredQuizzes: Quiz[] = [
        {
            id: '1',
            title: 'Entreprenørskap',
            category: 'Dahle, Yngve',
            questionCount: 10,
            estimatedTime: '5 min',
            difficulty: 'Middels'
        },
        {
            id: '2',
            title: 'In the legacy of Hans Nielsen Hauge',
            category: 'Liland, Truls',
            questionCount: 15,
            estimatedTime: '8 min',
            difficulty: 'Enkel'
        },
        {
            id: '3',
            title: 'Hva er etikk',
            category: 'Vetlesen, Arne Johan',
            questionCount: 12,
            estimatedTime: '6 min',
            difficulty: 'Utfordrende'
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Enkel':
                return '#4CAF50';
            case 'Middels':
                return '#FF9800';
            case 'Utfordrende':
                return '#F44336';
            default:
                return '#757575';
        }
    };

    const handleQuizStart = (quizId: string) => {
        navigation.navigate('Quiz', { quizId });
    };

    return (
        <stackLayout className="mx-4 mt-4">
            <label
                text="Ukens Quiz Utfordringer"
                className="text-xl font-bold mb-4"
                color={AudemiaTheme.colors.primary}
            />
            
            <scrollView orientation="horizontal">
                <stackLayout orientation="horizontal">
                    {featuredQuizzes.map(quiz => (
                        <gridLayout
                            key={quiz.id}
                            className="mr-4 rounded-xl bg-white"
                            rows="auto, auto"
                            columns="*"
                            width="280"
                            style={{ elevation: 4 }}
                        >
                            {/* Top Section with Book Cover Background */}
                            <gridLayout
                                row="0"
                                className="rounded-t-xl"
                                height="160"
                                style={{
                                    backgroundImage: 'url(https://res.cloudinary.com/dxoen9t1v/image/upload/v1733050963/9788215060699_bbfd04e17546d0db1c3b43c56f5e8e91_jols19.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }}
                            >
                                {/* Gradient Overlay */}
                                <gridLayout
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(0,40,85,0) 0%, rgba(0,40,85,0.85) 100%)',
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12
                                    }}
                                >
                                    {/* Quiz Info */}
                                    <stackLayout verticalAlignment="bottom" className="p-4">
                                        <flexboxLayout className="mb-2">
                                            <label
                                                text={quiz.category}
                                                className="text-xs font-medium bg-white bg-opacity-25 rounded-full px-3 py-1"
                                                color="white"
                                            />
                                        </flexboxLayout>
                                        
                                        <label
                                            text={quiz.title}
                                            className="text-xl font-bold"
                                            style={{ lineHeight: 0 }}
                                            textWrap="true"
                                            color="white"
                                        />
                                    </stackLayout>
                                </gridLayout>
                            </gridLayout>
                            
                            {/* Bottom Section */}
                            <stackLayout row="1" className="p-4">
                                <flexboxLayout className="justify-between mb-2">
                                    <flexboxLayout>
                                        <label
                                            className="fas text-sm mr-2"
                                            text={Icons.question}
                                            color={AudemiaTheme.colors.primary}
                                        />
                                        <label
                                            text={`${quiz.questionCount} spørsmål`}
                                            className="text-sm"
                                            color={AudemiaTheme.colors.primary}
                                        />
                                    </flexboxLayout>
                                    <flexboxLayout>
                                        <label
                                            className="fas text-sm mr-2"
                                            text={Icons.clock}
                                            color={AudemiaTheme.colors.primary}
                                        />
                                        <label
                                            text={quiz.estimatedTime}
                                            className="text-sm"
                                            color={AudemiaTheme.colors.primary}
                                        />
                                    </flexboxLayout>
                                </flexboxLayout>
                                
                                <flexboxLayout alignItems="center" className="mt-4">
                                    <button
                                        text="Start"
                                        className="text-sm p-3 rounded-lg text-white mr-3"
                                        backgroundColor={AudemiaTheme.colors.primary}
                                        onTap={() => handleQuizStart(quiz.id)}
                                    />
                                    <label
                                        className="fas text-sm mr-2"
                                        text={Icons.lightbulb}
                                        color={getDifficultyColor(quiz.difficulty)}
                                    />
                                    <label
                                        text={quiz.difficulty}
                                        className="text-sm font-medium"
                                        color={getDifficultyColor(quiz.difficulty)}
                                    />
                                </flexboxLayout>
                            </stackLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </stackLayout>
    );
}