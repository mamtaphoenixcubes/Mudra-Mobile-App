import React from 'react';
import { View, Text } from 'react-native';
// import { recentActivityStyles as styles } from '@/assets/styles/recentactivity/recentActivityStyles';
import { getRecentActivityStyles } from '@/assets/styles/recentactivity/recentActivityStyles'
import { useTheme } from '@/constants/ThemeContext'
import ActivityCard, { ActivityItem } from './ActivityCard';
import WaterSvg from '@/assets/icons/water.svg';
import AirSvg from '@/assets/icons/air.svg';
import { useActivityStore } from '@/store/activityStore';

// const TODAY: ActivityItem[] = [
//     {
//         id: '1',
//         title: 'Anjali Mudra Meditation',
//         badge: 'Mudra Meditation',
//         subtitle: 'For gratitude & inner peace',
//         duration: '10 min',
//         time: '7:30 AM',
//         image: require('@/assets/images/Pranayama_Images/AnjaliMudra.png'),
//         bg: '#CBECFF',
//     },
//     {
//         id: '2',
//         title: 'Deep Rest & Relaxation',
//         badge: 'Yoga Nidra',
//         subtitle: 'Evening deep relaxation',
//         duration: '28 min',
//         time: '9:15 PM',
//         image: require('@/assets/images/Pranayama_Images/DeepRest.png'),
//         bg: '#E9FFDB',
//     },
//     {
//         id: '3',
//         title: 'Water Element Balance',
//         badge: 'Element Tracker',
//         subtitle: '',
//         duration: '5 min',
//         time: '7:30 AM',
//         image: require('@/assets/images/Pranayama_Images/WaterElement.png'),
//         bg: '#FFDBE7',
//         isElementTracker: true,
//         elementStatus: 'Balanced',
//         ElementIcon: <WaterSvg width={14} height={14} />,
//     },
// ];

// const YESTERDAY: ActivityItem[] = [
//     {
//         id: '4',
//         title: 'Prana Mudra',
//         badge: 'Mudra Meditation',
//         subtitle: 'Boosts energy & vitality',
//         duration: '8 min',
//         time: '8:20 AM',
//         image: require('@/assets/images/Pranayama_Images/PranaMudra.png'),
//         bg: '#FFF6BF',
//     },
//     {
//         id: '5',
//         title: 'Sleep Deeply',
//         badge: 'Yoga Nidra',
//         subtitle: 'Improve sleep quality',
//         duration: '26 min',
//         time: '10:00 PM',
//         image: require('@/assets/images/Pranayama_Images/Sleep.png'),
//         bg: '#FFD4C4',
//     },
// ];

// const EARLIER: ActivityItem[] = [
//     {
//         id: '6',
//         title: 'Shuni Mudra',
//         badge: 'Mudra Meditation',
//         subtitle: 'For patience & inner calm',
//         duration: '7 min',
//         time: 'Mon, 8:10 AM',
//         image: require('@/assets/images/Pranayama_Images/ShuniMudra.png'),
//         bg: '#E9FFDB',
//     },
//     {
//         id: '7',
//         title: 'Air Element Balance',
//         badge: 'Element Tracker',
//         subtitle: '',
//         duration: '6 min',
//         time: 'Mon, 7:00 AM',
//         image: require('@/assets/images/Pranayama_Images/AirElement.png'),
//         bg: '#CBECFF',
//         isElementTracker: true,
//         elementStatus: 'Slightly Imbalanced',
//         ElementIcon: <AirSvg width={14} height={14} />,
//     },
// ];

const TODAY_COLORS = ['#CBECFF', '#E9FFDB', '#FFDBE7', '#FFF6BF', '#FFD4C4'];
const YESTERDAY_COLORS = ['#FFF6BF', '#FFD4C4', '#CBECFF', '#E9FFDB', '#FFDBE7'];
const EARLIER_COLORS = ['#E9FFDB', '#CBECFF', '#FFF6BF', '#FFDBE7', '#FFD4C4'];

function formatDuration(seconds: number): string {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min`;
}

function formatTime(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
    });
}

function getContentImageUrl(content: any): string | null {
    const imageField = content?.image;
    if (!imageField) return null;

    const imageObj = Array.isArray(imageField) ? imageField[0] : imageField;
    if (!imageObj) return null;

    return imageObj.formats?.thumbnail?.url ?? imageObj.url ?? null;
}

function getDateBucket(dateString: string | null): 'today' | 'yesterday' | 'earlier' {
    if (!dateString) return 'earlier';
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
        a.toDateString() === b.toDateString();

    if (isSameDay(date, today)) return 'today';
    if (isSameDay(date, yesterday)) return 'yesterday';
    return 'earlier';
}

function mapToActivityItem(activity: any, index: number, palette: string[]): ActivityItem {
    const isMudra = activity.activityType === 'MUDRA';

    return {
        id: activity.activityDocumentId,
        title: activity.content?.title ?? 'Untitled',
        badge: isMudra ? 'Mudra Meditation' : 'Yoga Nidra',
        subtitle: activity.content?.description ?? '',
        duration: formatDuration(activity.lastSessionDuration ?? 0),
        time: formatTime(activity.completedAt ?? activity.lastViewedAt),
        image: getContentImageUrl(activity.content)
            ? { uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${getContentImageUrl(activity.content)}` }
            : require('@/assets/images/Pranayama_Images/AnjaliMudra.png'), // fallback if content has no image at all
        bg: palette[index % palette.length],
        contentId: activity.content?.documentId,
        screenType: isMudra ? 'mudra' : 'nidra',
    };
}



type GroupProps = {
    title: string;
    items: ActivityItem[];
};

function ActivityGroup({ title, items }: GroupProps) {
    const { colors } = useTheme()
    const styles = getRecentActivityStyles(colors)

    return (
        <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{title}</Text>
            {items.map((item) => (
                <ActivityCard key={item.id} item={item} />
            ))}
        </View>
    );
}

export default function ActivityGroups() {

    const activities = useActivityStore((s) => s.activities);

    const todayItems = activities
        .filter((a) => getDateBucket(a.completedAt ?? a.lastViewedAt) === 'today')
        .map((a, i) => mapToActivityItem(a, i, TODAY_COLORS));

    const yesterdayItems = activities
        .filter((a) => getDateBucket(a.completedAt ?? a.lastViewedAt) === 'yesterday')
        .map((a, i) => mapToActivityItem(a, i, YESTERDAY_COLORS));

    const earlierItems = activities
        .filter((a) => getDateBucket(a.completedAt ?? a.lastViewedAt) === 'earlier')
        .map((a, i) => mapToActivityItem(a, i, EARLIER_COLORS));

    return (
        <>
            {todayItems.length > 0 && <ActivityGroup title="Today" items={todayItems} />}
            {yesterdayItems.length > 0 && <ActivityGroup title="Yesterday" items={yesterdayItems} />}
            {earlierItems.length > 0 && <ActivityGroup title="Earlier This Week" items={earlierItems} />}
        </>
    );
}