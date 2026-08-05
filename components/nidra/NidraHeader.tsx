import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchIcon from '@/assets/icons/search-md.svg';

export default function NidraHeader() {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const titleFontSize = width < 375 ? 16 : width < 430 ? 17 : 19;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.inner}>
                <View style={styles.left} />
                <Text style={[styles.title, { fontSize: titleFontSize }]}>
                    Yoga Nidra Library
                </Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.right}>
                    <SearchIcon width={22} height={22} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    left: {
        width: 22,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 8,
    },
    right: {
        width: 22,
        alignItems: 'center',
    },
});