import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';    

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: any;
    disabled?: boolean;
    loading?: boolean;
}
    
const CustomButton = ({ title, onPress, style, disabled = false, loading = false }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button, 
                style,
                disabled && styles.disabledButton
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3392CC', 
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48, 
    },
    buttonText: {
        color: '#F6FDFF',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
    },
    disabledButton: {
        backgroundColor: '#99C5E4',
        opacity: 0.7,
    }
})