import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import { getMeditationStyles } from '@/assets/styles/meditation/meditationStyles';

type MeditationCategory = {
    id: string;
    title: string;
    description: string;
    practiceCount: number;
    icon: any;
    mime?: string;
};

const ChevronRightIcon = ({ color = 'rgba(0,0,0,0.35)' }: { color?: string }) => (
    <Svg width={16} height={16} viewBox="0 0 24 24">
        <Path
            d="M9 18l6-6-6-6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </Svg>
);

const BROWSE_CATEGORIES: MeditationCategory[] = [
    {
        id: 'standing',
        title: 'Standing Poses',
        description: 'Build strength and stability.',
        practiceCount: 4,
        icon: require('@/assets/images/CategoryIcon/Chakra.png'),
    },
    {
        id: 'seated',
        title: 'Seated Poses',
        description: 'Grounding poses for focus and calm.',
        practiceCount: 3,
        icon: require('@/assets/images/CategoryIcon/Elemental.png'),
    },
    {
        id: 'balance',
        title: 'Balance Poses',
        description: 'Improve coordination and core strength.',
        practiceCount: 2,
        icon: require('@/assets/images/CategoryIcon/Chakra.png'),
    },
];

const CategoryRow = ({
    item,
    isLast,
    styles,
    colors,
}: {
    item: MeditationCategory;
    isLast: boolean;
    styles: any;
    colors: any;
}) => {
    const [imgError, setImgError] = React.useState(false);
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/categorydetail',
            params: {
                id: item.id,
                title: item.title,
                description: item.description,
                categoryType: item.id,
            },
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={handlePress}
            style={[
                styles.categoryRow,
                !isLast && styles.categoryRowBorder,
                !isLast && { borderBottomColor: colors.dividerDark },
            ]}
        >
            <View style={styles.categoryIconWrap}>
                {item.icon && !imgError ? (
                    item.mime?.includes('svg') ? (
                        <SvgUri width={32} height={32} uri={item.icon as string} />
                    ) : (
                        <Image
                            source={typeof item.icon === 'string' ? { uri: item.icon } : item.icon}
                            style={styles.categoryIcon}
                            resizeMode="contain"
                            onError={() => setImgError(true)}
                        />
                    )
                ) : (
                    <View style={styles.categoryIconFallback} />
                )}
            </View>

            <View style={styles.categoryTextBlock}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.categoryDesc, { color: colors.textSub }]} numberOfLines={1}>
                    {item.description}
                </Text>
            </View>

            <View style={styles.categoryRight}>
                <Text style={[styles.practiceCount, { color: colors.textSub }]}>{item.practiceCount} Practices</Text>
                <ChevronRightIcon color={colors.textSub} />
            </View>
        </TouchableOpacity>
    );
};

export default function MeditationBrowseCategory() {
    const { colors } = useTheme();
    const styles = getMeditationStyles(colors);

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Browse by Category</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAll}>View All {'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.categoryCard, { backgroundColor: colors.cardPurple }]}>
                {BROWSE_CATEGORIES.map((item, index) => (
                    <CategoryRow
                        key={item.id}
                        item={item}
                        isLast={index === BROWSE_CATEGORIES.length - 1}
                        styles={styles}
                        colors={colors}
                    />
                ))}
            </View>
        </View>
    );
}