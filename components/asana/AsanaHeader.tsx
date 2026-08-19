import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import SearchIcon from '@/assets/icons/search-md.svg';
import SearchWhite from '@/assets/icons/searchWhite.svg';
import { useTheme } from '@/constants/ThemeContext';
import { TouchableOpacity } from 'react-native';

export default function AsanaHeader() {
    const { isDark } = useTheme();

    return (
        <AppHeader
            rightIcon={
                <TouchableOpacity activeOpacity={0.7}>
                    {isDark
                        ? <SearchWhite width={22} height={22} />
                        : <SearchIcon width={22} height={22} />
                    }
                </TouchableOpacity>
            }
        />
    );
}