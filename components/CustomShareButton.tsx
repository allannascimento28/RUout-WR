import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomShareButtonProps {
    onPress: () => void;
    style?: any;
}

const CustomShareButton = ({onPress }: CustomShareButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >   
            <Ionicons name="share-social-sharp" size={24} color="#fff" />
            <Text style={styles.buttonText}>Share Link</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(12),
        borderRadius: 30,
        gap: scale(10),
        width:'100%'
        
    },
    buttonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontFamily: 'Manrope-Bold',
    },
});

export default CustomShareButton;
