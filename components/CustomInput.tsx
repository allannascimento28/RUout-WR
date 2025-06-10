import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface CustomInputProps {
    label: string;
    numberOfLines?: number;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    style?: any;
    errorMessage?: string;
    keyboardType?: KeyboardTypeOptions | undefined;
    multiline?: boolean;
}

const CustomInput = ({
    label,
    numberOfLines = 1,
    value,
    onChangeText,
    placeholder,
    style,
    errorMessage = '',
    keyboardType = 'default'
}: CustomInputProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={ styles.input}
                numberOfLines={numberOfLines}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline
                keyboardType={keyboardType}
            />
            {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#363636',
        marginBottom: 8,
        fontFamily: 'Manrope-Medium',
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#E3E6EB',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: '#363636',
        borderBottomWidth: 2,
        borderBottomColor: '#E3E6EB',
    },
    invalidInput: {
        backgroundColor: '#E3E6EB',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: '#363636',
        borderBottomWidth: 2,
        borderBottomColor: '#FF0000',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 10,
        marginTop: 4,
        marginLeft: 10,
        fontFamily: 'Manrope-Medium',
    },
});

export default CustomInput;