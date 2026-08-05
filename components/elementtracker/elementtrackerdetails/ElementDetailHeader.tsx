import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppHeader from '@/components/common/AppHeader';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg';
import ShareSvg from '@/assets/icons/share.svg';
import ShareWhite from '@/assets/icons/shareWhite.svg';
import { useTheme } from '@/constants/ThemeContext'

export default function ElementDetailHeader() {
    const { isDark } = useTheme()
    return (
        <AppHeader
            rightIcon={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.7}>
                        {isDark ? <FavouriteWhite width={24} height={24} /> : <FavouriteSvg width={24} height={24} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.7}>
                        {isDark ? <ShareWhite width={24} height={24} /> : <ShareSvg width={24} height={24} />}
                    </TouchableOpacity>
                </View>
            }
        />
    );
}