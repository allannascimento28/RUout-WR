import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { IncidentTypeSource } from '@/constants/IncidentTypeSource';

type Props = {
//   navigation: TabNavigation;
//   route: NativeStackScreenProps<RootStackParamList, 'IndicateTypes'>['route'];
};

type ListItem = {
    id: string;
    title: string;
    image: any;
};

const incidentTypeSourceIds = [
    'fire', 
    'bomb', 
    'smell', 
    'structural', 
    'workplace', 
    'storm', 
    'medical', 
    'chemical', 
    'external', 
    'utilities', 
    'exercise', 
    'test'
];

const imageList: any[] = [
    require('../../../assets/images/fireandsmoke.png'),
    require('../../../assets/images/bombThreat.png'),
    require('../../../assets/images/smellOfGas.png'),
    require('../../../assets/images/structuralDamage.png'),
    require('../../../assets/images/workplace.png'),
    require('../../../assets/images/stormDamage.png'),
    require('../../../assets/images/medical.png'),
    require('../../../assets/images/chemicalLeak.png'),
    require('../../../assets/images/externalEmergancy.png'),
    require('../../../assets/images/utilitiesOutrage.png'),
    require('../../../assets/images/exercise.png'),
    require('../../../assets/images/testIncidentSource.png'),
];

const AssemblyArea = () => {
    const [listData, setListData] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        getIncidentTypesData();
    }, []);

    const getIncidentTypesData = async() => {
        setLoading(true);

        try {

            const mappedData: ListItem[] = IncidentTypeSource.map((item: any, index: number) => ({
                id: item.id,
                title: item.title || "No Title", // fallback title
                image: imageList[index] || require('../../../assets/images/tick.png'), // Fixed the path
            }));
            console.log("mappedData is :: ", mappedData);
            setListData(mappedData);
            
            if (mappedData.length === 0) {
                // Call logout function instead of useLogout hook
                // await logout();
                // router.push('/Login');
            }
        } catch (error) {
            console.error("Error processing incident types:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleListItemPress = (item: ListItem, index: number) => {
        console.log("Selected Item :: ", item);
        router.push(`/assembly-area/instructions?incidentId=${incidentTypeSourceIds[index]}`);
    };

    const renderItem = ({ item, index }: { item: ListItem, index: number }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => handleListItemPress(item, index)}>
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
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3392CC" />
                    <Text style={styles.loadingText}>Loading incident types...</Text>
                </View>
            ) : (
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No incident types available</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default AssemblyArea;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#3392CC',
        fontFamily: 'Manrope-Medium',
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Manrope-Medium',
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