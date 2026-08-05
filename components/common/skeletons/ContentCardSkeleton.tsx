import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import SkeletonBox from '@/components/common/SkeletonBox'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + (size - size) * factor + ((SCREEN_WIDTH - 375) / 375) * size * factor

const IMAGE_SIZE = moderateScale(90)
const CIRCLE_SIZE = moderateScale(28)

const ContentCardSkeleton: React.FC = () => {
    return (
        <View style={styles.card}>
            <View style={styles.leftSection}>
                {[0.7, 0.9, 0.6, 0.5].map((w, i) => (
                    <SkeletonBox
                        key={i}
                        width={`${w * 100}%`}
                        height={12}
                        borderRadius={6}
                        style={i > 0 ? styles.mt8 : undefined}
                    />
                ))}
            </View>

            <View style={styles.rightSection}>
                <SkeletonBox
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    borderRadius={10}
                />
                <View style={styles.rightBottom}>
                    <SkeletonBox
                        width={CIRCLE_SIZE}
                        height={CIRCLE_SIZE}
                        borderRadius={CIRCLE_SIZE / 2}
                    />
                    <SkeletonBox
                        width={moderateScale(60)}
                        height={10}
                        borderRadius={5}
                        style={styles.circleText}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(14),
        padding: moderateScale(14),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    leftSection: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: moderateScale(12),
    },
    rightSection: {
        alignItems: 'center',
        gap: moderateScale(8),
    },
    rightBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
    },
    circleText: {},
    mt8: {
        marginTop: moderateScale(8),
    },
})

export default ContentCardSkeleton