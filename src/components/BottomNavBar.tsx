import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Color } from "@nativescript/core";
import { Icons } from '../utils/icons';

interface BottomNavBarProps {
    currentRoute: string;
    onNavigate: (screen: string) => void;
}

export function BottomNavBar({ currentRoute, onNavigate }: BottomNavBarProps) {
    const inactiveColor = new Color(180, AudemiaTheme.colors.primary.r, AudemiaTheme.colors.primary.g, AudemiaTheme.colors.primary.b);

    const handleNavigation = (screen: string) => {
        if (screen !== currentRoute) {
            onNavigate(screen);
        }
    };

    return (
        <flexboxLayout
            backgroundColor={AudemiaTheme.colors.background}
            className="border-t-2 border-gray-300"
            height="75"
            width="100%"
            style={{ 
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84
            }}
        >
            {/* Hjem */}
            <flexboxLayout
                flexGrow="1"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onTap={() => handleNavigation('Home')}
                className={currentRoute === 'Home' ? 'selected-tab' : ''}
            >
                <flexboxLayout
                    className={`p-3 rounded-xl ${currentRoute === 'Home' ? 'bg-gray-100' : ''}`}
                >
                    <label
                        className="fas text-xl"
                        text={Icons.home}
                        color={currentRoute === 'Home' ? AudemiaTheme.colors.primary : inactiveColor}
                    />
                </flexboxLayout>
                <label
                    text="Hjem"
                    className="text-xs mt-1 font-medium"
                    color={currentRoute === 'Home' ? AudemiaTheme.colors.primary : inactiveColor}
                />
            </flexboxLayout>

            {/* Bibliotek */}
            <flexboxLayout
                flexGrow="1"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onTap={() => handleNavigation('Library')}
            >
                <flexboxLayout
                    className={`p-3 rounded-xl ${currentRoute === 'Library' ? 'bg-gray-100' : ''}`}
                >
                    <label
                        className="fas text-xl"
                        text={Icons.library}
                        color={currentRoute === 'Library' ? AudemiaTheme.colors.primary : inactiveColor}
                    />
                </flexboxLayout>
                <label
                    text="Bibliotek"
                    className="text-xs mt-1 font-medium"
                    color={currentRoute === 'Library' ? AudemiaTheme.colors.primary : inactiveColor}
                />
            </flexboxLayout>

            {/* Søk */}
            <flexboxLayout
                flexGrow="1"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onTap={() => handleNavigation('Search')}
            >
                <flexboxLayout
                    className={`p-3 rounded-xl ${currentRoute === 'Search' ? 'bg-gray-100' : ''}`}
                >
                    <label
                        className="fas text-xl"
                        text={Icons.search}
                        color={currentRoute === 'Search' ? AudemiaTheme.colors.primary : inactiveColor}
                    />
                </flexboxLayout>
                <label
                    text="Søk"
                    className="text-xs mt-1 font-medium"
                    color={currentRoute === 'Search' ? AudemiaTheme.colors.primary : inactiveColor}
                />
            </flexboxLayout>
        </flexboxLayout>
    );
}
