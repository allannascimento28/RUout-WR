import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const PersonWithDisability = () => {
    return (
        <View style={styles.screen}>
            <CustomHeader title="Person With Disability" />

            <View style={styles.contentContainer}>
                <CustomInput
                    label="No. of Person With Disability"
                    placeholder="2"
                />

                <CustomInput
                    label="Description and Location"
                    placeholder="fire stairs"
                    numberOfLines={6}
                />
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton title="SAVE" onPress={() => {}} />
            </View>
        </View>
    )
}

export default PersonWithDisability;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(16),
    },
    contentContainer: {
        flex: 1,
        padding: scale(16)
    },
    buttonContainer: {
        padding: scale(16),
        marginBottom: scale(16)
    },
})
