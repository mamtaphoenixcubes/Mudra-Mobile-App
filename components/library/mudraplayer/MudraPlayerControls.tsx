import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Svg, {
    Path,
    Polygon,
    Rect,
    Line,
} from 'react-native-svg';

const { width: SCREEN_WIDTH } =
    Dimensions.get('window');

const moderateScale = (
    size: number,
    factor = 0.5
) =>
    size +
    ((SCREEN_WIDTH - 375) / 375) *
        size *
        factor;

const SkipBackIcon = ({
    disabled,
}: {
    disabled?: boolean;
}) => (
    <Svg
        width={moderateScale(24)}
        height={moderateScale(24)}
        viewBox="0 0 24 24"
    >
        <Polygon
            points="19,5 8,12 19,19"
            fill="none"
            stroke={
                disabled ? '#CFCFCF' : '#222'
            }
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <Line
            x1="5"
            y1="5"
            x2="5"
            y2="19"
            stroke={
                disabled ? '#CFCFCF' : '#222'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
        />
    </Svg>
);

const SkipForwardIcon = ({
    disabled,
}: {
    disabled?: boolean;
}) => (
    <Svg
        width={moderateScale(24)}
        height={moderateScale(24)}
        viewBox="0 0 24 24"
    >
        <Polygon
            points="5,5 16,12 5,19"
            fill="none"
            stroke={
                disabled ? '#CFCFCF' : '#222'
            }
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <Line
            x1="19"
            y1="5"
            x2="19"
            y2="19"
            stroke={
                disabled ? '#CFCFCF' : '#222'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
        />
    </Svg>
);

const RepeatIcon = ({
    active,
}: {
    active: boolean;
}) => (
    <Svg
        width={moderateScale(22)}
        height={moderateScale(22)}
        viewBox="0 0 24 24"
    >
        <Path
            d="M17 2l4 4-4 4"
            fill="none"
            stroke={
                active ? '#4A90D9' : '#888'
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"
            fill="none"
            stroke={
                active ? '#4A90D9' : '#888'
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M21 13v2a4 4 0 0 1-4 4H3"
            fill="none"
            stroke={
                active ? '#4A90D9' : '#888'
            }
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const ShuffleIcon = ({
    active,
    disabled,
}: {
    active: boolean;
    disabled?: boolean;
}) => (
    <Svg
        width={moderateScale(22)}
        height={moderateScale(22)}
        viewBox="0 0 24 24"
        fill="none"
    >
        <Path
            d="M3 7H7L17 17H21"
            stroke={
                disabled
                    ? '#CFCFCF'
                    : active
                    ? '#4A90D9'
                    : '#555'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <Path
            d="M3 17H7L10.5 13.5"
            stroke={
                disabled
                    ? '#CFCFCF'
                    : active
                    ? '#4A90D9'
                    : '#555'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <Path
            d="M18 14L21 17L18 20"
            stroke={
                disabled
                    ? '#CFCFCF'
                    : active
                    ? '#4A90D9'
                    : '#555'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <Path
            d="M18 4L21 7L18 10"
            stroke={
                disabled
                    ? '#CFCFCF'
                    : active
                    ? '#4A90D9'
                    : '#555'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <Path
            d="M10.5 10.5L17 4H21"
            stroke={
                disabled
                    ? '#CFCFCF'
                    : active
                    ? '#4A90D9'
                    : '#555'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const PauseIconLg = () => (
    <Svg
        width={moderateScale(26)}
        height={moderateScale(26)}
        viewBox="0 0 24 24"
    >
        <Rect
            x="5"
            y="3"
            width="4"
            height="18"
            rx="1.5"
            fill="#fff"
        />
        <Rect
            x="15"
            y="3"
            width="4"
            height="18"
            rx="1.5"
            fill="#fff"
        />
    </Svg>
);

const PlayIconLg = () => (
    <Svg
        width={moderateScale(26)}
        height={moderateScale(26)}
        viewBox="0 0 24 24"
    >
        <Polygon
            points="7,4 20,12 7,20"
            fill="#fff"
        />
    </Svg>
);

interface MudraPlayerControlsProps {
    isPlaying: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    isPreviousDisabled?: boolean;
    isNextDisabled?: boolean;
    isShuffleDisabled?: boolean;
    onTogglePlay: () => void;
    onToggleShuffle: () => void;
    onToggleRepeat: () => void;
    onSkipBack: () => void;
    onSkipForward: () => void;
}

export default function MudraPlayerControls({
    isPlaying,
    isShuffle,
    isRepeat,
    isPreviousDisabled = false,
    isNextDisabled = false,
    isShuffleDisabled = false,
    onTogglePlay,
    onToggleShuffle,
    onToggleRepeat,
    onSkipBack,
    onSkipForward,
}: MudraPlayerControlsProps) {
    return (
        <View style={styles.controls}>
            <TouchableOpacity
                onPress={onToggleRepeat}
                activeOpacity={0.7}
                style={styles.side}
            >
                <RepeatIcon
                    active={isRepeat}
                />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={isPreviousDisabled}
                onPress={onSkipBack}
                activeOpacity={0.7}
                style={[
                    styles.side,
                    isPreviousDisabled &&
                        styles.disabled,
                ]}
            >
                <SkipBackIcon
                    disabled={isPreviousDisabled}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onTogglePlay}
                activeOpacity={0.85}
                style={
                    styles.playPauseBtn
                }
            >
                {isPlaying ? (
                    <PauseIconLg />
                ) : (
                    <PlayIconLg />
                )}
            </TouchableOpacity>  

            <TouchableOpacity
                disabled={isNextDisabled}
                onPress={onSkipForward}
                activeOpacity={0.7}
                style={[
                    styles.side,
                    isNextDisabled &&
                        styles.disabled,
                ]}
            >
                <SkipForwardIcon
                    disabled={isNextDisabled}
                />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={isShuffleDisabled}
                onPress={onToggleShuffle}
                activeOpacity={0.7}
                style={[
                    styles.side,
                    isShuffleDisabled &&
                        styles.disabled,
                ]}
            >
                <ShuffleIcon
                    active={isShuffle}
                    disabled={
                        isShuffleDisabled
                    }
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        paddingHorizontal:
            moderateScale(28),
        paddingVertical:
            moderateScale(18),
    },
    side: {
        width: moderateScale(42),
        height: moderateScale(42),
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.4,
    },
    playPauseBtn: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius:
            moderateScale(32),
        backgroundColor:
            '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
});