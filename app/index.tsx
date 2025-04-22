import AddTripScreen from "@/app/screens/AddTripScreen";
import HomeScreen from "@/app/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <PaperProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
      </Stack.Navigator>
    </PaperProvider>
  );
}
