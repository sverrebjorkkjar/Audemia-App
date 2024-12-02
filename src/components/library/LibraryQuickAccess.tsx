import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../../utils/types';
import { Icons } from '../../utils/icons';

interface QuickAccessItem {
    id: string;
    label: string;
    icon: string;
    count?: number;
    route: keyof NavigationParamList;
}

export function LibraryQuickAccess() {
    const navigation = useNavigation<FrameNavigationProp<NavigationParamList>>();

    const quickAccessItems: QuickAccessItem[] = [
        { id: 'chapters', label: 'Mine kapitler', icon: Icons.bookmark, count: 12, route: 'Chapters' },
        { id: 'downloads', label: 'Nedlastninger', icon: Icons.download, count: 5, route: 'Downloads' },
        { id: 'saved', label: 'Ønskeliste', icon: Icons.heart, count: 8, route: 'Saved' },
        { id: 'continue', label: 'Fortsett å høre', icon: Icons.play, count: 3, route: 'ContinueListening' }
    ];

    const handleNavigation = (route: keyof NavigationParamList) => {
        navigation.navigate(route);
    };

    return (
        <stackLayout
            className="p-2"
            style={{
                maxHeight: '30vh', // Begrens høyden til 30% av skjermen
                overflow: 'auto', // Gjør listen rullbar hvis den blir for lang
            }}
        >
            {quickAccessItems.map((item) => (
                <flexboxLayout
                    key={item.id}
                    className="mb-2 p-2 rounded-lg bg-gray-50" // Redusert margin og padding
                    alignItems="center"
                    onTap={() => handleNavigation(item.route)}
                    style={{
                        elevation: 1,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2
                    }}
                >
                    <label
                        className="fas text-lg mr-3"
                        text={item.icon}
                        color={AudemiaTheme.colors.primary}
                    />
                    <label
                        text={item.label}
                        className="text-base"
                        color={AudemiaTheme.colors.primary}
                        flexGrow="1"
                    />
                    {item.count !== undefined && (
                        <label
                            text={item.count.toString()}
                            className="text-sm px-3 py-1 rounded-full bg-white"
                            color={AudemiaTheme.colors.primary}
                        />
                    )}
                </flexboxLayout>
            ))}
        </stackLayout>
    );
}
