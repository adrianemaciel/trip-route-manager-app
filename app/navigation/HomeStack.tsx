import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import ViewTripScreen from "../screens/ViewTripScreen";
import AddTripScreen from "../screens/AddTripScreen";

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
        name="AddTrip"
        component={AddTripScreen}
        options={{ title: "Nova Viagem" }}
      />
      <Stack.Screen
        name="Home"
        component={ViewTripScreen}
        options={{ title: "Minhas Viagens" }}
      />
    </Stack.Navigator>
  );
}
