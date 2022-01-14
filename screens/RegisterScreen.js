import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
// import LoginForm from '../components/Login/LoginForm';
import RegisterForm from '../components/Register/RegisterForm';

const RegisterScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10%'
                }}>
                <RegisterForm navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain'
    }
});

export default RegisterScreen
