import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomHeader from '../components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';

const AssemblyArea = () => {
    const navigation = useNavigation<RootStackNavigation>();

    return (
        <View style={styles.screen}>
            <CustomHeader title="Assembly Area" />
        </View>
    );
};

export default AssemblyArea;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});