import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useTheme, ThemeMode } from '@/constants/ThemeContext'
import Svg, { Path, Circle } from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const moderateScale = (size: number, factor = 0.5) =>
  size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const SunIcon = ({ color }: { color: string }) => (
  <Svg width={moderateScale(22)} height={moderateScale(22)} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
    <Path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
)

const MoonIcon = ({ color }: { color: string }) => (
  <Svg width={moderateScale(22)} height={moderateScale(22)} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

const SystemIcon = ({ color }: { color: string }) => (
  <Svg width={moderateScale(22)} height={moderateScale(22)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" stroke={color} strokeWidth="2" />
    <Path d="M12 3v18M3 12h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
)

const CheckIcon = ({ color }: { color: string }) => (
  <Svg width={moderateScale(18)} height={moderateScale(18)} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

const OPTIONS: { mode: ThemeMode; label: string; sub: string }[] = [
  { mode: 'light',  label: 'Light',  sub: 'Always use light theme' },
  { mode: 'dark',   label: 'Dark',   sub: 'Always use dark theme'  },
  { mode: 'system', label: 'System', sub: 'Follow device setting'  },
]

interface ThemePickerModalProps {
  visible: boolean
  onClose: () => void
}

export default function ThemePickerModal({ visible, onClose }: ThemePickerModalProps) {
  const { mode, setMode, colors } = useTheme()

  const handleSelect = (selected: ThemeMode) => {
    setMode(selected)
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[styles.sheet, { backgroundColor: colors.card }]}
          // prevent closing when tapping inside sheet
          onStartShouldSetResponder={() => true}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />

          <Text style={[styles.title, { color: colors.text }]}>Choose Theme</Text>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            Select how the app looks
          </Text>

          <View style={[styles.optionsList, { borderColor: colors.border }]}>
            {OPTIONS.map((opt, idx) => {
              const isSelected = mode === opt.mode
              const iconColor = isSelected ? '#9A85FE' : colors.textSub

              return (
                <View key={opt.mode}>
                  <TouchableOpacity
                    style={styles.option}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(opt.mode)}
                  >
                    <View style={[
                      styles.iconCircle,
                      { backgroundColor: isSelected ? '#9A85FE20' : colors.surfaceAlt }
                    ]}>
                      {opt.mode === 'light'  && <SunIcon color={iconColor} />}
                      {opt.mode === 'dark'   && <MoonIcon color={iconColor} />}
                      {opt.mode === 'system' && <SystemIcon color={iconColor} />}
                    </View>

                    <View style={styles.optionText}>
                      <Text style={[
                        styles.optionLabel,
                        { color: isSelected ? '#9A85FE' : colors.text }
                      ]}>
                        {opt.label}
                      </Text>
                      <Text style={[styles.optionSub, { color: colors.textSub }]}>
                        {opt.sub}
                      </Text>
                    </View>

                    {isSelected && <CheckIcon color="#9A85FE" />}
                  </TouchableOpacity>

                  {idx < OPTIONS.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                  )}
                </View>
              )
            })}
          </View>

          <TouchableOpacity
            style={[styles.cancelBtn, { borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(40),
    paddingTop: moderateScale(12),
  },
  handle: {
    width: moderateScale(40),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginBottom: moderateScale(20),
  },
  title: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '700',
    fontSize: moderateScale(20),
    marginBottom: moderateScale(4),
  },
  subtitle: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    fontSize: moderateScale(13),
    marginBottom: moderateScale(20),
  },
  optionsList: {
    borderWidth: 1,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    marginBottom: moderateScale(16),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    gap: moderateScale(14),
  },
  iconCircle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    gap: moderateScale(2),
  },
  optionLabel: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
  optionSub: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    fontSize: moderateScale(12),
  },
  divider: {
    height: 1,
    marginHorizontal: moderateScale(16),
  },
  cancelBtn: {
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    fontSize: moderateScale(15),
  },
})