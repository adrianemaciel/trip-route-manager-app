import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, Card, Text, FAB } from "react-native-paper";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  AddTrip: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Minhas Viagens" />
        <Appbar.Action
          icon="magnify"
          onPress={() => console.log("Buscar viagens")}
        />
      </Appbar.Header>

      <View style={styles.content}>
        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Rio de Janeiro</Text>
            <Text variant="bodyMedium" style={styles.tripDate}>
              10-15 Junho • Ônibus
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => console.log("Editar viagem")}>
              Editar
            </Button>
            <Button
              mode="text"
              textColor="#e74c3c"
              onPress={() => console.log("Excluir viagem")}
            >
              Excluir
            </Button>
          </Card.Actions>
        </Card>
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddTrip")}
        label="Nova Viagem"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 8,
  },
  card: {
    marginBottom: 16,
  },
  tripDate: {
    color: "#666",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
});
