import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RestablecerScreen from "../screens/RestablecerScreen";
import GaleriaScreen from "../screens/GaleriaScreen";
import CamaraScreen from "../screens/CamaraScreen";

// Importar los íconos para Expo
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="Welcome" component={MyTab} />
            <Stack.Screen name="Restablecer" component={RestablecerScreen} />
        </Stack.Navigator>
    );
}

function MyTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    
                    if (route.name === 'Welcome') {
                        return <Ionicons name="home" size={size} color={'purple'} />;
                    } else if (route.name === 'Galeria') {
                        return <MaterialCommunityIcons name="image" size={size} color={'purple'} />;
                    } else if (route.name === 'Camara') {
                        return <Ionicons name="camera" size={size} color={'purple'} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Galeria" component={GaleriaScreen} />
            <Tab.Screen name="Camara" component={CamaraScreen} />
        </Tab.Navigator>
    );
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
