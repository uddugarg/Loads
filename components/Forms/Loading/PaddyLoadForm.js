import React, { Component } from 'react'
import { SafeAreaView, Text, View, Picker, TextInput, Button, ToastAndroid, ActivityIndicator, Vibration } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../../../firebase'
import Header from '../../Header/Header'

export default class PaddyLoadForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            loadFrom: '',
            paperMill: '',
            rudiMill: '',
            sliPlant: '',
            maharajaGodown: '',
            quality: '',
            bags: '',
            packing: '',
            truck: '',
            thekedaar: '',
            remarks: '',
            // formType: '',
            isLoading: false,
            isDataLoading: false,
            PaddyLoadingMenu: [],
            PaperMillMenu: [],
            RudiMillMenu: [],
            SLIPlantMenu: [],
            MaharajaGodownMenu: [],
            QualityMenu: [],
            PackingMenu: [],
            ThekedaarMenu: []
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleLoadDropdown = this.handleLoadDropdown.bind(this);
        this.handlePaperMillGodownDropdown = this.handlePaperMillGodownDropdown.bind(this);
        this.handleRudiMillGodownDropdown = this.handleRudiMillGodownDropdown.bind(this);
        this.handleSLIPlantDropdown = this.handleSLIPlantDropdown.bind(this);
        this.handleMaharajaGodownDropdown = this.handleMaharajaGodownDropdown.bind(this);
        this.handleQualityDropdown = this.handleQualityDropdown.bind(this);
        this.handlePackingDropdown = this.handlePackingDropdown.bind(this);
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
        //PaddyLoadingMenu
        db.collection('PaddyLoadingLocation')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ PaddyLoadingMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //PaperMillMenu
        db.collection('PaddyPaperMillGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ PaperMillMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //RudiMillMenu
        db.collection('PaddyRudiMillGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ RudiMillMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //SLIPlantMenu
        db.collection('PaddySLIPlant')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ SLIPlantMenu: snapshot.docs.map(doc => doc.data()) })
            })

        //MaharajaGodownMenu
        db.collection('PaddyMaharajaGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ MaharajaGodownMenu: snapshot.docs.map(doc => doc.data()) })
            })
        //QualityMenu
        db.collection('PaddyQuality')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ QualityMenu: snapshot.docs.map(doc => doc.data()) })
            })
        //PackingMenu
        db.collection('PaddyPacking')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ PackingMenu: snapshot.docs.map(doc => doc.data()) })
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
            
            if (this.state.formData.paddy.loadedFrom === '' || this.state.formData.paddy.loadedFrom === 'Select Loaded From') {
                ToastAndroid.show("Select loaded from", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.loadedFrom === 'Paper Mill Godowns' && (this.state.formData.paddy.paperMillGo === ''|| this.state.formData.paddy.paperMillGo === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.loadedFrom === 'Rudi Mill Godowns' && (this.state.formData.paddy.rudiMillGo === '' || this.state.formData.paddy.rudiMillGo === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.loadedFrom === 'Maharaja Godown' && (this.state.formData.paddy.maharajaGodown === '' || this.state.formData.paddy.maharajaGodown === 'Select Godown')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.loadedFrom === 'SLI' && (this.state.formData.paddy.sliPlant === '' || this.state.formData.paddy.sliPlant === 'Select Plant')) {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.packing === '' || this.state.formData.paddy.packing === 'Select Packing(Qty)') {
                ToastAndroid.show("Enter packing quantity", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.quality === '' || this.state.formData.paddy.quality === 'Select Quality') {
                ToastAndroid.show("Select Quality", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.bags === '' || this.state.formData.paddy.truck === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else if (this.state.formData.paddy.thekedaar === '' || this.state.formData.paddy.thekedaar === 'Select Thekedar') {
                ToastAndroid.show("Select a thekedaar", ToastAndroid.SHORT)
                Vibration.vibrate(1 * ONE_SECOND_IN_MS)
            } else {
                this.setState({ isLoading: true })

                const response = await fetch(`https://v1.nocodeapi.com/loads/google_sheets/QjvfzhtfFbtylEYC?tabId=Paddy(Loading)`, {
                    //Test Env
                    // const response = await fetch(`https://v1.nocodeapi.com/uddugarg/google_sheets/DVrYwNXAcqbhynGY?tabId=Paddy(Loading)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.paddy.loadedFrom,
                            this.state.formData.paddy.paperMillGo,
                            this.state.formData.paddy.rudiMillGo,
                            this.state.formData.paddy.sliPlant,
                            this.state.formData.paddy.maharajaGodown,
                            this.state.formData.paddy.packing,
                            this.state.formData.paddy.quality,
                            this.state.formData.paddy.bags,
                            this.state.formData.paddy.truck,
                            this.state.formData.paddy.thekedaar,
                            this.state.formData.paddy.remarks,
                            this.props.route.params.user,
                        ]
                    ])
                })
                await response.json();
                this.setState({
                    isLoading: false,
                    loadFrom: '',
                    paperMill: '',
                    rudiMill: '',
                    sliPlant: '',
                    maharajaGodown: '',
                    quality: '',
                    bags: '',
                    packing: '',
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
            paperMill: '',
            rudiMill: '',
            sliPlant: '',
            maharajaGodown: '',
            quality: '',
            bags: '',
            packing: '',
            truck: '',
            thekedaar: '',
            remarks: '',
        })

        this.state.resetForm()
    }

    handleLoadDropdown(val) {
        this.setState({ loadFrom: val });
        this.state.formData.paddy.loadedFrom = val
        this.state.formData.paddy.paperMillGo = ''
        this.state.formData.paddy.rudiMillGo = ''
        this.state.formData.paddy.sliPlant = ''
        this.state.formData.paddy.maharajaGodown = ''
    }

    handlePaperMillGodownDropdown(val) {
        this.setState({ paperMill: val });
        this.state.formData.paddy.paperMillGo = val
    }

    handleRudiMillGodownDropdown(val) {
        this.setState({ rudiMill: val });
        this.state.formData.paddy.rudiMillGo = val
    }

    handleSLIPlantDropdown(val) {
        this.setState({ sliPlant: val });
        this.state.formData.paddy.sliPlant = val
    }

    handleMaharajaGodownDropdown(val) {
        this.setState({ maharajaGodown: val });
        this.state.formData.paddy.maharajaGodown = val
    }

    handleQualityDropdown(val) {
        this.setState({ quality: val });
        this.state.formData.paddy.quality = val
    }

    handlePackingDropdown(val) {
        this.setState({ packing: val });
        this.state.formData.paddy.packing = val
    }

    handleThekedaarDropdown(val) {
        this.setState({ thekedaar: val });
        this.state.formData.paddy.thekedaar = val
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, paddingTop: 30 }}>
                <Header navigation={this.state.navigation} />
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Paddy Loading Form</Text>

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
                                    selectedValue={this.state.loadFrom}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => {
                                        this.handleLoadDropdown(value)
                                    }}
                                >
                                    {this.state.PaddyLoadingMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.loadFrom === 'Paper Mill Godowns' ?
                                    <Picker
                                        selectedValue={this.state.paperMill}
                                        style={{ height: 50, width: 250, color: 'white' }}
                                        onValueChange={(value) => {
                                            this.handlePaperMillGodownDropdown(value)
                                        }}
                                    >
                                        {this.state.PaperMillMenu.map(item => (
                                            <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                        ))}
                                    </Picker>

                                    : this.state.loadFrom === 'Rudi Mill Godowns' ?
                                        <Picker
                                            selectedValue={this.state.sliPlant}
                                            style={{ height: 50, width: 250, color: 'white' }}
                                            onValueChange={(value) => {
                                                this.handleRudiMillGodownDropdown(value)
                                            }}
                                        >
                                            {this.state.RudiMillMenu.map(item => (
                                                <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                            ))}
                                        </Picker>

                                        : this.state.loadFrom === 'SLI' ?
                                            <Picker
                                                selectedValue={this.state.sliPlant}
                                                style={{ height: 50, width: 250, color: 'white' }}
                                                onValueChange={(value) => {
                                                    this.handleSLIPlantDropdown(value)
                                                }}
                                            >
                                                {this.state.SLIPlantMenu.map(item => (
                                                    <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                                ))}
                                            </Picker>

                                            : this.state.loadFrom === 'Maharaja Godown' &&
                                            <Picker
                                                selectedValue={this.state.maharajaGodown}
                                                style={{ height: 50, width: 250, color: 'white' }}
                                                onValueChange={(value) => {
                                                    this.handleMaharajaGodownDropdown(value)
                                                }}
                                            >
                                                {this.state.MaharajaGodownMenu.map(item => (
                                                    <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                                ))}
                                            </Picker>
                                }

                                <Picker
                                    selectedValue={this.state.quality}
                                    style={{ height: 50, width: 250, color: 'white' }}
                                    onValueChange={(value) => this.handleQualityDropdown(value)}
                                >
                                    {this.state.QualityMenu.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ bags: val })
                                        this.state.formData.paddy.bags = val;
                                    }}
                                    placeholder='No.Of Bags'
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

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10,
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ truck: val })
                                        this.state.formData.paddy.truck = val;
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
                                        this.state.formData.paddy.remarks = val;
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
