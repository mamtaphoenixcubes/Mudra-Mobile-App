import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PlayIcon from '@/assets/icons/play.svg';

export default function MeditationDetailStartBtn({ meditation }: { meditation?: any }) {
    const router = useRouter();

    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                style={styles.startBtn}
                activeOpacity={0.85}
                onPress={() =>
                    router.push({
                        pathname: '/meditationpage',
                        params: { id: meditation?.documentId },
                    })
                }
            >
                <Text style={styles.startBtnText}>Start Practice</Text>
                <PlayIcon width={16} height={16} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: { paddingHorizontal: 16, paddingTop: 16 },
    startBtn: { backgroundColor: '#9A85FE', borderRadius: 6, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    startBtnText: { fontFamily: 'SF-Pro-Display', fontWeight: '600', fontSize: 16, color: '#fff' },
});