import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type RootStackParamList = {
    IndicateTypes: undefined;
    Instructions: { incidentType: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'IndicateTypes'>;

type ListItem = {
    id: number;
    title: string;
    image: any;
};

const IndicateTypes: React.FC<Props> = ({ navigation }) => {
    const listData: ListItem[] = [
        {
            id: 1,
            title: "Fire or Smoke",
            image: require('../assets/images/fireandsmoke.png'),
        },
        {
            id: 2,
            title: "Bomb Threat",
            image: require('../assets/images/bombThreat.png'),
        },
        {
            id: 3,
            title: "Smell of Gas",
            image: require('../assets/images/smellOfGas.png'),
        },
        {
            id: 4,
            title: "Structural Damage",
            image: require('../assets/images/structuralDamage.png'),
        },
        {
            id: 5,
            title: "Workplace Instruction",
            image: require('../assets/images/workplace.png'),
        },
        {
            id: 6,
            title: "Storm Damage",
            image: require('../assets/images/stormDamage.png'),
        },
        {
            id: 7,
            title: "Medical",
            image: require('../assets/images/medical.png'),
        },
        {
            id: 8,
            title: "Chemical Leak",
            image: require('../assets/images/chemicalLeak.png'),
        },
        {
            id: 9,
            title: "External Emergency",
            image: require('../assets/images/externalEmergancy.png'),
        },
        {
            id: 10,
            title: "Utilities Outrage",
            image: require('../assets/images/utilitiesOutrage.png'),
        },
        {
            id: 11,
            title: "Exercise Only",
            image: require('../assets/images/exercise.png'),
        },
        {
            id: 12,
            title: "Test",
            image: require('../assets/images/test.png'),
        },
    ];

    const renderItem = ({ item }: { item: ListItem }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Instructions', { incidentType: item.title })}>
            <View style={styles.itemContent}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.title}</Text>
                <FontAwesome5 name="chevron-right" size={18} color="#363636" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screen}>
            <CustomHeader title="Select Incident Type" />
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

export default IndicateTypes;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(16),
    },
    listItem: {
        marginBottom: verticalScale(10),
        elevation: 10,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E3E6EB',
        borderRadius: scale(20),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        justifyContent: 'space-between',
    },
    itemImage: {
        width: scale(50),
        height: scale(50),
        marginRight: scale(8),
    },
    itemText: {
        flex: 1,
        fontSize: scale(16),
        color: '#363636',
        fontFamily: 'Manrope-Bold',
    },
    rightIndicator: {
        width: scale(24),
        height: scale(24),
        backgroundColor: '#000',
        borderRadius: scale(12),
    },
});