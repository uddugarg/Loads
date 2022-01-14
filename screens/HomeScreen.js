import React, { useState } from 'react'
import { View, Text, SafeAreaView, Picker, Button, ToastAndroid } from 'react-native'
import RiceLoadForm from '../components/Forms/Loading/RiceLoadForm'
import Header from '../components/Header/Header'
import { useRoute } from '@react-navigation/native';
import { auth } from '../firebase';

const HomeScreen = ({ navigation }) => {

    const route = useRoute()
    const [loggedInUser, setLoggedInUser] = useState('');

    auth.onAuthStateChanged(user => {
        setLoggedInUser(user.email)
    })

    const [productCategory, setProductCategory] = useState('');
    const [formType, setFormType] = useState('');
    const [formData, setFormData] = useState({
        // productCategory: '',
        // formType: '',
        // username: user.userData && user.userData.name,
        rice: {
            loadedFrom: '',
            receivedIn: '',
            prodPlant: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            haudiGodown: '',
            to: '',
            from: '',
            packing: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            bagType: '',
            truck: '',
            thekedaar: '',
            remarks: '',
        },
        paddy: {
            loadedFrom: '',
            receivedIn: '',
            paperMillGo: '',
            rudiMillGo: '',
            sliPlant: '',
            maharajaGodown: '',
            haudiGodown: '',
            quality: '',
            from: '',
            bags: '',
            packing: '',
            truck: '',
            thekedaar: '',
            remarks: '',
        },
        bardana: {
            loadedFrom: '',
            receivedIn: '',
            otherDetails: '',
            bags: '',
            sentTo: '',
            from: '',
            partyName: '',
            truck: '',
            thekedaar: '',
            remarks: '',
        },
        lab: {
            stackNumber: '',
            location: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            report: "",
            remarks: '',
        }
    });

    const handleNext = () => {
        if (productCategory === '') {
            ToastAndroid.show('Select a category', ToastAndroid.SHORT)
        } else if (formType === '' && productCategory !== "Stack Report") {
            ToastAndroid.show('Select a form type', ToastAndroid.SHORT)
        } else {
            if (productCategory === 'Rice' && formType === 'Loading') {
                navigation.navigate('RiceLoadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Paddy' && formType === 'Loading') {
                navigation.navigate('PaddyLoadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Bardana' && formType === 'Loading') {
                navigation.navigate('BardanaLoadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Rice' && formType === 'Unloading') {
                navigation.navigate('RiceUnloadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Bardana' && formType === 'Unloading') {
                navigation.navigate('BardanaUnloadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Paddy' && formType === 'Unloading') {
                navigation.navigate('PaddyUnloadForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Rice' && formType === 'Production') {
                navigation.navigate('RiceProdForm', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else if (productCategory === 'Stack Report') {
                navigation.navigate('StackReport', {
                    formData: formData,
                    resetForm: resetFormData,
                    user: loggedInUser
                })
                setProductCategory('');
                setFormType('');
            } else {
                ToastAndroid.show('Next', ToastAndroid.SHORT)
            }
        }
    }

    const resetFormData = () => {
        setFormData({
            rice: {
                loadedFrom: '',
                receivedIn: '',
                prodPlant: '',
                sliPlant: '',
                sliGodown: '',
                maharajaGodown: '',
                haudiGodown: '',
                to: '',
                from: '',
                packing: '',
                product: '',
                sellaQuality: '',
                steamQuality: '',
                bags: '',
                bagType: '',
                truck: '',
                thekedaar: '',
                remarks: '',
            },
            paddy: {
                loadedFrom: '',
                receivedIn: '',
                paperMillGo: '',
                rudiMillGo: '',
                sliPlant: '',
                maharajaGodown: '',
                haudiGodown: '',
                quality: '',
                from: '',
                bags: '',
                packing: '',
                truck: '',
                thekedaar: '',
                remarks: '',
            },
            bardana: {
                loadedFrom: '',
                receivedIn: '',
                otherDetails: '',
                bags: '',
                sentTo: '',
                from: '',
                partyName: '',
                truck: '',
                thekedaar: '',
                remarks: '',
            },
            lab: {
                stackNumber: '',
                location: '',
                sliPlant: '',
                sliGodown: '',
                maharajaGodown: '',
                product: '',
                sellaQuality: '',
                steamQuality: '',
                bags: '',
                report: '',
                remarks: '',
            }
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
            <Header navigation={navigation} routeName={route.name} />

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '60%'
                }}>
                <Picker
                    selectedValue={productCategory}
                    style={{ height: 50, width: 250, color: 'white' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setProductCategory(itemValue)
                    }}
                >
                    <Picker.Item label='Select Category' value='0' color='grey' />
                    <Picker.Item label='Rice' value='Rice' />
                    <Picker.Item label='Bardana' value='Bardana' />
                    <Picker.Item label='Paddy' value='Paddy' />
                    <Picker.Item label='Stack Report' value='Stack Report' />
                </Picker>
                {productCategory !== 'Stack Report' &&
                    <Picker
                        selectedValue={formType}
                        style={{ height: 50, width: 250, color: 'white' }}
                        onValueChange={(itemValue, itemIndex) => setFormType(itemValue)}
                    >
                        <Picker.Item label='Form Type' value='0' color='grey' />
                        <Picker.Item label='Loading' value='Loading' />
                        <Picker.Item label='Unloading' value='Unloading' />
                        {productCategory === 'Rice' &&
                            <Picker.Item label='Production' value='Production' />
                        }
                    </Picker>
                }
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <Button
                    onPress={handleNext}
                    title="Next"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                // nextFocusRight={10}
                />
            </View>
            {/* <RiceLoadForm /> */}
        </SafeAreaView>
    )
}

export default HomeScreen
