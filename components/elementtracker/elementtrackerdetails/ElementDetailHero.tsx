import React from 'react';
import { View, Text, Image } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import WavesSvg from '@/assets/icons/waves.svg'
import WavesWhite from '@/assets/icons/wavesWhite.svg'
import WaterSvg from '@/assets/icons/water.svg'
import WaterWhite from '@/assets/icons/waterWhite.svg'
import HandbalanceSvg from '@/assets/icons/Handbalance.svg'
import HandbalanceWhite from '@/assets/icons/HandbalanceWhite.svg'
import LotusBlackSvg from '@/assets/icons/LotusBlack.svg'
import LotusWhite from '@/assets/icons/LotusWhite.svg'

type Props = {
    name: string;
    keywords: string[];
    description: string;
    image: any;
};



export default function ElementDetailHero({ name, keywords, description, image }: Props) {
    const { colors, isDark } = useTheme()
    const styles = getElementDetailStyles(colors)

    const Divider = () => <View style={styles.heroAttrDivider} />;
    return (
        <View style={styles.heroContainer}>

            {/* Top Row — Image left, text right */}
            <View style={styles.heroTopRow}>

                <View style={styles.heroImageWrapper}>
                    <Image source={image} style={styles.heroImage} resizeMode="cover" />
                </View>

                <View style={styles.heroTextBlock}>
                    <Text style={styles.heroElementName}>{name}</Text>

                    <View style={styles.heroKeywordsRow}>
                        {keywords.map((kw, i) => (
                            <React.Fragment key={i}>
                                <Text style={styles.heroKeyword}>{kw}</Text>
                                {i < keywords.length - 1 && (
                                    <Text style={styles.heroDot}>•</Text>
                                )}
                            </React.Fragment>
                        ))}
                    </View>

                    <Text style={styles.heroDescription}>{description}</Text>
                </View>

            </View>

            {/* Attrs Row — FULL WIDTH below both columns */}
            <View style={styles.heroAttrsRow}>
                <View style={styles.heroAttrItem}>
                   {isDark ? <WavesWhite width={18} height={18} /> : <WavesSvg width={18} height={18} />}
                    <Text style={styles.heroAttrLabel}>Flow</Text>
                </View>
                <Divider />
                <View style={styles.heroAttrItem}>
                    {isDark ? <WaterWhite width={18} height={18} /> : <WaterSvg width={18} height={18} />}
                    <Text style={styles.heroAttrLabel}>Emotions</Text>
                </View>
                <Divider />
                <View style={styles.heroAttrItem}>
                    {isDark ? <HandbalanceWhite width={18} height={18} /> : <HandbalanceSvg width={18} height={18} />}
                    <Text style={styles.heroAttrLabel}>Balance</Text>
                </View>
                <Divider />
                <View style={styles.heroAttrItem}>
                    {isDark ? <LotusWhite width={18} height={18} /> : <LotusBlackSvg width={18} height={18} />}
                    <Text style={styles.heroAttrLabel}>Intuition</Text>
                </View>
            </View>

        </View>
    );
}