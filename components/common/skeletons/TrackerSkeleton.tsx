import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SkeletonBox from '@/components/common/SkeletonBox'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const H_PAD = moderateScale(16)
const CARD_GAP = moderateScale(10)
const SMALL_CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - CARD_GAP * 2) / 3
const CIRCLE_LG = moderateScale(52)
const CIRCLE_SM = moderateScale(36)
const BAR_HEIGHTS = [44, 70, 38, 80, 30, 68, 44]

const TrackerSkeleton: React.FC = () => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.fill}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingBottom: insets.bottom + 100, minHeight: SCREEN_HEIGHT },
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header text lines - centered */}
                    <View style={styles.headerSection}>
                        <SkeletonBox width="55%" height={18} borderRadius={8} style={styles.centered} />
                        <SkeletonBox width="35%" height={13} borderRadius={6} style={[styles.centered, styles.mt8] as any} />
                    </View>

                    {/* Large hero card */}
                    <View style={styles.heroCard}>
                        <View style={styles.heroInner}>
                            <SkeletonBox
                                width={CIRCLE_LG}
                                height={CIRCLE_LG}
                                borderRadius={CIRCLE_LG / 2}
                            />
                            <SkeletonBox width={moderateScale(120)} height={13} borderRadius={6} style={styles.mt10} />
                            <SkeletonBox width={moderateScale(80)} height={11} borderRadius={5} style={styles.mt6} />
                        </View>
                    </View>

                    {/* 3 stat cards */}
                    <View style={styles.statsRow}>
                        {[0, 1, 2].map((i) => (
                            <View key={i} style={[styles.statCard, { width: SMALL_CARD_WIDTH }]}>
                                <SkeletonBox
                                    width={CIRCLE_SM}
                                    height={CIRCLE_SM}
                                    borderRadius={CIRCLE_SM / 2}
                                />
                                <SkeletonBox width="70%" height={12} borderRadius={5} style={styles.mt8} />
                                <SkeletonBox width="50%" height={10} borderRadius={5} style={styles.mt6} />
                            </View>
                        ))}
                    </View>

                    {/* Bar chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.barsRow}>
                            {BAR_HEIGHTS.map((h, i) => (
                                <View key={i} style={styles.barWrapper}>
                                    <SkeletonBox
                                        width={moderateScale(28)}
                                        height={moderateScale(h)}
                                        borderRadius={6}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Bottom banner */}
                    <View style={styles.bottomBanner}>
                        <SkeletonBox width="100%" height={56} borderRadius={12} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    fill: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: H_PAD,
    },
    headerSection: {
        marginTop: moderateScale(20),
        marginBottom: moderateScale(16),
        alignItems: 'center',
    },
    centered: {
        alignSelf: 'center',
    },
    heroCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(24),
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(12),
    },
    heroInner: {
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: CARD_GAP,
        marginBottom: moderateScale(12),
    },
    statCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: moderateScale(12),
        padding: moderateScale(14),
        alignItems: 'center',
    },
    chartCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: moderateScale(14),
        padding: moderateScale(16),
        marginBottom: moderateScale(12),
    },
    barsRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: moderateScale(90),
    },
    barWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomBanner: {
        marginBottom: moderateScale(8),
    },
    mt10: { marginTop: moderateScale(10) },
    mt8: { marginTop: moderateScale(8) },
    mt6: { marginTop: moderateScale(6) },
})

export default TrackerSkeleton