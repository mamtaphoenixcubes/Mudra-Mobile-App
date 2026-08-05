import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TipIcon from '@/assets/icons/tip.svg';
import TipIconWhite from '@/assets/icons/TipWhite.svg';
import { useTheme } from '@/constants/ThemeContext';

interface Mudra {
    tipCard?: {
        cardText?: string;
    };
}

interface TipCardProps {
    mudra?: Mudra;
}

export default function TipCard({
    mudra,
}: TipCardProps) {
    const { colors, isDark } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.primaryMuted }]}>
            {isDark ? <TipIconWhite width={32} height={32} /> : <TipIcon width={32} height={32} />}
            <View style={styles.textBlock}>
                <Text style={[styles.title, { color: colors.text }]}>Tip</Text>
                <Text style={[styles.body, { color: colors.textSub }]}>
                    {mudra?.tipCard?.cardText}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9A85FE33',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 12,
    },
    textBlock: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 15,
        //color: '#0F0F0F',
    },
    body: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        //color: '#3A3A3A',
        lineHeight: 19,
    },
});