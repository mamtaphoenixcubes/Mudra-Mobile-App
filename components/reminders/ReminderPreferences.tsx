import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { reminderStyles as styles } from '@/assets/styles/reminders/reminderStyles';
import { getReminderStyles } from '@/assets/styles/reminders/reminderStyles'
import { useTheme } from '@/constants/ThemeContext'
import SoundSvg from '@/assets/icons/Sound.svg';
import VibrateSvg from '@/assets/icons/Vibrate.svg';
import DoNotDisturbSvg from '@/assets/icons/DoNotDisturb.svg';
import CalenderIconSvg from '@/assets/icons/CalenderIcon.svg';
import InfoSvg from '@/assets/icons/info-circle.svg';
import RightArrowSvg from '@/assets/icons/RightArrow.svg';
import SoundWhite from '@/assets/icons/SoundWhite.svg'
import VibrateWhite from '@/assets/icons/VibrateWhite.svg'
import DoNotDisturbWhite from '@/assets/icons/DoNotDisturbWhite.svg'
import RightArrowWhite from '@/assets/icons/RightArrowWhite.svg'
import CalenderIconWhite from '@/assets/icons/CalenderIconWhite.svg'
import InfoWhite from '@/assets/icons/info-circleWhite.svg'
import SoundPickerModal from '@/components/common/SoundPickerModal';
import { useSoundStore } from '@/store/soundStore';
import { SOUND_OPTIONS } from '@/constants/soundOptions';
import { useReminderStore } from '@/store/reminderStore';
import DndRangeModal from '@/components/common/DndRangeModal';

export default function ReminderPreferences() {
    const vibration = useReminderStore((s) => s.preferences.vibration);
    const setVibration = useReminderStore((s) => s.setVibration);
    const { colors, isDark } = useTheme()
    const styles = getReminderStyles(colors)
    const [soundModalVisible, setSoundModalVisible] = useState(false);
    const selectedSoundId = useSoundStore((s) => s.selectedSoundId);
    const selectedSoundLabel = SOUND_OPTIONS.find((o) => o.id === selectedSoundId)?.label ?? 'None';

    const [dndModalVisible, setDndModalVisible] = useState(false);
    const dndEnabled = useReminderStore((s) => s.preferences.dndEnabled);
    const dndStartHour = useReminderStore((s) => s.preferences.dndStartHour);
    const dndStartMinute = useReminderStore((s) => s.preferences.dndStartMinute);
    const dndEndHour = useReminderStore((s) => s.preferences.dndEndHour);
    const dndEndMinute = useReminderStore((s) => s.preferences.dndEndMinute);
    const setDndEnabled = useReminderStore((s) => s.setDndEnabled);
    const setDndRange = useReminderStore((s) => s.setDndRange);

    const paused = useReminderStore((s) => s.preferences.paused);
    const setPaused = useReminderStore((s) => s.setPaused);

    function formatDndRange() {
        if (!dndEnabled) return 'Off';
        const fmt = (h: number, m: number) => {
            const period = h >= 12 ? 'PM' : 'AM';
            const displayHour = h % 12 === 0 ? 12 : h % 12;
            return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
        };
        return `${fmt(dndStartHour, dndStartMinute)}-${fmt(dndEndHour, dndEndMinute)}`;
    }

    return (
        <>
            {/* Preferences */}
            <Text style={styles.sectionTitle}>Reminder Preferences</Text>
            <View style={styles.prefsContainer}>
                <View style={styles.prefsCard}>
                    {/* Notification Sound */}
                    <TouchableOpacity style={styles.prefsRow} activeOpacity={0.7} onPress={() => setSoundModalVisible(true)}>
                        {isDark ? <SoundWhite width={20} height={20} /> : <SoundSvg width={20} height={20} />}
                        <Text style={styles.prefsRowLabel}>Notification Sound</Text>
                        <Text style={styles.prefsRowValue}>{selectedSoundLabel}</Text>
                        {isDark ? <RightArrowWhite width={12} height={12} /> : <RightArrowSvg width={12} height={12} />}
                    </TouchableOpacity>

                    <View style={styles.prefsRowDivider} />

                    {/* Vibration */}
                    <View style={styles.prefsRow}>
                        {isDark ? <VibrateWhite width={20} height={20} /> : <VibrateSvg width={20} height={20} />}
                        <Text style={styles.prefsRowLabel}>Vibration</Text>
                        <Switch
                            value={vibration}
                            onValueChange={setVibration}
                            trackColor={{ false: '#E0E0E0', true: '#9A85FE' }}
                            thumbColor="#FFFFFF"
                            style={{ transform: [{ scale: 0.8 }] }}
                        />
                    </View>

                    <View style={styles.prefsRowDivider} />

                    {/* Do Not Disturb */}
                    <TouchableOpacity style={styles.prefsRow} activeOpacity={0.7} onPress={() => setDndModalVisible(true)}>
                        {isDark ? <DoNotDisturbWhite width={20} height={20} /> : <DoNotDisturbSvg width={20} height={20} />}
                        <Text style={styles.prefsRowLabel}>Do Not Disturb</Text>
                        <Text style={styles.prefsRowValue}>11:00 PM-6:00 AM</Text>
                        {isDark ? <RightArrowWhite width={12} height={12} /> : <RightArrowSvg width={12} height={12} />}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Additional Settings */}
            <Text style={styles.sectionTitle}>Additional Settings</Text>
            <View style={styles.prefsContainer}>
                <View style={styles.prefsCard}>
                    {/* Pause Reminders */}
                    <TouchableOpacity style={styles.prefsRow} activeOpacity={0.7} onPress={() => setPaused(!paused)}>
                        {isDark ? <CalenderIconWhite width={20} height={20} /> : <CalenderIconSvg width={20} height={20} />}
                        <Text style={styles.prefsRowLabel}>Pause Reminders</Text>
                        <Text style={styles.prefsRowValue}>{paused ? 'On' : 'Off'}</Text>
                        {isDark ? <RightArrowWhite width={12} height={12} /> : <RightArrowSvg width={12} height={12} />}
                    </TouchableOpacity>

                    <View style={styles.prefsRowDivider} />

                    {/* Reminder Tips */}
                    {/* Reminder Tips */}
                    <TouchableOpacity style={styles.prefsRow} activeOpacity={0.7}>
                        {isDark ? <InfoWhite width={20} height={20} /> : <InfoSvg width={20} height={20} />}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.prefsRowLabel}>Reminder Tips</Text>
                            <Text style={styles.prefsRowSubtext}>
                                Learn how reminders help you stay consistent.
                            </Text>
                        </View>
                        {isDark ? <RightArrowWhite width={12} height={12} /> : <RightArrowSvg width={12} height={12} />}
                    </TouchableOpacity>
                </View>
            </View>
            <SoundPickerModal visible={soundModalVisible} onClose={() => setSoundModalVisible(false)} />
            <DndRangeModal
                visible={dndModalVisible}
                enabled={dndEnabled}
                startHour={dndStartHour}
                startMinute={dndStartMinute}
                endHour={dndEndHour}
                endMinute={dndEndMinute}
                onToggleEnabled={setDndEnabled}
                onChangeRange={setDndRange}
                onClose={() => setDndModalVisible(false)}
            />
        </>
    );
}