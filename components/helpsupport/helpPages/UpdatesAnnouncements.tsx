import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// ── Draft placeholder announcements — edit freely once real release notes exist ──
interface Announcement {
    version: string;
    date: string;
    title: string;
    points: string[];
}

const ANNOUNCEMENTS: Announcement[] = [
    {
        version: 'v1.3.0',
        date: 'July 2026',
        title: 'Playlists for every session',
        points: [
            'Create playlists mixing audio and video sessions',
            'Add sessions to a playlist directly from the player',
            'Manage and delete playlists from your profile',
        ],
    },
    {
        version: 'v1.2.0',
        date: 'June 2026',
        title: 'Personalised reminders',
        points: [
            'Set daily or weekly practice reminders',
            'New Sound & Music preferences for ambient audio',
            'Dark mode refinements across the app',
        ],
    },
    {
        version: 'v1.1.0',
        date: 'May 2026',
        title: 'Yoga Nidra library expansion',
        points: [
            'New sessions for sleep, anxiety relief, and burnout recovery',
            'Improved session player with sleep timer',
            'Faster search across mudras and sessions',
        ],
    },
    {
        version: 'v1.0.0',
        date: 'April 2026',
        title: 'Mudras launches!',
        points: [
            'Browse mudras by need, chakra, and element',
            'Guided instructions with practice timers',
            'Save your favourite mudras and sessions',
        ],
    },
];

export default function UpdatesAnnouncements() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AppHeader />

            <Text style={[styles.pageTitle, { color: colors.text }]}>Updates & Announcements</Text>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {ANNOUNCEMENTS.map((item, index) => (
                    <View
                        key={item.version}
                        style={[
                            styles.card,
                            { backgroundColor: colors.card },
                            index !== ANNOUNCEMENTS.length - 1 && { marginBottom: moderateScale(14) },
                        ]}
                    >
                        <View style={styles.headerRow}>
                            <View style={[styles.versionBadge, { backgroundColor: colors.primaryLight }]}>
                                <Text style={[styles.versionText, { color: colors.primary }]}>
                                    {item.version}
                                </Text>
                            </View>
                            <Text style={[styles.date, { color: colors.textMuted }]}>{item.date}</Text>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>

                        <View style={styles.pointsWrap}>
                            {item.points.map((point, i) => (
                                <View key={i} style={styles.pointRow}>
                                    <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                                    <Text style={[styles.pointText, { color: colors.textSub }]}>{point}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        textAlign: 'center',
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(40),
    },
    card: {
        borderRadius: moderateScale(14),
        padding: moderateScale(16),
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(8),
    },
    versionBadge: {
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(4),
    },
    versionText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '700',
    },
    date: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(16),
        fontWeight: '600',
        marginBottom: moderateScale(10),
    },
    pointsWrap: {
        gap: moderateScale(8),
    },
    pointRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: moderateScale(8),
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginTop: moderateScale(7),
        flexShrink: 0,
    },
    pointText: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        lineHeight: moderateScale(19),
    },
});