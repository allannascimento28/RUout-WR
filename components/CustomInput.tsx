import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface CustomInputProps {
    label: string;
    numberOfLines?: number;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    style?: any;
}

const CustomInput = ({
    label,
    numberOfLines = 1,
    value,
    onChangeText,
    placeholder,
    style
}: CustomInputProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                numberOfLines={numberOfLines}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    label: {
        fontSize: scale(16),
        color: '#363636',
        marginBottom: verticalScale(8),
        fontFamily: 'Manrope-Medium',
        marginLeft: moderateScale(5),
    },
    input: {
        backgroundColor: '#E3E6EB',
        borderRadius: moderateScale(50),
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(12),
        fontSize: scale(16),
        fontFamily: 'Manrope-Medium',
        color: '#363636',
    },
});

export default CustomInput;