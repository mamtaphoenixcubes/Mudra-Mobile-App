import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeroSection from './HeroSection';
import { useMudraStore } from '@/store/mudraStore';
import HowToDoIt from './HowToDoIt';
import ElementalLogic from './ElementalLogic';
import InfoCards from './InfoCards';
import PairedWith from './PairedWith';
import RelatedMudras from './RelatedMudras';
import PlayIcon from '@/assets/icons/play.svg';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import MudraDetailSkeleton from '@/components/common/skeletons/MudraDetailSkeleton'
import { useTheme } from '@/constants/ThemeContext'
import AppHeader from '@/components/common/AppHeader'
import ShareSvg from '@/assets/icons/share.svg'
import ShareWhite from '@/assets/icons/shareWhite.svg'

export default function MudraDetail() {
    const { colors, isDark } = useTheme()
    // const insets = useSafeAreaInsets();
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const fetchMudraById = useMudraStore((s) => s.fetchMudraById);
    const selectedMudra = useMudraStore((s) => s.selectedMudra);

    const mudra = selectedMudra?.data ?? selectedMudra;

    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;

    const userActivity =
        mudra?.userMudraActivities?.find(
            (activity: any) =>
                activity?.user?.documentId ===
                profileDocumentId
        );

    const isLiked =
        userActivity?.isLiked ?? false;

    const [liked, setLiked] =
        useState(isLiked);

    const [liking, setLiking] =
        useState(false);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);
const handleShare = async () => {
    try {
        // Update share count
        await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/sharecount`
        );
    } catch (error: any) {
        console.log(
            'SHARE_COUNT_ERROR',
            error?.response?.data || error
        );
    }

    try {
        const shareUrl = mudra?.documentId
            ? `https://mudhra.app/mudra/${mudra.documentId}`
            : '';

        await Share.share({
            title: mudra?.name || 'Mudra',
            message: `${mudra?.name ?? 'Mudra'}\n\n${
                mudra?.introCard?.introCardText ?? ''
            }\n\n${shareUrl}`,
            url: shareUrl,
        });
    } catch (error) {
        console.log('SHARE_ERROR', error);
    }
}
    useEffect(() => {
        if (id) {
            setIsLoading(true)
            fetchMudraById(id as string).finally(() => setIsLoading(false))
        }
    }, [id, fetchMudraById]);

    const handleLikeMudra = async () => {
        if (
            !profileDocumentId ||
            !mudra?.documentId ||
            liking
        ) {
            return;
        }

        const previousState =
            liked;

        // Instant UI update
        setLiked(!previousState);

        try {
            setLiking(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/like`,
                {
                    profileDocumentId,
                },
                {
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                        }
                        : {},
                }
            );
        } catch (error: any) {
            // rollback
            setLiked(previousState);

            console.log(
                'LIKE_MUDRA_ERROR',
                error?.response?.data ||
                error
            );
        } finally {
            setLiking(false);
        }
    };

    if (isLoading) return <MudraDetailSkeleton />

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* ── Header ── */}
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mudra Detail</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        hitSlop={8}
                        onPress={handleLikeMudra}
                    >
                        <Ionicons
                            name={
                                liked
                                    ? 'heart'
                                    : 'heart-outline'
                            }
                            size={24}
                            color={
                                liked
                                    ? '#EF4444'
                                    : '#000'
                            }
                        />
                    </TouchableOpacity>
                 <TouchableOpacity
                    style={styles.iconBtn}
                    hitSlop={{
                        top: 15,
                        bottom: 15,
                        left: 15,
                        right: 15,
                    }}
                    onPress={handleShare}
                >
                    <Ionicons
                        name="share-outline"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>
                </View>
            </View> */}
            <AppHeader
                rightIcon={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={0.7}
                            onPress={handleLikeMudra}
                        >
                            <Ionicons
                                name={liked ? 'heart' : 'heart-outline'}
                                size={24}
                                color={liked ? '#EF4444' : colors.text}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={0.7}
                            onPress={handleShare}
                        >
                            {isDark ? <ShareWhite width={24} height={24} /> : <ShareSvg width={22} height={22} />}
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* ── Content ── */}
            <ScrollView
                style={{ backgroundColor: colors.background }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={[styles.pageTitle, { color: colors.text }]}>Mudra Detail</Text>
                <HeroSection mudra={mudra} />
                <HowToDoIt mudra={mudra} />
                <ElementalLogic mudra={mudra} />
                <InfoCards mudra={mudra} />
                <PairedWith mudra={mudra} />
                <RelatedMudras mudra={mudra} />

                {/* ✅ Button INSIDE ScrollView at the very bottom — no overlap, no absolute */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.startBtn}
                        activeOpacity={0.85}
                        onPress={() =>
                            router.push({
                                pathname: '/mudrameditation',
                                params: {
                                    id: mudra?.documentId,
                                },
                            })
                        }
                    >
                        <Text style={styles.startBtnText}>
                            Start Practice
                        </Text>

                        <PlayIcon
                            width={16}
                            height={16}
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: 18,
        color: '#000',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconBtn: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 120,
    },

    // ✅ Button wrapper — normal flow, no absolute
    buttonWrapper: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    startBtn: {
        backgroundColor: '#9A85FE',
        borderRadius: 6,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    startBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 16,
        color: '#fff',
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});