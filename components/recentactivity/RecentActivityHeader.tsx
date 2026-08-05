import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import CalenderRight from '@/assets/icons/CalenderIcon.svg';
import CalenderRightWhite from '@/assets/icons/CalenderIconWhite.svg';
import { useTheme } from '@/constants/ThemeContext';

export default function RecentActivityHeader() {
    const { isDark } = useTheme()
    return (
       <AppHeader
      rightIcon={isDark
        ? <CalenderRightWhite width={24} height={24} />
        : <CalenderRight width={24} height={24} />
      }
    />
    );
}