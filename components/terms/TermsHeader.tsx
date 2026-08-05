import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import TermsDoc from '@/assets/icons/TermsDoc.svg';

export default function TermsHeader() {
    return (
        <AppHeader
            rightIcon={<TermsDoc width={24} height={24} />}
        />
    );
}