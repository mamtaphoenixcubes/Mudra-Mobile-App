import React, { useCallback, useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

import StandaloneTabBar from '@/components/home/StandaloneTabBar'
import PracticeMudrasSection from './PracticeMudrasSection'
import PracticeElementSection from './PracticeElementSection'
import PracticeNidraSection from './PracticeNidraSection'

import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'
import { useMudraStore } from '@/store/mudraStore'
import { useNidraStore } from '@/store/nidraStore'
import { useAuthStore } from '@/store/authStore'

export default function PracticeScreen() {
    const insets = useSafeAreaInsets()
    const { colors, isDark } = useTheme()
    const styles = getPracticeStyles(colors)
    const router = useRouter()

    const { isLoggedIn } = useAuthStore()

    const [refreshing, setRefreshing] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | MUDRA STORE
    |--------------------------------------------------------------------------
    */

    const {
        mudras: fetchedMudras,
        loading: mudraLoading,
        fetchMudras,
    } = useMudraStore()


    /*
|--------------------------------------------------------------------------
| NIDRA STORE
|--------------------------------------------------------------------------
*/

    const {
        nidras: fetchedNidras,
        loading: nidraLoading,
        fetchNidras,
        fetchNidraById,
    } = useNidraStore()



    /*
    |--------------------------------------------------------------------------
    | INITIAL FETCH
    |--------------------------------------------------------------------------
    */

    const loadMudras = useCallback(async () => {
        try {
            await fetchMudras()
        } catch (error) {
            console.log(
                'Practice Mudra Fetch Error:',
                error
            )
        }
    }, [fetchMudras])

    useEffect(() => {
        loadMudras()
    }, [loadMudras])


    const loadNidras = useCallback(async () => {
        try {
            await fetchNidras({})
        } catch (error) {
            console.log('Practice Nidra Fetch Error:', error)
        }
    }, [fetchNidras])

    useEffect(() => {
        loadNidras()
    }, [loadNidras])

    /*
    |--------------------------------------------------------------------------
    | PULL TO REFRESH
    |--------------------------------------------------------------------------
    */

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true)

            await Promise.all([fetchMudras(), fetchNidras({})])
        } catch (error) {
            console.log(
                'Practice Mudra Refresh Error:',
                error
            )
        } finally {
            setRefreshing(false)
        }
    }, [fetchMudras, fetchNidras])

    /*
    |--------------------------------------------------------------------------
    | MUDRA DATA
    |--------------------------------------------------------------------------
    */

    const mudrasArray =
        (fetchedMudras as any)?.data || []

    /*
    |--------------------------------------------------------------------------
    | DEBUG
    |--------------------------------------------------------------------------
    */

    // useEffect(() => {
    //     console.log(
    //         'Practice Mudra Loading:',
    //         mudraLoading
    //     )

    //     console.log(
    //         'Practice Mudra Data:',
    //         fetchedMudras
    //     )

    //     console.log(
    //         'Practice Mudras Array:',
    //         mudrasArray
    //     )

    //     console.log(
    //         'Practice Mudras Count:',
    //         mudrasArray.length
    //     )
    // }, [fetchedMudras, mudraLoading])

    // useEffect(() => {
    //     console.log('Practice Nidra Loading:', nidraLoading)
    //     console.log('Practice Nidras Data:', JSON.stringify(fetchedNidras, null, 2))
    //     console.log('Practice Nidras Count:', fetchedNidras?.length ?? 0)
    // }, [fetchedNidras, nidraLoading])

    /*
    |--------------------------------------------------------------------------
    |  CARD PRESS
    |--------------------------------------------------------------------------
    */
    const handleNidraPress = (item: any) => {
        if (!isLoggedIn) {
            router.push({
                pathname: '/auth/login',
                params: {
                    redirect: '/nidradetail',
                    id: item.documentId,
                },
            })
            return
        }
        router.push({
            pathname: '/nidradetail',
            params: { id: item.documentId },
        })
    }

    const handleMudraPress = (item: any) => {
        if (!isLoggedIn) {
            router.push({
                pathname: '/auth/login',
                params: {
                    redirect: '/mudradetail',
                    id: item.documentId,
                },
            })
            return
        }
        router.push({
            pathname: '/mudradetail',
            params: { id: item.documentId },
        })
    }





    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingBottom:
                            insets.bottom + 80,
                    },
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={
                            refreshing || mudraLoading
                        }
                        onRefresh={onRefresh}
                        tintColor={colors.primary}
                        colors={[colors.primary]}
                        progressBackgroundColor={
                            isDark
                                ? '#1A1A2E'
                                : '#FFFFFF'
                        }
                    />
                }
            >
                <Text style={styles.pageTitle}>
                    Practice
                </Text>

                <Text style={styles.subtitle}>
                    Explore mudras, balance your elements{'\n'}
                    and restore with yoga nidra.
                </Text>

                <PracticeMudrasSection mudras={mudrasArray} onMudraPress={handleMudraPress} />

                <View style={styles.divider} />

                <PracticeNidraSection nidras={fetchedNidras} onNidraPress={handleNidraPress} />

                <PracticeElementSection />

                <View style={styles.divider} />
            </ScrollView>

            <StandaloneTabBar />
        </View>
    )
}