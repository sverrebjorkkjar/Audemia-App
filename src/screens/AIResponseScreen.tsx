import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';
import { sampleResponses } from '../data/sampleResponses';

type AIResponseScreenProps = {
    route: RouteProp<NavigationParamList, "AIResponse">,
    navigation: FrameNavigationProp<NavigationParamList, "AIResponse">,
};

export function AIResponseScreen({ route, navigation }: AIResponseScreenProps) {
    const { question } = route.params;
    const response = sampleResponses[question] || "Beklager, jeg kunne ikke finne et svar på dette spørsmålet.";

    return (
        <flexboxLayout flexDirection="column" height="100%" backgroundColor="#002855">
            {/* Header */}
            <flexboxLayout
                className="p-4"
                backgroundColor="#002855"
                style={{ elevation: 4 }}
            >
                <label
                    className="fas text-xl"
                    text={Icons.close}
                    color="white"
                    onTap={() => navigation.goBack()}
                />
                <label
                    text="AI Svar"
                    className="text-xl ml-4"
                    color="white"
                />
            </flexboxLayout>

            {/* Content */}
            <scrollView className="p-4">
                {/* Question Section */}
                <stackLayout
                    className="p-4 mb-4 rounded-xl bg-white"
                    style={{ elevation: 2 }}
                >
                    <flexboxLayout alignItems="center" className="mb-2">
                        <label
                            className="fas text-lg mr-2"
                            text={Icons.question}
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            text="Ditt spørsmål"
                            className="text-lg font-bold"
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                    <label
                        text={question}
                        className="text-base"
                        color={AudemiaTheme.colors.primary}
                        textWrap="true"
                    />
                </stackLayout>

                {/* Response Section */}
                <stackLayout
                    className="p-4 rounded-xl bg-white"
                    style={{ elevation: 2 }}
                >
                    <flexboxLayout alignItems="center" className="mb-2">
                        <label
                            className="fas text-lg mr-2"
                            text={Icons.text}
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            text="AI Svar"
                            className="text-lg font-bold"
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                    <label
                        text={response}
                        className="text-base"
                        color={AudemiaTheme.colors.primary}
                        textWrap="true"
                    />
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}