import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddTripScreen from "../screens/AddTripScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
