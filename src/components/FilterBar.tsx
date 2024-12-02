import * as React from "react";
import { AudemiaTheme } from '../styles/theme';

interface FilterBarProps {
    onFilterChange: (filter: string) => void;
    selectedFilter: string;
}

export function FilterBar({ onFilterChange, selectedFilter }: FilterBarProps) {
    const filters = [
        { id: 'all', label: 'Alle' },
        { id: 'popular', label: 'Populære' },
        { id: 'new', label: 'Nye' },
        { id: 'recommended', label: 'Anbefalt' }
    ];

    return (
        <scrollView orientation="horizontal" className="p-2 bg-white">
            <flexboxLayout flexDirection="row">
                {filters.map((filter) => (
                    <flexboxLayout
                        key={filter.id}
                        className={`mx-2 p-3 rounded-lg ${
                            selectedFilter === filter.id ? 'bg-primary' : 'bg-gray-100'
                        }`}
                        onTap={() => onFilterChange(filter.id)}
                    >
                        <label
                            text={filter.label}
                            className="text-sm"
                            color={selectedFilter === filter.id ? 'white' : AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                ))}
            </flexboxLayout>
        </scrollView>
    );
}