import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';

import ClockSvg from '@/assets/icons/clock.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import UserSvg from '@/assets/icons/User.svg';
import LanguageSvg from '@/assets/icons/Language.svg';
import TuneSvg from '@/assets/icons/Tune.svg';
import DownloadSvg from '@/assets/icons/download.svg';

import ClockWhite from '@/assets/icons/ClockWhite.svg';
import GroupWhite from '@/assets/icons/GroupWhite.svg';
import UserWhite from '@/assets/icons/UserWhite.svg';
import LanguageWhite from '@/assets/icons/LanguageWhite.svg';
import TuneWhite from '@/assets/icons/TuneWhite.svg';
import DownloadWhite from '@/assets/icons/downloadWhite.svg';


interface Props {
    nidra: any;
}

interface AboutProps extends Props {
    onDurationChange?: (minutes: number) => void;
}

export default function NidraDetailAbout({ nidra, onDurationChange }: AboutProps) {
    const { colors, isDark } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const about = nidra?.DetailsPage?.AboutSession;
const durationCard = nidra?.DurationPickerCard;

const DURATION_OPTIONS = [
    durationCard?.defaultDuration,
    durationCard?.beginnerDuration,
    durationCard?.intermediateDuration,
    durationCard?.advancedDuration,
    durationCard?.expertDuration,
]
    .filter((value): value is number => typeof value === 'number')
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => a - b);
  const [selectedDuration, setSelectedDuration] = useState(
    nidra?.userActivity?.SessionDuration
        ? Math.round(nidra.userActivity.SessionDuration / 60)
        : DURATION_OPTIONS[0] ?? nidra?.Duration ?? 10
);

    const handleSelectDuration = (minutes: number) => {
        setSelectedDuration(minutes);
        onDurationChange?.(minutes);
    };

    const ABOUT_ROWS = [
        {
            icon: isDark ? <ClockWhite width={18} height={18} /> : <ClockSvg width={18} height={18} />,
            label: 'Duration',
            value: `${nidra?.Duration ?? '-'} minutes`,
        },
        {
            icon: isDark ? <GroupWhite width={18} height={18} /> : <GroupSvg width={18} height={18} />,
            label: 'Level',
            value: about?.Level ?? '-',
        },
        {
            icon: isDark ? <UserWhite width={18} height={18} /> : <UserSvg width={18} height={18} />,
            label: 'Voice',
            value: about?.Voice ?? '-',
        },
        {
            icon: isDark ? <LanguageWhite width={18} height={18} /> : <LanguageSvg width={18} height={18} />,
            label: 'Language',
            value: about?.Language ?? '-',
        },
        {
            icon: isDark ? <TuneWhite width={18} height={18} /> : <TuneSvg width={18} height={18} />,
            label: 'Background Music',
            value: about?.BackgroundMusic ?? '-',
        },
        {
            icon: isDark ? <DownloadWhite width={18} height={18} /> : <DownloadSvg width={18} height={18} />,
            label: 'Download Size',
            value: `${about?.DownloadSize ?? '-'} MB`,
        },
    ];

    return (
        <View style={styles.aboutContainer}>
            <Text style={styles.sectionTitle}>About This Session</Text>

            <Text style={styles.aboutText}>
                {about?.DescriptionAboutSession}
            </Text>

            {ABOUT_ROWS.map((row, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <View style={styles.aboutRowDivider} />}

                    <View style={styles.aboutRow}>
                        {row.icon}

                        <Text style={styles.aboutRowLabel}>
                            {row.label}
                        </Text>

                        <Text style={styles.aboutRowValue}>
                            {row.value}
                        </Text>
                    </View>
                </React.Fragment>
            ))}

            <View style={styles.aboutRowDivider} />

            <View style={{ paddingVertical: 2 }}>
                <View style={styles.aboutRow}>
                    {isDark ? (
                        <ClockWhite width={18} height={18} />
                    ) : (
                        <ClockSvg width={18} height={18} />
                    )}
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