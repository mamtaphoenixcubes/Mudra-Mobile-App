import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getCalendarStyles } from '@/assets/styles/calendar/calendarStyles';

interface Session {
    title: string;
    practiceType: string;
    sessionType: string;
    sessionDuration: number;
}

interface ActivitiesModalProps {
    visible: boolean;
    onClose: () => void;
    dateLabel: string | null;
    sessions: Session[] | undefined;
}

export default function ActivitiesModal({
    visible,
    onClose,
    dateLabel,
    sessions,
}: ActivitiesModalProps) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getCalendarStyles(colors);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View
                    style={[styles.modalSheet, { paddingBottom: insets.bottom + 24 }]}
                >
                    <View style={styles.modalHandle} />

                    <Text style={styles.activitiesTitle}>
                        {dateLabel ? `Activities on ${dateLabel}` : 'Select a date'}
                    </Text>

                    {!sessions?.length ? (
                        <View style={styles.emptyActivityState}>
                            <Ionicons name="calendar-clear-outline" size={28} color={colors.textSub} />
                            <Text style={styles.noActivityText}>No activities found</Text>
                        </View>
                    ) : (
                        <ScrollView
                            style={styles.activityScrollArea}
                            contentContainerStyle={styles.activityScrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {sessions.map((session, index) => {
                                const isMudra = session.practiceType?.toLowerCase() === 'mudra';
                                return (
                                    <View key={index} style={styles.activityCard}>
                                        <View
                                            style={[
                                                styles.activityIconCircle,
                                                { backgroundColor: isMudra ? colors.primaryMuted : '#E3F2FF' },
                                            ]}
                                        >
                                            <Ionicons
                                                name={isMudra ? 'hand-left-outline' : 'moon-outline'}
                                                size={20}
                                                color={isMudra ? colors.primary : '#1E88E5'}
                                            />
                                        </View>

                                        <View style={styles.activityTextBlock}>
                                            <Text style={styles.activityTitle} numberOfLines={1}>
                                                {session.title}
                                            </Text>

                                            <Text style={styles.activitySubtitle} numberOfLines={1}>
                                                {session.practiceType} · {session.sessionType}
                                            </Text>
                                        </View>

                                        <View style={styles.durationBadge}>
                                            <Text style={styles.activityDuration}>
                                                {Math.floor(session.sessionDuration / 60)} min
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )}

                    <TouchableOpacity
                        style={styles.modalCancelBtn}
                        activeOpacity={0.7}
                        onPress={onClose}
                    >
                        <Text style={styles.modalCancelText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}