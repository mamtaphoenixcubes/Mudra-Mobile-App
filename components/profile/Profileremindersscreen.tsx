import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Platform
} from 'react-native';
import Svg, { Circle } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext';
import { useReminderStore } from '@/store/reminderStore';
import { renderReminderIcon, REMINDER_ICON_OPTIONS } from '@/constants/reminderIcons';
import AddReminderModal from '@/components/common/AddReminderModal';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function ProfileRemindersScreen() {
  const { colors } = useTheme()
  const router = useRouter();

  /*
  |--------------------------------------------------------------------------
  | REMINDER STORE
  |--------------------------------------------------------------------------
  */

  const reminders = useReminderStore((s) => s.reminders);
  const setReminderEnabled = useReminderStore((s) => s.setReminderEnabled);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getProfileCompletionStatus = (profileUser: any) => {
    const rawCompletionPercentage = Number(
      profileUser?.profileCompletionPercentage ??
      profileUser?.profile_completion_percentage ??
      profileUser?.profile?.profileCompletionPercentage ??
      profileUser?.profile?.completionPercentage ??
      0
    );

    const rawProfileComplete =
      profileUser?.profileComplete ??
      profileUser?.profile_complete ??
      profileUser?.profile?.profileComplete ??
      profileUser?.profile?.complete ??
      rawCompletionPercentage >= 100;

    const profileComplete =
      typeof rawProfileComplete === 'string'
        ? ['true', '1', 'yes'].includes(rawProfileComplete.toLowerCase())
        : Boolean(rawProfileComplete);

    return {
      profileComplete,
      profileCompletionPercentage: Number.isFinite(rawCompletionPercentage) ? rawCompletionPercentage : 0,
    };
  };

  // function formatSchedule(hour: number, minute: number, repeat: 'daily' | 'weekdays' | 'weekends') {
  //   const period = hour >= 12 ? 'PM' : 'AM';
  //   const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  //   const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  //   const when = repeat === 'daily' ? 'Every day' : repeat === 'weekdays' ? 'Weekdays' : 'Weekends';
  //   return `${when} at ${time}`;
  // }
  // function formatSchedule(item: { scheduleType?: 'fixed' | 'interval'; hour: number; minute: number; repeat: 'daily' | 'weekdays' | 'weekends'; intervalMinutes?: number }) {
  //   if ((item.scheduleType ?? 'fixed') === 'interval') {
  //     const mins = item.intervalMinutes ?? 60;
  //     return mins === 60 ? 'Every 1 hour' : `Every ${mins} min`;
  //   }
  //   const period = item.hour >= 12 ? 'PM' : 'AM';
  //   const displayHour = item.hour % 12 === 0 ? 12 : item.hour % 12;
  //   const time = `${displayHour}:${item.minute.toString().padStart(2, '0')} ${period}`;
  //   const when = item.repeat === 'daily' ? 'Every day' : item.repeat === 'weekdays' ? 'Weekdays' : 'Weekends';
  //   return `${when} at ${time}`;
  // }
  function formatSchedule(item: {
    repeatType: string;
    time: string | null;
    intervalValue?: number | null;
  }) {
    if (item.repeatType === 'INTERVAL') {
      const mins = item.intervalValue ?? 60;
      return mins === 60 ? 'Every 1 hour' : `Every ${mins} min`;
    }

    if (!item.time) return '';

    const [h, m] = item.time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const time = `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
    const when =
      item.repeatType === 'DAILY' ? 'Every day' :
        item.repeatType === 'WEEKDAYS' ? 'Weekdays' :
          item.repeatType === 'WEEKENDS' ? 'Weekends' : 'Custom';
    return `${when} at ${time}`;
  }

  /*
  |--------------------------------------------------------------------------
  | AUTH STORE
  |--------------------------------------------------------------------------
  */

  const {
    isLoggedIn,
    token,
    user,
  } = useAuthStore();

  /*
  |--------------------------------------------------------------------------
  | AUTH CHECK
  |--------------------------------------------------------------------------
  */

  const loggedIn =
    isLoggedIn &&
    !!token &&
    !!user;

  const fetchReminders = useReminderStore((s) => s.fetchReminders);

  useEffect(() => {
    if (loggedIn && user?.id) {
      fetchReminders(user.id);
    } else {
      useReminderStore.setState({ reminders: [] });
    }
  }, [loggedIn, user?.id, fetchReminders]);
const profileCompletionPercentage = Math.min(
  100,
  Math.max(
    0,
    Number(user?.profileCompletionPercentage ?? 0)
  )
)

const showProfileProgress =
  loggedIn &&
  user?.profileComplete !== true &&
  profileCompletionPercentage < 100
  /*
  |--------------------------------------------------------------------------
  | HANDLE LOGIN
  |--------------------------------------------------------------------------
  */

const handleLogin = () => {
    router.push({
        pathname: '/auth/login',
        params: {
            profileCheckSource: 'profileReminders',
        },
    });
};

  useEffect(() => {
    let isMounted = true;

    const runProfileCheck = async () => {
      try {
        const source = await AsyncStorage.getItem('pendingProfileCheckSource');

        if (source !== 'profileReminders' || !user) {
          return;
        }

        const { profileCompletionPercentage, profileComplete } = getProfileCompletionStatus(user);

        if (profileCompletionPercentage >= 100 && profileComplete) {
          await AsyncStorage.removeItem('pendingProfileCheckSource');
          return;
        }

        if (isMounted) {
          setShowProfileModal(true);
        }

        await AsyncStorage.removeItem('pendingProfileCheckSource');
      } catch (error) {
        console.log('Profile completion check error:', error);
      }
    };

    if (loggedIn) {
      runProfileCheck();
    }

    return () => {
      isMounted = false;
    };
  }, [loggedIn, user]);
const profileImageUri =
  user?.profileImage?.url
    ? user.profileImage.url.startsWith('http://') ||
      user.profileImage.url.startsWith('https://')
      ? user.profileImage.url
      : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${user.profileImage.url}`
    : user?.googleProfileImage
      ? user.googleProfileImage
      : null;
  return (

    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Profile Card ── */}
      <View style={styles.profileCard}>
       {/* Avatar */}
       {/* Avatar */}
<View style={styles.avatarProgressWrapper}>
  {showProfileProgress && (
    <Svg
      width={68}
      height={68}
      viewBox="0 0 68 68"
      style={styles.progressCircle}
    >
      {/* Background circle */}
      <Circle
        cx="34"
        cy="34"
        r="31"
        stroke="#E5E7EB"
        strokeWidth="4"
        fill="none"
      />

      {/* Progress circle */}
      <Circle
        cx="34"
        cy="34"
        r="31"
        stroke="#7B61FF"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 31}`}
        strokeDashoffset={
          2 * Math.PI * 31 * (1 - profileCompletionPercentage / 100)
        }
        transform="rotate(-90 34 34)"
      />
    </Svg>
  )}

  <View style={styles.avatarWrapper}>
    <Image
      source={
        profileImageUri
          ? { uri: profileImageUri }
          : require('../../assets/images/tabIcons/profile-avatar.png')
      }
      style={
        profileImageUri
          ? styles.avatarImage
          : styles.avatarImagePlaceholder
      }
    />
  </View>

  {showProfileProgress && (
    <View style={styles.percentageBadge}>
      <Text style={styles.percentageText}>
        {profileCompletionPercentage}%
      </Text>
    </View>
  )}
</View>

        {/* USER INFO */}
        <View style={styles.profileInfo}>

          {loggedIn ? (

            <>
              {/* USER NAME */}
              <Text style={styles.profileName}>
                {user?.fullName ||
                  'Mudra User'}
              </Text>

              {/* USER EMAIL */}
              <Text style={styles.profileEmail} numberOfLines={1} ellipsizeMode="tail">
                {user?.email}
              </Text>

              {/* TAG */}
              <View style={styles.tagRow}>

                <Image
                  source={require('../../assets/images/tabIcons/profile-avatar.png')}
                  style={styles.tagIcon}
                />

                <Text style={styles.tagText}>
                  Inner balance, every day
                </Text>

              </View>
            </>

          ) : (

            <>
              {/* GUEST USER */}
              <Text style={styles.guestTitle}>
                Welcome Guest
              </Text>

              <Text style={styles.guestSubtitle}>
                Sign in to access.
              </Text>
            </>

          )}

        </View>

        {/* RIGHT BUTTON */}
        {loggedIn ? (

          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/editprofile')}
          >

            <Text style={styles.editBtnText}>
              Edit Profile
            </Text>

          </TouchableOpacity>

        ) : (

          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.8}
            onPress={handleLogin}
          >

            <Text style={styles.loginBtnText}>
              Sign In / Join
            </Text>

          </TouchableOpacity>

        )}

      </View>

      {/* ── Reminders Header ── */}
      <View style={styles.sectionHeader}>

        <View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Reminders
          </Text>

          <Text style={[styles.sectionSubtitle, { color: colors.textSub }]}>
            Stay consistent with
            gentle nudges.
          </Text>

        </View>

        <TouchableOpacity onPress={() => router.push('/reminders')}>

          <Text style={styles.manageAll}>
            Manage All &gt;
          </Text>

        </TouchableOpacity>

      </View>

      {/* ── Reminder Card ── */}
      <View style={[styles.reminderCard, { backgroundColor: colors.card }]}>

        {reminders.map(
          (item, index) => {
            const matchedIcon = REMINDER_ICON_OPTIONS.find(
              (option) => option.label.toUpperCase() === item.reminderType
            );
            const iconKey = matchedIcon?.key ?? 'bell';

            return (

              <View key={item.documentId}>

                <View
                  style={
                    styles.reminderRow
                  }
                >

                  {/* Icon */}
                  <View
                    style={
                      styles.reminderIconWrapper
                    }
                  >

                    {renderReminderIcon(iconKey, 22)}

                  </View>

                  {/* Text */}
                  <View
                    style={
                      styles.reminderText
                    }
                  >

                    <Text
                      style={[styles.reminderTitle, { color: colors.text }]}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[styles.reminderSchedule, { color: colors.textSub }]}
                    >
                      {/* {formatSchedule(item.hour, item.minute, item.repeat)} */}
                      {formatSchedule(item)}
                    </Text>

                  </View>

                  {/* Toggle */}
                  <Switch
                    value={item.enabled}
                    onValueChange={(v) =>
                      setReminderEnabled(
                        item.documentId,
                        v,
                        user?.id
                      )
                    }
                    trackColor={{
                      false:
                        '#E0E0E0',
                      true:
                        '#7B61FF',
                    }}
                    thumbColor={
                      '#FFFFFF'
                    }
                    ios_backgroundColor="#E0E0E0"
                    style={{ transform: [{ scale: Platform.OS === 'android' ? 1 : 0.8 }] }}
                  />

                </View>

                {index !==
                  reminders.length -
                  1 && (
                    <View
                      style={[styles.divider, { backgroundColor: colors.dividerDark }]}
                    />
                  )}

              </View>

            );
          })}

        <View style={[styles.divider, { backgroundColor: colors.dividerDark }]} />

        {/* Add Reminder */}
        <TouchableOpacity
          style={styles.addRow}
          activeOpacity={0.7}
          onPress={() => setAddModalVisible(true)}
        >

          <Text style={[styles.addText, { color: colors.text }]}>
            Add New Reminder
          </Text>

          <Ionicons
            name="add"
            size={22}
            color={colors.text}
          />

        </TouchableOpacity>

      </View>

      <AddReminderModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} />

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 16,
  },

  /* ── Profile Card ── */

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },

  avatarWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    resizeMode: 'cover',
  },

  avatarImagePlaceholder: {
    width: 58,
    height: 32,
    borderRadius: 29,
    resizeMode: 'cover',
  },

  profileInfo: {
    flex: 1,
    gap: 2,
  },

  profileName: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  profileEmail: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    color: '#555',
  },

  guestTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  guestSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
  },

  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },

  tagIcon: {
    width: 18,
    height: 15,
    resizeMode: 'contain',
  },

  tagText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 8.5,
    color: '#000000',
  },

  editBtn: {
    borderWidth: 1,
    borderColor: '#C4B5FD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },

  editBtnText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  loginBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  /* ── Section Header ── */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1A1A',
  },

  sectionSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    fontSize: 12.5,
    color: '#888',
    marginTop: 2,
  },

  manageAll: {
    fontSize: 13,
    color: '#7B61FF',
    fontWeight: '500',
    marginTop: 2,
  },

  /* ── Reminder Card ── */

  reminderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    paddingHorizontal: 14,
  },

  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },

  reminderIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reminderIconImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  reminderText: {
    flex: 1,
  },

  reminderTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  reminderSchedule: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  addRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },

  addText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
avatarProgressWrapper: {
  width: 68,
  height: 68,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},

progressCircle: {
  position: 'absolute',
  top: 0,
  left: 0,
},

percentageBadge: {
  position: 'absolute',
  bottom: -2,
  right: -4,
  minWidth: 25,
  height: 18,
  paddingHorizontal: 4,
  borderRadius: 9,
  backgroundColor: '#7B61FF',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: '#EDE9FE',
},

percentageText: {
  color: '#FFFFFF',
  fontSize: 8,
  fontWeight: '700',
},
});