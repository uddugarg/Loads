import React, { Component } from 'react'
import { Linking, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../Header/Header'

export class AdminPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
        }
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30, overflow: 'scroll', }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Administrator</Text>

                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.state.navigation.push('EditFormDetails')}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4%',
                                padding: 10,
                                paddingLeft: 30,
                                paddingRight: 30
                                // maxHeight: '80%',
                                // overflow: 'visible',
                                // height: StatusBar.currentHeight
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%', fontSize: 17 }}>Edit Forms Fields</Text>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%' }}>➤</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1ZbGLyKVD2ISm6UGbud961GyYrYWUHC9RPwpt-0xSfsg/edit#gid=935300072')}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4%',
                                padding: 10,
                                paddingLeft: 30,
                                paddingRight: 30
                                // maxHeight: '80%',
                                // overflow: 'visible',
                                // height: StatusBar.currentHeight
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%', fontSize: 17 }}>Visit Spreadsheet</Text>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%' }}>➤</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1ZbGLyKVD2ISm6UGbud961GyYrYWUHC9RPwpt-0xSfsg/edit#gid=935300072')}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4%',
                                padding: 10,
                                paddingLeft: 30,
                                paddingRight: 30
                                // maxHeight: '80%',
                                // overflow: 'visible',
                                // height: StatusBar.currentHeight
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%', fontSize: 17 }}>Download CSV</Text>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%' }}>➤</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4%',
                                padding: 10,
                                paddingLeft: 30,
                                paddingRight: 30
                                // maxHeight: '80%',
                                // overflow: 'visible',
                                // height: StatusBar.currentHeight
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%', fontSize: 17 }}>Create New Account</Text>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%' }}>➤</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.state.navigation.push('ReportScreen')}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '4%',
                                padding: 10,
                                paddingLeft: 30,
                                paddingRight: 30
                                // maxHeight: '80%',
                                // overflow: 'visible',
                                // height: StatusBar.currentHeight
                            }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%', fontSize: 17 }}>Report Issue</Text>
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: '5%' }}>➤</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default AdminPage
