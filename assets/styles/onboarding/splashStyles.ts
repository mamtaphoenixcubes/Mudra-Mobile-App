// import { StyleSheet, Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// // Responsive scale helpers
// const scale = (size: number) => (width / 375) * size;
// const verticalScale = (size: number) => (height / 812) * size;
// const moderateScale = (size: number, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// export const splashStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8FC',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   centerContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: height * 0.22,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: width * 0.5,
//     height: width * 0.4,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: Math.min(width * 0.1, 40),
//     color: '#7B6FCC',
//     letterSpacing: 10,
//     textAlign: 'center',
//     marginTop: height * 0.015,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: -2,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     height: height * 0.28,
//     justifyContent: 'flex-end',
//   },
//   waveContainer: {
//     width: width,
//     height: height * 0.22,
//     marginBottom: -1,
//   },
//   spinnerContainer: {
//     position: 'absolute',
//     top: 0,
//     alignSelf: 'center',
//   },
//   spinnerOuter: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 1.5,
//     borderColor: '#7B6FCC',
//     borderStyle: 'dashed',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   spinnerInner: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#7B6FCC',
//     opacity: 0.5,
//   },
// });

// // ─────────────────────────────────────────────
// // Welcome Screen Styles
// // ─────────────────────────────────────────────

// export const welcomeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: verticalScale(50),
//     backgroundColor: '#FFFFFF',
//   },
//   heroWrapper: {
//     width: width,
//     paddingHorizontal: scale(24),
//     paddingTop: verticalScale(16),
//     paddingBottom: 0,
//   },
//   heroImageContainer: {
//     width: '100%',
//     height: verticalScale(260),
//     borderRadius: scale(16),
//     overflow: 'hidden',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: scale(24),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(24),
//   },
//   title: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '500',
//     fontSize: moderateScale(24),
//     color: '#7B6FCC',
//     textAlign: 'center',
//     marginBottom: verticalScale(6),
//   },
//   lotusContainer: {
//     marginVertical: verticalScale(8),
//   },
//   subtitle: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(18),
//     color: '#1A1A2E',
//     textAlign: 'center',
//     lineHeight: moderateScale(26),
//     marginBottom: verticalScale(10),
//   },
//   description: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(14),
//     color: '#6B6B8A',
//     textAlign: 'center',
//     lineHeight: moderateScale(22),
//     marginBottom: verticalScale(20),
//     paddingHorizontal: scale(4),
//   },
//   featuresRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: verticalScale(24),
//   },
//   featureItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   featureIconContainer: {
//     width: scale(56),
//     height: scale(56),
//     borderRadius: scale(28),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: verticalScale(8),
//   },
//   featureLabel: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(11),
//     color: '#1A1A2E',
//     textAlign: 'center',
//     lineHeight: moderateScale(15),
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#7B6FCC',
//     borderRadius: scale(14),
//     paddingVertical: verticalScale(16),
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//   },
//   buttonText: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '500',
//     fontSize: moderateScale(16),
//     color: '#FFFFFF',
//     letterSpacing: 0.3,
//   },
//   skipText: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(14),
//     color: '#6B6B8A',
//     textDecorationLine: 'underline',
//     marginBottom: verticalScale(16),
//   },
//   dotsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(6),
//   },
//   dot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: '#D9D9D9',
//   },
//   dotActive: {
//     backgroundColor: '#7B6FCC',
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//   },
// });

// // ─────────────────────────────────────────────
// // Carousel Screen Styles
// // ─────────────────────────────────────────────

// export const carouselStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: verticalScale(50),
//     backgroundColor: '#FFFFFF',
//   },
//   skipButton: {
//     position: 'absolute',
//     top: verticalScale(16),
//     right: scale(20),
//     zIndex: 10,
//   },
//   skipText: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(14),
//     color: '#1A1A2E',
//     textDecorationLine: 'underline',
//   },
//   heroWrapper: {
//     width: width,
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(50),
//   },
//   heroImageContainer: {
//     width: '100%',
//     height: verticalScale(240),
//     borderRadius: scale(16),
//     overflow: 'hidden',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: scale(24),
//     paddingTop: verticalScale(20),
//     paddingBottom: verticalScale(20),
//   },
//   title: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '500',
//     fontSize: moderateScale(24),
//     color: '#7B6FCC',
//     textAlign: 'center',
//     lineHeight: moderateScale(32),
//     marginBottom: verticalScale(8),
//   },
//   lotusContainer: {
//     marginVertical: verticalScale(8),
//   },
//   description: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(14),
//     color: '#4A4A6A',
//     textAlign: 'center',
//     lineHeight: moderateScale(22),
//     marginBottom: verticalScale(20),
//     paddingHorizontal: scale(4),
//   },
//   featuresRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: scale(12),
//     width: '100%',
//     marginBottom: verticalScale(20),
//   },
//   featureItem: {
//     alignItems: 'center',
//     width: scale(100),
//   },
//   featureIconContainer: {
//     width: scale(60),
//     height: scale(60),
//     borderRadius: scale(30),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: verticalScale(8),
//   },
//   featureLabel: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '400',
//     fontSize: moderateScale(11),
//     color: '#1A1A2E',
//     textAlign: 'center',
//     lineHeight: moderateScale(16),
//   },
//   dotsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(6),
//     marginBottom: verticalScale(16),
//   },
//   dot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: '#D9D9D9',
//   },
//   dotActive: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: '#7B6FCC',
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#7B6FCC',
//     borderRadius: scale(14),
//     paddingVertical: verticalScale(16),
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontFamily: 'SF Pro Display',
//     fontWeight: '500',
//     fontSize: moderateScale(16),
//     color: '#FFFFFF',
//     letterSpacing: 0.3,
//   },
// });
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive scale helpers
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Safe area top — accounts for notch/status bar on all devices
const STATUS_BAR_HEIGHT = Platform.OS === 'android'
  ? StatusBar.currentHeight ?? 24
  : 44;

// ─────────────────────────────────────────────
// Splash Screen Styles
// ─────────────────────────────────────────────

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: height * 0.22,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: width * 0.5,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: Math.min(width * 0.1, 40),
    color: '#7B6FCC',
    letterSpacing: 10,
    textAlign: 'center',
    marginTop: height * 0.015,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    alignItems: 'center',
    height: height * 0.28,
    justifyContent: 'flex-end',
  },
  waveContainer: {
    width: width,
    height: height * 0.22,
    marginBottom: -1,
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  spinnerOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#7B6FCC',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7B6FCC',
    opacity: 0.5,
  },
});

// ─────────────────────────────────────────────
// Welcome Screen Styles
// ─────────────────────────────────────────────

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroWrapper: {
    width: width,
    paddingHorizontal: scale(24),
    paddingTop: STATUS_BAR_HEIGHT + verticalScale(16),
    paddingBottom: 0,
  },
  heroImageContainer: {
    width: '100%',
    height: verticalScale(260),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(24),
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    fontSize: moderateScale(24),
    color: '#7B6FCC',
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  lotusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginVertical: verticalScale(8),
},
lotusLine: {
  flex: 1,
  height: 0.5,
  backgroundColor: '#0F0F0F99',
},
lotusIcon: {
  marginHorizontal: scale(12),
},
  subtitle: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(18),
    color: '#1A1A2E',
    textAlign: 'center',
    lineHeight: moderateScale(26),
    marginBottom: verticalScale(10),
  },
  description: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#6B6B8A',
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(4),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(24),
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIconContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  featureLabel: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(11),
    color: '#1A1A2E',
    textAlign: 'center',
    lineHeight: moderateScale(15),
  },
  button: {
    width: '100%',
    backgroundColor: '#7B6FCC',
    borderRadius: scale(14),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  buttonText: {
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  skipText: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#6B6B8A',
    textDecorationLine: 'underline',
    marginBottom: verticalScale(16),
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    backgroundColor: '#7B6FCC',
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
  },
});

// ─────────────────────────────────────────────
// Carousel Screen Styles
// ─────────────────────────────────────────────

export const carouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Skip — top right, safe area aware
  skipButton: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + verticalScale(8),  // ← notch + non-notch safe
    right: scale(20),
    zIndex: 10,
    padding: scale(8),                          // ← larger tap target
  },
  skipText: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#1A1A2E',
    textDecorationLine: 'underline',
  },

  // Hero image — starts below skip button
  heroWrapper: {
    width: width,
    paddingHorizontal: scale(20),
    paddingTop: STATUS_BAR_HEIGHT + verticalScale(40), // ← safe area + gap below skip
  },
  heroImageContainer: {
    width: '100%',
    height: verticalScale(240),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Content
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    fontSize: moderateScale(24),
    color: '#7B6FCC',
    textAlign: 'center',
    lineHeight: moderateScale(32),
    marginBottom: verticalScale(6),
  },
  lotusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginVertical: verticalScale(8),
},
lotusLine: {
  flex: 1,
  height: 0.5,
  backgroundColor: '#0F0F0F99',
},
lotusIcon: {
  marginHorizontal: scale(12),
},
  description: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#4A4A6A',
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(4),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(12),
    width: '100%',
    marginBottom: verticalScale(8),
  },
  featureItem: {
    alignItems: 'center',
    width: scale(100),
  },
  featureIconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  featureLabel: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
    fontSize: moderateScale(11),
    color: '#1A1A2E',
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },

  // Bottom fixed — dots + buttons
  bottomFixed: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(8),
    alignItems: 'center',
    gap: scale(12),
    backgroundColor: '#FFFFFF',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: verticalScale(4),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#7B6FCC',
  },
  button: {
    width: '100%',
    backgroundColor: '#7B6FCC',
    borderRadius: scale(14),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});