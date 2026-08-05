import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import PlayIconSvg from '@/assets/icons/PlayIcon.svg';
import BeginnerSvg from '@/assets/icons/beginner.svg';
import ListenSvg from '@/assets/icons/Listen.svg';
import StarSvg from '@/assets/icons/Star.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import PlayIconWhite from '@/assets/icons/PlayIconWhite.svg'
import BeginnerWhite from '@/assets/icons/beginnerWhite.svg'
import ListenWhite from '@/assets/icons/ListenWhite.svg'
import StarWhite from '@/assets/icons/StarWhiteEmpty.svg'
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg'



export default function StatsRow() {
    const { colors, isDark } = useTheme()
    const styles = getSubscriptionStyles(colors)

    const STATS = [
        { icon: isDark ? <PlayIconWhite width={24} height={24} /> : <PlayIconSvg width={24} height={24} />, value: '100+', label: 'Premium\nSessions' },
        { icon: isDark ? <BeginnerWhite width={24} height={24} /> : <BeginnerSvg width={24} height={24} />, value: 'Advanced', label: 'Progress\nInsights' },
        { icon: isDark ? <ListenWhite width={24} height={24} /> : <ListenSvg width={24} height={24} />, value: 'Offline', label: 'Access' },
        { icon: isDark ? <StarWhite width={24} height={24} /> : <StarSvg width={24} height={24} />, value: 'Exclusive', label: 'Content' },
        { icon: isDark ? <FavouriteWhite width={24} height={24} /> : <FavouriteSvg width={24} height={24} />, value: 'Priority', label: 'Support' },
    ]
    return (
        <View style={styles.statsContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statsScrollContent}
                decelerationRate="fast"
                snapToAlignment="center"
            >
                <View style={styles.statsCard}>
                    {STATS.map((stat, i) => (
                        <React.Fragment key={i}>
                            <View style={styles.statItem}>
                                <View style={styles.statIconContainer}>
                                    {stat.icon}
                                </View>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                            {i < STATS.length - 1 && <View style={styles.statDivider} />}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}