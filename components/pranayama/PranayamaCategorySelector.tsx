import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Image,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getPranayamaStyles } from '@/assets/styles/pranayama/pranayamaStyles';

// ─── Icons ────────────────────────────────────────────────────────────────────
const AllIcon = ({ color }: { color: string }) => (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </Svg>
);
const StressIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke={color} strokeWidth="1.6" />
        <Path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);

const FatigueIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M4 12h16M4 6h16M4 18h10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);

const SleepIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const FocusIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.6" />
        <Path d="M3 12h2M19 12h2M12 3v2M12 19v2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);

const EnergyIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </Svg>
);

const ImmunityIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2l7 4v6c0 4.418-3.134 8.57-7 10C8.134 20.57 5 16.418 5 12V6l7-4z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </Svg>
);
const StrengthIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M6 4v16M18 4v16M6 12h12M2 7h4M18 7h4M2 17h4M18 17h4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);
const FlexibilityIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M12 3c0 0-6 4-6 9s6 9 6 9 6-4 6-9-6-9-6-9z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </Svg>
);
const BalanceIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={38} viewBox="0 0 24 24" fill="none">
        <Path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);

// ─── Sub-option colors ────────────────────────────────────────────────────────
const LEVEL_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7'];
const STYLE_COLORS = ['#CBECFF', '#E9FFDB', '#FFDBE7', '#FFF6BF', '#FFD4C4'];

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];
const STYLE_OPTIONS = ['Hatha', 'Vinyasa', 'Yin', 'Ashtanga', 'Kundalini'];

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = {
    id: string;
    label: string;
    Icon: React.ComponentType<{ color: string }>;
};

const CATEGORIES: Category[] = [
    { id: 'all', label: 'All', Icon: AllIcon },
    { id: 'stress', label: 'Stress', Icon: StressIcon },
    { id: 'fatigue', label: 'Fatigue', Icon: FatigueIcon },
    { id: 'sleep', label: 'Sleep', Icon: SleepIcon },
    { id: 'focus', label: 'Focus', Icon: FocusIcon },
    { id: 'energy', label: 'Energy', Icon: EnergyIcon },
    { id: 'immunity', label: 'Immunity', Icon: ImmunityIcon },
    { id: 'strength', label: 'Strength', Icon: StrengthIcon },
    { id: 'flexibility', label: 'Flexibility', Icon: FlexibilityIcon },
    { id: 'balance', label: 'Balance', Icon: BalanceIcon },
    {
        id: 'level', label: 'Level', Icon: ({ color }) => (
            <Image
                source={require('@/assets/images/CategoryIcon/Chakra.png')}
                style={[
                    { width: 38, height: 38, tintColor: color },
                ]}
                resizeMode="contain"
            />
        )
    },
    {
        id: 'style', label: 'Style', Icon: ({ color }) => (
            <Image
                source={require('@/assets/images/CategoryIcon/Elemental.png')}
                style={[
                    { width: 38, height: 38, tintColor: color },
                ]}
                resizeMode="contain"
            />
        )
    },
];

// ─── Category Button ──────────────────────────────────────────────────────────
const CategoryButton = ({
    item,
    isActive,
    onPress,
    styles,
}: {
    item: Category;
    isActive: boolean;
    onPress: () => void;
    styles: any;
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const iconColor = isActive ? '#FFFFFF' : '#AAAAAA';

    const handlePressIn = () =>
        Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
    const handlePressOut = () =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.categoryBtn, isActive ? styles.categoryBtnActive : styles.categoryBtnInactive]}
            >
                <item.Icon color={iconColor} />
                <Text
                    style={[styles.categoryBtnLabel, isActive ? styles.categoryBtnLabelActive : styles.categoryBtnLabelInactive]}
                    numberOfLines={2}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PranayamaCategorySelector() {
    const { colors } = useTheme();
    const styles = getPranayamaStyles(colors);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState<'level' | 'style' | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const handleCategoryPress = (id: string) => {
        if (id === 'level') {
            setActiveDropdown('level');
        } else if (id === 'style') {
            setActiveDropdown('style');
        } else {
            setActiveCategory(id);
            setActiveDropdown(null);
        }
    };

    const handleSubOptionPress = (option: string) => {
        if (activeDropdown === 'level') {
            setSelectedLevel(prev => prev === option ? null : option);
        }
        if (activeDropdown === 'style') {
            setSelectedStyle(prev => prev === option ? null : option);
        }
    };

    const dropdownOptions = activeDropdown === 'level'
        ? LEVEL_OPTIONS
        : activeDropdown === 'style'
            ? STYLE_OPTIONS
            : null;

    return (
        <View style={styles.categoryContainer}>

            {/* Header */}
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryHeaderTitle}>
                    Move mindfully. Grow daily.
                </Text>
                <Text style={styles.categoryHeaderSubtitle}>
                    Guided Yoga Pranayama practices for every level and moment.
                </Text>
            </View>

            {/* Category Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContent}
            >
                {CATEGORIES.map((item) => (
                    <CategoryButton
                        key={item.id}
                        item={item}
                        isActive={item.id === activeCategory || item.id === activeDropdown}
                        onPress={() => handleCategoryPress(item.id)}
                        styles={styles}
                    />
                ))}
            </ScrollView>

            {/* Sub-option dropdown */}
            {dropdownOptions && (
                <View style={styles.dropdownWrap}>
                    <View style={styles.dropdownHeaderRow}>
                        <TouchableOpacity
                            style={styles.dropdownResetBtn}
                            onPress={() => {
                                if (activeDropdown === 'level') setSelectedLevel(null);
                                if (activeDropdown === 'style') setSelectedStyle(null);
                            }}
                        >
                            <Text style={styles.dropdownResetText}>Reset</Text>
                            <Ionicons name="refresh-outline" size={16} color="#0F0F0F80" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.subScrollContent}
                    >
                        {dropdownOptions.map((option, index) => {
                            const isSelected = activeDropdown === 'level'
                                ? selectedLevel === option
                                : selectedStyle === option;
                            const bgColor = activeDropdown === 'level'
                                ? LEVEL_COLORS[index % LEVEL_COLORS.length]
                                : STYLE_COLORS[index % STYLE_COLORS.length];

                            return (
                                <TouchableOpacity
                                    key={option}
                                    activeOpacity={0.8}
                                    onPress={() => handleSubOptionPress(option)}
                                    style={[
                                        styles.subChip,
                                        { backgroundColor: bgColor },
                                        isSelected && styles.subChipSelected,
                                    ]}
                                >
                                    <Text style={styles.subChipText}>{option}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}