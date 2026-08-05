import React, { useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
    // TODO: wire to a real endpoint once one exists, e.g.
    // axios.post(`${EXPO_PUBLIC_API_URL}/feedback`, { rating, comment })
    onSubmit?: (rating: number, comment: string) => void;
}

const RATING_LABELS: Record<number, string> = {
    1: 'Not great',
    2: 'Could be better',
    3: 'It\'s okay',
    4: 'Good',
    5: 'Love it!',
};

export default function FeedbackModal({ visible, onClose, onSubmit }: FeedbackModalProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleClose = () => {
        onClose();
        // Reset after the close animation would have time to finish
        setTimeout(() => {
            setRating(0);
            setComment('');
            setSubmitted(false);
        }, 250);
    };

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit?.(rating, comment.trim());
        setSubmitted(true);
    };

    const sheetBg = isDark ? '#1C1B3A' : '#FFFFFF';
    const handleBg = isDark ? 'rgba(255,255,255,0.2)' : '#E0E0E0';

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />

                <View style={[styles.sheet, { backgroundColor: sheetBg, paddingBottom: insets.bottom + moderateScale(20) }]}>
                    <View style={[styles.handle, { backgroundColor: handleBg }]} />

                    {submitted ? (
                        <View style={styles.successWrap}>
                            <View style={[styles.successIconCircle, { backgroundColor: colors.primaryLight }]}>
                                <Ionicons name="checkmark" size={32} color={colors.primary} />
                            </View>
                            <Text style={[styles.successTitle, { color: colors.text }]}>Thank you!</Text>
                            <Text style={[styles.successSubtitle, { color: colors.textSub }]}>
                                Your feedback helps us make Mudras better.
                            </Text>
                            <TouchableOpacity
                                style={[styles.submitBtn, { backgroundColor: colors.primary }]}
                                activeOpacity={0.85}
                                onPress={handleClose}
                            >
                                <Text style={styles.submitBtnText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={[styles.title, { color: colors.text }]}>Give Feedback</Text>
                            <Text style={[styles.subtitle, { color: colors.textSub }]}>
                                How's your experience with Mudras so far?
                            </Text>

                            {/* Star rating */}
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => setRating(star)}
                                        activeOpacity={0.7}
                                        hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                                    >
                                        <Ionicons
                                            name={star <= rating ? 'star' : 'star-outline'}
                                            size={moderateScale(34)}
                                            color={star <= rating ? '#F5B301' : colors.dividerDark as string}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {rating > 0 && (
                                <Text style={[styles.ratingLabel, { color: colors.primary }]}>
                                    {RATING_LABELS[rating]}
                                </Text>
                            )}

                            {/* Comment field */}
                            <View style={[styles.commentCard, { backgroundColor: colors.inputBg }]}>
                                <TextInput
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholder="Tell us more (optional)"
                                    placeholderTextColor={colors.textMuted}
                                    style={[styles.commentInput, { color: colors.text }]}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.submitBtn,
                                    { backgroundColor: rating > 0 ? colors.primary : colors.dividerDark },
                                ]}
                                activeOpacity={0.85}
                                disabled={rating === 0}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.submitBtnText}>Submit Feedback</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.cancelBtn, { backgroundColor: colors.surfaceAlt }]}
                                activeOpacity={0.7}
                                onPress={handleClose}
                            >
                                <Text style={[styles.cancelBtnText, { color: colors.text }]}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
        borderTopLeftRadius: moderateScale(24),
        borderTopRightRadius: moderateScale(24),
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(12),
    },
    handle: {
        width: moderateScale(36),
        height: moderateScale(4),
        borderRadius: moderateScale(2),
        alignSelf: 'center',
        marginBottom: moderateScale(18),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(20),
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(4),
        marginBottom: moderateScale(20),
    },
    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(8),
        marginBottom: moderateScale(8),
    },
    ratingLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginBottom: moderateScale(16),
    },
    commentCard: {
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
        marginBottom: moderateScale(18),
        minHeight: moderateScale(96),
    },
    commentInput: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        flex: 1,
    },
    submitBtn: {
        width: '100%',
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    submitBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
    cancelBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    cancelBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
    },

    // Success state
    successWrap: {
        alignItems: 'center',
        paddingVertical: moderateScale(12),
    },
    successIconCircle: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(32),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(16),
    },
    successTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(19),
        marginBottom: moderateScale(6),
    },
    successSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginBottom: moderateScale(22),
        paddingHorizontal: moderateScale(20),
    },
});