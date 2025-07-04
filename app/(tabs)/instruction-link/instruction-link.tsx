import CustomHeader from '@/components/CustomHeader';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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
        paddingHorizontal: 16,
        paddingTop: 0,
    },
    card: {
        backgroundColor: '#DFF0FF', 
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        marginTop: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    cardText: {
        fontSize: 15,
        color: '#3392CC', 
        fontFamily: 'Manrope-SemiBold',
    },
    arrowContainer: {
        backgroundColor: '#3392CC',
        borderRadius: 40,
        padding: 8,
    },
});
