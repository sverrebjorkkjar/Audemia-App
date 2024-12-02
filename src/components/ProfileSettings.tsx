import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';

interface ProfileSettingsProps {
    isVisible: boolean;
    onClose: () => void;
    onSettingSelect: (setting: string) => void;
}

export function ProfileSettings({ isVisible, onClose, onSettingSelect }: ProfileSettingsProps) {
    if (!isVisible) return null;

    const handleBackgroundTap = () => {
        onClose();
    };

    const profileSettings = [
        { id: 'profile', icon: Icons.user, label: 'Min Profil' },
        { id: 'appearance', icon: Icons.settings, label: 'Utseende' },
        { id: 'notifications', icon: Icons.bell, label: 'Varsler' },
        { id: 'logout', icon: Icons.arrowLeft, label: 'Logg ut' }
    ];

    return (
        <flexboxLayout
            className="absolute top-0 left-0 w-full h-full"
            backgroundColor="rgba(0, 0, 0, 0)"
            onTap={handleBackgroundTap}
            style={{
                zIndex: 1000
            }}
        >
            <flexboxLayout
                className="absolute top-0 right-0 mt-16 mr-4 bg-white rounded-xl"
                width="250"
                flexDirection="column"
                onTap={(args) => args.object.preventDefault()}
                style={{
                    elevation: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
            >
                {/* Profile Header */}
                <flexboxLayout className="p-4 border-b border-gray-100" flexDirection="column">
                    <flexboxLayout
                        className="w-12 h-12 rounded-full bg-gray-100 mb-2"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <label
                            className="fas text-xl"
                            text={Icons.user}
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                    <label
                        text="Ola Nordmann"
                        className="font-bold text-lg"
                        color={AudemiaTheme.colors.primary}
                    />
                    <label
                        text="ola.nordmann@example.com"
                        className="text-sm text-gray-600"
                    />
                </flexboxLayout>

                {/* Settings List */}
                <stackLayout className="p-2">
                    {profileSettings.map((setting) => (
                        <flexboxLayout
                            key={setting.id}
                            className="p-3 rounded-lg"
                            alignItems="center"
                            onTap={() => {
                                onSettingSelect(setting.id);
                                if (setting.id !== 'logout') {
                                    onClose();
                                }
                            }}
                        >
                            <label
                                className="fas text-lg mr-3"
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
            </flexboxLayout>
        </flexboxLayout>
    );
}