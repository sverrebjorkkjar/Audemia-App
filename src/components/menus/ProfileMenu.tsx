import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { Modal } from "@nativescript/core";

interface ProfileMenuProps {
    isVisible: boolean;
    onClose: () => void;
    onSettingSelect: (setting: string) => void;
}

export function ProfileMenu({ isVisible, onClose, onSettingSelect }: ProfileMenuProps) {
    const profileSettings = [
        { id: 'profile', icon: '&#xf007;', label: 'Rediger profil' },
        { id: 'appearance', icon: '&#xf53f;', label: 'Utseende' },
        { id: 'notifications', icon: '&#xf0f3;', label: 'Varsler' },
        { id: 'language', icon: '&#xf1ab;', label: 'Språk' },
        { id: 'privacy', icon: '&#xf023;', label: 'Personvern' },
        { id: 'help', icon: '&#xf059;', label: 'Hjelp' },
        { id: 'logout', icon: '&#xf2f5;', label: 'Logg ut' }
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
                rows="auto, auto"
            >
                {/* Profil header */}
                <stackLayout row="0" className="p-6 border-b border-gray-200">
                    <flexboxLayout className="mb-4">
                        <flexboxLayout
                            className="w-16 h-16 rounded-full bg-gray-100"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <label
                                className="fas text-2xl"
                                text="&#xf007;"
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        <stackLayout className="ml-4" verticalAlignment="center">
                            <label
                                text="Ola Nordmann"
                                className="font-bold text-lg"
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text="ola.nordmann@example.com"
                                className="text-sm text-gray-600"
                            />
                        </stackLayout>
                    </flexboxLayout>
                </stackLayout>

                {/* Settings list */}
                <scrollView row="1" height="400">
                    <stackLayout className="p-2">
                        {profileSettings.map((setting) => (
                            <flexboxLayout
                                key={setting.id}
                                className="p-4 rounded-lg"
                                onTap={() => {
                                    onSettingSelect(setting.id);
                                    if (setting.id !== 'logout') {
                                        onClose();
                                    }
                                }}
                            >
                                <label
                                    className="fas text-lg mr-4"
                                    text={setting.icon}
                                    color={setting.id === 'logout' ? '#DC2626' : AudemiaTheme.colors.primary}
                                />
                                <label
                                    text={setting.label}
                                    className={`text-base ${setting.id === 'logout' ? 'text-red-600' : ''}`}
                                    color={setting.id === 'logout' ? '#DC2626' : AudemiaTheme.colors.primary}
                                />
                            </flexboxLayout>
                        ))}
                    </stackLayout>
                </scrollView>
            </gridLayout>
        </Modal>
    );
}