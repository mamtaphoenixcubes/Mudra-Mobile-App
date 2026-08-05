import React from 'react';
import { View, TouchableOpacity, Share } from 'react-native';
import * as Linking from 'expo-linking';
import { router, usePathname, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import FavouriteIcon from '@/assets/icons/Favourite.svg';
import ShareIcon from '@/assets/icons/share.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg'
import ShareWhite from '@/assets/icons/shareWhite.svg'
import AppHeader from '@/components/common/AppHeader'
import { Text, StyleSheet } from 'react-native'

export default function NeedDetailHeader() {
    const pathname = usePathname();
    const { id } = useLocalSearchParams();
    const { colors, isDark } = useTheme()
    const styles = getNeedDetailStyles(colors)

    console.log(pathname, 'pathname');

    const handleShare = async () => {
        try {
            const currentUrl = `${Linking.createURL(pathname)}?id=${id}`;

            console.log(currentUrl);

            await Share.share({
                title: 'Check this out',
                message: currentUrl, // Android
                url: currentUrl, // iOS
            });
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    return (
        // <View style={styles.header}>
        //     <TouchableOpacity
        //         style={styles.headerIconBtn}
        //         onPress={() => router.back()}
        //         activeOpacity={0.7}
        //     >
        //         <Ionicons
        //             name="arrow-back"
        //             size={22}
        //             color="#0F0F0F"
        //         />
        //     </TouchableOpacity>

        //     <View style={styles.headerRightIcons}>
        //         <TouchableOpacity
        //             style={styles.headerIconBtn}
        //             activeOpacity={0.7}
        //         >
        //             <FavouriteIcon width={22} height={22} />
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             style={styles.headerIconBtn}
        //             activeOpacity={0.7}
        //             onPress={handleShare}
        //         >
        //             <ShareIcon width={22} height={22} />
        //         </TouchableOpacity>
        //     </View>
        // </View>
        <>
            <AppHeader
                rightIcon={
                    <View style={styles.headerRightIcons}>
                        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
                            {isDark ? <FavouriteWhite width={22} height={22} /> : <FavouriteIcon width={22} height={22} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7} onPress={handleShare}>
                            {isDark ? <ShareWhite width={22} height={22} /> : <ShareIcon width={22} height={22} />}
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
}

