import React, { useState } from 'react'
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Alert, ToastAndroid } from 'react-native'
import Header from '../Header/Header'
import { List, TextInput } from 'react-native-paper';
import { db } from '../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditFormDetails = ({ navigation }) => {

    const [expandedRice, setExpandedRice] = useState(false);
    const [expandedPaddy, setExpandedPaddy] = useState(false);
    const [expandedBardana, setExpandedBardana] = useState(false);
    const [expandedThekedaar, setExpandedThekedaar] = useState(false);

    const [ThekedaarMenu, setThekedaarMenu] = useState([]);
    const [Thekedaar, setThekedaar] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const handleExpandThekedaar = () => {
        if (ThekedaarMenu !== []) {
            db.collection('Thekedaar')
                .orderBy("value", "desc")
                .onSnapshot(snapshot => {
                    setThekedaarMenu(snapshot.docs.map(doc => doc.data()))
                })
        }

        setExpandedThekedaar(!expandedThekedaar)
    }

    const addThekedaar = async () => {
        var arr = []
        ThekedaarMenu.forEach(t => {
            arr.push(t.value);
        })
        const max = Math.max.apply(Math, arr)

        if (Thekedaar !== '') {
            await db.collection('Thekedaar').add({
                label: Thekedaar,
                value: max + 1,
            })
            ToastAndroid.show('Thekedaar Added Successfully', ToastAndroid.SHORT)
            setThekedaar('');
            setModalVisible(false);
        } else {
            ToastAndroid.show('Enter Name', ToastAndroid.SHORT)
        }
    }

    const deleteThekedaar = async (id) => {
        var data = db
            .collection("Thekedaar")
            .where("value", "==", id)

        await data.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        })

        ToastAndroid.show('Deleted Successfully', ToastAndroid.SHORT)
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
            <Header navigation={navigation} />
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Edit Form Fields</Text>

            <ScrollView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '5%'
                    }}>
                    <List.Section style={{ width: '80%', backgroundColor: 'black' }} title="Accordions">

                        {/* Thekedaars */}
                        <List.Accordion
                            title="Thekedaar"
                            description='Add/Delete Thekedaars'
                            left={props => <List.Icon {...props} icon="account" />}
                            expanded={expandedThekedaar}
                            onPress={() => handleExpandThekedaar()}>
                            <List.Item
                                title="Add New"
                                style={{ backgroundColor: 'white', width: '100%', borderBottomWidth: 1, borderColor: 'lightgrey' }}
                                name='RiceLoadingLocations'
                                right={props => <List.Icon {...props} icon='plus' />}
                                onPress={() => setModalVisible(true)}
                            />
                            {ThekedaarMenu.filter(item => item.value !== 0).map(item => (
                                <List.Item key={item.value} title={item.label} style={{ backgroundColor: 'white', width: '100%' }}
                                    right={props => (
                                        <TouchableOpacity onPress={() => deleteThekedaar(item.value)}>
                                            <List.Icon {...props} icon='delete' color='red' />
                                        </TouchableOpacity>
                                    )} />
                            ))}
                        </List.Accordion>

                        {/* Rice */}
                        <List.Accordion
                            title="Rice"
                            description='Edit Menu Items'
                            left={props => <List.Icon {...props} icon="truck" />}
                            expanded={expandedRice}
                            onPress={() => { setExpandedRice(!expandedRice) }}>
                            <List.Item title="Loading Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Loading Locations',
                                                dbName: 'RiceLoadingLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Unloading Locations" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Unloading Locations',
                                                dbName: 'RiceUnloadLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Production Locations" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Production Locations',
                                                dbName: 'RiceProductionLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="SLI Plant" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'SLI Plant',
                                                dbName: 'RiceSLIPlant'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="SLI Godown" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'SLI Godown',
                                                dbName: 'RiceSLIGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Maharaja Godown" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'MaharajaGodown',
                                                dbName: 'RiceMaharajaGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Haudi Katai Godown" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Haudi Godown',
                                                dbName: 'RiceHaudiGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Packing Categories" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Packing Categories',
                                                dbName: 'RicePacking'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Product Categories" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Product Categories',
                                                dbName: 'RiceProduct'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Sella Type" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Sella Type',
                                                dbName: 'RiceSellaType'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Steam Type" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Steam Type',
                                                dbName: 'RiceSteamType'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Bag Type" style={{ backgroundColor: 'white' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Bag Type',
                                                dbName: 'RiceBagType'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                        </List.Accordion>

                        {/* Paddy */}
                        <List.Accordion
                            title="Paddy"
                            description='Edit Menu Items'
                            left={props => <List.Icon {...props} icon="truck" />}
                            expanded={expandedPaddy}
                            onPress={() => setExpandedPaddy(!expandedPaddy)}>
                            <List.Item title="Loading Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Loading Locations',
                                                dbName: 'PaddyLoadingLocation'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Unloading Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Unloading Locations',
                                                dbName: 'PaddyUnloadingLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Paper Mill Godown" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Paper Mill Godown',
                                                dbName: 'PaddyPaperMillGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Rudi Mill Godown" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Rudi Mill Godown',
                                                dbName: 'PaddyRudiMillGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="SLI Plant" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'SLI Plant',
                                                dbName: 'PaddySLIPlant'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Maharaja Godown" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Maharaja Godown',
                                                dbName: 'PaddyMaharajaGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Haudi Katai Godown" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Haudi Katai Godown',
                                                dbName: 'PaddyHaudiGodown'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Quality Type" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Quality Type',
                                                dbName: 'PaddyQuality'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Packing Categories" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Packing Categories',
                                                dbName: 'PaddyPacking'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                        </List.Accordion>

                        {/* Bardana */}
                        <List.Accordion
                            title="Bardana"
                            description='Edit Menu Items'
                            left={props => <List.Icon {...props} icon="truck" />}
                            expanded={expandedBardana}
                            onPress={() => setExpandedBardana(!expandedBardana)}>
                            <List.Item title="Loading Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Loading Locations',
                                                dbName: 'BardanaLoadingLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Unloading Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Unloading Locations',
                                                dbName: 'BardanaReceivedLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Sent To Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Sent To Locations',
                                                dbName: 'BardanaSentToLocations'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                            <List.Item title="Received From Locations" style={{ backgroundColor: 'white', width: '100%' }}
                                right={props =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditDetails', {
                                                name: 'Received From Locations',
                                                dbName: 'BardanaReceivedFrom'
                                            })
                                        }}>
                                        <List.Icon {...props} icon='pencil' color='blue' />
                                    </TouchableOpacity>} />
                        </List.Accordion>
                    </List.Section>

                    {/* Thekedaar Edit Modal */}
                    <View >
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Add New Thekedaar</Text>
                                    <TextInput
                                        style={{
                                            height: 50, width: 250, margin: 12
                                        }}
                                        onChangeText={(val) => {
                                            setThekedaar(val)
                                        }}
                                        placeholder="Thekedaar's Name"
                                        // placeholderTextColor='gray'
                                        value={Thekedaar}
                                    />
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Button
                                            onPress={() => setModalVisible(false)}
                                            title="Cancel"
                                        />
                                        <View style={{ marginRight: 20 }} />
                                        <Button
                                            // style={{ backgroundColor: 'blue', color: 'white' }}
                                            onPress={() => addThekedaar()}
                                            title="Add"
                                            color="#841584"
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'gray',
        marginTop: '5%',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default EditFormDetails

