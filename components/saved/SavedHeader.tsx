import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/common/AppHeader';
import { useTheme } from '@/constants/ThemeContext';

type Props = {
    isFavourites?: boolean;
};

export default function SavedHeader({ isFavourites = true }: Props) {
    const { colors } = useTheme()

    const rightIcon = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!isFavourites && (
                <TouchableOpacity style={{ padding: 8 }} activeOpacity={0.7}>
                    <Ionicons name="search-outline" size={22} color={colors.text} />
                </TouchableOpacity>
            )}
            <TouchableOpacity style={{ padding: 8 }} activeOpacity={0.7}>
                <Ionicons name="ellipsis-horizontal" size={22} color={colors.text} />
            </TouchableOpacity>
        </View>
    );

    return <AppHeader rightIcon={rightIcon} />;
}