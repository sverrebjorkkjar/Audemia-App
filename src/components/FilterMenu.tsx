import * as React from "react";
import { Modal } from "@nativescript/core";
import { AudemiaTheme } from '../styles/theme';

interface FilterMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onFilterChange?: (category: string, value: string) => void;
}

export function FilterMenu({ isOpen, onClose, onFilterChange }: FilterMenuProps) {
    const categories = [
        'Innovation', 'Ethics', 'Entrepreneurship', 'Marketing',
        'Society', 'Technology', 'Leadership', 'Psychology', 'Economics', 'Sustainability'
    ];
    
    const filters = {
        languages: ['English', 'Spanish', 'French', 'German'],
        length: ['Under 1h', '1-3h', '3-6h', 'Over 6h'],
        level: ['Beginner', 'Intermediate', 'Advanced'],
        rating: ['5 stars', '4+ stars', '3+ stars'],
        price: ['Under $10', '$10-$20', '$20-$30', 'Over $30'],
        releaseDate: ['Last week', 'Last month', 'Last year']
    };

    const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({});

    const handleFilterSelect = (category: string, value: string) => {
        setSelectedFilters(prev => {
            const current = prev[category] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            
            const newFilters = {
                ...prev,
                [category]: updated
            };
            
            if (onFilterChange) {
                onFilterChange(category, value);
            }
            
            return newFilters;
        });
    };

    return (
        <Modal
            animated={true}
            dimAmount={0.5}
            stretched={false}
            visible={isOpen}
        >
            <gridLayout
                height="90%"
                width="100%"
                verticalAlignment="bottom"
                backgroundColor={AudemiaTheme.colors.background}
                borderRadius="20 20 0 0"
            >
                <flexboxLayout flexDirection="column" height="100%">
                    <flexboxLayout className="p-4" flexDirection="row" justifyContent="space-between">
                        <label
                            text="Filter"
                            className="text-lg font-bold"
                            color={AudemiaTheme.colors.primary}
                        />
                        <label
                            className="fas"
                            text="&#xf00d;"
                            color={AudemiaTheme.colors.primary}
                            onTap={onClose}
                        />
                    </flexboxLayout>

                    <scrollView orientation="vertical" className="px-4">
                        <stackLayout>
                            <stackLayout className="mb-6">
                                <label
                                    text="Categories"
                                    className="text-sm font-bold mb-2"
                                    color={AudemiaTheme.colors.primary}
                                />
                                <scrollView orientation="horizontal" className="mb-2">
                                    <flexboxLayout flexDirection="row">
                                        {categories.map((category, index) => (
                                            <flexboxLayout
                                                key={index}
                                                className={`mx-2 p-4 rounded-lg ${
                                                    selectedFilters['category']?.includes(category)
                                                        ? 'bg-primary'
                                                        : 'bg-gray-100'
                                                } border border-gray-200 min-width="120"`}
                                                onTap={() => handleFilterSelect('category', category)}
                                            >
                                                <label
                                                    text={category}
                                                    className="text-sm text-center"
                                                    color={selectedFilters['category']?.includes(category)
                                                        ? 'white'
                                                        : AudemiaTheme.colors.primary}
                                                />
                                            </flexboxLayout>
                                        ))}
                                    </flexboxLayout>
                                </scrollView>
                            </stackLayout>

                            {Object.entries(filters).map(([category, options]) => (
                                <stackLayout key={category} className="mb-6">
                                    <label
                                        text={category.charAt(0).toUpperCase() + category.slice(1)}
                                        className="text-sm font-bold mb-2"
                                        color={AudemiaTheme.colors.primary}
                                    />
                                    <scrollView orientation="horizontal" className="mb-2">
                                        <flexboxLayout flexDirection="row">
                                            {options.map((option) => (
                                                <flexboxLayout
                                                    key={option}
                                                    className={`mx-2 p-4 rounded-lg ${
                                                        selectedFilters[category]?.includes(option)
                                                            ? 'bg-primary'
                                                            : 'bg-gray-100'
                                                    } border border-gray-200 min-width="120"`}
                                                    onTap={() => handleFilterSelect(category, option)}
                                                >
                                                    <label
                                                        text={option}
                                                        className="text-sm text-center"
                                                        color={selectedFilters[category]?.includes(option)
                                                            ? 'white'
                                                            : AudemiaTheme.colors.primary}
                                                    />
                                                </flexboxLayout>
                                            ))}
                                        </flexboxLayout>
                                    </scrollView>
                                </stackLayout>
                            ))}
                        </stackLayout>
                    </scrollView>
                </flexboxLayout>
            </gridLayout>
        </Modal>
    );
}