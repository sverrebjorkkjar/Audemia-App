// TopicsList.tsx - Komponent for horisontalt scrollbare temaforslag
import * as React from "react";
import { AudemiaTheme } from '../styles/theme';

interface TopicsListProps {
    onTopicSelect: (topic: string) => void;
}

export function TopicsList({ onTopicSelect }: TopicsListProps) {
    // Liste over tilgjengelige temaer
    const topics = [
        "Innovasjon",
        "Etikk",
        "Entreprenørskap",
        "Markedsføring",
        "Samfunn",
        "Teknologi",
        "Ledelse",
        "Psykologi",
        "Økonomi",
        "Bærekraft"
    ];

    return (
        <scrollView
            orientation="horizontal"
            className="p-2"
        >
            <flexboxLayout flexDirection="row">
                {topics.map((topic, index) => (
                    <flexboxLayout
                        key={index}
                        className="mx-2 p-3 rounded-lg"
                        backgroundColor={AudemiaTheme.colors.secondary}
                        onTap={() => onTopicSelect(topic)}
                    >
                        <label
                            text={topic}
                            className="text-sm"
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                ))}
            </flexboxLayout>
        </scrollView>
    );
}