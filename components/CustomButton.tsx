import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';    

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: any;
}
    
const CustomButton = ({ title, onPress, style }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3392CC', 
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(30), 
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#F6FDFF',
        fontSize: moderateScale(16),
        fontFamily: 'Manrope-Bold',
    },
})
