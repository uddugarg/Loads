import React, { Component } from 'react'
import { SafeAreaView, Text, TextInput, View, Picker, Button, ToastAndroid, ActivityIndicator, Vibration } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase';
import Header from '../../Header/Header';

export default class StackReport extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            stackNumber: '',
            location: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            report: '',
            remarks: '',
            // formType: 0,
            isLoading: false,
            isDataLoading: false,
            StackLocation: [],
            SLIPlantMenu: [],
            SLIGodownMenu: [],
            MaharajaGodownMenu: [],
            ProductMenu: [],
            SellaTypeMenu: [],
            SteamTypeMenu: [],
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleLocationDropdown = this.handleLocationDropdown.bind(this);
        this.handleSLIPlantDropdown = this.handleSLIPlantDropdown.bind(this);
        this.handleSLIGodownDropdown = this.handleSLIGodownDropdown.bind(this);
        this.handleMaharajaGodownDropdown = this.handleMaharajaGodownDropdown.bind(this);
        this.handleProductDropdown = this.handleProductDropdown.bind(this);
        this.handleSellaQualityDropdown = this.handleSellaQualityDropdown.bind(this);
        this.handleSteamQualityDropdown = this.handleSteamQualityDropdown.bind(this);
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
        //StackLocation
        db.collection('RiceLoadingLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ StackLocation: snapshot.docs.map(doc => doc.data()) })
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
    }


    async handleNext() {
        try {
            const ONE_SECOND_IN_MS = 50;

            if (this.props.route.params.formData.lab.location === '' || this.props.route.params.formData.lab.location === 'Select Loaded From') {
                ToastAndroid.show("Select Location", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.location === 'Sli Plant' && (this.props.route.params.formData.lab.sliPlant === '' || this.props.route.params.formData.lab.sliPlant === 'Select Plant')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.location === 'Sli Godown' && (this.props.route.params.formData.lab.sliGodown === '' || this.props.route.params.formData.lab.sliGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.location === 'Maharaja Godown' && (this.props.route.params.formData.lab.maharajaGodown === '' || his.props.route.params.formData.lab.maharajaGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.report === '' || this.props.route.params.formData.lab.bags === '' || this.props.route.params.formData.lab.stackNumber === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.product === '' || this.props.route.params.formData.lab.product === 'Select Product Type') {
                ToastAndroid.show("Select Product Type", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.product === 'Sella' && (this.props.route.params.formData.lab.sellaQuality === '' || this.props.route.params.formData.lab.sellaQuality === 'Select Sella Type')) {
                ToastAndroid.show("Enter Sella Quality", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.props.route.params.formData.lab.product === 'Steam' && (this.props.route.params.formData.lab.steamQuality === '' || this.props.route.params.formData.lab.steamQuality === 'Select Steam Type')) {
                ToastAndroid.show("Enter Steam Quality", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else {
                // nextStep();
                this.setState({ isLoading: true })

                const response = await fetch(`https://v1.nocodeapi.com/loads/google_sheets/QjvfzhtfFbtylEYC?tabId=Stack Report`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.props.route.params.formData.lab.stackNumber,
                            this.props.route.params.formData.lab.location,
                            this.props.route.params.formData.lab.sliPlant,
                            this.props.route.params.formData.lab.sliGodown,
                            this.props.route.params.formData.lab.maharajaGodown,
                            this.props.route.params.formData.lab.product,
                            this.props.route.params.formData.lab.sellaQuality,
                            this.props.route.params.formData.lab.steamQuality,
                            this.props.route.params.formData.lab.bags,
                            this.props.route.params.formData.lab.report,
                            this.props.route.params.formData.lab.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();

                this.setState({
                    isLoading: false,
                    stackNumber: '',
                    location: '',
                    sliPlant: '',
                    sliGodown: '',
                    maharajaGodown: '',
                    product: '',
                    sellaQuality: '',
                    steamQuality: '',
                    bags: '',
                    report: '',
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
            stackNumber: '',
            location: '',
            sliPlant: '',
            sliGodown: '',
            maharajaGodown: '',
            product: '',
            sellaQuality: '',
            steamQuality: '',
            bags: '',
            report: '',
            remarks: '',
        })

        this.state.resetForm();
    }

    handleLocationDropdown(val) {
        this.setState({ location: val });
        this.state.formData.lab.location = val
        this.state.formData.lab.sliPlant = ''
        this.state.formData.lab.sliGodown = ''
        this.state.formData.lab.maharajaGodown = ''
    }

    handleSLIPlantDropdown(val) {
        this.setState({ sliPlant: val });
        this.state.formData.lab.sliPlant = val
    }

    handleSLIGodownDropdown(val) {
        this.setState({ sliGodown: val });
        this.state.formData.lab.sliGodown = val
    }

    handleMaharajaGodownDropdown(val) {
        this.setState({ maharajaGodown: val });
        this.state.formData.lab.maharajaGodown = val
    }

    handleProductDropdown(val) {
        this.setState({ product: val });
        this.state.formData.lab.product = val
        this.state.formData.lab.sellaQuality = ''
        this.state.formData.lab.steamQuality = ''
    }

    handleSellaQualityDropdown(val) {
        this.setState({ sellaQuality: val });
        this.state.formData.lab.sellaQuality = val
    }

    handleSteamQualityDropdown(val) {
        this.setState({ steamQuality: val });
        this.state.formData.lab.steamQuality = val
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Stack Report</Text>

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
                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ stackNumber: val })
                                        this.state.formData.lab.stackNumber = val;
                                    }}
                                    placeholder='Stack Number'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    value={this.state.stackNumber}
                                />
                                <Picker
                                    selectedValue={this.state.location}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleLocationDropdown(value)
                                    }}
                                >
                                    {this.state.StackLocation.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.location === 'Sli Plant' ?
                                    <Picker
                                        selectedValue={this.state.sliPlant}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => this.handleSLIPlantDropdown(value)}
                                    >
                                        {this.state.SLIPlantMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>

                                    : this.state.location === "Sli Godown" ?
                                        <Picker
                                            selectedValue={this.state.sliGodown}
                                            style={{ height: 50, width: 250, color: 'white' }}
                                            onValueChange={(value) => this.handleSLIGodownDropdown(value)}
                                        >
                                            {this.state.SLIGodownMenu.map(item => (
                                                <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                            ))}
                                        </Picker>
                                        : this.state.location === 'Maharaja Godown' &&

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
                                        this.setState({ bags: val })
                                        this.state.formData.lab.bags = val;
                                    }}
                                    placeholder='Number of bags'
                                    placeholderTextColor='gray'
                                    keyboardType='number-pad'
                                    value={this.state.bags}
                                />

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ report: val })
                                        this.state.formData.lab.report = val;
                                    }}
                                    placeholder='Report (URL)'
                                    placeholderTextColor='gray'
                                    value={this.state.report}
                                />

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ remarks: val })
                                        this.state.formData.lab.remarks = val;
                                    }}
                                    placeholder='remarks'
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
