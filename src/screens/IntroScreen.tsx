import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { NavigationParamList } from '../utils/types';
import { Animation, View } from "@nativescript/core";
import { AudemiaTheme } from '../styles/theme';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { Icons } from '../utils/icons';

type IntroScreenProps = {
    route: RouteProp<NavigationParamList, "Intro">,
    navigation: FrameNavigationProp<NavigationParamList, "Intro">,
};

export function IntroScreen({ navigation }: IntroScreenProps) {
    const [opacity, setOpacity] = React.useState(0);

    React.useEffect(() => {
        const fadeInAnimation = new Animation([{
            target: View,
            opacity: 0,
            duration: 0
        }, {
            target: View,
            opacity: 1,
            duration: 1000
        }]);

        fadeInAnimation.play()
            .then(() => setOpacity(1))
            .catch(error => console.log("Animation error:", error));

        return () => fadeInAnimation.cancel();
    }, []);

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <stackLayout
            backgroundColor={AudemiaTheme.colors.background}
            height="100%"
        >
            <flexboxLayout
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                padding="20"
            >
                <flexboxLayout
                    className="mb-8"
                    opacity={opacity}
                    style={{ transition: 'opacity 1s ease-in' }}
                >
                    <CloudinaryImage
                        url="https://res.cloudinary.com/dxoen9t1v/image/upload/v1733146260/Audemia_LOGO_w30quv.png"
                        width={200}
                        height={200}
                    />
                </flexboxLayout>

                <stackLayout>
                    <button
                        text="Kom i gang"
                        className="p-4 rounded-lg w-48 text-white mb-8"
                        backgroundColor={AudemiaTheme.colors.primary}
                        onTap={navigateToHome}
                    />
                    
                    <flexboxLayout
                        className="justify-center items-center w-12 h-12 rounded-full"
                        onTap={() => navigation.navigate('InfoAudemia')}
                        backgroundColor={AudemiaTheme.colors.secondary}
                        style={{ elevation: 2 }}
                    >
                        <label
                            className="fas text-2xl"
                            text={Icons.info}
                            color={AudemiaTheme.colors.primary}
                        />
                    </flexboxLayout>
                </stackLayout>
            </flexboxLayout>
        </stackLayout>
    );
}