import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SkeletonBox from '@/components/common/SkeletonBox'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + (size - size) * factor + ((SCREEN_WIDTH - 375) / 375) * size * factor

const THUMB_SIZE = moderateScale(56)

const PracticeSessionSkeleton: React.FC = () => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <SkeletonBox width={moderateScale(32)} height={32} borderRadius={16} />
                <SkeletonBox
                    width={moderateScale(160)}
                    height={18}
                    borderRadius={6}
                    style={styles.headerTitle}
                />
            </View>

            <View style={styles.toggleRow}>
                <SkeletonBox
                    width={moderateScale(120)}
                    height={36}
                    borderRadius={20}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {Array.from({ length: 4 }).map((_, i) => (
                    <View key={i} style={styles.sessionCard}>
                        <SkeletonBox
                            width={THUMB_SIZE}
                            height={THUMB_SIZE}
                            borderRadius={10}
                        />
                        <View style={styles.cardContent}>
                            <SkeletonBox width="65%" height={14} borderRadius={6} />
                            <SkeletonBox
                                width="45%"
                                height={11}
                                borderRadius={5}
                                style={styles.mt6}
                            />
                        </View>
                        <View style={styles.rightSide}>
                            <SkeletonBox
                                width={moderateScale(18)}
                                height={moderateScale(18)}
                                borderRadius={9}
                            />
                            <SkeletonBox
                                width={moderateScale(36)}
                                height={10}
                                borderRadius={4}
                                style={styles.mt6}
                            />
                        </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
    },
    headerTitle: {
        marginLeft: moderateScale(12),
    },
    toggleRow: {
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(16),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(100),
    },
    sessionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(14),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cardContent: {
        flex: 1,
        marginLeft: moderateScale(12),
    },
    rightSide: {
        alignItems: 'center',
    },
    mt6: {
        marginTop: moderateScale(6),
    },
})

export default PracticeSessionSkeleton