import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
// import { useGoalStore, type GoalType } from '@/store/goalStore';
import { useAuthStore } from '@/store/authStore';
import { useProgressInsightStore } from '@/store/progressInsightStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const MIN_TARGET = 1;
const MAX_TARGET = 999;

type GoalType = 'sessions' | 'minutes';

interface SetGoalModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SetGoalModal({ visible, onClose }: SetGoalModalProps) {
    const { colors } = useTheme();
    // const goalType = useGoalStore((s) => s.goalType);
    const { user } = useAuthStore();
    type GoalPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY';

    const [resetType, setResetType] = useState<GoalPeriod>('WEEKLY');
    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;

    const {
        goal,
        createGoal,
        fetchGoal,
    } = useProgressInsightStore();

    const [selectedType, setSelectedType] = useState<GoalType>('sessions');
    const [inputValue, setInputValue] = useState('5');

    useEffect(() => {
        if (!visible) return;

        if (goal && goal.GoalStatus === 'ACTIVE') {
            // API "SESSION_COUNT" / "DURATION" → local 'sessions' / 'minutes'
            setSelectedType(goal.GoalType === 'SESSION_COUNT' ? 'sessions' : 'minutes');

            // API stores DURATION in seconds → convert to minutes for the input field
            setInputValue(
                String(
                    goal.GoalType === 'DURATION' ? goal.GoalValue / 60 : goal.GoalValue
                )
            );

            // API "DAILY" / "WEEKLY" / "MONTHLY" maps 1:1 to local resetType
            setResetType(goal.ResetType ?? 'WEEKLY');
        } else {
            // no active goal — reset to defaults
            setSelectedType('sessions');
            setInputValue('5');
            setResetType('WEEKLY');
        }
    }, [visible, goal]);


    const parsed = parseInt(inputValue, 10);
    const isValid = !Number.isNaN(parsed) && parsed >= MIN_TARGET && parsed <= MAX_TARGET;

    const handleSave = async () => {
        if (!isValid || !profileDocumentId) return;

        await createGoal({
            profileDocumentId,
            goalType:
                selectedType === 'sessions'
                    ? 'SESSION_COUNT'
                    : 'DURATION',
            goalValue:
                selectedType === 'minutes'
                    ? parsed * 60
                    : parsed,
            resetType,
        });

        await fetchGoal(profileDocumentId);

        onClose();
    };

    const periodLabel =
        resetType === 'DAILY'
            ? 'day'
            : resetType === 'MONTHLY'
                ? 'month'
                : 'week';

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
                    <View
                        style={[styles.sheet, { backgroundColor: colors.card }]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={[styles.handle, { backgroundColor: colors.border }]} />

                        <Text style={[styles.title, { color: colors.text }]}>Set New Goal</Text>
                        <Text style={[styles.subtitle, { color: colors.textSub }]}>
                            Choose what you want to track weekly.
                        </Text>

                        <Text style={[styles.label, { color: colors.textSub }]}>Goal Type</Text>
                        <View style={styles.typeRow}>
                            <TouchableOpacity
                                style={[
                                    styles.typeCard,
                                    { backgroundColor: selectedType === 'sessions' ? '#9A85FE' : colors.surfaceAlt },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedType('sessions')}
                            >
                                <Ionicons
                                    name="flame-outline"
                                    size={20}
                                    color={selectedType === 'sessions' ? '#FFFFFF' : colors.textSub}
                                />
                                <Text
                                    style={[
                                        styles.typeCardText,
                                        { color: selectedType === 'sessions' ? '#FFFFFF' : colors.text },
                                    ]}
                                >
                                    Sessions
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.typeCard,
                                    { backgroundColor: selectedType === 'minutes' ? '#9A85FE' : colors.surfaceAlt },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedType('minutes')}
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color={selectedType === 'minutes' ? '#FFFFFF' : colors.textSub}
                                />
                                <Text
                                    style={[
                                        styles.typeCardText,
                                        { color: selectedType === 'minutes' ? '#FFFFFF' : colors.text },
                                    ]}
                                >
                                    Minutes
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.label, { color: colors.textSub }]}>Weekly Target</Text>
                        <View style={[styles.inputRow, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
                            <Ionicons name="flag-outline" size={18} color={colors.textSub} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                value={inputValue}
                                onChangeText={setInputValue}
                                keyboardType="number-pad"
                                maxLength={3}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputSuffix, { color: colors.textSub }]}>
                                    {selectedType === 'sessions' ? 'sessions / ' : 'minutes / '}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        setResetType((prev) => {
                                            switch (prev) {
                                                case 'WEEKLY':
                                                    return 'MONTHLY';
                                                case 'MONTHLY':
                                                    return 'DAILY';
                                                default:
                                                    return 'WEEKLY';
                                            }
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.inputSuffix,
                                            {
                                                color: '#9A85FE',
                                                fontWeight: '600',
                                            },
                                        ]}
                                    >
                                        {periodLabel}
                                    </Text>

                                    <Ionicons
                                        name="swap-horizontal"
                                        size={14}
                                        color="#9A85FE"
                                        style={{ marginLeft: 4 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {!isValid && (
                            <Text style={styles.errorText}>Enter a value between 1 and 999</Text>
                        )}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { borderColor: colors.border }]}
                                activeOpacity={0.7}
                                onPress={onClose}
                            >
                                <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveBtn, { opacity: isValid ? 1 : 0.5 }]}
                                activeOpacity={0.7}
                                onPress={handleSave}
                                disabled={!isValid}
                            >
                                <Text style={styles.saveText}>Save Goal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        marginBottom: moderateScale(20),
    },
    label: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '600',
        marginBottom: moderateScale(8),
    },
    typeRow: {
        flexDirection: 'row',
        gap: moderateScale(10),
        marginBottom: moderateScale(20),
    },
    typeCard: {
        flex: 1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
        gap: moderateScale(6),
    },
    typeCardText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        borderWidth: 1,
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(4),
        marginBottom: moderateScale(8),
    },
    input: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(22),
        fontWeight: '600',
        paddingVertical: moderateScale(10),
    },
    inputSuffix: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '500',
    },
    errorText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        color: '#E45858',
        marginBottom: moderateScale(12),
    },
    buttonRow: {
        flexDirection: 'row',
        gap: moderateScale(12),
        marginTop: moderateScale(16),
    },
    cancelBtn: {
        flex: 1,
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
    saveBtn: {
        flex: 1,
        backgroundColor: '#9A85FE',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    saveText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
});