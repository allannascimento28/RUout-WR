import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomHeader from '../components/CustomHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';


const InstructionLink = () => {
    return (
        <View style={styles.screen}>
            <CustomHeader title="Select an Option" />

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#3392CC" style={styles.icon} />
                    <Text style={styles.cardText}>Email this Link</Text>
                </View>

                <TouchableOpacity style={styles.arrowContainer}>
                    <FontAwesome6 name="arrow-right" size={14} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                <SimpleLineIcons name="share" size={20} color="#3392CC" style={styles.icon} />
                    <Text style={styles.cardText}>Share this Link</Text>
                </View>

                <TouchableOpacity style={styles.arrowContainer}>
                    <FontAwesome6 name="arrow-right" size={16} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InstructionLink;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(16),
    },
    card: {
        backgroundColor: '#DFF0FF', 
        borderRadius: scale(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(12),
        marginTop: verticalScale(12),
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: scale(10),
    },
    cardText: {
        fontSize: moderateScale(15),
        color: '#3392CC', 
        fontFamily: 'Manrope-SemiBold',
    },
    arrowContainer: {
        backgroundColor: '#3392CC',
        borderRadius: scale(40),
        padding: scale(8),
    },
});
