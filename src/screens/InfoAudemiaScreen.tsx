import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';
import { CloudinaryImage } from '../components/CloudinaryImage';

type InfoAudemiaScreenProps = {
    route: RouteProp<NavigationParamList, "InfoAudemia">,
    navigation: FrameNavigationProp<NavigationParamList, "InfoAudemia">,
};

export function InfoAudemiaScreen({ navigation }: InfoAudemiaScreenProps) {
    return (
        <flexboxLayout flexDirection="column" height="100%" backgroundColor={AudemiaTheme.colors.background}>
            {/* Back Icon (Outside ScrollView) */}
            <flexboxLayout
                className="w-20 h-20 rounded-full bg-white" // Larger icon with white background
                justifyContent="center"
                alignItems="center"
                onTap={() => navigation.goBack()} // Handle navigation
                style={{ elevation: 5 }} // Add elevation for shadow effect
            >
                <label
                    className="fas text-xl"
                    text={Icons.arrowLeft}
                    color={AudemiaTheme.colors.primary}
                />
            </flexboxLayout>

            {/* Content */}
            <scrollView className="px-8" verticalAlignment="top">
                <stackLayout>
                    {/* Logo */}
                    <CloudinaryImage
                        url="https://res.cloudinary.com/dxoen9t1v/image/upload/v1733146260/Audemia_LOGO_w30quv.png"
                        width={200}
                        height={200}
                        className="self-center my-8"
                    />

                    {/* About Section */}
                    <stackLayout className="p-6 rounded-xl bg-white mb-6" style={{ elevation: 2 }}>
                        <label
                            text="Hva er Audemia?"
                            className="text-xl font-bold mb-4"
                            style={{ lineHeight: 0 }}
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            text="I en verden der kunnskap er nøkkelen til fremgang, åpner Audemia dørene til en ny måte å lære på. Med vår innovative AI-assistent, som guider deg gjennom akademiske lydbøker, transformerer vi hvordan du tilegner deg ny informasjon. Tenk deg å ha en personlig assistent som ikke bare lytter til deg, men interagerer, svarer på spørsmål og hjelper deg å utforske emner dypere – alt gjennom stemmen. Audemia er mer enn bare en app; det er din partner på reisen mot å forstå, lære og vokse. Vi gir deg verktøyene for å gjøre læring enklere, raskere, og mer tilgjengelig, uansett hvor du er."
                            className="text-base"
                            style={{ lineHeight: 0 }}
                            textWrap="true"
                            color={AudemiaTheme.colors.primary}
                        />
                    </stackLayout>

                    {/* Features */}
                    <stackLayout className="p-6 rounded-xl bg-white mb-6" style={{ elevation: 2 }}>
                        <label
                            text="Funksjoner"
                            className="text-xl font-bold mb-4"
                            style={{ lineHeight: 0 }}
                            color={AudemiaTheme.colors.primary}
                        />
                        
                        <flexboxLayout className="p-4 mb-4 bg-gray-50 rounded-lg" alignItems="center">
                            <label
                                className="fas text-lg mr-3"
                                text={Icons.microphone}
                                color={AudemiaTheme.colors.primary}
                            />
                            <stackLayout>
                                <label
                                    text="AI-assistert læring"
                                    className="text-base font-bold"
                                    style={{ lineHeight: 0 }}
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Still spørsmål og få umiddelbare svar"
                                    className="text-sm text-gray-600"
                                    style={{ lineHeight: 0 }}
                                />
                            </stackLayout>
                        </flexboxLayout>
                        
                        <flexboxLayout className="p-4 mb-4 bg-gray-50 rounded-lg" alignItems="center">
                            <label
                                className="fas text-lg mr-3"
                                text={Icons.notes}
                                color={AudemiaTheme.colors.primary}
                            />
                            <stackLayout>
                                <label
                                    text="Lydnotater og bokmerker"
                                    className="text-base font-bold"
                                    style={{ lineHeight: 0 }}
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Ta opp notater mens du lytter"
                                    className="text-sm text-gray-600"
                                    style={{ lineHeight: 0 }}
                                />
                            </stackLayout>
                        </flexboxLayout>
                        
                        <flexboxLayout className="p-4 bg-gray-50 rounded-lg" alignItems="center">
                            <label
                                className="fas text-lg mr-3"
                                text={Icons.quiz}
                                color={AudemiaTheme.colors.primary}
                            />
                            <stackLayout>
                                <label
                                    text="Interaktive quizer"
                                    className="text-base font-bold"
                                    style={{ lineHeight: 0 }}
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text="Test din kunnskap underveis"
                                    className="text-sm text-gray-600"
                                    style={{ lineHeight: 0 }}
                                />
                            </stackLayout>
                        </flexboxLayout>
                    </stackLayout>

                    {/* Contact */}
                    <stackLayout className="p-6 rounded-xl bg-white mb-6" style={{ elevation: 2 }}>
                        <label
                            text="Kontakt oss"
                            className="text-xl font-bold mb-4"
                            style={{ lineHeight: 0 }}
                            color={AudemiaTheme.colors.primary}
                        />
                        <flexboxLayout className="mb-2" alignItems="center">
                            <label
                                className="fas text-lg mr-3"
                                text={Icons.customerService}
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text="+47 123 45 678"
                                className="text-base"
                                style={{ lineHeight: 0 }}
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        <flexboxLayout alignItems="center">
                            <label
                                className="fas text-lg mr-3"
                                text="@"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text="kontakt@audemia.no"
                                className="text-base"
                                style={{ lineHeight: 0 }}
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                    </stackLayout>
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}
