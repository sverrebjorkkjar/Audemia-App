// LoginButton.tsx - Innloggingsknapp komponent
import * as React from "react";
import { AudemiaTheme } from '../styles/theme';

interface LoginButtonProps {
    onTap: () => void;
}

export function LoginButton({ onTap }: LoginButtonProps) {
    return (
        <button
            text="Logg inn"
            className="p-4 rounded-lg m-4 text-white"
            backgroundColor={AudemiaTheme.colors.primary}
            onTap={onTap}
        />
    );
}