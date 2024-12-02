import * as React from "react";
import { AudemiaTheme } from '../../styles/theme';
import { Modal, Animation, Screen } from "@nativescript/core";

interface ProfileSideMenuProps {
    isVisible: boolean;
    onClose: () => void;
    onSettingSelect: (setting: string) => void;
}

export function ProfileSideMenu({ isVisible, onClose, onSettingSelect }: ProfileSideMenuProps) {
    const profileSettings = [
        { id: 'profile', icon: '&#xf007;', label: 'Min Profil' },
        { id: 'preferences', icon: '&#xf013;', label: 'Innstillinger' },
        { id: 'appearance', icon: '&#xf53f;', label: 'Utseende' },
        { id: 'notifications', icon: '&#xf0f3;', label: 'Varsler' },
        { id: 'language', icon: '&#xf1ab;', label: 'Språk' },
        { id: 'privacy', icon: '&#xf023;', label: 'Personvern' },
        { id: 'help', icon: '&#xf059;', label: 'Hjelp og støtte' },
        { id: 'about', icon: '&#xf05a;', label: 'Om Audemia' },
        { id: 'logout', icon: '&#xf2f5;', label: 'Logg ut' }
    ];

    return (
        <Modal
            animated={true}
            dimAmount={0.5}
            stretched={false}
            visible={isVisible}
            style={{
                animation: 'slideInLeft',
                animationDuration: '300ms'
            }}
        >
            <gridLayout
                width={Screen.mainScreen.widthDIPs * 0.8}
                height="100%"
                verticalAlignment="top"
                horizontalAlignment="left"
                backgroundColor={AudemiaTheme.colors.background}
                rows="auto, *"
            >
                {/* Profil header */}
                <stackLayout row="0" className="p-8 border-b border-gray-200">
                    <flexboxLayout className="justify-between mb-4">
                        <label
                            text="Profil"
                            className="text-2xl font-bold"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            className="fas text-xl"
                            text="&#xf00d;"
                            color={AudemiaTheme.colors.primary}
                            onTap={onClose}
                        />
                    </flexboxLayout>
                    
                    <flexboxLayout className="mt-6">
                        <flexboxLayout
                            className="w-20 h-20 rounded-full bg-gray-100"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <label
                                className="fas text-3xl"
                                text="&#xf007;"
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                        <stackLayout className="ml-4" verticalAlignment="center">
                            <label
                                text="Ola Nordmann"
                                className="font-bold text-lg mb-1"
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
                <scrollView row="1">
                    <stackLayout className="p-4">
                        {profileSettings.map((setting) => (
                            <flexboxLayout
                                key={setting.id}
                                className="p-4 rounded-lg mb-2"
                                backgroundColor={AudemiaTheme.colors.secondary}
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