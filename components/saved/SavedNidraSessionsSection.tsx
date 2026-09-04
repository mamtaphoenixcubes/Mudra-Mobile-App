import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import SavedNidraSessionItem from './SavedNidraSessionItem';
interface Props {
    nidras: any[];
    loading?: boolean;
    error?: string | null;
    fetchSavedNidras: (profileDocumentId: string) => Promise<void>;
}

export default function SavedNidraSessionsSection({
    nidras,
    loading,
    error,
    fetchSavedNidras,
}: Props) {
    const { colors, isDark } = useTheme();
    const styles = getSavedStyles(colors, isDark);

    // Only keep items that actually have a media object
    const sessions = (nidras ?? []).filter(
        (item) => item?.media
    );

    if (loading) {
        return null;
    }

    if (error) {
        return (
            <View style={{ paddingHorizontal: 16 }}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.sessionsContainer}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>
                    Saved Nidra Sessions
                </Text>

                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.sectionLink}>
                        View All &gt;
                    </Text>
                </TouchableOpacity>
            </View>

            {sessions.length === 0 ? (
                <View
                    style={[
                        styles.sessionsCard,
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 32,
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: colors.textSub,
                            fontSize: 14,
                        }}
                    >
                        No nidra sessions found.
                    </Text>
                </View>
            ) : (
                <View style={styles.sessionsCard}>
                    {sessions.map((item: any, index: number) => (
                        <SavedNidraSessionItem
                            key={item.documentId}
                            item={item}
                            index={index}
                            isLast={index === sessions.length - 1}
                            fetchSavedNidras={fetchSavedNidras}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}