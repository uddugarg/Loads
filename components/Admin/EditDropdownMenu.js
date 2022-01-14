import React, { Component } from 'react'
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List, TextInput } from 'react-native-paper'
import { db } from '../../firebase'
import Header from '../Header/Header'

export class EditDropdownMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.route.params.name,
            dbName: this.props.route.params.dbName,
            expand: true,
            data: [],
            modalVisible: false,
            deleteModalVisible: false,
            deletingLabel: '',
            deletingValue: 0,
            input: '',
            // resetForm: this.props.route.params.resetForm,
        }

        this.addData = this.addData.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.route.params.dbName)
        db.collection(this.state.dbName)
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ data: snapshot.docs.map(doc => doc.data()) })
            })
    }

    addData = async () => {
        var arr = []
        this.state.data.forEach(t => {
            arr.push(t.value);
        })
        const max = Math.max.apply(Math, arr)

        if (this.state.input !== '') {
            await db.collection(this.state.dbName).add({
                label: this.state.input,
                value: max + 1,
            })
            ToastAndroid.show('Field Added Successfully', ToastAndroid.SHORT)
            this.setState({ input: '', modalVisible: false })
        } else {
            ToastAndroid.show('Enter the text', ToastAndroid.SHORT)
        }
    }

    handleDeleteModal = (label, value) => {
        this.setState({ deleteModalVisible: true, deletingLabel: label, deletingValue: value })
    }

    deleteData = async (id) => {
        var data = db
            .collection(this.state.dbName)
            .where("value", "==", id)

        await data.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        })

        ToastAndroid.show('Deleted Successfully', ToastAndroid.SHORT)
        this.setState({ deletingLabel: '', deletingValue: 0, deleteModalVisible: false })
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.props.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Edit Details</Text>

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
                            <List.Accordion
                                title={this.state.name}
                                description='Add/Delete Items'
                                left={props => <List.Icon {...props} icon="pen" />}
                                expanded={this.state.expand}
                                onPress={() => this.setState({ expand: !this.state.expand })}>
                                <List.Item
                                    title="Add New"
                                    style={{ backgroundColor: 'white', width: '100%', borderBottomWidth: 1, borderColor: 'lightgrey' }}
                                    right={props => <List.Icon {...props} icon='plus' />}
                                    onPress={() => this.setState({ modalVisible: true })}
                                />
                                {this.state.data.filter(item => item.value !== 0).map(item => (
                                    <List.Item key={item.value} title={item.label} style={{ backgroundColor: 'white', width: '100%' }}
                                        right={props => (
                                            <TouchableOpacity
                                                onPress={() => this.handleDeleteModal(item.label, item.value)}
                                            >
                                                <List.Icon {...props} icon='delete' color='red' />
                                            </TouchableOpacity>
                                        )} />
                                ))}
                            </List.Accordion>
                        </List.Section>

                        {/* Add new modal */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    this.setState({ modalVisible: !this.state.modalVisible })
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Add New</Text>
                                        <TextInput
                                            style={{
                                                height: 50, width: 250, margin: 12
                                            }}
                                            onChangeText={(val) => {
                                                this.setState({ input: val })
                                            }}
                                            placeholder="Enter the text..."
                                        // placeholderTextColor='gray'
                                        // value={Thekedaar}
                                        />
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button
                                                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                                title="Cancel"
                                            />
                                            <View style={{ marginRight: 20 }} />
                                            <Button
                                                // style={{ backgroundColor: 'blue', color: 'white' }}
                                                onPress={() => this.addData()}
                                                title="Add"
                                                color="#841584"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {/* Delete Modal */}
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.deleteModalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    this.setState({ deleteModalVisible: !this.state.deleteModalVisible })
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Are you sure you want the delete! {this.state.deletingLabel} ?</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button
                                                onPress={() => this.setState({ deleteModalVisible: false })}
                                                title="Cancel"
                                            />
                                            <View style={{ marginRight: 20 }} />
                                            <Button
                                                // style={{ backgroundColor: 'blue', color: 'white' }}
                                                onPress={() => this.deleteData(this.state.deletingValue)}
                                                title="Delete"
                                                color="red"
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

export default EditDropdownMenu
