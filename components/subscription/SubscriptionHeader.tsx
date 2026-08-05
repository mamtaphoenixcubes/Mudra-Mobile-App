import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import CalenderIcon from '@/assets/icons/CalenderIcon.svg';
import CalenderIconWhite from '@/assets/icons/CalenderIconWhite.svg'
import { useTheme } from '@/constants/ThemeContext'

export default function SubscriptionHeader() {
    const { isDark } = useTheme()
    return (
        <AppHeader
      rightIcon={isDark
        ? <CalenderIconWhite width={22} height={22} />
        : <CalenderIcon width={22} height={22} />
      }
    />
    );
}