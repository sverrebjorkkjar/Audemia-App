import * as React from "react";
import { useEffect, useState } from "react";
import { AudemiaTheme } from '../styles/theme';
import { Animation, View, Enums } from "@nativescript/core";

interface AnimatedElementProps {
    type: 'text' | 'logo' | 'button';
    content?: string;
    delay: number;
    duration: number;
    className?: string;
    color?: any;
    onTap?: () => void;
}

export function AnimatedElement({ 
    type, 
    content, 
    delay,
    duration,
    className = "", 
    color,
    onTap 
}: AnimatedElementProps) {
    const [opacity, setOpacity] = useState(0);
    const [translateY, setTranslateY] = useState(20);

    useEffect(() => {
        const fadeInAnimation = new Animation([
            {
                target: View,
                opacity: 0,
                translate: { x: 0, y: translateY },
                duration: 0
            },
            {
                target: View,
                opacity: 1,
                translate: { x: 0, y: 0 },
                duration: duration,
                curve: Enums.AnimationCurve.easeOut
            }
        ]);

        setTimeout(() => {
            fadeInAnimation.play()
                .then(() => {
                    setOpacity(1);
                    setTranslateY(0);
                })
                .catch(error => {
                    console.log("Animation error:", error);
                });
        }, delay);

        return () => {
            fadeInAnimation.cancel();
        };
    }, [delay, duration]);

    const animationStyle = {
        animation: "ease-out",
        animationDuration: `${duration}ms`,
        translate: { x: 0, y: translateY }
    };

    switch (type) {
        case 'logo':
            return (
                <label
                    text="A"
                    className={`${className}`}
                    color={AudemiaTheme.colors.primary}
                    opacity={opacity}
                    style={animationStyle}
                />
            );
        
        case 'button':
            return (
                <button
                    text={content}
                    className={`p-4 rounded-lg text-white ${className}`}
                    backgroundColor={AudemiaTheme.colors.primary}
                    opacity={opacity}
                    style={animationStyle}
                    onTap={onTap}
                />
            );
        
        case 'text':
        default:
            return (
                <label
                    text={content}
                    className={className}
                    color={color || AudemiaTheme.colors.primary}
                    opacity={opacity}
                    style={animationStyle}
                />
            );
    }
}