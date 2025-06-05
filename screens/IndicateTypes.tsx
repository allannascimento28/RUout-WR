import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabNavigation } from '../navigation/types';
import { RootStackParamList } from '../navigation/types';
import CustomHeader from '../components/CustomHeader';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

type Props = {
  navigation: TabNavigation;
  route: NativeStackScreenProps<RootStackParamList, 'IndicateTypes'>['route'];
};

type ListItem = {
    id: string;
    title: string;
    image: any;
};

const imageList: any[] = [
    require('../assets/images/fireandsmoke.png'),
    require('../assets/images/bombThreat.png'),
    require('../assets/images/smellOfGas.png'),
    require('../assets/images/structuralDamage.png'),
    require('../assets/images/workplace.png'),
    require('../assets/images/stormDamage.png'),
    require('../assets/images/medical.png'),
    require('../assets/images/chemicalLeak.png'),
    require('../assets/images/externalEmergancy.png'),
    require('../assets/images/utilitiesOutrage.png'),
    require('../assets/images/exercise.png'),
];

const IndicateTypes = ({ navigation }: {navigation : any}) => {
    const { authToken, incidentTypes } = useAuth();
    const [listData, setListData] = useState<ListItem[]>([]);
    console.log("Incident Types in IndicateTypes :: ", incidentTypes);

    useEffect(() => {
        // getTypesDataAPICall();
        getIncidentTypesData();
    }, []);

    // const getTypesDataAPICall = async () => {
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzI1NTk3MjAzYTBmYjIyNzc4ZmFmMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODEzMjU2M30.JhQaUrq8woPnyRXwrw2gV70HtwhP3XcIhsAlzj1i10w"
    //     try {
    //         const response = await axios.get(`${BASE_URL}/admin/all-incident-type`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         const responseData = response.data;
            // const mappedData: ListItem[] = responseData.map((item: any, index: number) => ({
            //     id: item._id,
            //     title: item.name,
            //     image: imageList[index] || require('../assets/images/tick.png'),
            // }));
    //         console.log("mappedData is :: ",mappedData);
    //         setListData(mappedData);
    //     } catch (error) {
    //         console.log("Error fetching incident types:", error);
    //     }
    // };

    const getIncidentTypesData = async() =>{
        console.log("incident Types :: ", incidentTypes)

        const mappedData: ListItem[] = incidentTypes.map((item: any, index: number) => ({
            id: item.id,
            title: item.title,
            image: imageList[index] || require('../assets/images/tick.png'),
        }));
        console.log("mappedData is :: ",mappedData);
        setListData(mappedData);
    }

    const handleListItemPress = (item: ListItem) => {
        console.log("Selected Item :: ", item);
        navigation.navigate('Instructions', { incidentId: item.id });
    };

    const renderItem = ({ item }: { item: ListItem }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => handleListItemPress(item)}>
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
    );
};

export default IndicateTypes;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    listItem: {
        marginBottom: 10,
        elevation: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E3E6EB',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'space-between',
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#363636',
        fontFamily: 'Manrope-Bold',
    },
});
