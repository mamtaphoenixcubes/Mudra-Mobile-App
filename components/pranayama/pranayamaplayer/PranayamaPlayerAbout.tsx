import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native'
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/constants/ThemeContext'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const ChevronDownIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24" fill="none">
        <Path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)

const ChevronUpIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24" fill="none">
        <Path d="M18 15l-6-6-6 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)

interface MudraPlayerAboutProps {
    description: string
}

export default function PranayamaPlayerAbout({ description }: MudraPlayerAboutProps) {
    const { colors, isDark } = useTheme()
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded((e) => !e)
    }

    return (
        <View style={[styles.card, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}>
            <Text style={[styles.title, { color: colors.text }]}>About this Pranayama</Text>
            <Text style={[styles.body, { color: colors.textSub }]} numberOfLines={expanded ? undefined : 3}>
                {description}
            </Text>
            <TouchableOpacity onPress={toggle} activeOpacity={0.7} style={styles.chevronBtn}>
                {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: moderateScale(7.34),
        paddingHorizontal: moderateScale(18),
        paddingTop: moderateScale(18),
        paddingBottom: moderateScale(14),
        marginHorizontal: moderateScale(14),
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(17),
        fontWeight: '500',
        marginBottom: moderateScale(10),
    },
    body: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '400',
        lineHeight: moderateScale(22),
    },
    chevronBtn: {
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
})