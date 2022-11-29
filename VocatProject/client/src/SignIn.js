import { StyleSheet, Text, View, TextInput, TouchableOpacity, DeviceEventEmitter, Image } from 'react-native'
import React, { useState } from 'react'
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { REACT_APP_SERVER_HOSTNAME } from "@env";
import axios from 'react-native-axios';

const SignIn = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        try {
            const statusJSON = await axios.post(`${REACT_APP_SERVER_HOSTNAME}/api/signin`, { email, password });
            console.log(statusJSON.data);
            if (statusJSON.data.error) {
                alert(statusJSON.data.error);
            } else {
                let temp = route.params.user;
                temp.username = statusJSON.data.user.username;
                await DeviceEventEmitter.emit("event.changeUser", temp);
                alert("Signin Successful!");
                navigation.navigate('Home');
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <View style={styles.homeContainer}>
            {/* <KeyboardAwareScrollView contentCotainerStyle={styles.container}> */}
            <View style={{ marginVertical: 100, alignItems: 'stretch' }}>
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>Not yet registered? Sign Up</Text>
                <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
            </View >
            {/* </KeyboardAwareScrollView> */}
            <TouchableOpacity style={[styles.button, {
                position: 'absolute',
                bottom: 20,
                left: '40%'
            }]}
                onPress={() => {
                    navigation.navigate('Home', { settings: route.params.settings });
                }}>
                <Text style={{ fontSize: 30 }}>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: "#FEFAE0",
        width: "100%",
        height: "100%",
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    button: {
        backgroundColor: '#CCD5AE',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default SignIn