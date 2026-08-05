// import React, { useEffect, useRef } from 'react'
// import { Animated, Dimensions, StyleSheet, View, ViewStyle } from 'react-native'

// const { width: SCREEN_WIDTH } = Dimensions.get('window')

// const moderateScale = (size: number, factor = 0.5) =>
//     size + ((SCREEN_WIDTH - 375) / 375) * size * factor

// interface SkeletonBoxProps {
//     width: number | string
//     height: number
//     borderRadius?: number
//     style?: ViewStyle
// }

// const SkeletonBox: React.FC<SkeletonBoxProps> = ({
//     width,
//     height,
//     borderRadius = 8,
//     style,
// }) => {
//     const shimmer = useRef(new Animated.Value(0)).current

//     useEffect(() => {
//         const loop = Animated.loop(
//             Animated.sequence([
//                 Animated.timing(shimmer, {
//                     toValue: 1,
//                     duration: 900,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(shimmer, {
//                     toValue: 0,
//                     duration: 900,
//                     useNativeDriver: true,
//                 }),
//             ])
//         )
//         loop.start()
//         return () => loop.stop()
//     }, [shimmer])

//     const opacity = shimmer.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0.35, 0.7],
//     })

//     const scaledHeight = moderateScale(height)
//     const scaledRadius = moderateScale(borderRadius)

//     if (typeof width === 'string') {
//         return (
//             <View
//                 style={[
//                     StyleSheet.flatten([
//                         { height: scaledHeight },
//                         style as ViewStyle,
//                     ]),
//                     { width: width as any },
//                 ]}
//             >
//                 <Animated.View
//                     style={{
//                         flex: 1,
//                         borderRadius: scaledRadius,
//                         backgroundColor: '#E0E0E0',
//                         opacity,
//                     }}
//                 />
//             </View>
//         )
//     }

//     return (
//         <Animated.View
//             style={[
//                 {
//                     width: moderateScale(width as number),
//                     height: scaledHeight,
//                     borderRadius: scaledRadius,
//                     backgroundColor: '#E0E0E0',
//                     opacity,
//                 },
//                 style,
//             ]}
//         />
//     )
// }

// export default SkeletonBox
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, StyleSheet, View, ViewStyle } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
  size + ((SCREEN_WIDTH - 375) / 375) * size * factor

interface SkeletonBoxProps {
  width: number | string
  height: number
  borderRadius?: number
  style?: ViewStyle | ViewStyle[]
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width,
  height,
  borderRadius = 8,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [shimmer])

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.7],
  })

  const scaledHeight = moderateScale(height)
  const scaledRadius = moderateScale(borderRadius)
  const flatStyle = style ? StyleSheet.flatten(style) : {}

  if (typeof width === 'string') {
    return (
      <View style={[{ width: width as any, height: scaledHeight }, flatStyle]}>
        <Animated.View
          style={{
            flex: 1,
            borderRadius: scaledRadius,
            backgroundColor: '#E0E0E0',
            opacity,
          }}
        />
      </View>
    )
  }

  return (
    <Animated.View
      style={[
        {
          width: moderateScale(width as number),
          height: scaledHeight,
          borderRadius: scaledRadius,
          backgroundColor: '#E0E0E0',
          opacity,
        },
        flatStyle,
      ]}
    />
  )
}

export default SkeletonBox