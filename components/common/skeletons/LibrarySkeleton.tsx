import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SkeletonBox from '@/components/common/SkeletonBox'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + (size - size) * factor + ((SCREEN_WIDTH - 375) / 375) * size * factor

const CARD_IMAGE_SIZE = SCREEN_WIDTH * 0.22

const LibrarySkeleton: React.FC = () => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SkeletonBox
                    width="100%"
                    height={44}
                    borderRadius={12}
                    style={styles.searchBar}
                />

                <View style={styles.filtersRow}>
                    {[80, 68, 76, 64, 72].map((w, i) => (
                        <SkeletonBox
                            key={i}
                            width={moderateScale(w)}
                            height={32}
                            borderRadius={20}
                            style={styles.filterChip}
                        />
                    ))}
                </View>

                {Array.from({ length: 6 }).map((_, i) => (
                    <View key={i} style={styles.card}>
                        <SkeletonBox
                            width={CARD_IMAGE_SIZE}
                            height={CARD_IMAGE_SIZE}
                            borderRadius={10}
                        />
                        <View style={styles.cardContent}>
                            <SkeletonBox width="55%" height={14} borderRadius={6} />
                            <SkeletonBox
                                width="80%"
                                height={12}
                                borderRadius={6}
                                style={styles.textLine}
                            />
                            <SkeletonBox
                                width="45%"
                                height={10}
                                borderRadius={6}
                                style={styles.textLine}
                            />
                        </View>
                        <SkeletonBox
                            width={moderateScale(28)}
                            height={20}
                            borderRadius={6}
                            style={styles.badge}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(100),
    },
    searchBar: {
        marginTop: moderateScale(12),
        marginBottom: moderateScale(14),
    },
    filtersRow: {
        flexDirection: 'row',
        marginBottom: moderateScale(18),
        gap: moderateScale(8),
    },
    filterChip: {},
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(14),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cardContent: {
        flex: 1,
        marginLeft: moderateScale(12),
        gap: moderateScale(6),
    },
    textLine: {},
    badge: {
        alignSelf: 'flex-start',
    },
})

export default LibrarySkeleton