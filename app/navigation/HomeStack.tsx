import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddTripScreen from "../screens/AddTripScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Bem-vindo" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Minhas Viagens" }}
      />
      <Stack.Screen
        name="AddTrip"
        component={AddTripScreen}
        options={{ title: "Nova Viagem" }}
      />
    </Stack.Navigator>
  );
}
