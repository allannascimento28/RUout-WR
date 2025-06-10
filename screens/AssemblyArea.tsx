import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
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