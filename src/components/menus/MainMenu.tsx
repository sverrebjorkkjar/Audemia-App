import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { Modal } from "@nativescript/core";

interface MainMenuProps {
    isVisible: boolean;
    onClose: () => void;
    onMenuSelect: (menuItem: string) => void;
}

export function MainMenu({ isVisible, onClose, onMenuSelect }: MainMenuProps) {
    const menuItems = [
        { id: 'discover', icon: '&#xf002;', label: 'Oppdag nye bøker' },
        { id: 'categories', icon: '&#xf02c;', label: 'Kategorier' },
        { id: 'favorites', icon: '&#xf005;', label: 'Favoritter' },
        { id: 'history', icon: '&#xf017;', label: 'Lyttehistorikk' },
        { id: 'downloads', icon: '&#xf019;', label: 'Nedlastinger' },
        { id: 'wishlist', icon: '&#xf004;', label: 'Ønskeliste' },
        { id: 'subscriptions', icon: '&#xf0a3;', label: 'Abonnementer' },
        { id: 'recommendations', icon: '&#xf164;', label: 'Anbefalinger' },
        { id: 'achievements', icon: '&#xf091;', label: 'Prestasjoner' }
    ];

    return (
        <Modal
            animated={true}
            dimAmount={0.5}
            stretched={false}
            visible={isVisible}
        >
            <gridLayout
                width="300"
                verticalAlignment="top"
                horizontalAlignment="right"
                marginTop="80"
                marginRight="10"
                backgroundColor={AudemiaTheme.colors.background}
                borderRadius="12"
            >
                <scrollView height="500">
                    <stackLayout className="p-4">
                        {menuItems.map((item) => (
                            <flexboxLayout
                                key={item.id}
                                className="p-4 rounded-lg"
                                onTap={() => {
                                    onMenuSelect(item.id);
                                    onClose();
                                }}
                            >
                                <label
                                    className="fas text-lg mr-4"
                                    text={item.icon}
                                    color={AudemiaTheme.colors.primary}
                                />
                                <label
                                    text={item.label}
                                    className="text-base"
                                    color={AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>
                        ))}
                    </stackLayout>
                </scrollView>
            </gridLayout>
        </Modal>
    );
}