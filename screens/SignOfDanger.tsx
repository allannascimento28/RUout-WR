import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const SignOfDanger = () => {
    return (
        <View style={styles.screen}>
            <CustomHeader title="Sign of Danger" />

            <View style={styles.contentContainer}>
                <CustomInput
                    label="Sign of Danger Description"
                    placeholder="Fire in kitchen"
                    numberOfLines={4}
                />

            </View>

            <View style={styles.buttonContainer}>
                <CustomButton title="SAVE" onPress={() => {}} />
            </View>
        </View>
    )
}

export default SignOfDanger;

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
