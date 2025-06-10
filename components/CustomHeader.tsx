import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const CustomHeader = ({ title }: { title: string }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity style={{ paddingHorizontal: 5, paddingVertical: 3,borderWidth: 1, borderColor: "#E4E7EC", borderRadius: 3 }} onPress={() => navigation.goBack()}>
                <FontAwesome5 name="chevron-left" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"flex-start" ,
        paddingHorizontal: 10,
        // paddingVertical: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA',
        marginRight: 10,
        marginVertical: 10
    },
    headerText: {
        fontSize: 16,
        marginLeft: 10,
        paddingVertical: 5,
        color: "#3392CC",
        fontFamily: "Manrope-Bold"
    },
})

export default CustomHeader;