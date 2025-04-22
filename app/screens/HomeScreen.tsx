import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Minhas Viagens" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Rio de Janeiro</Text>
          <Text variant="bodyMedium">10-15 Junho • Ônibus</Text>
        </Card.Content>

        <Card.Actions>
          <Button mode="text">Editar</Button>
          <Button mode="text" textColor="#e74c3c">
            Excluir
          </Button>
        </Card.Actions>
      </Card>

      <Button
        mode="contained"
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/screens/AddTripScreen")}
      >
        Nova Viagem
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  fab: {
    position: "absolute" as "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
