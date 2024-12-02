import * as React from "react";
import { AudemiaTheme } from '../styles/theme';

interface CategoryFilterProps {
    onCategorySelect: (category: string) => void;
    selectedCategory: string;
}

export function CategoryFilter({ onCategorySelect, selectedCategory }: CategoryFilterProps) {
    const categories = [
        { id: 'business', label: 'Næringsliv', icon: '&#xf0b1;' },
        { id: 'technology', label: 'Teknologi', icon: '&#xf109;' },
        { id: 'science', label: 'Vitenskap', icon: '&#xf0c3;' },
        { id: 'health', label: 'Helse', icon: '&#xf21e;' },
        { id: 'language', label: 'Språk', icon: '&#xf1ab;' },
        { id: 'economics', label: 'Økonomi', icon: '&#xf155;' },
        { id: 'psychology', label: 'Psykologi', icon: '&#xf118;' },
        { id: 'history', label: 'Historie', icon: '&#xf1da;' },
        { id: 'law', label: 'Jus', icon: '&#xf24e;' },
        { id: 'marketing', label: 'Markedsføring', icon: '&#xf0a1;' }
    ];

    return (
        <scrollView orientation="horizontal" className="p-2">
            <flexboxLayout flexDirection="row">
                {categories.map((category) => (
                    <flexboxLayout
                        key={category.id}
                        className={`mx-2 p-3 rounded-lg ${
                            selectedCategory === category.id ? 'bg-primary' : 'bg-gray-100'
                        }`}
                        flexDirection="column"
                        alignItems="center"
                        width="100"
                        onTap={() => onCategorySelect(category.id)}
                    >
                        <label
                            className="fas text-xl mb-1"
                            text={category.icon}
                            color={selectedCategory === category.id ? 'white' : AudemiaTheme.colors.primary}
                        />
                        <label
                            text={category.label}
                            className="text-xs text-center"
                            color={selectedCategory === category.id ? 'white' : AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                ))}
            </flexboxLayout>
        </scrollView>
    );
}