import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';
import InfoCircleSvg from '@/assets/icons/info-circle.svg'
import InfoCircleWhite from '@/assets/icons/info-circleWhite.svg'
import HelpsupportSvg from '@/assets/icons/Helpsupport.svg'
import HelpsupportWhite from '@/assets/icons/HelpsupportWhite.svg'
import WarrantySvg from '@/assets/icons/Warranty.svg'
import WarrantyWhite from '@/assets/icons/WarrantyWhite.svg'
import FileSvg from '@/assets/icons/file.svg'
import FileWhite from '@/assets/icons/fileWhite.svg'

// AUTH STORE
import { useAuthStore } from '@/store/authStore';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useTheme } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
  size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// ── Data ──────────────────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { id: 'about', label: 'About Mudras' },
  { id: 'help', label: 'Help & Support' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Use' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function More() {
  const { colors, isDark } = useTheme();
  const MENU_ICONS: Record<string, { light: any; dark: any }> = {
    about: { light: InfoCircleSvg, dark: InfoCircleWhite },
    help: { light: HelpsupportSvg, dark: HelpsupportWhite },
    privacy: { light: WarrantySvg, dark: WarrantyWhite },
    terms: { light: FileSvg, dark: FileWhite },
  }
  const MenuIcon = ({ id }: { id: string }) => {
    const Icon = isDark ? MENU_ICONS[id]?.dark : MENU_ICONS[id]?.light
    return Icon ? <Icon width={22} height={22} /> : null
  }

  // GET LOGOUT FUNCTION
  const logout = useAuthStore(
    (state) => state.logout
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { isLoggedIn, token, user } = useAuthStore();
  const loggedIn = isLoggedIn && !!token && !!user;

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handlePress = (id: string) => {
    if (id === 'help') {
      router.push('/helpsupport');
    } else if (id === 'about') {
      router.push('/about');
    } else if (id === 'privacy') {
      router.push('/privacy');
    } else if (id === 'terms') {
      router.push('/terms');
    }
  };

  // HANDLE LOGOUT
  const handleLogout = () => {

    setShowLogoutModal(true);

    // Alert.alert(
    //   'Log Out',
    //   'Are you sure you want to log out?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },

    //     {
    //       text: 'Log Out',

    //       style: 'destructive',

    //       onPress: async () => {

    //         try {

    //           // CLEAR AUTH
    //           await logout();

    //           // REDIRECT TO LOGIN
    //           router.replace('/auth/login');

    //         } catch (error) {

    //           console.log(
    //             'Logout Error:',
    //             error
    //           );

    //         }

    //       },
    //     },
    //   ]
    // );

  };

  return (

    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >

      {/* ── Title ── */}
      <Text style={[styles.pageTitle, { color: colors.text }]}>
        More
      </Text>

      {/* ── Menu Card ── */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>

        {MENU_ITEMS.map(
          (item, index) => {

            const isLast =
              index ===
              MENU_ITEMS.length - 1;

            return (

              <View key={item.id}>

                <TouchableOpacity
                  style={[styles.row, { backgroundColor: colors.card }]}
                  activeOpacity={0.6}
                  onPress={() =>
                    handlePress(item.id)
                  }
                >

                  {/* Icon */}
                  <View style={styles.iconWrap}>
                    <MenuIcon id={item.id} />
                  </View>

                  <Text style={[styles.rowLabel, { color: colors.text }]}>
                    {item.label}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#AAAAAA"
                  />

                </TouchableOpacity>

                {!isLast && (
                  <View style={[styles.divider, { backgroundColor: colors.dividerDark }]} />
                )}

              </View>

            );

          }
        )}

      </View>

      {/* ── Log Out Button ── */}
      <TouchableOpacity
        style={styles.logoutBtn}
        activeOpacity={0.85}
        //onPress={handleLogout}
        onPress={loggedIn ? handleLogout : handleLogin}
      >

        <Ionicons
          //name="log-out-outline"
          name={loggedIn ? 'log-out-outline' : 'log-in-outline'}
          size={moderateScale(22)}
          color="#FFFFFF"
          style={styles.logoutIcon}
        />

        <Text style={styles.logoutText}>
          {loggedIn ? 'Log Out' : 'Log In'}
        </Text>

      </TouchableOpacity>

      <ConfirmModal
        visible={showLogoutModal}
        type="logout"
        onConfirm={async () => {
          setShowLogoutModal(false);
          try {
            await logout();
            router.replace('/auth/login');
          } catch (error) {
            console.log('Logout Error:', error);
          }
        }}
        onCancel={() => setShowLogoutModal(false)}
      />


    </ScrollView>

  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const H_PAD = SCREEN_WIDTH * 0.045;

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },

  content: {
    paddingHorizontal: H_PAD,
    //paddingTop: 14,
    paddingBottom: 50,
    gap: 20,
  },

  /* ── Title ── */

  pageTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 20,
    fontWeight: '500',
    color: '#1A1A1A',
  },

  /* ── Card ── */

  card: {
    //backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#E4E4E4',
    overflow: 'hidden',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  /* ── Row ── */

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },

  iconWrap: {
    marginRight: 16,
  },

  rowLabel: {
    fontFamily: 'SF-Pro-Display',
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },

  /* ── Divider ── */

  divider: {
    height: 0.8,
    backgroundColor: '#ECECEC',
    marginHorizontal: 18,
  },

  /* ── Logout ── */

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#9A85FE',

    borderRadius: 10,

    paddingVertical: 16,
    marginHorizontal: 20,

    gap: 10,

    shadowColor: '#9B7FE8',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 5,
  },

  logoutIcon: {
    transform: [{ scaleX: -1 }],
  },

  logoutText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },

});