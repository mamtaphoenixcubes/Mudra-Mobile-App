import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext'

interface FilterItem {
    key: string;
    title: string;
    values: string[];
}

interface FiltersProps {
    filters: FilterItem[];

    selectedFilters: Record<string, string>;

    onFilterSelect: (
        filters: Record<string, string>
    ) => void;
}

const chipColors: Record<string, string> = {
    element: '#E9FFDB',
    intention: '#FFDBE7',
    chakra: '#FFDBA7',
    level: '#EBCFFF',
    type: '#CBECFF',
};

export default function Filters({
    filters = [],
    selectedFilters,
    onFilterSelect,
}: FiltersProps) {

    const [expandedFilter, setExpandedFilter] =
        useState<string | null>(null);

    const toggleFilter = (key: string) => {

        setExpandedFilter(
            expandedFilter === key
                ? null
                : key
        );

    };
    const { colors } = useTheme()

    const handleReset = () => {

        setExpandedFilter(null);

        onFilterSelect({});

    };

    return (

        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Header */}

            <View style={styles.headerRow}>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Filters
                </Text>

                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                >
                    <Ionicons
                        name="refresh-outline"
                        size={16}
                        color="#666"
                    />

                    <Text style={[styles.resetText, { color: colors.textSub }]}>
                        Reset
                    </Text>

                </TouchableOpacity>

            </View>

            {/* Filter Chips */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.filtersContainer
                }
            >

                {filters.map((filter) => (

                    <TouchableOpacity
                        key={filter.key}
                        onPress={() =>
                            toggleFilter(
                                filter.key
                            )
                        }
                        style={[
                            styles.filterChip,
                            {
                                backgroundColor:
                                    chipColors[
                                        filter.key
                                    ] ||
                                    '#F5F5F5',
                            },
                        ]}
                    >

                        <Text
                            style={
                                styles.filterText
                            }
                        >
                            {selectedFilters[
                                filter.key
                            ]
                                ? `${filter.title}: ${
                                      selectedFilters[
                                          filter.key
                                      ]
                                  }`
                                : filter.title}
                        </Text>

                        <Ionicons
                            name={
                                expandedFilter ===
                                filter.key
                                    ? 'chevron-up'
                                    : 'chevron-down'
                            }
                            size={14}
                            color="#333"
                        />

                    </TouchableOpacity>

                ))}

            </ScrollView>

            {/* Dropdown */}

            {expandedFilter && (

                <View
                    style={
                        styles.dropdownContainer
                    }
                >

                    {filters
                        .find(
                            (item) =>
                                item.key ===
                                expandedFilter
                        )
                        ?.values.map(
                            (
                                value,
                                index
                            ) => (

                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionItem,

                                        selectedFilters[
                                            expandedFilter
                                        ] ===
                                            value &&
                                            styles.selectedOption,
                                    ]}
                                    onPress={() => {

                                        const updatedFilters =
                                            {
                                                ...selectedFilters,

                                                [expandedFilter]:
                                                    value,
                                            };

                                        onFilterSelect(
                                            updatedFilters
                                        );

                                        setExpandedFilter(
                                            null
                                        );

                                    }}
                                >

                                    <Text
                                        style={[
                                            styles.optionText,

                                            selectedFilters[
                                                expandedFilter
                                            ] ===
                                                value &&
                                                styles.selectedOptionText,
                                        ]}
                                    >
                                        {value}
                                    </Text>

                                </TouchableOpacity>

                            )
                        )}

                </View>

            )}

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: '#fff',
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },

    sectionTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#000',
    },

    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    resetText: {
        fontFamily:
            'SF-Pro-Display',
        fontSize: 14,
        color: '#666',
    },

    filtersContainer: {
        paddingHorizontal: 20,
        gap: 10,
    },

    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
    },

    filterText: {
        fontFamily:
            'SF-Pro-Display',
        fontSize: 14,
        color: '#333',
    },

    dropdownContainer: {
        marginTop: 16,
        marginHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEE',
        overflow: 'hidden',
    },

    optionItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },

    selectedOption: {
        backgroundColor: '#F4F0FF',
    },

    optionText: {
        fontFamily:
            'SF-Pro-Display',
        fontSize: 14,
        color: '#333',
    },

    selectedOptionText: {
        color: '#8B7CF6',
        fontWeight: '600',
    },

});