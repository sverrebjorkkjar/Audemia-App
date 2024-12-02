import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { AudemiaTheme } from '../styles/theme';
import { TopBar } from '../components/TopBar';
import { Icons } from '../utils/icons';

type PurchaseScreenProps = {
    route: RouteProp<NavigationParamList, "Purchase">,
    navigation: FrameNavigationProp<NavigationParamList, "Purchase">,
};

interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export function PurchaseScreen({ route, navigation }: PurchaseScreenProps) {
    const { book } = route.params;
    const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'visa',
            name: 'Visa/Mastercard',
            icon: '\uf1f0',
            description: 'Betal direkte med ditt bankkort'
        },
        {
            id: 'googlepay',
            name: 'Google Pay',
            icon: '\uf1a0',
            description: 'Rask og sikker betaling med Google Pay'
        },
        {
            id: 'applepay',
            name: 'Apple Pay',
            icon: '\uf179',
            description: 'Enkel betaling med Apple Pay'
        },
        {
            id: 'klarna',
            name: 'Klarna',
            icon: '\uf155',
            description: 'Betal nå eller del opp betalingen'
        },
        {
            id: 'vipps',
            name: 'Vipps',
            icon: '\uf0d6',
            description: 'Betal enkelt med Vipps'
        }
    ];

    const handlePayment = () => {
        if (!selectedMethod) return;
        console.log(`Prosesserer betaling med ${selectedMethod}`);
        // Implementer betalingslogikk her
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <TopBar
                currentScreen="Kjøp lydbok"
                onMenuTap={() => navigation.goBack()}
                onProfileTap={() => console.log("Profil")}
                showBackButton={true}
            />
            
            <scrollView className="flex-grow">
                <stackLayout className="p-6">
                    {/* Book Info */}
                    <flexboxLayout className="mb-6 p-6 rounded-xl bg-white" style={{ elevation: 4 }}>
                        {/* Book Cover Placeholder */}
                        <flexboxLayout
                            className="w-32 h-40 rounded-lg bg-gray-100 mr-4"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <label
                                className="fas text-4xl"
                                text={Icons.book}
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        
                        {/* Book Details */}
                        <stackLayout>
                            <label
                                text={book.title}
                                className="text-xl font-bold mb-2"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text={book.author}
                                className="text-base text-gray-600 mb-4"
                            />
                            <label
                                text={book.price}
                                className="text-lg font-bold"
                                color={AudemiaTheme.colors.primary}
                            />
                        </stackLayout>
                    </flexboxLayout>

                    <label
                        text="Velg betalingsmetode"
                        className="text-lg font-bold mb-4"
                        color={AudemiaTheme.colors.primary}
                    />

                    {/* Payment Methods */}
                    {paymentMethods.map(method => (
                        <flexboxLayout
                            key={method.id}
                            className={`mb-4 p-6 rounded-xl ${selectedMethod === method.id ? 'border-2 border-primary' : 'bg-white border border-gray-200'}`}
                            flexDirection="column"
                            onTap={() => setSelectedMethod(method.id)}
                            style={{ 
                                elevation: selectedMethod === method.id ? 4 : 2,
                                backgroundColor: selectedMethod === method.id ? '#E8F0FE' : '#FFFFFF'
                            }}
                        >
                            <flexboxLayout alignItems="center" className="mb-2">
                                <label
                                    className="fab text-2xl mr-3"
                                    text={method.icon}
                                    color={selectedMethod === method.id ? AudemiaTheme.colors.primary : '#666666'}
                                />
                                <label
                                    text={method.name}
                                    className={`text-lg ${selectedMethod === method.id ? 'font-bold' : 'font-medium'}`}
                                    color={selectedMethod === method.id ? AudemiaTheme.colors.primary : '#333333'}
                                />
                                {selectedMethod === method.id && (
                                    <label
                                        className="fas text-lg ml-auto"
                                        text={Icons.check}
                                        color={AudemiaTheme.colors.primary}
                                    />
                                )}
                            </flexboxLayout>
                            <label
                                text={method.description}
                                className={`text-sm ${selectedMethod === method.id ? 'text-gray-800' : 'text-gray-600'}`}
                            />
                        </flexboxLayout>
                    ))}
                </stackLayout>
            </scrollView>

            {/* Bottom Payment Button */}
            <flexboxLayout
                className="p-4 border-t border-gray-200"
                backgroundColor="white"
                style={{ elevation: 8 }}
            >
                <button
                    text={`Betal ${book.price}`}
                    className="p-4 rounded-xl text-white w-full"
                    backgroundColor={selectedMethod ? AudemiaTheme.colors.primary : '#cccccc'}
                    isEnabled={!!selectedMethod}
                    onTap={handlePayment}
                />
            </flexboxLayout>
        </flexboxLayout>
    );
}