import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SkeletonBox from '@/components/common/SkeletonBox'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + (size - size) * factor + ((SCREEN_WIDTH - 375) / 375) * size * factor

const HERO_HEIGHT = SCREEN_WIDTH * 0.62
const CIRCLE_SIZE = moderateScale(44)

const MudraDetailSkeleton: React.FC = () => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <SkeletonBox width={moderateScale(32)} height={32} borderRadius={16} />
                <SkeletonBox width={moderateScale(32)} height={32} borderRadius={16} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <SkeletonBox
                    width="100%"
                    height={HERO_HEIGHT}
                    borderRadius={0}
                    style={styles.heroImage}
                />

                <View style={styles.dotsRow}>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <SkeletonBox
                            key={i}
                            width={i === 0 ? moderateScale(20) : moderateScale(8)}
                            height={moderateScale(8)}
                            borderRadius={4}
                            style={styles.dot}
                        />
                    ))}
                </View>

                <View style={styles.section}>
                    <SkeletonBox width="70%" height={20} borderRadius={8} />
                    <SkeletonBox
                        width="90%"
                        height={14}
                        borderRadius={6}
                        style={styles.mt8}
                    />
                    <SkeletonBox
                        width="60%"
                        height={14}
                        borderRadius={6}
                        style={styles.mt6}
                    />
                </View>

                <View style={styles.circlesRow}>
                    {[0, 1, 2].map((i) => (
                        <View key={i} style={styles.circleItem}>
                            <SkeletonBox
                                width={CIRCLE_SIZE}
                                height={CIRCLE_SIZE}
                                borderRadius={CIRCLE_SIZE / 2}
                            />
                            <SkeletonBox
                                width={moderateScale(52)}
                                height={10}
                                borderRadius={4}
                                style={styles.mt6}
                            />
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <SkeletonBox
                        width={moderateScale(90)}
                        height={36}
                        borderRadius={20}
                    />
                </View>

                <View style={styles.section}>
                    {[1, 0.9, 0.75, 0.85, 0.65].map((w, i) => (
                        <SkeletonBox
                            key={i}
                            width={`${w * 100}%`}
                            height={12}
                            borderRadius={6}
                            style={i > 0 ? styles.mt8 : undefined}
                        />
                    ))}
                </View>

                <View style={[styles.section, { paddingBottom: moderateScale(100) }]}>
                    {[0.8, 0.6].map((w, i) => (
                        <SkeletonBox
                            key={i}
                            width={`${w * 100}%`}
                            height={12}
                            borderRadius={6}
                            style={i > 0 ? styles.mt8 : undefined}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(10),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    heroImage: {},
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(12),
        gap: moderateScale(6),
    },
    dot: {},
    section: {
        paddingHorizontal: moderateScale(16),
        marginTop: moderateScale(20),
    },
    circlesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: moderateScale(16),
        marginTop: moderateScale(20),
    },
    circleItem: {
        alignItems: 'center',
    },
    mt8: {
        marginTop: moderateScale(8),
    },
    mt6: {
        marginTop: moderateScale(6),
    },
})

export default MudraDetailSkeleton