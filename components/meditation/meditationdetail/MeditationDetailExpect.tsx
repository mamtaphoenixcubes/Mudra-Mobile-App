import React from 'react';
import { View, Text } from 'react-native';
import { getMeditationDetailStyles } from '@/assets/styles/meditation/meditationDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import LotusWhite from '@/assets/icons/LotusWhite.svg';
import BrainSvg from '@/assets/icons/brain.svg';
import BrainWhite from '@/assets/icons/brainWhite.svg';
import MoonSvg from '@/assets/icons/Moon.svg';
import MoonWhite from '@/assets/icons/MoonWhite.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg';

export default function MeditationDetailExpect() {
    const { colors, isDark } = useTheme();
    const styles = getMeditationDetailStyles(colors);

    const ITEMS = [
        { icon: isDark ? <LotusWhite width={28} height={28} /> : <LotusBlack width={28} height={28} />, label: 'Full Body\nStretch' },
        { icon: isDark ? <BrainWhite width={28} height={28} /> : <BrainSvg width={28} height={28} />, label: 'Mental\nClarity' },
        { icon: isDark ? <MoonWhite width={28} height={28} /> : <MoonSvg width={28} height={28} />, label: 'Better\nSleep' },
        { icon: isDark ? <FavouriteWhite width={28} height={28} /> : <FavouriteSvg width={28} height={28} />, label: 'Inner\nBalance' },
    ];

    return (
        <View style={styles.expectContainer}>
            <Text style={styles.sectionTitle}>What to Expect</Text>
            <View style={styles.expectRow}>
                {ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.expectItem}>
                            {item.icon}
                            <Text style={styles.expectLabel}>{item.label}</Text>
                        </View>
                        {i < ITEMS.length - 1 && <View style={styles.expectDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}