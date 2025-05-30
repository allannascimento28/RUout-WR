import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';


const CustomHeader = ({ title }: { title: string }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
        paddingHorizontal: moderateScale(10),
        paddingBottom: verticalScale(10),
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA',
        marginRight: moderateScale(10),
    },
    headerText: {
        fontSize: scale(16),
        marginLeft: moderateScale(10),
        color: "#3392CC",
        fontFamily: "Manrope-Bold"
    },
})

export default CustomHeader;