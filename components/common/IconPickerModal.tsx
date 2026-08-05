import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import { REMINDER_ICON_OPTIONS } from '@/constants/reminderIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface IconPickerModalProps {
    visible: boolean;
    selected: string;
    onSelect: (key: string) => void;
    onClose: () => void;
}

export default function IconPickerModal({ visible, selected, onSelect, onClose }: IconPickerModalProps) {
    const { colors } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    style={[styles.sheet, { backgroundColor: colors.card }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={[styles.handle, { backgroundColor: colors.border }]} />

                    <Text style={[styles.title, { color: colors.text }]}>Choose an Icon</Text>

                    <View style={styles.grid}>
                        {REMINDER_ICON_OPTIONS.map((opt) => {
                            const isSelected = selected === opt.key;
                            return (
                                <TouchableOpacity
                                    key={opt.key}
                                    style={[
                                        styles.gridItem,
                                        {
                                            backgroundColor: isSelected ? '#9A85FE20' : colors.surfaceAlt,
                                            borderColor: isSelected ? '#9A85FE' : 'transparent',
                                        },
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        onSelect(opt.key);
                                        onClose();
                                    }}
                                >
                                    <opt.Icon width={26} height={26} />
                                    <Text style={[styles.gridLabel, { color: colors.textSub }]}>{opt.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.cancelBtn, { borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={onClose}
                    >
                        <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: moderateScale(24),
        borderTopRightRadius: moderateScale(24),
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(12),
        paddingBottom: moderateScale(24),
    },
    handle: {
        width: moderateScale(40),
        height: moderateScale(4),
        borderRadius: moderateScale(2),
        alignSelf: 'center',
        marginBottom: moderateScale(20),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(20),
        marginBottom: moderateScale(20),
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(12),
        marginBottom: moderateScale(20),
    },
    gridItem: {
        width: moderateScale(88),
        height: moderateScale(80),
        borderRadius: moderateScale(14),
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(6),
    },
    gridLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '500',
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    cancelText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
    },
});