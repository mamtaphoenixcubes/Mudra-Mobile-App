import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AirIcon from '@/assets/icons/air.svg';
import MantraIcon from '@/assets/icons/mantra.svg';
import MeditationIcon from '@/assets/icons/Meditation.svg';
import SleepIcon from '@/assets/icons/sleep.svg';
import { useTheme } from '@/constants/ThemeContext';

const PairedCard = ({ title, description, color, Icon }: { title: string; description: string; color: string; Icon: React.ComponentType<any> }) => (
    <View style={[styles.pairedCard, { backgroundColor: color }]}>
        <View style={styles.pairedIconWrapper}>
            <Icon width={28} height={28} />
        </View>
        <Text style={styles.pairedTitle}>{title}</Text>
        <Text style={styles.pairedDescription}>{description}</Text>
    </View>
);

const NotesCard = ({ title, notes, color }: { title: string; notes: string[]; color: string }) => (
    <View style={[styles.notesCard, { backgroundColor: color }]}>
        <Text style={styles.notesTitle}>{title}</Text>
        {notes.map((note, index) => (
            <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.noteText}>{note}</Text>
            </View>
        ))}
    </View>
);

type PairedItem = { title: string; description: string; color: string; Icon: React.ComponentType<any> };

export default function MeditationDetailPairedWith({ meditation }: { meditation?: any }) {
    const icons = [AirIcon, MantraIcon, MeditationIcon, SleepIcon];
    const { colors: themeColors } = useTheme();
    const colors = ['#FFD4C4', '#E9FFDB', '#CBECFF', '#FFF6BF'];

    const fallbackPaired: PairedItem[] = [
        { title: 'Pranayama', description: 'Breathwork deepens the relaxation response.', color: colors[0], Icon: icons[0] },
        { title: 'Mantra Chanting', description: 'A calming sound anchor for the mind.', color: colors[1], Icon: icons[1] },
        { title: 'Yoga Nidra', description: 'A natural extension into deeper rest.', color: colors[2], Icon: icons[2] },
    ];

    const pairedItems: PairedItem[] = meditation?.pairedWith?.map((item: any, index: number) => ({
        title: item.name,
        description: item.pairedWithText,
        color: colors[index % colors.length],
        Icon: icons[index % icons.length],
    })) ?? fallbackPaired;

    const therapeuticNotes = Array.isArray(meditation?.therapeuticNotes) && meditation.therapeuticNotes.length > 0
        ? meditation.therapeuticNotes
        : ['Reduces stress and promotes emotional balance.'];

    const cautionNotes = Array.isArray(meditation?.cautionNotes) && meditation.cautionNotes.length > 0
        ? meditation.cautionNotes
        : ['May bring up strong emotions — practice gently and without judgment.'];

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Paired With</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {pairedItems.map((item, index) => (
                    <PairedCard key={index} {...item} />
                ))}
            </ScrollView>

            <View style={styles.notesRow}>
                <NotesCard title="Therapeutic Notes" notes={therapeuticNotes} color="#EBCFFF" />
                <NotesCard title="Caution Notes" notes={cautionNotes} color="#FFDBE7" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 16, gap: 16 },
    sectionTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '600', fontSize: 18, lineHeight: 22, paddingHorizontal: 16 },
    scrollContent: { paddingHorizontal: 16, gap: 10 },
    pairedCard: { width: 120, height: 160, borderRadius: 7.34, padding: 8, alignItems: 'center', justifyContent: 'center', gap: 4 },
    pairedIconWrapper: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    pairedTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 11, lineHeight: 14, color: '#1A1A1A', textAlign: 'center' },
    pairedDescription: { fontFamily: 'SF-Pro-Display', fontWeight: '400', fontSize: 9, lineHeight: 12, color: '#666', textAlign: 'center' },
    notesRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginTop: 12 },
    notesCard: { flex: 1, borderRadius: 7.34, padding: 12, gap: 8 },
    notesTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 13, lineHeight: 18, color: '#1A1A1A', marginBottom: 4 },
    bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    bullet: { fontSize: 10, color: '#555', lineHeight: 14 },
    noteText: { flex: 1, fontFamily: 'SF-Pro-Display', fontWeight: '400', fontSize: 11, lineHeight: 15, color: '#555' },
});