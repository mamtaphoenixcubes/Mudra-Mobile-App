import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext'
import ThemePickerModal from '@/components/common/ThemePickerModal'
import MoonSvg from '@/assets/icons/Moon.svg'
import SoundSvg from '@/assets/icons/Sound.svg'
import LanguageSvg from '@/assets/icons/Language.svg'
import ClockSvg from '@/assets/icons/clock.svg'
import SessionSvg from '@/assets/icons/Session.svg'
import DownloadSvg from '@/assets/icons/Download.svg'
import SoundPickerModal from '@/components/common/SoundPickerModal';
import { useSoundStore } from '@/store/soundStore';
import { SOUND_OPTIONS } from '@/constants/soundOptions';
import LanguagePickerModal from '@/components/common/LanguagePickerModal';
import { useLanguage } from '@/constants/LanguageContext';

const { width } = Dimensions.get('window');

const ICON_MAP: Record<string, any> = {
  theme: MoonSvg,
  sound: SoundSvg,
  language: LanguageSvg,
  reminders: ClockSvg,
  autonext: SessionSvg,
  wifi: DownloadSvg,
}

const RowIcon = ({ id }: { id: string }) => {
  const Icon = ICON_MAP[id]
  return (
    <View style={styles.iconCircle}>
      {Icon ? <Icon width={22} height={22} /> : null}
    </View>
  )
}



// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  kind: 'nav';
  id: string;
  title: string;
  subtitle: string;
};

type ToggleItem = {
  kind: 'toggle';
  id: string;
  title: string;
  subtitle: string;
  value: boolean;
};

type SettingItem = NavItem | ToggleItem;

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_SETTINGS: SettingItem[] = [

  { kind: 'toggle', id: 'reminders', title: 'Session Reminders', subtitle: 'Remind me to take session', value: true },
  { kind: 'toggle', id: 'autonext', title: 'Auto Next Session', subtitle: 'Automatically play next session', value: false },
  { kind: 'toggle', id: 'wifi', title: 'Download over Wi-Fi only', subtitle: 'Save mobile data', value: true },
];



// ── Icon ──────────────────────────────────────────────────────────────────────

const BrainIcon = () => (
  <View style={styles.iconCircle}>
    <Image
      source={require('../../assets/images/tabIcons/Vector.png')}
      style={styles.iconImage}
    />
  </View>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function Preferences() {
  const { mode, colors } = useTheme()
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [extraSettings, setExtraSettings] = useState<SettingItem[]>(INITIAL_SETTINGS)

  const selectedSoundId = useSoundStore((s) => s.selectedSoundId);
  const [showSoundPicker, setShowSoundPicker] = useState(false);
  const soundLabel = SOUND_OPTIONS.find(o => o.id === selectedSoundId)?.label ?? 'None';

  const { language, languages } = useLanguage();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const languageLabel = languages.find((l: { code: string; label: string }) => l.code === language)?.label ?? 'English';

  const themeLabel = mode.charAt(0).toUpperCase() + mode.slice(1)
  const settings: SettingItem[] = [
    { kind: 'nav', id: 'theme', title: 'Theme', subtitle: themeLabel },
    { kind: 'nav', id: 'sound', title: 'Sound & Music', subtitle: soundLabel },
    { kind: 'nav', id: 'language', title: 'Language', subtitle: languageLabel },
    ...extraSettings,
  ]

  const toggleSwitch = (id: string) => {
    setExtraSettings((prev) =>
      prev.map((item) =>
        item.id === id && item.kind === 'toggle'
          ? { ...item, value: !item.value }
          : item
      )
    )
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* ── Header ── */}
      <Text style={[styles.pageTitle, { color: colors.text }]}>Preferences</Text>
      <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>Customize your experience.</Text>

      {/* ── Settings Card ── */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {settings.map((item, index) => {
          const isLast = index === settings.length - 1;

          return (
            <View key={item.id}>
              <TouchableOpacity
                style={[styles.row, { backgroundColor: colors.card }]}
                activeOpacity={item.kind === 'nav' ? 0.6 : 1}
                //onPress={item.kind === 'nav' ? () => { } : undefined}
                onPress={item.kind === 'nav' ? () => {
                  if (item.id === 'theme') setShowThemePicker(true)
                  if (item.id === 'sound') setShowSoundPicker(true)
                  if (item.id === 'language') setShowLanguagePicker(true)
                } : undefined}
              >
                {/* Left icon */}
                <RowIcon id={item.id} />

                {/* Title + subtitle */}
                <View style={styles.rowText}>
                  <Text style={[styles.rowTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.rowSubtitle, { color: colors.textSub }]}>{item.subtitle}</Text>
                </View>

                {/* Right: chevron or toggle */}
                {item.kind === 'nav' ? (
                  <Ionicons name="chevron-forward" size={18} color="#AAAAAA" />
                ) : (
                  <Switch
                    value={item.value}
                    onValueChange={() => toggleSwitch(item.id)}
                    trackColor={{ false: '#D1D1D6', true: '#7B61FF' }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#D1D1D6"
                    style={[styles.switch, { transform: [{ scale: 0.7 }] }]}
                  />
                )}
              </TouchableOpacity>

              {/* Divider — not after last row */}
              {!isLast && <View style={[styles.divider, { backgroundColor: colors.dividerDark }]} />}
            </View>
          );
        })}
      </View>
      <ThemePickerModal
        visible={showThemePicker}
        onClose={() => setShowThemePicker(false)}
      />
      <SoundPickerModal
        visible={showSoundPicker}
        onClose={() => setShowSoundPicker(false)}
      />
      <LanguagePickerModal
        visible={showLanguagePicker}
        onClose={() => setShowLanguagePicker(false)}
      />
    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: width * 0.045,
    paddingTop: 20,
  },

  /* ── Header ── */
  pageTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 22,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 13,
    fontWeight: '400',
    color: '#888',
    marginBottom: 24,
  },

  /* ── Card ── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  /* ── Row ── */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    //backgroundColor: '#FFFFFF',
  },

  /* ── Icon circle ── */
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  /* ── Text ── */
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12.5,
    color: '#999',
  },

  /* ── Switch ── */
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  /* ── Divider ── */
  divider: {
    height: 0.8,
    backgroundColor: '#F0F0F0',
    marginLeft: 70,
  },
});