import React, { Component } from 'react'
import { SafeAreaView, Text, View, Picker, TextInput, Button, ToastAndroid, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase';
import Header from '../../Header/Header';

export default class RiceProdForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            plant: '',
            bags: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            packing: '',
            bagType: '',
            thekedaar: '',
            remarks: '',
            isLoading: false,
            isDataLoading: false,
            RiceProdPlantMenu: [],
            PackingMenu: [],
            ProductMenu: [],
            SellaTypeMenu: [],
            SteamTypeMenu: [],
            BagTypeMenu: [],
            ThekedaarMenu: [],
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleProdPlantDropdown = this.handleProdPlantDropdown.bind(this);
        this.handleProductDropdown = this.handleProductDropdown.bind(this);
        this.handleSellaQualityDropdown = this.handleSellaQualityDropdown.bind(this);
        this.handleSteamQualityDropdown = this.handleSteamQualityDropdown.bind(this);
        this.handlePackingDropdown = this.handlePackingDropdown.bind(this);
        this.handleBagTypeDropdown = this.handleBagTypeDropdown.bind(this);
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
        //RiceProdPlantMenu
        db.collection('RiceProductionLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ RiceProdPlantMenu: snapshot.docs.map(doc => doc.data()) })
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

        //BagTypeMenu
        db.collection('RiceBagType')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ BagTypeMenu: snapshot.docs.map(doc => doc.data()) })
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
            if (this.state.formData.rice.prodPlant === '') {
                ToastAndroid.show("Select Plant", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.bagType === '' || this.state.formData.rice.bags === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.packing === '') {
                ToastAndroid.show("Enter packing quantity", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.product === '') {
                ToastAndroid.show("Select Product Type", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.product === 'Sella' && this.state.formData.rice.sellaQuality === '') {
                ToastAndroid.show("Enter Sella Quality", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.product === 'Steam' && this.state.formData.rice.steamQuality === '') {
                ToastAndroid.show("Enter Steam Quality", ToastAndroid.SHORT)
            } else if (this.state.formData.rice.thekedaar === '') {
                ToastAndroid.show("Select a thekedaar", ToastAndroid.SHORT)
            } else {
                // nextStep();
                this.setState({ isLoading: true })

                const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/DVrYwNXAcqbhynGY?tabId=Rice(Production)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.rice.prodPlant,
                            this.state.formData.rice.bags,
                            this.state.formData.rice.product,
                            this.state.formData.rice.sellaQuality,
                            this.state.formData.rice.steamQuality,
                            this.state.formData.rice.packing,
                            this.state.formData.rice.bagType,
                            this.state.formData.rice.thekedaar,
                            this.state.formData.rice.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();
                this.setState({
                    isLoading: false,
                    plant: '',
                    bags: '',
                    product: '',
                    sellaQuality: '',
                    steamQuality: '',
                    packing: '',
                    bagType: '',
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
            plant: '',
            bags: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            packing: '',
            bagType: '',
            thekedaar: '',
            remarks: '',
        })

        this.state.resetForm();
    }

    handleProdPlantDropdown(val) {
        this.setState({ plant: val });
        this.state.formData.rice.prodPlant = val
    };

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

    handlePackingDropdown(val) {
        this.setState({ packing: val });
        this.state.formData.rice.packing = val
    }

    handleBagTypeDropdown(val) {
        this.setState({ bagType: val });
        this.state.formData.rice.bagType = val
    }

    handleThekedaarDropdown(val) {
        this.setState({ thekedaar: val });
        this.state.formData.rice.thekedaar = val
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Rice Production Form</Text>

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
                                    selectedValue={this.state.plant}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleProdPlantDropdown(value)
                                    }}
                                >
                                    {this.state.RiceProdPlantMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

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
                                    selectedValue={this.state.bagType}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handleBagTypeDropdown(value)}
                                >
                                    {this.state.BagTypeMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

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
