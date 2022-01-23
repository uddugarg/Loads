import React, { Component } from 'react'
import { SafeAreaView, Text, ToastAndroid, View, Picker, TextInput, Button, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase';
import Header from '../../Header/Header';

export default class PaddyUnloadForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: this.props.navigation,
            formData: this.props.route.params.formData,
            resetForm: this.props.route.params.resetForm,
            receivedIn: 0,
            paperMill: 0,
            rudiMill: 0,
            sliPlant: 0,
            maharajaGodown: 0,
            haudiGodown: 0,
            quality: 0,
            bags: '',
            from: '',
            packing: 0,
            truck: '',
            thekedaar: 0,
            remarks: '',
            // formType: 0,
            isLoading: false,
            isDataLoading: false,
            PaddyReceivedIn: [],
            PaperMillMenu: [],
            RudiMillMenu: [],
            SLIPlantMenu: [],
            MaharajaGodownMenu: [],
            HaudiGodownMenu: [],
            QualityMenu: [],
            PackingMenu: [],
            ThekedaarMenu: []
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleReceivedInDropdown = this.handleReceivedInDropdown.bind(this);
        this.handlePaperMillGodownDropdown = this.handlePaperMillGodownDropdown.bind(this);
        this.handleRudiMillGodownDropdown = this.handleRudiMillGodownDropdown.bind(this);
        this.handleSLIPlantDropdown = this.handleSLIPlantDropdown.bind(this);
        this.handleMaharajaGodownDropdown = this.handleMaharajaGodownDropdown.bind(this);
        this.handleHaudiGodownDropdown = this.handleHaudiGodownDropdown.bind(this);
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
        //PaddyReceivedIn
        db.collection('PaddyUnloadingLocations')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ PaddyReceivedIn: snapshot.docs.map(doc => doc.data()) })
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

        //HaudiGodownMenu
        db.collection('PaddyHaudiGodown')
            .orderBy("value", "asc")
            .onSnapshot(snapshot => {
                this.setState({ HaudiGodownMenu: snapshot.docs.map(doc => doc.data()) })
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
            if (this.state.formData.paddy.receivedIn === '') {
                ToastAndroid.show("Select loaded from", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.receivedIn === 'Paper Mill Godowns' && this.state.formData.paddy.paperMillGo === '') {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.receivedIn === 'Rudi Mill Godowns' && this.state.formData.paddy.rudiMillGo === '') {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.receivedIn === 'Maharaja Godown' && this.state.formData.paddy.maharajaGodown === '') {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.receivedIn === 'SLI' && this.state.formData.paddy.sliPlant === '') {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.receivedIn === 'Haudi Katai' && this.state.formData.paddy.haudiGodown === '') {
                ToastAndroid.show("Select Plant/Godown", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.packing === '') {
                ToastAndroid.show("Enter packing quantity", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.quality === '') {
                ToastAndroid.show("Select Quality", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.bags === '' || this.state.formData.paddy.truck === '' || this.state.formData.paddy.from === '') {
                ToastAndroid.show("Enter the required details", ToastAndroid.SHORT)
            } else if (this.state.formData.paddy.thekedaar === '') {
                ToastAndroid.show("Select a thekedaar", ToastAndroid.SHORT)
            } else {
                this.setState({ isLoading: true })

                const response = await fetch(`https://v1.nocodeapi.com/loads/google_sheets/QjvfzhtfFbtylEYC?tabId=Paddy(Unloading)`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify([
                        [
                            new Date().toLocaleString(),
                            this.state.formData.paddy.receivedIn,
                            this.state.formData.paddy.paperMillGo,
                            this.state.formData.paddy.rudiMillGo,
                            this.state.formData.paddy.sliPlant,
                            this.state.formData.paddy.maharajaGodown,
                            this.state.formData.paddy.haudiGodown,
                            this.state.formData.paddy.from,
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
                    receivedIn: 0,
                    paperMill: 0,
                    rudiMill: 0,
                    sliPlant: 0,
                    maharajaGodown: 0,
                    haudiGodown: 0,
                    quality: 0,
                    bags: '',
                    from: '',
                    packing: 0,
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
            paperMill: 0,
            rudiMill: 0,
            sliPlant: 0,
            maharajaGodown: 0,
            haudiGodown: 0,
            quality: 0,
            bags: '',
            from: '',
            packing: 0,
            truck: '',
            thekedaar: 0,
            remarks: '',
        })

        this.state.resetForm();
    }

    handleReceivedInDropdown(val) {
        this.setState({ receivedIn: val });
        this.state.formData.paddy.receivedIn = val
        this.state.formData.paddy.paperMillGo = ''
        this.state.formData.paddy.rudiMillGo = ''
        this.state.formData.paddy.sliPlant = ''
        this.state.formData.paddy.maharajaGodown = ''
        this.state.formData.paddy.haudiGodown = ''
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

    handleHaudiGodownDropdown(val) {
        this.setState({ haudiGodown: val });
        this.state.formData.paddy.haudiGodown = val
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
                <Text style={{ color: 'gray', textAlign: 'center', marginTop: '5%', fontSize: 20, fontWeight: 'bold' }}>Paddy Unloading Form</Text>

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
                                    {this.state.PaddyReceivedIn.map(item => (
                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                    ))}
                                </Picker>

                                {this.state.receivedIn === 'Paper Mill Godowns' ?
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

                                    : this.state.receivedIn === 'Rudi Mill Godowns' ?
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

                                        : this.state.receivedIn === 'SLI' ?
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

                                            : this.state.receivedIn === 'Maharaja Godown' ?
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
                                                : this.state.receivedIn === 'Haudi Katai' &&
                                                <Picker
                                                    selectedValue={this.state.haudiGodown}
                                                    style={{ height: 50, width: 250, color: 'white' }}
                                                    onValueChange={(value) => {
                                                        this.handleHaudiGodownDropdown(value)
                                                    }}
                                                >
                                                    {this.state.HaudiGodownMenu.map(item => (
                                                        <Picker.Item key={item.value} label={item.label} value={item.label} color={item.color} />
                                                    ))}
                                                </Picker>
                                }

                                <TextInput
                                    style={{
                                        height: 50, width: 250, margin: 12, borderWidth: 1, borderColor: 'white', color: 'white', padding: 10
                                    }}
                                    onChangeText={(val) => {
                                        this.setState({ from: val })
                                        this.state.formData.paddy.from = val;
                                    }}
                                    placeholder='Received From'
                                    placeholderTextColor='gray'
                                    value={this.state.from}
                                />

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
