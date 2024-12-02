import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { TopBar } from '../components/TopBar';
import { Icons } from '../utils/icons';

interface FAQItem {
    question: string;
    answer: string;
}

type CustomerServiceScreenProps = {
    route: RouteProp<NavigationParamList, "CustomerService">,
    navigation: FrameNavigationProp<NavigationParamList, "CustomerService">,
};

export function CustomerServiceScreen({ navigation }: CustomerServiceScreenProps) {
    const faqs: FAQItem[] = [
        {
            question: 'Hvordan laster jeg ned en lydbok?',
            answer: 'Gå til boken du ønsker å laste ned, trykk på "Last ned" knappen. Boken vil være tilgjengelig offline i biblioteket ditt.'
        },
        {
            question: 'Hvordan endrer jeg avspillingshastighet?',
            answer: 'Under avspilling, trykk på hastighetsikonet for å justere hastigheten fra 0.5x til 3x.'
        }
    ];

    const contactMethods = [
        {
            id: 'phone',
            icon: Icons.customerService,
            title: 'Ring oss',
            description: 'Tilgjengelig hverdager 09:00-16:00',
            action: 'Ring 815 22 300',
            priority: 'Rask respons',
            onTap: () => console.log('Ringer kundeservice')
        },
        {
            id: 'email',
            icon: '\uf0e0',
            title: 'Send e-post',
            description: 'Svar innen 24 timer',
            priority: 'For detaljerte henvendelser',
            action: 'Send e-post',
            onTap: () => console.log('Åpner e-post')
        },
        {
            id: 'chat',
            icon: '\uf086',
            title: 'Live chat',
            description: 'Snakk med oss direkte',
            priority: 'Tilgjengelig nå',
            action: 'Start chat',
            onTap: () => console.log('Starter chat')
        }
    ];

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Kundeservice"
                onMenuTap={() => navigation.goBack()} // Back button functionality
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />

            <scrollView>
                <stackLayout className="p-6">
                    <label
                        text="Hvordan kan vi hjelpe deg?"
                        className="text-2xl font-bold mb-4"
                        color={AudemiaTheme.colors.primary}
                    />
                    
                    <label
                    text="Velg ønsket kontaktmetode under"
                    className="text-base text-gray-600 mb-6"
                />
                    
                    {contactMethods.map(method => (
                    <flexboxLayout
                        key={method.id}
                        className="mb-4 p-6 rounded-xl bg-white border border-gray-200"
                        flexDirection="column"
                        onTap={method.onTap}
                        style={{ elevation: 2 }}
                    >
                        <flexboxLayout alignItems="center" className="mb-3">
                            <label
                                className="fas text-2xl mr-3"
                                text={method.icon}
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text={method.title}
                                className="text-lg font-bold"
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        
                        <label
                            text={method.priority}
                            className="text-xs text-green-600 mb-2"
                            style={{ fontWeight: 'bold' }}
                        />
                        
                        <label
                            text={method.description}
                            className="text-sm text-gray-600 mb-4"
                        />
                        
                        <button
                            text={method.action}
                            className="p-3 rounded-lg text-white"
                            backgroundColor={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                ))}

                    {/* FAQ Section */}
                    <label
                        text="Vanlige spørsmål"
                        className="text-xl font-bold mt-6 mb-4"
                        color={AudemiaTheme.colors.primary}
                    />

                    {faqs.map((faq, index) => (
                        <flexboxLayout
                            key={index}
                            className="mb-4 p-6 rounded-xl bg-white border border-gray-200"
                            flexDirection="column"
                            style={{ elevation: 2 }}
                        >
                            <flexboxLayout alignItems="center" className="mb-3">
                                <label
                                    className="fas text-lg mr-3"
                                    text={Icons.questionCircle}
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text={faq.question}
                                    className="text-base font-bold"
                                    color={AudemiaTheme.colors.primary}
                                    textWrap="true"
                                />
                            </flexboxLayout>
                            
                            <label
                                text={faq.answer}
                                className="text-sm text-gray-600"
                                textWrap="true"
                            />
                        </flexboxLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}