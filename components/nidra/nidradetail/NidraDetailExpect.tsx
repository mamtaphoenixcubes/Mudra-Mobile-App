import React from 'react';
import { View, Text, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';

interface Props {
    nidra: any;
}

export default function NidraDetailExpect({ nidra }: Props) {
    const { colors } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const expectations = nidra?.DetailsPage?.Expectation || [];

    const formatName = (name: string) => {
        if (!name) return '';

        const words = name.trim().split(/\s+/);

        if (words.length === 1) return words[0];

        return `${words[0]}\n${words.slice(1).join(' ')}`;
    };

    return (
        <View style={styles.expectContainer}>
            <Text style={styles.sectionTitle}>What to Expect</Text>

            <View style={styles.expectRow}>
                {expectations.map((item: any, index: number) => (
                    <React.Fragment key={item.id}>
                        <View style={styles.expectItem}>
                            {item.Icon?.mime === 'image/svg+xml' ? (
                                <SvgUri
                                    width={28}
                                    height={28}
                                    uri={`${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.Icon.url}`}
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.Icon?.url}`,
                                    }}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        marginBottom: 8,
                                    }}
                                    resizeMode="contain"
                                />
                            )}

                            <Text style={styles.expectLabel}>
                                {formatName(item.Name)}
                            </Text>
                        </View>

                        {index < expectations.length - 1 && (
                            <View style={styles.expectDivider} />
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}