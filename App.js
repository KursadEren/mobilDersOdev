import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import Admin from './src/Admin';
import user from './src/user';
import KilavuzEkle from './src/KilavuzEkle';

import HastaEkle from './src/HastaEkle';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="user" component={user} />
      <Stack.Screen name="KilavuzEkle" component={KilavuzEkle} />
      <Stack.Screen name="HastaEkle" component={HastaEkle} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}