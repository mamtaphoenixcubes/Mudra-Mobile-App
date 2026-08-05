import React, { useEffect, useMemo,useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import MudraOfTheDayHeader from './Mudraofthedayheader';
import HeroCard from './Herocard';
import TodaysBenefit from './Todaysbenefit ';
import LotusDivider from './Lotusdivider';
import HowToPractice from './Howtopractice';
import ActionButtons from './Actionbuttons';

import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles';
import { useTheme } from '@/constants/ThemeContext';
import { useMudraStore } from '@/store/mudraStore';

export default function MudraOfTheDay() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getMudraOfTheDayStyles(colors);
const { token, user } = useAuthStore();
 const {
        mudras,
        fetchMudras,
        loading,
    } = useMudraStore();
console.log(mudras,"okokk");

    useEffect(() => {
        if (!mudras?.length) {
            fetchMudras();
        }
    }, []);

   const mudraOfTheDay = useMemo(() => {
    // mudras from the store can be either an array or an object with a `data` array
    // assert unknown types to any to avoid TS "never" when checking `.data`
    const mudraList = Array.isArray(mudras)
        ? mudras
        : ((mudras as any)?.data ?? []);

    return mudraList.find((item: any) => item.isMudraOfDay);
}, [mudras]);
useEffect(() => {
    if (mudraOfTheDay) {
        setLiked(
            mudraOfTheDay.userMudraActivities?.[0]?.isLiked ?? false
        );

        setSaved(
            mudraOfTheDay.userMudraActivities?.[0]?.isSaved ?? false
        );
    }
}, [mudraOfTheDay]);
const [liked, setLiked] = useState(
    mudraOfTheDay?.userMudraActivities?.[0]?.isLiked ?? false
);

const [liking, setLiking] = useState(false);
   const [saved, setSaved] = useState(
    mudraOfTheDay?.userMudraActivities?.[0]?.isSaved ?? false
);

const [saving, setSaving] = useState(false);

    if (loading || !mudraOfTheDay) {
        return <View style={styles.screen} />;
    }

const profileDocumentId = user?.id;

const handleLikeMudra = async () => {
    if (
        !profileDocumentId ||
        !mudraOfTheDay?.documentId ||
        liking
    ) {
        return;
    }

    const previousState = liked;

    // Optimistic UI update
    setLiked(!previousState);

    try {
        setLiking(true);

        await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraOfTheDay.documentId}/like`,
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
        // Rollback
        setLiked(previousState);

        console.log(
            'LIKE_MUDRA_ERROR',
            error?.response?.data || error
        );
    } finally {
        setLiking(false);
    }
};
const handleSaveMudra = async () => {
    if (
        !profileDocumentId ||
        !mudraOfTheDay?.documentId ||
        saving
    ) {
        return;
    }

    const previousState = saved;

    // Optimistic UI update
    setSaved(!previousState);

    try {
        setSaving(true);

        await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraOfTheDay.documentId}/save`,
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
        // Rollback
        setSaved(previousState);

        console.log(
            'SAVE_MUDRA_ERROR',
            error?.response?.data || error
        );
    } finally {
        setSaving(false);
    }
};
    return (
        <View style={styles.screen}>
            <MudraOfTheDayHeader onInfoPress={() => {}} />

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 24 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <HeroCard
                    imageUri={{
                        uri:
                            process.env.EXPO_PUBLIC_IMAGE_API_URL +
                            (mudraOfTheDay.thumbnail?.url ||
                                mudraOfTheDay.image?.[0]?.url),
                    }}
                    name={mudraOfTheDay.name}
                    subtitle={mudraOfTheDay.type}
                    isFavorite={liked}
                    onFavoriteToggle={handleLikeMudra}
                />

                <TodaysBenefit
                    benefit={mudraOfTheDay.description}
                />

                <LotusDivider />

               <HowToPractice
                    instructions={
                        mudraOfTheDay.HowToDoIt?.instructionsPoints?.[0]
                            ?.children
                            ?.map((item: any) =>
                                item.children?.[0]?.text
                            )
                            .filter(Boolean)
                            .join('\n')
                    }
                    onViewGuide={() =>
                        router.push({
                            pathname: '/mudrameditation',
                            params: {
                                id: mudraOfTheDay.documentId,
                            },
                        })
                    }
                />

           <ActionButtons
                onExplore={() =>
                    router.push({
                        pathname: '/mudradetail',
                        params: {
                            id: mudraOfTheDay.documentId,
                        },
                    })
                }
                isSaved={saved}
                onSave={handleSaveMudra}
            />
            </ScrollView>
        </View>
    );
}