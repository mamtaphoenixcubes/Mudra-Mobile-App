import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SlideMenu from '@/components/slidemenu/SlideMenu';
import { useTheme } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
  const s = (width / 375) * size;
  return size + (s - size) * factor;
};
type Props = {
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

export default function Header({ rightIcon, onRightPress }: Props) {
  const { colors } = useTheme()
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const getTitle = () => 'MUDRAS';


  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={moderateScale(24)} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{getTitle()}</Text>
        </View>

        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={onRightPress ?? (() => router.push('/notifications'))}
          activeOpacity={0.7}
        >
          {rightIcon ?? (
            <Ionicons name="notifications-outline" size={moderateScale(24)} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>

      <SlideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(12),
    backgroundColor: '#FFFFFF',
  },
  headerIconBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  logo: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#9A85FE',
    letterSpacing: 1,
  },
});