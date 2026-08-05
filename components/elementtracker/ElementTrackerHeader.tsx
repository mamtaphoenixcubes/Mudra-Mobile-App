import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import AlertSvg from '@/assets/icons/alert.svg';
import AlertWhite from '@/assets/icons/alertWhite.svg'
import { useTheme } from '@/constants/ThemeContext'

export default function ElementTrackerHeader() {
    const { isDark } = useTheme()
    return (
        <AppHeader
            rightIcon={isDark ? <AlertWhite width={24} height={24} /> : <AlertSvg width={24} height={24} />}
        />
    );
}