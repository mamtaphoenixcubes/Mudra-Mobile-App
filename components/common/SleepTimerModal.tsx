import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import Svg, { Polyline, Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const TIMER_OPTIONS = [
    { label: 'Off', desc: 'No sleep timer', value: 0 },
    { label: '15 minutes', desc: 'Short session', value: 15 },
    { label: '30 minutes', desc: 'Standard session', value: 30 },
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

const MoonIcon = ({ color }: { color: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const ClockIcon = ({ color }: { color: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
        <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

const EditIcon = ({ color }: { color: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

interface SleepTimerModalProps {
    visible: boolean;
    currentTimer: number;
    onSelect: (minutes: number) => void;
    onClose: () => void;
}

export default function SleepTimerModal({
    visible,
    currentTimer,
    onSelect,
    onClose,
}: SleepTimerModalProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const [customValue, setCustomValue] = useState('');
    const [customFocused, setCustomFocused] = useState(false);

    const sheetBg = isDark ? '#1C1B3A' : '#FFFFFF';
    const handleBg = isDark ? 'rgba(255,255,255,0.2)' : '#E0E0E0';
    const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#F7F7F7';
    const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : '#EFEFEF';
    const cancelBg = isDark ? 'rgba(255,255,255,0.05)' : '#F7F7F7';
    const inputBorder = customFocused ? '#9A85FE' : (isDark ? 'rgba(255,255,255,0.12)' : '#E0E0E0');
    const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0';

    const isCustomSelected = currentTimer > 0 && !TIMER_OPTIONS.find(o => o.value === currentTimer);

    const getIconBg = (isSelected: boolean) =>
        isSelected
            ? (isDark ? 'rgba(154,133,254,0.2)' : '#EDE9FF')
            : (isDark ? 'rgba(255,255,255,0.08)' : '#EFEFEF');

    const handleCustomSubmit = () => {
        const val = parseInt(customValue);
        if (!isNaN(val) && val > 0) {
            onSelect(val);
            setCustomValue('');
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }}>
                    <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

                    <View style={[styles.sheet, { backgroundColor: sheetBg, paddingBottom: insets.bottom + 16 }]}>

                        {/* Handle */}
                        <View style={[styles.handle, { backgroundColor: handleBg }]} />

                        {/* Title */}
                        <Text style={[styles.title, { color: colors.text }]}>Sleep Timer</Text>
                        <Text style={[styles.subtitle, { color: colors.textSub }]}>Stop playback after a set time</Text>

                        {/* Options Card */}
                        <View style={[styles.card, { backgroundColor: cardBg }]}>

                            {/* Preset options */}
                            {TIMER_OPTIONS.map((option, index) => {
                                const isSelected = currentTimer === option.value && !isCustomSelected;
                                const iconColor = isSelected ? '#9A85FE' : colors.textSub as string;
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
                                            <View style={[styles.iconCircle, { backgroundColor: getIconBg(isSelected) }]}>
                                                {option.value === 0
                                                    ? <MoonIcon color={iconColor} />
                                                    : <ClockIcon color={iconColor} />
                                                }
                                            </View>
                                            <View style={styles.rowText}>
                                                <Text style={[styles.rowLabel, { color: isSelected ? '#9A85FE' : colors.text }]}>
                                                    {option.label}
                                                </Text>
                                                <Text style={[styles.rowDesc, { color: colors.textSub }]}>
                                                    {option.desc}
                                                </Text>
                                            </View>
                                            {isSelected && <CheckIcon />}
                                        </TouchableOpacity>
                                        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
                                    </React.Fragment>
                                );
                            })}

                            {/* Custom row */}
                            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
                                <View style={[styles.iconCircle, { backgroundColor: getIconBg(isCustomSelected) }]}>
                                    <EditIcon color={isCustomSelected ? '#9A85FE' : colors.textSub as string} />
                                </View>
                                <View style={styles.rowText}>
                                    <Text style={[styles.rowLabel, { color: isCustomSelected ? '#9A85FE' : colors.text }]}>
                                        {isCustomSelected ? `Custom · ${currentTimer} min` : 'Custom'}
                                    </Text>
                                    <Text style={[styles.rowDesc, { color: colors.textSub }]}>
                                        Enter your own duration
                                    </Text>
                                </View>
                                {isCustomSelected && <CheckIcon />}
                            </TouchableOpacity>

                            {/* Custom input */}
                            <View style={[styles.inputRow, { borderTopColor: dividerColor }]}>
                                <TextInput
                                    style={[styles.input, {
                                        color: colors.text,
                                        backgroundColor: inputBg,
                                        borderColor: inputBorder,
                                    }]}
                                    placeholder="Enter minutes"
                                    placeholderTextColor={colors.textSub as string}
                                    keyboardType="number-pad"
                                    value={customValue}
                                    onChangeText={setCustomValue}
                                    onFocus={() => setCustomFocused(true)}
                                    onBlur={() => setCustomFocused(false)}
                                    returnKeyType="done"
                                    onSubmitEditing={handleCustomSubmit}
                                />
                                <TouchableOpacity
                                    style={[styles.setBtn, !customValue && styles.setBtnDisabled]}
                                    onPress={handleCustomSubmit}
                                    disabled={!customValue}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.setBtnText}>Set</Text>
                                </TouchableOpacity>
                            </View>

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
            </KeyboardAvoidingView>
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(10),
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        borderWidth: 1,
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(10),
    },
    setBtn: {
        backgroundColor: '#9A85FE',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    setBtnDisabled: {
        opacity: 0.4,
    },
    setBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#FFFFFF',
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