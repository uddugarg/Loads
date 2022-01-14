import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Button, ToastAndroid } from 'react-native'
import Header from '../components/Header/Header'

const ReportScreen = ({ navigation }) => {

    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')

    const submit = async () => {
        try {
            if (subject === '' || description === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
            } else {
                const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/bxfctTdEnWJulEgl?tabId=Sheet1`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            subject,
                            description
                        ]
                    ])
                })

                setDescription('')
                setSubject('');
                ToastAndroid.show("Thanks for your response", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
            <Header navigation={navigation} />
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Report Bug</Text>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10%'
                }}>
                <TextInput
                    style={{
                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                    }}
                    onChangeText={(val) => {
                        setSubject(val)
                    }}
                    placeholder='Subject'
                    placeholderTextColor='gray'
                    value={subject}
                />

                <TextInput
                    style={{
                        height: 150, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10, textAlign: 'justify', marginBottom: 30
                    }}
                    onChangeText={(val) => {
                        setDescription(val)
                    }}
                    placeholder='Description'
                    placeholderTextColor='gray'
                    value={description}
                    maxLength={40}
                    editable
                    multiline
                    textContentType='fullStreetAddress'
                />

                <Button title='Sumbit' onPress={submit} />

            </View>
        </SafeAreaView>
    )
}

export default ReportScreen
