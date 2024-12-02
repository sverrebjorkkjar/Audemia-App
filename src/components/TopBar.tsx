import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';

interface TopBarProps {
    currentScreen: string;
    onMenuTap: () => void;
    onProfileTap: () => void;
    showBackButton?: boolean;
}

export function TopBar({ currentScreen, onMenuTap, onProfileTap, showBackButton = false }: TopBarProps) {
    return (
        <flexboxLayout
            backgroundColor={AudemiaTheme.colors.background}
            className="border-b-2 border-gray-300"
            height="70"
            padding="10"
            style={{ 
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84
            }}
        >
            <flexboxLayout
                width="42"
                height="42"
                className="rounded-xl bg-gray-50"
                onTap={showBackButton ? onMenuTap : onProfileTap}
                justifyContent="center"
                alignItems="center"
                style={{ elevation: 1 }}
            >
                <label
                    className="fas text-xl"
                    color={AudemiaTheme.colors.primary}
                    text={showBackButton ? Icons.arrowLeft : Icons.user}
                />
            </flexboxLayout>

            <label
                text={currentScreen}
                className="text-lg"
                verticalAlignment="center"
                flexGrow="1"
                textAlignment="center"
                color={AudemiaTheme.colors.primary}
                style={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: '600',
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    fontSize: 16
                }}
            />

            <flexboxLayout
                width="42"
                height="42"
                className="rounded-xl bg-gray-50"
                justifyContent="center"
                alignItems="center"
                onTap={showBackButton ? onProfileTap : onMenuTap}
                style={{ elevation: 1 }}
            >
                <label
                    className="fas text-xl"
                    color={AudemiaTheme.colors.primary}
                    text={showBackButton ? Icons.user : Icons.customerService}
                />
            </flexboxLayout>
        </flexboxLayout>
    );
}