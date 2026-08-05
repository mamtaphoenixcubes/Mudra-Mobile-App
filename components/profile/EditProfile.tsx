import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AppHeader from '@/components/common/AppHeader';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/constants/ThemeContext';
import { useAuthStore } from '@/store/authStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export default function EditProfile() {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    const { user, token, updateUser } = useAuthStore();

    // ── Basic fields ──
    const [fullName, setFullName] = useState(user?.fullName ?? '');
    const [username, setUsername] = useState(user?.username ?? '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
    const [email, setEmail] = useState(user?.email ?? '');

    // ── New profile fields (per updated API contract) ──
    const [gender, setGender] = useState(user?.gender ?? '');
    const [dob, setDob] = useState(user?.dob ?? ''); // expects "YYYY-MM-DD"
    const [bio, setBio] = useState(user?.bio ?? '');
    const [country, setCountry] = useState(user?.country ?? '');
    const [language, setLanguage] = useState(user?.language ?? '');

    // ── Data & Privacy toggles ──
    const [sessionHistory, setSessionHistory] = useState(
        user?.dataPrivacy?.SessionHistory ?? false
    );
    const [personalizedRecommendation, setPersonalizedRecommendation] = useState(
        user?.dataPrivacy?.personalizedRecommendation ?? true
    );
    const [marketingEmail, setMarketingEmail] = useState(
        user?.dataPrivacy?.marketingEmail ?? false
    );

    // ── Focus states ──
    const [fullNameFocused, setFullNameFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [bioFocused, setBioFocused] = useState(false);
    const [countryFocused, setCountryFocused] = useState(false);
    const [languageFocused, setLanguageFocused] = useState(false);
    const [dobFocused, setDobFocused] = useState(false);
    const [showDobPicker, setShowDobPicker] = useState(false);

    // ── Photo ──
    const [photoUri, setPhotoUri] = useState<string | null>(
        user?.profileImage?.url ?? user?.avatar?.url ?? null
    );
    const [photoChanged, setPhotoChanged] = useState(false);

    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const handleDobChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDobPicker(false);
        }

        if (event.type === 'dismissed' || !selectedDate) return;

        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        setDob(`${yyyy}-${mm}-${dd}`);
    };

    const handlePickPhoto = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission needed', 'Please allow photo library access to change your profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            console.log('Picked photo URI:', result.assets[0].uri);
            setPhotoUri(result.assets[0].uri);
            setPhotoChanged(true);
        }
    };

    const uploadProfileImage = async (): Promise<number | null> => {
        if (!photoUri) return null;

        const filename = photoUri.split('/').pop() ?? `profile_${Date.now()}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const ext = match ? match[1].toLowerCase() : 'jpg';
        const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

        const formData = new FormData();
        formData.append('profileImage', {
            uri: photoUri,
            name: filename,
            type: mimeType,
        } as any);

        const res = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/users/upload-profile-image`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const uploaded =
            res?.data?.data?.id ??
            res?.data?.id ??
            res?.data?.data?.[0]?.id ??
            null;

        console.log('UPLOAD_IMAGE_EXTRACTED_ID:', uploaded);

        return uploaded;
    };

    const handleSave = async () => {
        if (!fullName.trim() || !username.trim()) {
            Alert.alert('Error', 'Name and username are required');
            return;
        }

        try {
            setSaving(true);

            let profileImageId: number | undefined;

            if (photoChanged) {
                try {
                    setUploadingPhoto(true);
                    const uploadedId = await uploadProfileImage();
                    if (uploadedId) {
                        profileImageId = uploadedId;
                    }
                } catch (uploadErr: any) {
                    console.log(
                        'Profile image upload failed:',
                        uploadErr?.response?.data || uploadErr?.message || uploadErr
                    );
                    Alert.alert(
                        'Photo upload failed',
                        'We could not upload your new photo. Your other changes will still be saved.'
                    );
                } finally {
                    setUploadingPhoto(false);
                }
            }

            const url = `${process.env.EXPO_PUBLIC_API_URL}/users/update/${user?.documentId ?? user?.id}`;

            console.log('UPDATE_URL:', url);
            console.log('UPDATE_USER_OBJECT:', JSON.stringify(user, null, 2));

            const payload: Record<string, any> = {
                username,
                fullName,
                phoneNumber,

                gender,
                dob,

                bio,

                country,
                language,

                dataPrivacy: {
                    SessionHistory: sessionHistory,
                    personalizedRecommendation,
                    marketingEmail,
                },
            };

            if (profileImageId) {
                payload.profileImage = profileImageId;
            }

            const res = await axios.put(url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res?.data?.success !== false) {
                await updateUser({ ...payload, email });
                setPhotoChanged(false);
                Alert.alert('Success', 'Profile updated', [
                    { text: 'OK', onPress: () => router.back() },
                ]);
            } else {
                Alert.alert('Error', res?.data?.message ?? 'Update failed');
            }
        } catch (err: any) {
            console.log('Update profile error:', err?.response?.data || err?.message || err);
            Alert.alert(
                'Error',
                err?.response?.data?.message ?? 'Could not update your profile. Please try again.'
            );
        } finally {
            setSaving(false);
        }
    };

    const styles = getStyles(colors, isDark);

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <AppHeader />

            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerBlock}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <Text style={styles.subtitle}>Update your personal information</Text>
                </View>

                {/* Profile Photo */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity onPress={handlePickPhoto} activeOpacity={0.8} disabled={uploadingPhoto}>
                        <View style={styles.avatarWrapper}>
                            {uploadingPhoto ? (
                                <ActivityIndicator color={colors.primary} />
                            ) : photoUri ? (
                                <Image
                                    key={photoUri}
                                    source={{ uri: photoUri }}
                                    style={styles.avatarImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Ionicons name="person" size={moderateScale(40)} color={colors.primary} />
                            )}
                        </View>

                        <View style={styles.avatarEditBadge}>
                            <Ionicons name="camera" size={moderateScale(14)} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.avatarHint}>Tap to change photo</Text>
                </View>

                {/* ── Basic Information Card ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Basic Information</Text>

                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <View style={[styles.inputRow, fullNameFocused && styles.inputRowFocused]}>
                        <Ionicons name="person-outline" size={moderateScale(18)} color={colors.textSub} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            placeholderTextColor={colors.textSub}
                            value={fullName}
                            onChangeText={setFullName}
                            onFocus={() => setFullNameFocused(true)}
                            onBlur={() => setFullNameFocused(false)}
                            returnKeyType="next"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Username</Text>
                    <View style={[styles.inputRow, usernameFocused && styles.inputRowFocused]}>
                        <Ionicons name="at-outline" size={moderateScale(18)} color={colors.textSub} />
                        <TextInput
                            style={styles.input}
                            placeholder="Choose a username"
                            placeholderTextColor={colors.textSub}
                            value={username}
                            onChangeText={setUsername}
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Phone Number</Text>
                    <View style={[styles.inputRow, phoneNumberFocused && styles.inputRowFocused]}>
                        <Ionicons name="call-outline" size={moderateScale(18)} color={colors.textSub} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            placeholderTextColor={colors.textSub}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            onFocus={() => setPhoneNumberFocused(true)}
                            onBlur={() => setPhoneNumberFocused(false)}
                            keyboardType="phone-pad"
                            returnKeyType="next"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Email Address</Text>
                    <View style={[styles.inputRow, styles.inputRowDisabled]}>
                        <Ionicons name="mail-outline" size={moderateScale(18)} color={colors.textSub} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor={colors.textSub}
                            value={email}
                            editable={false}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                        <Ionicons name="lock-closed-outline" size={moderateScale(14)} color={colors.textSub} />
                    </View>
                </View>

                {/* ── Personal Details Card ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Personal Details</Text>

                    <Text style={styles.fieldLabel}>Gender</Text>
                    <View style={styles.genderRow}>
                        {GENDER_OPTIONS.map((option) => {
                            const selected = gender === option;
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => setGender(option)}
                                    activeOpacity={0.8}
                                    style={styles.radioOption}
                                >
                                    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                                        {selected && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.fieldLabel}>Date of Birth</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setShowDobPicker(true)}
                        style={[styles.inputRow, dobFocused && styles.inputRowFocused]}
                    >
                        <Ionicons name="calendar-outline" size={moderateScale(18)} color={colors.textSub} />
                        <Text style={[styles.input, { paddingVertical: moderateScale(13), color: dob ? colors.text : colors.textSub }]}>
                            {dob || 'Select your date of birth'}
                        </Text>
                    </TouchableOpacity>

                    {showDobPicker && (
                        <DateTimePicker
                            value={dob ? new Date(dob) : new Date(2000, 0, 1)}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            maximumDate={new Date()}
                            onChange={handleDobChange}
                        />
                    )}

                    {Platform.OS === 'ios' && showDobPicker && (
                        <TouchableOpacity
                            onPress={() => setShowDobPicker(false)}
                            style={styles.dobDoneBtn}
                        >
                            <Text style={styles.dobDoneText}>Done</Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.fieldLabel}>About You</Text>
                    <View style={[styles.inputRow, styles.bioRow, bioFocused && styles.inputRowFocused]}>
                        <Ionicons
                            name="document-text-outline"
                            size={moderateScale(18)}
                            color={colors.textSub}
                            style={{ marginTop: moderateScale(2) }}
                        />
                        <TextInput
                            style={[styles.input, styles.bioInput]}
                            placeholder="Tell us a little about yourself"
                            placeholderTextColor={colors.textSub}
                            value={bio}
                            onChangeText={setBio}
                            onFocus={() => setBioFocused(true)}
                            onBlur={() => setBioFocused(false)}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>

                {/* ── Save Button ── */}
                <TouchableOpacity
                    style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
                    onPress={handleSave}
                    activeOpacity={0.85}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveBtnText}>Save Changes</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    disabled={saving}
                >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function getStyles(colors: any, isDark: boolean) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        headerBlock: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(12),
            paddingBottom: moderateScale(4),
        },
        title: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(20),
            fontWeight: '500',
            color: colors.text,
            marginBottom: moderateScale(4),
            textAlign: 'center',
        },
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13),
            fontWeight: '400',
            color: colors.textSub,
            textAlign: 'center',
        },
        avatarSection: {
            alignItems: 'center',
            paddingVertical: moderateScale(20),
        },
        avatarWrapper: {
            width: moderateScale(96),
            height: moderateScale(96),
            borderRadius: moderateScale(48),
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0EEFC',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E6E1FB',
        },
        avatarImage: {
            width: moderateScale(96),
            height: moderateScale(96),
        },
        avatarEditBadge: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: moderateScale(28),
            height: moderateScale(28),
            borderRadius: moderateScale(14),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.background,
        },
        avatarHint: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginTop: moderateScale(10),
        },
        card: {
            backgroundColor: colors.card,
            borderRadius: moderateScale(16),
            marginHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
            padding: moderateScale(18),
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0',
        },
        cardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(15),
            fontWeight: '600',
            color: colors.text,
            marginBottom: moderateScale(14),
        },
        fieldLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            fontWeight: '600',
            color: colors.textSub,
            marginBottom: moderateScale(6),
            marginTop: moderateScale(12),
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#E6E6E6',
            borderRadius: moderateScale(12),
            paddingHorizontal: moderateScale(14),
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFAFA',
        },
        inputRowFocused: {
            borderColor: colors.primary,
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
        },
        inputRowDisabled: {
            opacity: 0.55,
        },
        input: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14),
            color: colors.text,
            paddingVertical: moderateScale(13),
        },
        bioRow: {
            alignItems: 'flex-start',
            minHeight: moderateScale(90),
        },
        bioInput: {
            minHeight: moderateScale(70),
            textAlignVertical: 'top',
            paddingTop: moderateScale(13),
        },
        genderRow: {
            flexDirection: 'row',
            gap: moderateScale(24),
        },
        radioOption: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
        },
        radioOuter: {
            width: moderateScale(20),
            height: moderateScale(20),
            borderRadius: moderateScale(10),
            borderWidth: 1.5,
            borderColor: isDark ? 'rgba(255,255,255,0.28)' : '#C9C9C9',
            alignItems: 'center',
            justifyContent: 'center',
        },
        radioOuterSelected: {
            borderColor: colors.primary,
        },
        radioInner: {
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
            backgroundColor: colors.primary,
        },
        radioLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            fontWeight: '500',
            color: colors.text,
        },
        radioLabelSelected: {
            fontWeight: '600',
        },
        dobDoneBtn: {
            alignSelf: 'flex-end',
            marginTop: moderateScale(10),
        },
        dobDoneText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14),
            fontWeight: '600',
            color: colors.primary,
        },
        saveBtn: {
            marginHorizontal: moderateScale(16),
            marginTop: moderateScale(4),
            backgroundColor: colors.primary,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(15),
            alignItems: 'center',
            justifyContent: 'center',
        },
        saveBtnDisabled: {
            opacity: 0.7,
        },
        saveBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(15),
            fontWeight: '700',
            color: '#FFFFFF',
        },
        cancelBtn: {
            marginHorizontal: moderateScale(16),
            marginTop: moderateScale(10),
            paddingVertical: moderateScale(13),
            alignItems: 'center',
            justifyContent: 'center',
        },
        cancelBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14),
            fontWeight: '600',
            color: colors.textSub,
        },
    });
}