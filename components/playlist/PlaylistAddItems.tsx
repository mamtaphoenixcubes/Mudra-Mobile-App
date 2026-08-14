import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import { useMudraStore } from '@/store/mudraStore';
import { useNidraStore } from '@/store/nidraStore';
import { usePlaylistStore, type PlaylistSession } from '@/store/playlistStore';
import PlaylistMediaSelect from './PlaylistMediaSelect';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

type CategoryKey = 'mudra' | 'nidra' | 'pranayama' | 'asana' | 'meditation';

const CATEGORY_LABELS: Record<CategoryKey, string> = {
    mudra: 'Mudra',
    nidra: 'Nidra',
    pranayama: 'Pranayama',
    asana: 'Asana',
    meditation: 'Meditation',
};

// Categories that don't have a real data source wired up yet.
// Flip an entry to `false` once its store/API is ready.
const CATEGORY_AVAILABLE: Record<CategoryKey, boolean> = {
    mudra: true,
    nidra: true,
    pranayama: false,
    asana: false,
    meditation: false,
};

interface PlaylistAddItemsProps {
    playlistId: string;
    category: CategoryKey;
    onClose: () => void;
}

export default function PlaylistAddItems({ playlistId, category, onClose }: PlaylistAddItemsProps) {
    const { colors } = useTheme();

    const isAvailable = CATEGORY_AVAILABLE[category] ?? false;

    // ── Data sources ──
    const mudras = useMudraStore((s) => s.mudras);
    const fetchMudras = useMudraStore((s) => s.fetchMudras);

    const nidras = useNidraStore((s) => s.nidras);
    const fetchNidras = useNidraStore((s) => s.fetchNidras);

    useEffect(() => {
        if (category === 'mudra') fetchMudras();
        if (category === 'nidra') fetchNidras({});
    }, [category]);

    // ── Drill-down state: which raw mudra/nidra is currently open ──
    const [selectedRawItem, setSelectedRawItem] = useState<any | null>(null);

    // ── Raw lists (unwrapped, defensive against a paginated {data, meta} shape) ──
    const mudraList = useMemo(
        () => (Array.isArray(mudras) ? mudras : (mudras as any)?.data ?? []),
        [mudras]
    );
    const nidraList = useMemo(
        () => (Array.isArray(nidras) ? nidras : (nidras as any)?.data ?? []),
        [nidras]
    );

    // ── Normalized display items for the list ──
    const items: PlaylistSession[] = useMemo(() => {
        if (category === 'mudra') {
            return mudraList.map((item: any) => ({
                id: String(item.documentId ?? item.id),
                title: item.name ?? 'Untitled mudra',
                duration: item.duration ?? '',
                isVideo: false,
                thumbnail: item.thumbnail?.url ?? null,
                contentTypeOfAudio: 'mudra',
            }));
        }

        if (category === 'nidra') {
            return nidraList.map((item: any) => ({
                id: String(item.documentId ?? item.id),
                title: item.Name ?? 'Untitled nidra',
                duration: item.Duration ? `${item.Duration} min` : '',
                isVideo: false,
                thumbnail: item.NidraIntroCard?.ThumbnailImage?.[0]?.url ?? null,
                contentTypeOfAudio: 'nidra',
            }));
        }

        return [];
    }, [category, mudraList, nidraList]);

    const resolveThumbnailUri = (thumbnail?: string | null) => {
        if (!thumbnail) return undefined;
        return thumbnail.startsWith('http')
            ? thumbnail
            : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${thumbnail}`;
    };

    const handleRowPress = (itemId: string) => {
        const raw =
            category === 'mudra'
                ? mudraList.find((m: any) => String(m.documentId ?? m.id) === itemId)
                : nidraList.find((n: any) => String(n.documentId ?? n.id) === itemId);
        if (raw) setSelectedRawItem(raw);
    };

    // ── Drill-down view replaces the list in place — no modal, no navigation ──
    if (selectedRawItem) {
        return (
            <PlaylistMediaSelect
                playlistId={playlistId}
                rawItem={selectedRawItem}
                category={category as 'mudra' | 'nidra'}
                onBack={() => setSelectedRawItem(null)}
            />
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AppHeader onBackPress={onClose} />

            <Text style={[styles.pageTitle, { color: colors.text }]}>
                {CATEGORY_LABELS[category] ?? 'Items'}
            </Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
                Tap an item to view its audio and video content
            </Text>

            {!isAvailable ? (
                <View style={styles.emptyWrap}>
                    <Ionicons name="time-outline" size={28} color={colors.textMuted as string} />
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>Coming soon</Text>
                    <Text style={[styles.emptySub, { color: colors.textSub }]}>
                        {CATEGORY_LABELS[category]} content isn&apos;t connected yet.
                    </Text>
                </View>
            ) : items.length === 0 ? (
                <View style={styles.emptyWrap}>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const uri = resolveThumbnailUri(item.thumbnail);

                        return (
                            <TouchableOpacity
                                style={[styles.row, { borderBottomColor: colors.dashedLine }]}
                                activeOpacity={0.7}
                                onPress={() => handleRowPress(item.id)}
                            >
                                <View style={[styles.thumbWrap, { backgroundColor: colors.surfaceAlt }]}>
                                    {uri ? (
                                        <Image source={{ uri }} style={styles.thumb} resizeMode="cover" />
                                    ) : (
                                        <Ionicons name="musical-note" size={18} color={colors.textMuted as string} />
                                    )}
                                </View>

                                <View style={styles.rowMeta}>
                                    <Text style={[styles.rowTitle, { color: colors.text }]} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    {!!item.duration && (
                                        <Text style={[styles.rowSub, { color: colors.textSub }]}>
                                            {item.duration}
                                        </Text>
                                    )}
                                </View>

                                <Ionicons name="chevron-forward" size={20} color={colors.textMuted as string} />
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
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
        paddingHorizontal: moderateScale(16),
        marginTop: moderateScale(4),
    },
    pageSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12.5),
        textAlign: 'center',
        paddingHorizontal: moderateScale(24),
        marginTop: moderateScale(4),
        marginBottom: moderateScale(16),
    },
    listContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(100),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        paddingVertical: moderateScale(11),
        borderBottomWidth: 0.38,
    },
    thumbWrap: {
        width: moderateScale(46),
        height: moderateScale(46),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
    },
    thumb: {
        width: '100%',
        height: '100%',
    },
    rowMeta: {
        flex: 1,
        minWidth: 0,
        gap: moderateScale(3),
    },
    rowTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    rowSub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
    },
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(32),
        gap: moderateScale(8),
    },
    emptyTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(15),
        fontWeight: '600',
    },
    emptySub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        lineHeight: moderateScale(19),
    },
});