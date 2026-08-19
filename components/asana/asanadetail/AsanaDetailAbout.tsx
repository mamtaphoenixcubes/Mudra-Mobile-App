import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import ClockSvg from '@/assets/icons/clock.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import GroupWhite from '@/assets/icons/GroupWhite.svg';
import LanguageSvg from '@/assets/icons/Language.svg';
import LanguageWhite from '@/assets/icons/LanguageWhite.svg';
import DownloadSvg from '@/assets/icons/download.svg';
import DownloadWhite from '@/assets/icons/downloadWhite.svg';

export default function AsanaDetailAbout() {
    const { colors, isDark } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    const DURATION_OPTIONS = [10, 15, 20, 30, 45];
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[2]);

    const handleSelectDuration = (minutes: number) => {
        setSelectedDuration(minutes);
    };

    const ABOUT_ROWS = [
        { icon: isDark ? <ClockWhite width={18} height={18} /> : <ClockSvg width={18} height={18} />, label: 'Duration', value: '20 minutes' },
        { icon: isDark ? <GroupWhite width={18} height={18} /> : <GroupSvg width={18} height={18} />, label: 'Level', value: 'All Levels' },
        { icon: isDark ? <LanguageWhite width={18} height={18} /> : <LanguageSvg width={18} height={18} />, label: 'Language', value: 'English' },
        { icon: isDark ? <DownloadWhite width={18} height={18} /> : <DownloadSvg width={18} height={18} />, label: 'Download Size', value: '24 MB' },
    ];

    return (
        <View style={styles.aboutContainer}>
            <Text style={styles.sectionTitle}>About This Session</Text>
            <Text style={styles.aboutText}>
                This session guides you through the traditional 12-pose Surya Namaskar sequence, perfect for morning practice to energize your body and focus your mind for the day ahead.
            </Text>
            {ABOUT_ROWS.map((row, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <View style={styles.aboutRowDivider} />}
                    <View style={styles.aboutRow}>
                        {row.icon}
                        <Text style={styles.aboutRowLabel}>{row.label}</Text>
                        <Text style={styles.aboutRowValue}>{row.value}</Text>
                    </View>
                </React.Fragment>
            ))}
            <View style={styles.aboutRowDivider} />

            <View style={{ paddingVertical: 2 }}>
                <View style={styles.aboutRow}>
                    {isDark ? <ClockWhite width={18} height={18} /> : <ClockSvg width={18} height={18} />}
                    <Text style={styles.aboutRowLabel}>Select session length</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 6, paddingLeft: 28, paddingTop: 10 }}
                >
                    {DURATION_OPTIONS.map((minutes) => {
                        const selected = selectedDuration === minutes;
                        return (
                            <TouchableOpacity
                                key={minutes}
                                activeOpacity={0.7}
                                onPress={() => handleSelectDuration(minutes)}
                                style={{
                                    minWidth: 50,
                                    alignItems: 'center',
                                    paddingVertical: 8,
                                    borderRadius: 14,
                                    backgroundColor: selected
                                        ? (isDark ? '#F5F5F5' : '#1A1A1A')
                                        : 'transparent',
                                    borderWidth: selected ? 0 : 1,
                                    borderColor: isDark ? '#3A3A3A' : '#E2E2E2',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12.5,
                                        fontWeight: '500',
                                        color: selected
                                            ? (isDark ? '#1A1A1A' : '#FFFFFF')
                                            : (isDark ? '#CCCCCC' : '#4A4A4A'),
                                    }}
                                >
                                    {minutes}m
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}