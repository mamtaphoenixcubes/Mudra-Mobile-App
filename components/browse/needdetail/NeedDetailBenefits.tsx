import React from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

// import {
//   needDetailStyles as styles,
// } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'

import BrainIcon from '@/assets/icons/brain.svg';
import BreakIcon from '@/assets/icons/stress.svg';
import PranayamaIcon from '@/assets/icons/pranayama.svg';
import SleepIcon from '@/assets/icons/sleep.svg';

interface BenefitProps {
  benefits: any[];
}

const benefitStyles = [
  {
    icon: BrainIcon,
    bg: '#FFF6BF',
  },

  {
    icon: BreakIcon,
    bg: '#FFD4C4',
  },

  {
    icon: PranayamaIcon,
    bg: '#CBECFF',
  },

  {
    icon: SleepIcon,
    bg: '#E9FFDB',
  },
];

export default function NeedDetailBenefits({
  benefits,
}: BenefitProps) {
  if (
    !benefits ||
    benefits.length === 0
  ) {
    return null;
  }
  const { colors } = useTheme()
  const styles = getNeedDetailStyles(colors)

  return (
    <View
      style={
        styles.benefitsContainer
      }
    >
      <Text
        style={
          styles.benefitsTitle
        }
      >
        Benefits
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.benefitsScrollContent
        }
      >
        {benefits.map(
          (
            benefit,
            index
          ) => {
            const styleConfig =
              benefitStyles[
              index %
              benefitStyles.length
              ];

            const IconComponent =
              styleConfig.icon;

            return (
              <View
                key={
                  benefit?.id ||
                  index
                }
                style={[
                  styles.benefitItem,
                  {
                    backgroundColor:
                      styleConfig.bg,
                  },
                ]}
              >
                <IconComponent
                  width={32}
                  height={32}
                />

                <Text
                  style={
                    styles.benefitLabel
                  }
                >
                  {benefit?.title}
                </Text>
              </View>
            );
          }
        )}
      </ScrollView>
    </View>
  );
}