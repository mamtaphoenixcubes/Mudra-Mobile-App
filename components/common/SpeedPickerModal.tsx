import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import Svg, { Polyline } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const SPEED_OPTIONS = [
    { label: '0.5×', value: 0.5, desc: 'Very slow' },
    { label: '0.75×', value: 0.75, desc: 'Slow' },
    { label: '1×', value: 1.0, desc: 'Normal speed' },
    { label: '1.25×', value: 1.25, desc: 'Slightly fast' },
    { label: '1.5×', value: 1.5, desc: 'Fast' },
    { label: '2×', value: 2.0, desc: 'Double speed' },
];

const CheckIcon = () => (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Polyline
            points="20 6 9 17 4 12"
            stroke="#9A85FE"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

interface SpeedPickerModalProps {
    visible: boolean;
    currentSpeed: number;
    onSelect: (speed: number) => void;
    onClose: () => void;
}

export default function SpeedPickerModal({
    visible,
    currentSpeed,
    onSelect,
    onClose,
}: SpeedPickerModalProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    const sheetBg = isDark ? '#1C1B3A' : '#FFFFFF';
    const handleBg = isDark ? 'rgba(255,255,255,0.2)' : '#E0E0E0';
    const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#F7F7F7';
    const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : '#EFEFEF';
    const cancelBg = isDark ? 'rgba(255,255,255,0.05)' : '#F7F7F7';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

                <View style={[styles.sheet, { backgroundColor: sheetBg, paddingBottom: insets.bottom + 16 }]}>

                    {/* Handle */}
                    <View style={[styles.handle, { backgroundColor: handleBg }]} />

                    {/* Title */}
                    <Text style={[styles.title, { color: colors.text }]}>Playback Speed</Text>
                    <Text style={[styles.subtitle, { color: colors.textSub }]}>Select your preferred speed</Text>

                    {/* Options Card */}
                    <View style={[styles.card, { backgroundColor: cardBg }]}>
                        {SPEED_OPTIONS.map((option, index) => {
                            const isSelected = currentSpeed === option.value;
                            const iconBg = isSelected
                                ? (isDark ? 'rgba(154,133,254,0.2)' : '#EDE9FF')
                                : (isDark ? 'rgba(255,255,255,0.08)' : '#EFEFEF');

                            return (
                                <React.Fragment key={option.value}>
                                    <TouchableOpacity
                                        style={styles.row}
                                        onPress={() => {
                                            onSelect(option.value);
                                            onClose();
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        {/* Icon circle */}
                                        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
                                            <Text style={[styles.iconText, { color: isSelected ? '#9A85FE' : colors.textSub }]}>
                                                {option.label}
                                            </Text>
                                        </View>

                                        {/* Text */}
                                        <View style={styles.rowText}>
                                            <Text style={[styles.rowLabel, { color: isSelected ? '#9A85FE' : colors.text }]}>
                                                {option.label}
                                            </Text>
                                            <Text style={[styles.rowDesc, { color: colors.textSub }]}>
                                                {option.desc}
                                            </Text>
                                        </View>

                                        {/* Check */}
                                        {isSelected && <CheckIcon />}
                                    </TouchableOpacity>

                                    {index < SPEED_OPTIONS.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </View>

                    {/* Cancel */}
                    <TouchableOpacity
                        style={[styles.cancelBtn, { backgroundColor: cancelBg }]}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.cancelText, { color: colors.text }]}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    sheet: {
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
    },
    handle: {
        width: moderateScale(36),
        height: moderateScale(4),
        borderRadius: moderateScale(2),
        alignSelf: 'center',
        marginBottom: moderateScale(20),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(20),
        fontWeight: '700',
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '400',
        marginBottom: moderateScale(16),
    },
    card: {
        borderRadius: moderateScale(14),
        overflow: 'hidden',
        marginBottom: moderateScale(12),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
        gap: moderateScale(12),
    },
    iconCircle: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    iconText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(10),
        fontWeight: '700',
    },
    rowText: {
        flex: 1,
        gap: moderateScale(2),
    },
    rowLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(15),
        fontWeight: '600',
    },
    rowDesc: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '400',
    },
    divider: {
        height: 1,
        marginHorizontal: moderateScale(14),
    },
    cancelBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(16),
        alignItems: 'center',
    },
    cancelText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(16),
        fontWeight: '500',
    },
});