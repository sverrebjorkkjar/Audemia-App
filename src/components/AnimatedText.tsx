// AnimatedText.tsx - Komponent for animert tekst
import * as React from "react";
import { useEffect, useState } from "react";
import { Label } from "@nativescript/core";

// Definerer props for AnimatedText komponenten
interface AnimatedTextProps {
    text: string;
    delay: number;
}

export function AnimatedText({ text, delay }: AnimatedTextProps) {
    // State for å kontrollere synlighet
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Setter opp animasjonen med spesifisert forsinkelse
        setTimeout(() => {
            // Animerer teksten inn med fade effekt
            setOpacity(1);
        }, delay);
    }, [delay]);

    return (
        <label
            text={text}
            className="text-2xl text-center p-4"
            opacity={opacity}
            style={{
                animation: "ease-in",
                animationDuration: "500ms"
            }}
        />
    );
}