import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { slideMenuStyles as styles } from '@/assets/styles/slidemenu/slideMenuStyles';
import { getSlideMenuStyles } from '@/assets/styles/slidemenu/slideMenuStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.78;
const WAVE_HEIGHT = 40;

interface SlideMenuHeaderProps {
    userName?: string;
    userEmail?: string;
    onClose?: () => void;
}

export default function SlideMenuHeader({
    userName = 'Welcome Back!',
    userEmail = 'Continue your journey',
    onClose,
}: SlideMenuHeaderProps) {
    const { colors } = useTheme()
    const styles = getSlideMenuStyles(colors)
    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: '#9A85FE' }}>
            <View>
                {/* Purple header */}
                <View style={styles.header}>
                    {onClose && (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}

                    {/* Plain image — no avatar circle */}
                    <Image
                        source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.welcomeText}>{userName}</Text>
                    <Text style={styles.subtitleText}>{userEmail}</Text>
                </View>

                {/* Smooth SVG wave */}
                <Svg
                    width={MENU_WIDTH}
                    height={WAVE_HEIGHT}
                    viewBox={`0 0 ${MENU_WIDTH} ${WAVE_HEIGHT}`}
                    style={{ display: 'flex', marginTop: -1 }}
                >
                    {/* Purple fill behind wave */}
                    <Path
                        d={`
                        M0,0
                        L${MENU_WIDTH},0
                        L${MENU_WIDTH},${WAVE_HEIGHT}
                        Q${MENU_WIDTH * 0.25},${WAVE_HEIGHT * 0.3} ${MENU_WIDTH * 0.5},${WAVE_HEIGHT * 0.5}
                        Q${MENU_WIDTH * 0.5},${WAVE_HEIGHT * 0.7} 0,${WAVE_HEIGHT}
                        Z
                    `}
                        fill="#9A85FE"
                    />
                    {/* White smooth curve on top */}
                    <Path
                        d={`
                        M0,${WAVE_HEIGHT}
                        Q${MENU_WIDTH * 0.25},${WAVE_HEIGHT * 0.3} ${MENU_WIDTH * 0.5},${WAVE_HEIGHT * 0.5}
                        Q${MENU_WIDTH * 0.75},${WAVE_HEIGHT * 0.7} ${MENU_WIDTH},${WAVE_HEIGHT * 0.2}
                        L${MENU_WIDTH},${WAVE_HEIGHT}
                        Z
                    `}
                        fill={colors.background}
                    />
                </Svg>
            </View>
        </SafeAreaView>
    );
}