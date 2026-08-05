import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';

import NidraDetailHeader from './NidraDetailHeader';
import NidraDetailHero from './NidraDetailHero';
import NidraDetailInfoBanner from './NidraDetailInfoBanner';
import NidraDetailExpect from './NidraDetailExpect';
import NidraDetailBenefits from './NidraDetailBenefits';
import NidraDetailAbout from './NidraDetailAbout';
import NidraDetailAlsoLove from './NidraDetailAlsoLove';
import NidraDetailStartBtn from './NidraDetailStartBtn';

import { useNidraStore } from '@/store/nidraStore';
import { useAuthStore } from '@/store/authStore';

export default function NidraDetailScreen() {
    const { id } = useLocalSearchParams();
     const [selectedDuration, setSelectedDuration] = useState(20);

    const {
        selectedNidra,
        loadingNidra,
        fetchNidraById,
    } = useNidraStore();

    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getNidraDetailStyles(colors);
   const { user } = useAuthStore();
   
       const profileDocumentId =
           user?.id ||
           user?.profileDocumentId;
  useEffect(() => {
    if (id) {
        fetchNidraById(
            id as string,
            profileDocumentId
        );
    }
}, [id, profileDocumentId]);

    if (loadingNidra) {
        return <ActivityIndicator size="large" />;
    }

    if (!selectedNidra) {
        return null;
    }

    return (
        <View style={styles.screen}>
            <NidraDetailHeader nidra={selectedNidra} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 120,
                }}
            >
                <NidraDetailHero nidra={selectedNidra} />
                <NidraDetailInfoBanner nidra={selectedNidra} />
                <NidraDetailExpect nidra={selectedNidra} />

                <View style={styles.sectionDivider} />

                <NidraDetailBenefits nidra={selectedNidra} />

                <View style={styles.sectionDivider} />

                <NidraDetailAbout nidra={selectedNidra}
                onDurationChange={setSelectedDuration}
                 />

                <View style={styles.sectionDivider} />

                <NidraDetailAlsoLove nidra={selectedNidra} />

                <NidraDetailStartBtn nidra={selectedNidra}
                duration={selectedDuration}
                 />
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}