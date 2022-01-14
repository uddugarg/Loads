import { Formik } from 'formik';
import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { auth } from '../../firebase';

const LoginForm = ({ navigation }) => {

    const loginSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required().min(6, "Password should be at least of 6 characters")
    })

    const onLogin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
            ToastAndroid.show("Logged In!", ToastAndroid.SHORT)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values) => {
                onLogin(values.email, values.password)
            }}
            validationSchema={loginSchema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                <>
                    <View style={{ marginTop: '30%' }}>
                        <View
                            style={{
                                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#CCC' : 'red',
                                borderBottomWidth: 1
                            }}
                        >
                            <TextInput
                                keyboardType='email-address'
                                placeholderTextColor='grey'
                                placeholder='E-mail'
                                autoCapitalize='none'
                                textContentType='emailAddress'
                                autoFocus={true}
                                style={{ height: 50, width: 250, color: 'white' }}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View
                            style={{
                                borderColor: 1 > values.password.length || values.password.length >= 6 ? '#CCC' : 'red',
                                borderBottomWidth: 1
                            }}
                        >
                            <TextInput
                                placeholderTextColor='grey'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                autoFocus={false}
                                style={{ height: 50, width: 250, color: 'white' }}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <TouchableOpacity style={styles.button(isValid), { marginTop: 20 }}>
                            <Button onPress={handleSubmit} title='Sign In' />
                        </TouchableOpacity>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10%'
                        }}>
                            <Text style={{ color: 'white', marginBottom: 5 }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('RegisterScreen')}>
                                <Text style={{ color: '#6BB0F5' }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    button: isValid => ({
        backgroundColor: isValid ? '0096F6' : '#9ACAF7'
    }),
})

export default LoginForm
