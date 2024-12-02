// LogoPlaceholder.tsx - Midlertidig logo komponent
import * as React from "react";
import { useEffect, useState } from "react";
import { AudemiaTheme } from '../styles/theme';

interface LogoPlaceholderProps {
    delay: number;
}

export function LogoPlaceholder({ delay }: LogoPlaceholderProps) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setOpacity(1);
        }, delay);
    }, [delay]);

    return (
        <label
            text="A"
            className="text-6xl text-center p-8 font-bold"
            color={AudemiaTheme.colors.primary}
            opacity={opacity}
            style={{
                animation: "ease-in",
                animationDuration: "500ms"
            }}
        />
    );
}