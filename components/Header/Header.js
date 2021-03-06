import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import { auth, db } from '../../firebase'

const Header = ({ navigation, routeName }) => {

    const [adminUser, setAdminUser] = useState(true);
    const [data, setData] = useState([]);

    const navigateToHome = () => {
        if (routeName !== "HomeScreen") {
            navigation.popToTop()
        }
    }

    const logout = () => {
        try {
            auth.signOut().then(() => {
                ToastAndroid.show('Logged Out!', ToastAndroid.SHORT)
            })
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user.email === 'loads.unloads@gmail.com' || user.email === 'pranjalag5@gmail.com') {
                setAdminUser(true)
            } else {
                setAdminUser(false);
            }
        })
    }, [adminUser])

    // const handleDataFix = async () => {
    //     const rev = [
    //         { value: 0, label: 'Select Shift', color: 'grey' },
    //         { value: 1, label: 'Day' },
    //         { value: 2, label: 'Night' },
    //     ];
    //     const array = await rev.reverse();
    //     array.forEach((doc) => {
    //         db.collection('RiceProductionShift').add(doc);
    //     })
    //     // db.collection('RiceLoadingLocations').onSnapshot(snapshot => {
    //     //     setData(snapshot.docs.map(doc => ({ id: doc.id, msg: doc.data() })))
    //     // })
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToHome}>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                {adminUser &&
                    <TouchableOpacity
                        onPress={() => navigation.push('AdminScreen')}
                        // onPress={handleDataFix}
                    >
                        <Image style={styles.icon} source={require('../../assets/admin.png')} />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={navigateToHome}
                >
                    <Image style={styles.icon} source={require('../../assets/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logout}
                >
                    <Image style={styles.icon} source={require('../../assets/login.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: 30
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    }
});

export default Header
