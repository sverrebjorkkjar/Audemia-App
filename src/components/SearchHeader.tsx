import * as React from "react";
import { AudemiaTheme } from '../styles/theme';
import { Icons } from '../utils/icons';

interface SearchHeaderProps {
    onSearch: (text: string) => void;
    onFilterTap: () => void;
}

export function SearchHeader({ onSearch, onFilterTap }: SearchHeaderProps) {
    const [searchText, setSearchText] = React.useState('');
    
    const handleSearch = () => {
        if (searchText.trim()) {
            onSearch(searchText);
        }
    };

    const handleTextChange = (args: { object: { text: string } }) => {
        setSearchText(args.object.text);
    };

    const isSearchEnabled = searchText.trim().length > 0;

    return (
        <flexboxLayout 
            className="p-4" 
            flexDirection="row" 
            alignItems="center"
            backgroundColor="#ffffff"
        >
            <flexboxLayout
                className="rounded-lg"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                backgroundColor="#f5f5f5"
                width="100%"
                style={{
                    padding: 12
                }}
            >
                <flexboxLayout flexGrow={1} alignItems="center">
                    <textField
                        hint="Søk..."
                        flexGrow={1}
                        onTextChange={handleTextChange}
                        text={searchText}
                        returnPress={handleSearch}
                        style={{
                            fontSize: 16,
                            color: AudemiaTheme.colors.primary
                        }}
                    />
                </flexboxLayout>
                
                <flexboxLayout
                    className="ml-2"
                    onTap={isSearchEnabled ? handleSearch : undefined}
                >
                    <label
                        className="fas text-lg"
                        text={Icons.search}
                        color={isSearchEnabled ? '#4CAF50' : '#999999'}
                    />
                </flexboxLayout>
            </flexboxLayout>
        </flexboxLayout>
    );
}