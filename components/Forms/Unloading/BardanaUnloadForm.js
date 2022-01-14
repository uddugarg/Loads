import React, { Component } from 'react'
import { SafeAreaView, Text, ToastAndroid, View, Picker, TextInput, Button, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase';
import Header from '../../Header/Header';

export default class BardanaUnloadForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            receivedIn: 0,
            other: '',
            bags: '',
            from: 0,
            partyName: '',
            truck: '',
            thekedaar: 0,
            remarks: '',
            // formType: 0,
            isLoading: false,
            isDataLoading: false,
            BardanaReceivedInMenu: [],
            BardanaFromMenu: [],
            ThekedaarMenu: [],
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleReceivedInDropdown = this.handleReceivedInDropdown.bind(this);
        this.handleFromDropdown = this.handleFromDropdown.bind(this);
        this.handleThekedaarDropdown = this.handleThekedaarDropdown.bind(this);
        this.PopulateDropDowns = this.PopulateDropDowns.bind(this);
    }

    componentDidMount() {
        this.setState({ isDataLoading: true })

        this.PopulateDropDowns()

        setTimeout(() => {
            this.setState({ isDataLoading: false })
        }, 1000)
    }

    PopulateDropDowns() {
        //BardanaReceivedInMenu
        db.collection('BardanaReceivedLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ BardanaReceivedInMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //BardanaFromMenu
        db.collection('BardanaReceivedFrom')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ BardanaFromMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //ThekedaarMenu
        db.collection('Thekedaar')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ ThekedaarMenu: snapshot.docs.map(doc => doc.data()) })
            })
    }

    async handleNext() {
        try {
            if (this.state.formData.bardana.receivedIn === '') {
                ToastAndroid.show("Select Received from", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.receivedIn === 'Other' && this.state.other === '') {
                ToastAndroid.show("Enter Other plant name", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.from === '') {
                ToastAndroid.show("Select Plant", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.from === 'Party' && this.state.formData.bardana.partyName === '') {
                ToastAndroid.show("Enter the Party Name", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.quality === '') {
                ToastAndroid.show("Select Quality", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.truck === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
            } else if (this.state.formData.bardana.thekedaar === '') {
                ToastAndroid.show("Select a thekedaar", ToastAndroid.SHORT)
            } else {
                this.setState({ isLoading: true })

                const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/DVrYwNXAcqbhynGY?tabId=Bardana(Unloading)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.bardana.from,
                            this.state.formData.bardana.partyName,
                            this.state.formData.bardana.receivedIn,
                            this.state.formData.bardana.otherDetails,
                            this.state.formData.bardana.truck,
                            this.state.formData.bardana.thekedaar,
                            this.state.formData.bardana.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();
                this.setState({
                    isLoading: false,
                    receivedIn: 0,
                    other: '',
                    bags: '',
                    from: 0,
                    partyName: '',
                    truck: '',
                    thekedaar: 0,
                    remarks: '',
                })

                this.state.resetForm();

                this.state.navigation.push('Confirmation')
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleReset() {
        this.setState({
            isLoading: false,
            receivedIn: 0,
            other: '',
            bags: '',
            from: 0,
            partyName: '',
            truck: '',
            thekedaar: 0,
            remarks: '',
        })

        this.state.resetForm();
    }

    handleReceivedInDropdown(val) {
        this.setState({ receivedIn: val });
        this.state.formData.bardana.receivedIn = val
        this.state.formData.bardana.otherDetails = ''
    }

    handleFromDropdown(val) {
        this.setState({ from: val });
        this.state.formData.bardana.from = val
        this.state.formData.bardana.partyName = ''
    }

    handleThekedaarDropdown(val) {
        this.setState({ thekedaar: val });
        this.state.formData.bardana.thekedaar = val
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Bardana Unloading Form</Text>

                <ScrollView>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10%'
                        }}>
                        {this.state.isDataLoading ?
                            <ActivityIndicator size='large' color='#841584' />
                            :
                            <>
                                <Picker
                                    selectedValue={this.state.receivedIn}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleReceivedInDropdown(value)
                                    }}
                                >
                                    {this.state.BardanaReceivedInMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.receivedIn === 'Other' &&
                                    <TextInput
                                        style={{
                                            height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10
                                        }}
                                        onChangeText={(val) => {
                                            this.setState({ other: val })
                                            this.state.formData.bardana.otherDetails = val;
                                        }}
                                        placeholder='Other Details'
                                        placeholderTextColor='gray'
                                        value={this.state.other}
                                    />
                                }

                                <Picker
                                    selectedValue={this.state.from}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleFromDropdown(value)
                                    }}
                                >
                                    {this.state.BardanaFromMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.from === 'Party' &&
                                    <TextInput
                                        style={{
                                            height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                        }}
                                        onChangeText={(val) => {
                                            this.setState({ partyName: val })
                                            this.state.formData.bardana.partyName = val;
                                        }}
                                        placeholder='Party Name'
                                        placeholderTextColor='gray'
                                        value={this.state.partyName}
                                    />
                                }

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ truck: val })
                                        this.state.formData.bardana.truck = val;
                                    }}
                                    placeholder='Truck No.'
                                    placeholderTextColor='gray'
                                    value={this.state.truck}
                                />

                                <Picker
                                    selectedValue={this.state.thekedaar}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handleThekedaarDropdown(value)}
                                >
                                    {this.state.ThekedaarMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ remarks: val })
                                        this.state.formData.bardana.remarks = val;
                                    }}
                                    placeholder='Remarks'
                                    placeholderTextColor='gray'
                                    value={this.state.remarks}
                                />
                            </>
                        }
                    </View>
                </ScrollView>

                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                    <Button
                        onPress={this.handleReset}
                        title="Reset"
                    // color="#841584"
                    />
                    <View style={{ marginTop: 10 }} />
                    <Button
                        onPress={this.handleNext}
                        title={
                            this.state.isLoading
                                ?
                                "Loading...."
                                :
                                "Submit"
                        }
                        disabled={this.state.isLoading ? true : false}
                        color="#841584"
                    />
                </View>
            </SafeAreaView>
        )
    }
}
