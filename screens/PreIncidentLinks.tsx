import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Feather from '@expo/vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';

const PreIncidentLinks = () => {
     const navigation = useNavigation<RootStackNavigation>();

    return (
        <View style={styles.screen}>
            <CustomHeader title="Pre Incident Links" />
            <ScrollView style={{paddingHorizontal: 16}}>
            <View style={styles.card}>
                <Text style={styles.stepTitle}>STEP 1</Text>
                <Text style={styles.description}>
                    Click on the Chief Warden Instruction tab below. Download and save as bookmark. Share with all of your staff.
                </Text>

                <TouchableOpacity style={styles.downloadButton} onPress={() => navigation.navigate('InstructionLink')}>
                    <Feather name="download" size={18} color="#3392CC" style={styles.icon} />
                    <Text style={styles.buttonText}>Instruction Link</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>STEP 2</Text>
                <Text style={styles.description}>
                Click on the Response Handout link tab below. Download and save in your hand held device. Share with all of your staff
                </Text>

                <TouchableOpacity style={styles.downloadButton} onPress={() => navigation.navigate('ResponseHandout')}>
                    <Feather name="download" size={18} color="#3392CC" style={styles.icon} />
                    <Text style={styles.buttonText}>Response Handouts</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>STEP 3</Text>
                <Text style={styles.description}>
                Click on the Video Tutorial tab below. Watch, download, and share with your staff
                 </Text>

                <TouchableOpacity style={styles.downloadButton} onPress={() => navigation.navigate('ResponseVideos')}>
                    <Feather name="download" size={18} color="#3392CC" style={styles.icon} />
                    <Text style={styles.buttonText}>Response Videos</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
        </View>
    );
};

export default PreIncidentLinks;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E4E7EC',
        padding: 16,
        marginVertical: 8,
        elevation: 3
    },
    stepTitle: {
        fontSize: 18,
        fontFamily: 'Manrope-Bold',
        color: '#3392CC', 
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Manrope-SemiBold',
        color: '#363636',
        marginBottom: 16,
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DFF0FF',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 30,
        alignSelf: 'flex-start',
        width: '100%',
        elevation: 2
    },
    buttonText: {
        color: '#3392CC',
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
        marginLeft: 8,
    },
    icon: {
        marginRight: 4,
    },
});
