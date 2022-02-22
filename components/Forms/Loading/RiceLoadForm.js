import React, { Component, useState } from 'react'
import { View, Text, Picker, StyleSheet, SafeAreaView, TextInput, Button, ToastAndroid, Alert, StatusBar, ActivityIndicator, Vibration } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../../../firebase'
import Header from '../../Header/Header'
// import Header from '../../Header/Header';

export default class RiceLoadForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            loadFrom: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            to: '',
            type: '',
            packing: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            truck: '',
            thekedaar: '',
            remarks: '',
            // formType: '',
            isLoading: false,
            isDataLoading: false,
            RiceLoadingMenu: [],
            SLIPlantMenu: [],
            SLIGodownMenu: [],
            MaharajaGodownMenu: [],
            RiceLoadingTypeMenu: [],
            PackingMenu: [],
            ProductMenu: [],
            SellaTypeMenu: [],
            SteamTypeMenu: [],
            ThekedaarMenu: [],
        }


        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleLoadDropdown = this.handleLoadDropdown.bind(this);
        this.handleSLIPlantDropdown = this.handleSLIPlantDropdown.bind(this);
        this.handleSLIGodownDropdown = this.handleSLIGodownDropdown.bind(this);
        this.handleMaharajaGodownDropdown = this.handleMaharajaGodownDropdown.bind(this);
        this.handleRiceLoadingTypeDropdown = this.handleRiceLoadingTypeDropdown.bind(this);
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
        //RiceLoadingMenu
        db.collection('RiceLoadingLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ RiceLoadingMenu: snapshot.docs.map(doc => doc.data()) })
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

        //RiceLoadingType
        db.collection('RiceLoadingType')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ RiceLoadingTypeMenu: snapshot.docs.map(doc => doc.data()) })
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

            if (this.state.formData.rice.loadedFrom === '' || this.state.formData.rice.loadedFrom === "Select Loaded From") {
                ToastAndroid.show('Select loaded from', ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.loadedFrom === 'Sli Plant' && (this.state.formData.rice.sliPlant === '' || this.state.formData.rice.sliPlant === 'Select Plant')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.loadedFrom === 'Sli Godown' && (this.state.formData.rice.sliGodown === '' || this.state.formData.rice.sliGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.loadedFrom === 'Maharaja Godown' && (this.state.formData.rice.maharajaGodown === '' || this.state.formData.rice.maharajaGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.type === '' || this.state.formData.rice.type === 'Select Type') {
                ToastAndroid.show("Select Type", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.rice.to === '' || this.state.formData.rice.bags === '' || this.state.formData.rice.truck === '') {
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
                this.setState({ isLoading: true })
                // nextStep();

                //Prod Env
                const response = await fetch(`https://v1.nocodeapi.com/loads/google_sheets/QjvfzhtfFbtylEYC?tabId=Rice(Loading)`, {

                    //Test Env
                    // const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/DVrYwNXAcqbhynGY?tabId=Rice(Loading)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.rice.loadedFrom,
                            this.state.formData.rice.sliPlant,
                            this.state.formData.rice.sliGodown,
                            this.state.formData.rice.maharajaGodown,
                            this.state.formData.rice.to,
                            this.state.formData.rice.type,
                            this.state.formData.rice.packing,
                            this.state.formData.rice.product,
                            this.state.formData.rice.sellaQuality,
                            this.state.formData.rice.steamQuality,
                            this.state.formData.rice.bags,
                            this.state.formData.rice.truck,
                            this.state.formData.rice.thekedaar,
                            this.state.formData.rice.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();
                // this.props.next()
                this.setState({
                    isLoading: false,
                    loadFrom: '',
                    sliPlant: '',
                    sliGodown: '',
                    maharajaGodown: '',
                    to: '',
                    type: '',
                    packing: '',
                    product: '',
                    sellaQuality: '',
                    steamQuality: '',
                    bags: '',
                    truck: '',
                    thekedaar: '',
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
            loadFrom: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            to: '',
            type: '',
            packing: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            truck: '',
            thekedaar: '',
            remarks: '',
        })

        this.state.resetForm();
    }

    handleLoadDropdown(value) {
        this.setState({ loadFrom: value });
        this.state.formData.rice.loadedFrom = value
        this.state.formData.rice.sliPlant = ''
        this.state.formData.rice.sliGodown = ''
        this.state.formData.rice.maharajaGodown = ''
    }

    handleSLIPlantDropdown(value) {
        this.setState({ sliPlant: value });
        this.state.formData.rice.sliPlant = value
    }

    handleSLIGodownDropdown(value) {
        this.setState({ sliGodown: value });
        this.state.formData.rice.sliGodown = value
    }

    handleMaharajaGodownDropdown(value) {
        this.setState({ maharajaGodown: value });
        this.state.formData.rice.maharajaGodown = value
    }

    handleRiceLoadingTypeDropdown(value) {
        this.setState({ type: value });
        this.state.formData.rice.type = value
    }

    handlePackingDropdown(value) {
        this.setState({ packing: value });
        this.state.formData.rice.packing = value
    }

    handleProductDropdown(value) {
        this.setState({ product: value });
        this.state.formData.rice.product = value
        this.state.formData.rice.sellaQuality = ''
        this.state.formData.rice.steamQuality = ''
    }

    handleSellaQualityDropdown(value) {
        this.setState({ sellaQuality: value });
        this.state.formData.rice.sellaQuality = value
    }

    handleSteamQualityDropdown(value) {
        this.setState({ steamQuality: value });
        this.state.formData.rice.steamQuality = value
    }

    handleThekedaarDropdown(value) {
        this.setState({ thekedaar: value });
        this.state.formData.rice.thekedaar = value
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30, overflow: 'scroll', }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Rice Loading Form</Text>

                <ScrollView>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '4%',
                            // maxHeight: '80%',
                            // overflow: 'visible',
                            // height: StatusBar.currentHeight
                        }}>
                        {this.state.isDataLoading ?
                            <ActivityIndicator size='large' color='#841584' />
                            :
                            <>
                                <Picker
                                    selectedValue={this.state.loadFrom}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleLoadDropdown(value)
                                    }}
                                >
                                    {this.state.RiceLoadingMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.loadFrom === 'Sli Plant' ?
                                    <Picker
                                        selectedValue={this.state.sliPlant}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => this.handleSLIPlantDropdown(value)}
                                    >
                                        {this.state.SLIPlantMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>

                                    : this.state.loadFrom === "Sli Godown" ?
                                        <Picker
                                            selectedValue={this.state.sliGodown}
                                            style={{ height: 50, width: 250, color: 'white' }}
                                            onValueChange={(value) => this.handleSLIGodownDropdown(value)}
                                        >
                                            {this.state.SLIGodownMenu.map(item => (
                                                <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                            ))}
                                        </Picker>
                                        : this.state.loadFrom === 'Maharaja Godown' &&

                                        <Picker
                                            selectedValue={this.state.maharajaGodown}
                                            style={{ height: 50, width: 250, color: 'white' }}
                                            onValueChange={(value) => this.handleMaharajaGodownDropdown(value)}
                                        >
                                            {this.state.MaharajaGodownMenu.map(item => (
                                                <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                            ))}
                                        </Picker>
                                }

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ to: val })
                                        this.state.formData.rice.to = val;
                                    }}
                                    placeholder='To'
                                    placeholderTextColor='gray'
                                    value={this.state.to}
                                />

                                <Picker
                                    selectedValue={this.state.type}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handleRiceLoadingTypeDropdown(value)}
                                >
                                    {this.state.RiceLoadingTypeMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

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
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ bags: val })
                                        this.state.formData.rice.bags = val;
                                    }}
                                    placeholder='No.Of Bags'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    value={this.state.bags}
                                />

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
                        // position: 'fixed',
                        // bottom: 0,
                        // width: '100%'
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

