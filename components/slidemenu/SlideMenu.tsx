import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
// import { slideMenuStyles as styles } from '@/assets/styles/slidemenu/slideMenuStyles';
import { getSlideMenuStyles } from '@/assets/styles/slidemenu/slideMenuStyles'
import { useTheme } from '@/constants/ThemeContext'
import SlideMenuHeader from './SlideMenuHeader';
import SlideMenuItem, { MenuItem } from './SlideMenuItem';
import SlideMenuFooter from './SlideMenuFooter';
import { useAuthStore } from '@/store/authStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.78;

interface SlideMenuProps {
    visible: boolean;
    onClose: () => void;
}

export default function SlideMenu({ visible, onClose }: SlideMenuProps) {
    const { colors } = useTheme()
    const styles = getSlideMenuStyles(colors)
    const insets = useSafeAreaInsets();
    const pathname = usePathname();
    const { isLoggedIn, token, user } =
        useAuthStore();
    const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const overlayAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.96)).current;



    // Staggered item animations
    const itemAnims = useRef(
        Array.from({ length: 15 }, () => new Animated.Value(0))
    ).current;

    const menuSections = {
        main: [
            { id: 'recent', title: 'Recent Activity', icon: 'time-outline', route: '/recentactivity' },
            { id: 'progress', title: 'Progress Insights', icon: 'bar-chart-outline', route: '/progressinsights' },
            { id: 'reminders', title: 'Reminders', icon: 'notifications-outline', route: '/reminders' },
            { id: 'saved', title: 'Saved / Favourites', icon: 'heart-outline', route: '/saved' },
            { id: 'playlists', title: 'My Playlists', icon: 'list-outline', route: '/myplaylists' },
            { id: 'asana', title: 'Asana', icon: 'body-outline', route: '/asana' },
            { id: 'pranayama', title: 'Pranayama', icon: 'pulse-outline', route: '/pranayama' },
            { id: 'meditation', title: 'Meditation', icon: 'leaf-outline', route: '/meditation' },

            //{ id: 'savedempty', title: 'Saved Empty', icon: 'heart-outline', route: '/savedempty' },

            { id: 'subscription', title: 'Subscription / Premium', icon: 'star-outline', route: '/subscription' },
        ] as MenuItem[],
        discover: [
            { id: 'mudraday', title: 'Mudra of the Day', icon: 'flower-outline', route: '/mudraoftheday' },
            //{ id: 'element', title: 'Element Tracker', icon: 'water-outline', route: '/elementtracker' },
            { id: 'daystreak', title: 'Day Streak Celebration', icon: 'flame-outline', route: '/dailystreak' },
            { id: 'browse', title: 'Browse All', icon: 'search-outline', route: '/search' },
            { id: 'sleep', title: 'Sleep Mode', icon: 'bed-outline', route: '/sleepmode' },
            { id: 'sessioncomplete', title: 'Session Complete', icon: 'checkmark-circle-outline', route: '/sessioncomplete' },
            { id: 'personalisation', title: 'Personalisation', icon: 'person-outline', route: '/auth/personalise' },
        ] as MenuItem[],
    };

    useEffect(() => {
        if (visible) {
            // Slide + fade overlay
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 65,
                    friction: 11,
                }),
                Animated.timing(overlayAnim, {
                    toValue: 1,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 65,
                    friction: 11,
                }),
            ]).start();

            // Stagger menu items fade-in
            Animated.stagger(
                40,
                itemAnims.map((anim) =>
                    Animated.spring(anim, {
                        toValue: 1,
                        useNativeDriver: true,
                        tension: 80,
                        friction: 10,
                    })
                )
            ).start();
        } else {
            // Reset item anims
            itemAnims.forEach((anim) => anim.setValue(0));

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -MENU_WIDTH,
                    duration: 240,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayAnim, {
                    toValue: 0,
                    duration: 240,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.96,
                    duration: 240,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleNavigation = (
        route: string
    ) => {

        const loggedIn =
            isLoggedIn &&
            !!token &&
            !!user;

        onClose();

        setTimeout(() => {

            if (loggedIn) {

                router.push(route as any);

            } else {

                router.push({
                    pathname: '/auth/login',
                    params: {
                        redirect: route,
                    },
                });

            }

        }, 280);
    };

    const isRouteActive = (route: string) => {
        if (route === '/') return pathname === '/' || pathname === '/(tabs)';
        return pathname === route;
    };

    const allItems = [...menuSections.main, ...menuSections.discover];

    return (
        <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.overlay, { opacity: overlayAnim }]}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.menuContainer,
                                {
                                    transform: [
                                        { translateX: slideAnim },
                                        { scale: scaleAnim },
                                    ],
                                    //paddingTop: insets.top,
                                },
                            ]}
                        >
                            <SlideMenuHeader onClose={onClose} />

                            <ScrollView
                                style={[styles.scrollView, { backgroundColor: colors.background }]}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                                bounces={false}
                            >
                                {/* MAIN */}
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>Main</Text>
                                </View>

                                {menuSections.main.map((item, i) => (
                                    <Animated.View
                                        key={item.id}
                                        style={{
                                            opacity: itemAnims[i],
                                            transform: [{
                                                translateX: itemAnims[i].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-20, 0],
                                                }),
                                            }],
                                        }}
                                    >
                                        <SlideMenuItem
                                            item={item}
                                            isActive={isRouteActive(item.route)}
                                            onPress={handleNavigation}
                                        />
                                    </Animated.View>
                                ))}

                                <View style={styles.divider} />

                                {/* DISCOVER */}
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>Discover</Text>
                                </View>

                                {menuSections.discover.map((item, i) => (
                                    <Animated.View
                                        key={item.id}
                                        style={{
                                            opacity: itemAnims[menuSections.main.length + i],
                                            transform: [{
                                                translateX: itemAnims[menuSections.main.length + i].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-20, 0],
                                                }),
                                            }],
                                        }}
                                    >
                                        <SlideMenuItem
                                            item={item}
                                            isActive={isRouteActive(item.route)}
                                            onPress={handleNavigation}
                                        />
                                    </Animated.View>
                                ))}

                                <SlideMenuFooter onPressItem={handleNavigation} />
                            </ScrollView>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}