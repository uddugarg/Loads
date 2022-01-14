import React from 'react'
import { View, Text, SafeAreaView, TextInput, Button } from 'react-native'
import Header from '../components/Header/Header'

const ReportScreen = ({ navigation }) => {
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
                    // onChangeText={(val) => {
                    //     this.setState({ to: val })
                    //     this.state.formData.rice.to = val;
                    // }}
                    placeholder='Subject'
                    placeholderTextColor='gray'
                // value={this.state.to}
                />

                <TextInput
                    style={{
                        height: 150, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10, textAlign: 'justify', marginBottom: 30
                    }}
                    // onChangeText={(val) => {
                    //     this.setState({ to: val })
                    //     this.state.formData.rice.to = val;
                    // }}
                    placeholder='Description'
                    placeholderTextColor='gray'
                    // value={this.state.to}
                    maxLength={40}
                    editable
                    multiline
                    textContentType='fullStreetAddress'
                />

                <Button title='Sumbit' />

            </View>
        </SafeAreaView>
    )
}

export default ReportScreen
