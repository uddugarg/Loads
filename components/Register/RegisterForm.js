import { Formik } from 'formik';
import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { auth } from '../../firebase';

const RegisterForm = ({ navigation }) => {

    const registerSchema = Yup.object().shape({
        firstName: Yup.string().required("This is required"),
        lastName: Yup.string().required("This is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required().min(6, "Password should be at least of 6 characters"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Name is required')
    })

    const onSignUp = async (email, password) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            ToastAndroid.show("SignUp Successfully!", ToastAndroid.SHORT)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={(values) => {
                onSignUp(values.email, values.password)
            }}
            validationSchema={registerSchema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors }) => (
                <>
                    <View style={{ marginTop: '0%' }}>
                        <View
                            style={{
                                borderColor: '#CCC',
                                borderBottomWidth: 1
                            }}
                        >
                            <TextInput
                                // keyboardType='ke'
                                placeholderTextColor='grey'
                                placeholder='First Name'
                                autoCapitalize='none'
                                textContentType='namePrefix'
                                autoFocus={true}
                                style={{ height: 50, width: 250, color: 'white' }}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                        </View>
                        <View
                            style={{
                                borderColor: '#CCC',
                                borderBottomWidth: 1
                            }}
                        >
                            <TextInput
                                // keyboardType='email-address'
                                placeholderTextColor='grey'
                                placeholder='Last Name'
                                autoCapitalize='none'
                                textContentType='nameSuffix'
                                autoFocus={false}
                                style={{ height: 50, width: 250, color: 'white' }}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                        </View>
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
                                autoFocus={false}
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
                        <View
                            style={{
                                borderColor: errors.confirmPassword && touched.confirmPassword ? 'red' : '#CCC',
                                borderBottomWidth: 1
                            }}
                        >
                            <TextInput
                                placeholderTextColor='grey'
                                placeholder='Confirm Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                autoFocus={false}
                                style={{ height: 50, width: 250, color: 'white' }}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.button(isValid), { marginTop: 20 }}>
                            <Button onPress={handleSubmit} title='Sign Up' />
                        </TouchableOpacity>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10%'
                        }}>
                            <Text style={{ color: 'white', marginBottom: 5 }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={{ color: '#6BB0F5' }}>Sign In</Text>
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

export default RegisterForm
