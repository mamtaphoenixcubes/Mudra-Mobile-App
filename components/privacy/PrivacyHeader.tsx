import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import ShieldCheck from '@/assets/icons/TermsDoc.svg';

export default function PrivacyHeader() {
    return (
        <AppHeader
            rightIcon={<ShieldCheck width={24} height={24} />}
        />
    );
}