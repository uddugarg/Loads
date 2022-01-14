import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Header/Header'

const Confirmation = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: -30 }}>
            <Header navigation={navigation} />

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '60%'
                }}>
                <Text style={{ color: 'white', marginBottom: 20 }}>Details Uploaded Successfully</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#6BB0F5' }} onPress={() => navigation.popToTop()}>
                        Make Another Entry ➜
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Confirmation
