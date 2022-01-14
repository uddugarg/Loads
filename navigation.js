import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen';
import RiceLoadForm from './components/Forms/Loading/RiceLoadForm';
import PaddyLoadForm from './components/Forms/Loading/PaddyLoadForm';
import BardanaLoadForm from './components/Forms/Loading/BardanaLoadForm';
import RiceUnloadForm from './components/Forms/Unloading/RiceUnloadForm';
import BardanaUnloadForm from './components/Forms/Unloading/BardanaUnloadForm';
import PaddyUnloadForm from './components/Forms/Unloading/PaddyUnloadForm';
import RiceProdForm from './components/Forms/Production/RiceProdForm';
import StackReport from './components/Forms/Stack Report/StackReport';
import LoginScreen from './screens/LoginScreen';
import Confirmation from './components/Confirmation';
import RegisterScreen from './screens/RegisterScreen';
import AdminPage from './components/Admin/AdminPage';
import EditFormDetails from './components/Admin/EditFormDetails';
import EditDropdownMenu from './components/Admin/EditDropdownMenu';
import ReportScreen from './screens/ReportScreen';
// import { RiceLoadFrom } from './utils/master-data';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='RiceLoadForm' component={RiceLoadForm} />
            <Stack.Screen name='PaddyLoadForm' component={PaddyLoadForm} />
            <Stack.Screen name='BardanaLoadForm' component={BardanaLoadForm} />
            <Stack.Screen name='RiceUnloadForm' component={RiceUnloadForm} />
            <Stack.Screen name='BardanaUnloadForm' component={BardanaUnloadForm} />
            <Stack.Screen name='PaddyUnloadForm' component={PaddyUnloadForm} />
            <Stack.Screen name='RiceProdForm' component={RiceProdForm} />
            <Stack.Screen name='StackReport' component={StackReport} />
            <Stack.Screen name='Confirmation' component={Confirmation} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='AdminScreen' component={AdminPage} />
            <Stack.Screen name='EditFormDetails' component={EditFormDetails} />
            <Stack.Screen name='EditDetails' component={EditDropdownMenu} />
            <Stack.Screen name='ReportScreen' component={ReportScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)