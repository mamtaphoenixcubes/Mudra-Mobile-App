import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
// import { nidraDetailStyles as styles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import PlaySvg from '@/assets/icons/play.svg';

interface Props {
    nidra?: any;
    duration?: number;
}

export default function NidraDetailStartBtn({ duration }: Props) {
    const { colors } = useTheme()
    const styles = getNidraDetailStyles(colors)
    return (
        <View style={styles.startBtnContainer}>
            <TouchableOpacity
                style={styles.startBtn}
                // onPress={() => router.push('/sessionplayer')}
                onPress={() =>
                    router.push({
                        pathname: '/sessionplayer',
                        params: {
                            passduration: String((duration ?? 20) * 60),
                        },
                    })
                }
                activeOpacity={0.85}
            >
                <PlaySvg width={20} height={20} color="#FFFFFF" />
                <Text style={styles.startBtnText}>Start Practice</Text>
            </TouchableOpacity>
        </View>
    );
}