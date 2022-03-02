import React, { Component } from 'react'
import { SafeAreaView, Text, ToastAndroid, View, Picker, TextInput, Button, ActivityIndicator, Vibration } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase';
import Header from '../../Header/Header';

export default class RiceUnloadForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            receivedIn: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            haudiGodown: '',
            from: '',
            bags: '',
            packing: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            truck: '',
            thekedaar: '',
            remarks: '',
            isLoading: false,
            isDataLoading: false,
            RiceReceivedInMenu: [],
            SLIPlantMenu: [],
            SLIGodownMenu: [],
            MaharajaGodownMenu: [],
            HaudiGodownMenu: [],
            PackingMenu: [],
            ProductMenu: [],
            SellaTypeMenu: [],
            SteamTypeMenu: [],
            ThekedaarMenu: [],
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleReceivedDropdown = this.handleReceivedDropdown.bind(this);
        this.handleSLIPlantDropdown = this.handleSLIPlantDropdown.bind(this);
        this.handleSLIGodownDropdown = this.handleSLIGodownDropdown.bind(this);
        this.handleMaharajaGodownDropdown = this.handleMaharajaGodownDropdown.bind(this);
        this.handleHaudiGodownDropdown = this.handleHaudiGodownDropdown.bind(this);
        this.handlePackingDropdown = this.handlePackingDropdown.bind(this);
        this.handleProductDropdown = this.handleProductDropdown.bind(this);
        this.handleSellaQualityDropdown = this.handleSellaQualityDropdown.bind(this);
        this.handleSteamQualityDropdown = this.handleSteamQualityDropdown.bind(this);
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
        //RiceReceivedInMenu
        db.collection('RiceUnloadLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ RiceReceivedInMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //SLIPlantMenu
        db.collection('RiceSLIPlant')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ SLIPlantMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //SLIGodownMenu
        db.collection('RiceSLIGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ SLIGodownMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //MaharajaGodownMenu
        db.collection('RiceMaharajaGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ MaharajaGodownMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //HaudiGodownMenu
        db.collection('RiceHaudiGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ HaudiGodownMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //PackingMenu
        db.collection('RicePacking')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ PackingMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //ProductMenu
        db.collection('RiceProduct')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ ProductMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //SellaTypeMenu
        db.collection('RiceSellaType')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ SellaTypeMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //SteamTypeMenu
        db.collection('RiceSteamType')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ SteamTypeMenu: snapshot.docs.map(doc => doc.data()) })
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
            const ONE_SECOND_IN_MS = 50;

            if (this.state.formData.rice.receivedIn === '' || this.state.formData.rice.receivedIn === 'Received In') {
                ToastAndroid.show("Select Received In", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.receivedIn === 'Sli Plant' && (this.state.formData.rice.sliPlant === '' || this.state.formData.rice.sliPlant === 'Select Plant')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.receivedIn === 'Sli Godown' && (this.state.formData.rice.sliGodown === '' || this.state.formData.rice.sliGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.receivedIn === 'Maharaja Godown' && (this.state.formData.rice.maharajaGodown === '' || this.state.formData.rice.maharajaGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.receivedIn === 'Haudi Katai' && (this.state.formData.rice.haudiGodown === '' || this.state.formData.rice.haudiGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.from === '' || this.state.formData.rice.bags === '' || this.state.formData.rice.truck === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.packing === '' || this.state.formData.rice.packing === 'Select Packing(Qty)') {
                ToastAndroid.show("Enter packing quantity", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.product === '' || this.state.formData.rice.product === 'Select Product Type') {
                ToastAndroid.show("Select Product Type", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.product === 'Sella' && (this.state.formData.rice.sellaQuality === '' || this.state.formData.rice.sellaQuality === 'Select Sella Type')) {
                ToastAndroid.show("Enter Sella Quality", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.product === 'Steam' && (this.state.formData.rice.steamQuality === '' || this.state.formData.rice.steamQuality === 'Select Steam Type')) {
                ToastAndroid.show("Enter Steam Quality", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.thekedaar === '' || this.state.formData.rice.thekedaar === 'Select Thekedar') {
                ToastAndroid.show("Select a thekedaar", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else {
                // nextStep();
                this.setState({ isLoading: true })

                //Backing up data in firebase
                const data = {
                    Date: new Date().toLocaleString(),
                    ReceivedIn: this.state.formData.rice.receivedIn,
                    SLIPlant: this.state.formData.rice.sliPlant,
                    SLIGodown: this.state.formData.rice.sliGodown,
                    MaharajaGodown: this.state.formData.rice.maharajaGodown,
                    HaudiGodown: this.state.formData.rice.haudiGodown,
                    From: this.state.formData.rice.from,
                    Bags: this.state.formData.rice.bags,
                    Packing: this.state.formData.rice.packing,
                    Product: this.state.formData.rice.product,
                    Sella: this.state.formData.rice.sellaQuality,
                    Steam: this.state.formData.rice.steamQuality,
                    Truck: this.state.formData.rice.truck,
                    Thekedaar: this.state.formData.rice.thekedaar,
                    Remarks: this.state.formData.rice.remarks,
                    User: this.props.route.params.user
                }
                db.collection('BackupRiceUnloadingData').add(data);

                const response = await fetch(`https://v1.nocodeapi.com/loads/google_sheets/QjvfzhtfFbtylEYC?tabId=Rice(Unloading)`, {
                    //Test Env
                    // const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/DVrYwNXAcqbhynGY?tabId=Rice(Unloading)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.rice.receivedIn,
                            this.state.formData.rice.sliPlant,
                            this.state.formData.rice.sliGodown,
                            this.state.formData.rice.maharajaGodown,
                            this.state.formData.rice.haudiGodown,
                            this.state.formData.rice.from,
                            this.state.formData.rice.bags,
                            this.state.formData.rice.packing,
                            this.state.formData.rice.product,
                            this.state.formData.rice.sellaQuality,
                            this.state.formData.rice.steamQuality,
                            this.state.formData.rice.truck,
                            this.state.formData.rice.thekedaar,
                            this.state.formData.rice.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();
                this.setState({
                    isLoading: false,
                    receivedIn: '',
                    sliPlant: '',
                    sliGodown: '',
                    maharajaGodown: '',
                    haudiGodown: '',
                    from: '',
                    bags: '',
                    packing: '',
                    product: '',
                    sellaQuality: '',
                    steamQuality: '',
                    truck: '',
                    thekedaar: '',
                    remarks: '',
                    isLoading: false
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
            receivedIn: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            haudiGodown: '',
            from: '',
            bags: '',
            packing: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            truck: '',
            thekedaar: '',
            remarks: '',
            isLoading: false
        })

        this.state.resetForm();
    }

    handleReceivedDropdown(val) {
        this.setState({ receivedIn: val });
        this.state.formData.rice.receivedIn = val
        this.state.formData.rice.sliPlant = ''
        this.state.formData.rice.sliGodown = ''
        this.state.formData.rice.maharajaGodown = ''
        this.state.formData.rice.haudiGodown = ''
    }

    handleSLIPlantDropdown(val) {
        this.setState({ sliPlant: val });
        this.state.formData.rice.sliPlant = val
    }

    handleSLIGodownDropdown(val) {
        this.setState({ sliGodown: val });
        this.state.formData.rice.sliGodown = val
    }

    handleMaharajaGodownDropdown(val) {
        this.setState({ maharajaGodown: val });
        this.state.formData.rice.maharajaGodown = val
    }

    handleHaudiGodownDropdown(val) {
        this.setState({ haudiGodown: val });
        this.state.formData.rice.haudiGodown = val
    }

    handlePackingDropdown(val) {
        this.setState({ packing: val });
        this.state.formData.rice.packing = val
    }

    handleProductDropdown(val) {
        this.setState({ product: val });
        this.state.formData.rice.product = val
        this.state.formData.rice.sellaQuality = ''
        this.state.formData.rice.steamQuality = ''
    }

    handleSellaQualityDropdown(val) {
        this.setState({ sellaQuality: val });
        this.state.formData.rice.sellaQuality = val
    }

    handleSteamQualityDropdown(val) {
        this.setState({ steamQuality: val });
        this.state.formData.rice.steamQuality = val
    }

    handleThekedaarDropdown(val) {
        this.setState({ thekedaar: val });
        this.state.formData.rice.thekedaar = val
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Rice Unloading Form</Text>

                <ScrollView>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '4%',
                        }}>
                        {this.state.isDataLoading ?
                            <ActivityIndicator size='large' color='#841584' />
                            :
                            <>
                                <Picker
                                    selectedValue={this.state.receivedIn}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleReceivedDropdown(value)
                                    }}
                                >
                                    {this.state.RiceReceivedInMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.receivedIn === 'Sli Plant' ?
                                    <Picker
                                        selectedValue={this.state.sliPlant}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => this.handleSLIPlantDropdown(value)}
                                    >
                                        {this.state.SLIPlantMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>

                                    : this.state.receivedIn === 'Sli Godown' ?
                                        <Picker
                                            selectedValue={this.state.sliGodown}
                                            style={{ height: 50, width: 250, color: 'white' }}
                                            onValueChange={(value) => this.handleSLIGodownDropdown(value)}
                                        >
                                            {this.state.SLIGodownMenu.map(item => (
                                                <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                            ))}
                                        </Picker>

                                        : this.state.receivedIn === 'Maharaja Godown' ?
                                            <Picker
                                                selectedValue={this.state.maharajaGodown}
                                                style={{ height: 50, width: 250, color: 'white' }}
                                                onValueChange={(value) => this.handleMaharajaGodownDropdown(value)}
                                            >
                                                {this.state.MaharajaGodownMenu.map(item => (
                                                    <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                                ))}
                                            </Picker>
                                            : this.state.receivedIn === 'Haudi Katai' &&
                                            <Picker
                                                selectedValue={this.state.haudiGodown}
                                                style={{ height: 50, width: 250, color: 'white' }}
                                                onValueChange={(value) => this.handleHaudiGodownDropdown(value)}
                                            >
                                                {this.state.HaudiGodownMenu.map(item => (
                                                    <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                                ))}
                                            </Picker>
                                }

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ from: val })
                                        this.state.formData.rice.from = val;
                                    }}
                                    placeholder='Received From(kahan se aaya)'
                                    placeholderTextColor='gray'
                                    value={this.state.from}
                                />

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ bags: val })
                                        this.state.formData.rice.bags = val;
                                    }}
                                    placeholder='Number of bags'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    value={this.state.bags}
                                />

                                <Picker
                                    selectedValue={this.state.packing}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handlePackingDropdown(value)}
                                >
                                    {this.state.PackingMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                <Picker
                                    selectedValue={this.state.product}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handleProductDropdown(value)}
                                >
                                    {this.state.ProductMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>
                                {this.state.product === "Sella" ?
                                    <Picker
                                        selectedValue={this.state.sellaQuality}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => this.handleSellaQualityDropdown(value)}
                                    >
                                        {this.state.SellaTypeMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>
                                    : this.state.product === 'Steam' &&
                                    <Picker
                                        selectedValue={this.state.steamQuality}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => this.handleSteamQualityDropdown(value)}
                                    >
                                        {this.state.SteamTypeMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>
                                }

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ truck: val })
                                        this.state.formData.rice.truck = val;
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
                                        this.state.formData.rice.remarks = val;
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
