import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
    const s = (width / 375) * size;
    return size + (s - size) * factor;
};

type ModalType = 'notification' | 'logout' | 'delete' | 'deletePlaylist' | 'deleteSessions';

type Props = {
    visible: boolean;
    type: ModalType;
    onConfirm: () => void;
    onCancel: () => void;
};

const MODAL_CONFIG = {
    notification: {
        image: require('@/assets/images/Pranayama_Images/NotifIcon.png'),
        imageStyle: { width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(10) },
        title: 'Stay Connected with\nMindful Reminders',
        body: 'Allow notifications to receive reminders for your practice, daily inspiration, and important updates.',
        confirmText: 'Allow Notifications',
        cancelText: "Don't Allow",
        confirmColor: '#9A85FE',
        confirmTextColor: '#FFFFFF',
        cancelBg: 'transparent',
    },
    logout: {
        image: require('@/assets/images/Pranayama_Images/LogoutIcon.png'),
        imageStyle: { width: moderateScale(64), height: moderateScale(64) },
        title: 'Logout',
        body: 'Are you sure you want to logout? You will need to login again to access your account.',
        confirmText: 'Yes, Logout',
        cancelText: 'Cancel',
        confirmColor: '#9A85FE',
        confirmTextColor: '#FFFFFF',
        cancelBg: '#F3F3F3',
    },
    delete: {
        image: require('@/assets/images/Pranayama_Images/DeleteIcon.png'),
        imageStyle: { width: moderateScale(64), height: moderateScale(64) },
        title: 'Delete Account',
        body: "Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, progress, and history will be lost.",
        confirmText: 'Yes, Delete My Account',
        cancelText: 'Cancel',
        confirmColor: '#9A85FE',
        confirmTextColor: '#FFFFFF',
        cancelBg: '#F3F3F3',
    },
    deletePlaylist: {
        image: require('@/assets/images/Pranayama_Images/DeleteIcon.png'),
        imageStyle: { width: moderateScale(64), height: moderateScale(64) },
        title: 'Delete Playlist',
        body: "Are you sure you want to delete this playlist? This action is permanent and cannot be undone.",
        confirmText: 'Yes, Delete Playlist',
        cancelText: 'Cancel',
        confirmColor: '#9A85FE',
        confirmTextColor: '#FFFFFF',
        cancelBg: '#F3F3F3',
    },
    deleteSessions: {
        image: require('@/assets/images/Pranayama_Images/DeleteIcon.png'),
        imageStyle: { width: moderateScale(64), height: moderateScale(64) },
        title: 'Delete Selected',
        body: "The selected items will be removed from this playlist. This action can't be undone.",
        confirmText: 'Yes, Delete',
        cancelText: 'Cancel',
        confirmColor: '#9A85FE',
        confirmTextColor: '#FFFFFF',
        cancelBg: '#F3F3F3',
    },
};

export default function ConfirmModal({ visible, type, onConfirm, onCancel }: Props) {
    const config = MODAL_CONFIG[type];

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {/* Icon */}
                    <Image
                        source={config.image}
                        style={config.imageStyle}
                        resizeMode="contain"
                    />

                    {/* Title */}
                    <Text style={styles.title}>{config.title}</Text>

                    {/* Body */}
                    <Text style={styles.body}>{config.body}</Text>

                    {/* Confirm Button */}
                    <TouchableOpacity
                        style={[styles.confirmBtn, { backgroundColor: config.confirmColor }]}
                        onPress={onConfirm}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.confirmBtnText, { color: config.confirmTextColor }]}>
                            {config.confirmText}
                        </Text>
                    </TouchableOpacity>

                    {/* Cancel */}
                    <TouchableOpacity
                        style={[styles.cancelBtn, { backgroundColor: config.cancelBg }]}
                        onPress={onCancel}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.cancelBtnText}>{config.cancelText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(28),
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(28),
        paddingHorizontal: moderateScale(24),
        alignItems: 'center',
        width: '80%',
        gap: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 10,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(18),
        color: '#0F0F0F',
        textAlign: 'center',
        lineHeight: moderateScale(26),
        marginTop: moderateScale(4),
    },
    body: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: '#0F0F0F',
        textAlign: 'center',
        lineHeight: moderateScale(20),
        paddingHorizontal: moderateScale(4),
        marginBottom: moderateScale(4),
    },
    confirmBtn: {
        width: '100%',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
    },
    cancelBtn: {
        width: '100%',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(15),
        color: '#0F0F0F',
        textAlign: 'center',
    },
});