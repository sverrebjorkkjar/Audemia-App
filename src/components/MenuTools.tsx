import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';

interface MenuToolsProps {
    isVisible: boolean;
    onClose: () => void;
    onToolSelect: (toolId: string) => void;
}

export function MenuTools({ isVisible, onClose, onToolSelect }: MenuToolsProps) {
    if (!isVisible) return null;

    const handleBackgroundTap = () => {
        onClose();
    };

    const tools = [
        { id: 'speed', icon: Icons.clock, label: 'Avspillingshastighet' },
        { id: 'bookmarks', icon: Icons.bookmark, label: 'Bokmerker' },
        { id: 'notes', icon: Icons.recording, label: 'Lydnotater' },
        { id: 'highlights', icon: Icons.star, label: 'Markeringer' },
        { id: 'sleep', icon: Icons.clock, label: 'Søvnmodus' },
        { id: 'equalizer', icon: Icons.settings, label: 'Equalizer' },
        { id: 'download', icon: Icons.download, label: 'Last ned for offline' },
        { id: 'share', icon: Icons.heart, label: 'Del bok' }
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
                className="absolute top-0 left-0 mt-16 ml-4 bg-white rounded-xl"
                width="250"
                flexDirection="column"
                onTap={(args) => args.object.preventDefault()}
                style={{
                    elevation: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
            >
                <label
                    text="Verktøy"
                    className="p-4 font-bold text-lg border-b border-gray-100"
                    color={AudemiaTheme.colors.primary}
                />

                <stackLayout className="p-2">
                    {tools.map((tool) => (
                        <flexboxLayout
                            key={tool.id}
                            className="p-3 rounded-lg"
                            alignItems="center"
                            onTap={() => {
                                onToolSelect(tool.id);
                                onClose();
                            }}
                        >
                            <label
                                className="fas text-lg mr-3"
                                text={tool.icon}
                                color={AudemiaTheme.colors.primary}
                            />
                            <label
                                text={tool.label}
                                className="text-base"
                                color={AudemiaTheme.colors.primary}
                            />
                        </flexboxLayout>
                    ))}
                </stackLayout>
            </flexboxLayout>
        </flexboxLayout>
    );
}