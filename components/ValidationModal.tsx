import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Animated,
    TouchableOpacity,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import { useRouter } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackNavigation } from '../navigation/types';

interface ValidationModalProps {
    visible: boolean;
    onClose: () => void;
    onDownload: () => void;
}

const ValidationModal: React.FC<ValidationModalProps> = ({ visible, onClose, onDownload }) => {
    // const navigation = useNavigation<RootStackNavigation>();
    const router = useRouter();
    const [tickPosition] = useState(new Animated.Value(0));


    useEffect(() => {
        if (visible) {
            Animated.timing(tickPosition, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                // navigation.navigate('Tabs', { screen: 'AssemblyArea' });\
                router.push('/(tabs)/AssemblyArea');
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible, router, onClose]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    
                    <Animated.View
                        style={[
                            styles.tickCircle,
                            {
                                transform: [
                                    {
                                        translateY: tickPosition.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-50, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <FontAwesome5 name="check" size={24} color="white" />
                    </Animated.View>
                    <Text style={styles.thankYouText}>Thank You</Text>
                    <Text style={styles.chefText}>The Chief Warden has received your report</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={onDownload}
                        >
                            <Text style={styles.buttonText}>Download Assembly Area Diagram</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <CustomButton style={styles.closeButton} title="Close" onPress={onDownload} /> */}

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        width: '80%',
        minHeight: 200,
    },
    tickCircle: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#3392CC',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -35,
        borderWidth: 5,
        borderColor: '#fff',
    },
    thankYouText: {
        fontSize: 20,   
        fontFamily: 'Manrope-Bold',
        marginTop: 20,
        color: '#363636',
    },
    chefText: {
        fontSize: 16,
        fontFamily: 'Manrope-SemiBold',
        marginTop: 10,
        textAlign: 'center',
        color: '#363636',
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
    downloadButton: {
        backgroundColor: '#3392CC',
        padding: 15,
        borderRadius: 35,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F6FDFF',
        fontSize: 12,
        // fontWeight: 'bold',
        fontFamily: 'Manrope-SemiBold',
    },

    closeButton: {
        marginTop: 24,
    },

});

export default ValidationModal;
