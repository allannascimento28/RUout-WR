import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomHeader from '../components/CustomHeader';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const ResponseHandout = () => {
    return (
        <View style={styles.screen}>
            <CustomHeader title="Response Handout" />

            <View style={styles.card}>
                <Text style={styles.title}>EVALUATION INSTRUCTIONS</Text>

                <View style={styles.rowIcon}>
                <TouchableOpacity style={styles.icon}>
                    <Feather name="download" size={30} color="#3392CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="play-circle" size={30} color="#3392CC" />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ResponseHandout;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2
    },
    title: {
        color: '#2D2D2D',
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope-SemiBold',
       
    },
    blackText: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Manrope-Regular',
    },
    blueText: {
        fontSize: 14,
        color: '#3392CC',
        fontFamily: 'Manrope-Regular',
    },
    rowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        marginRight: 16,
    },
});
