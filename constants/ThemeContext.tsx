import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ── Theme Mode ───────────────────────────────────────────
export type ThemeMode = 'light' | 'dark' | 'system'

// ── Light Colors ─────────────────────────────────────────
export const lightColors = {
    background: '#FFFFFF',
    surface: '#F5F4FF',
    surfaceAlt: '#F4F4F8',
    card: '#FFFFFF',
    cardAlt: '#F8F7FF',
    text: '#0F0F0F',
    textSub: '#0F0F0F80',
    textMuted: '#0F0F0F40',
    textInverse: '#FFFFFF',
    border: '#E8E7F5',
    borderAlt: '#E4E4E4',
    divider: '#F0F0F0',
    primary: '#9A85FE',
    primaryLight: '#EDE9F6',
    primaryMuted: '#9A85FE33',
    inputBg: '#F3F3F3',
    white: '#FFFFFF',
    black: '#0F0F0F',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.5)',
    dividerDark: 'rgba(0,0,0,0.09)',
    privacyDivider: '#0F0F0F66',
    reminderDivider: 'rgba(0,0,0,0.12)',
    trustDivider: '#00000020',
    cardPurple: '#F0EFF8',
    cardPurpleAlt: '#E8E6F8',
    authDivider: 'rgba(0,0,0,0.1)',
    authBorder: 'rgba(0,0,0,0.1)',
    attrBorderTop: 'rgba(0,0,0,0.08)',
    attrDivider: 'rgba(0,0,0,0.125)',
    hairlineDivider: 'rgba(0,0,0,0.25)',
    dashedLine: 'rgba(0,0,0,0.38)',
    weekDayCircleBorder: '#00000033',
    

}

// ── Dark Colors ──────────────────────────────────────────
export const darkColors: typeof lightColors = {
    background: '#0F0F0F',
    surface: '#1A1A2E',
    surfaceAlt: '#1C1B3A',
    card: '#1A1A2E',
    cardAlt: '#232140',
    text: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.6)',
    textMuted: 'rgba(255,255,255,0.3)',
    textInverse: '#0F0F0F',
    border: '#2A2A3A',
    borderAlt: '#2A2A3A',
    divider: '#2A2A3A',
    primary: '#9A85FE',
    primaryLight: '#2A2547',
    primaryMuted: '#9A85FE33',
    inputBg: '#1C1B3A',
    white: '#FFFFFF',
    black: '#0F0F0F',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.7)',
    dividerDark: 'rgba(255,255,255,0.25)',
    privacyDivider: 'rgba(255,255,255,0.25)',
    reminderDivider: 'rgba(255,255,255,0.2)',
    trustDivider: 'rgba(255,255,255,0.35)',
    cardPurple: '#1A1A2E',
    cardPurpleAlt: '#232140',
    authDivider: 'rgba(255,255,255,0.2)',
    authBorder: 'rgba(255,255,255,0.3)',
    attrBorderTop: 'rgba(255,255,255,0.15)',
    attrDivider: 'rgba(255,255,255,0.2)',
    hairlineDivider: 'rgba(255,255,255,0.2)',
    dashedLine: 'rgba(255,255,255,0.4)',
    weekDayCircleBorder: 'rgba(255,255,255,0.3)',

}

// ── Context Type ─────────────────────────────────────────
interface ThemeContextType {
    mode: ThemeMode
    colors: typeof lightColors
    isDark: boolean
    setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'system',
    colors: lightColors,
    isDark: false,
    setMode: () => { },
})

// ── Storage Key ──────────────────────────────────────────
const STORAGE_KEY = '@mudras_theme_mode'

// ── Provider ─────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme()
    const [mode, setModeState] = useState<ThemeMode>('system')

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
            if (saved === 'light' || saved === 'dark' || saved === 'system') {
                setModeState(saved)
            }
        })
    }, [])

    const setMode = async (newMode: ThemeMode) => {
        setModeState(newMode)
        await AsyncStorage.setItem(STORAGE_KEY, newMode)
    }

    const isDark =
        mode === 'dark' || (mode === 'system' && systemScheme === 'dark')

    const colors = isDark ? darkColors : lightColors

    return (
        <ThemeContext.Provider value={{ mode, colors, isDark, setMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

// ── Hook ─────────────────────────────────────────────────
export const useTheme = () => useContext(ThemeContext)