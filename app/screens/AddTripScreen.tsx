import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Divider,
  Menu,
  PaperProvider,
  TextInput,
} from "react-native-paper";

export default function AddTripScreen() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [newDestination, setNewDestination] = useState("");
  const [transport, setTransport] = useState("Selecione o meio de tranporte");
  const [menuVisible, setMenuVisible] = useState(false);

  const addDestination = () => {
    if (newDestination.trim()) {
      setDestinations([...destinations, newDestination]);
      setNewDestination("");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => router.push("/screens/HomeScreen")}
          />
          <Appbar.Content title="Nova Viagem" />
        </Appbar.Header>

        <TextInput
          label="Nome da Viagem"
          mode="outlined"
          placeholder="Ex: Rio de Janeiro"
          style={styles.input}
        />
        <TextInput
          label="Data de Início"
          mode="outlined"
          placeholder="Ex: 10/06/2025"
          style={styles.input}
        />
        <TextInput
          label="Data de Fim"
          mode="outlined"
          placeholder="Ex: 10/06/2025"
          style={styles.input}
        />
        <TextInput
          label="Novo Destino"
          mode="outlined"
          placeholder="Ex: Copacabana"
          value={newDestination}
          onChangeText={setNewDestination}
          style={styles.input}
        />

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={styles.menuButton}
            >
              {transport}
            </Button>
          }
        >
          <Menu.Item onPress={() => setTransport("Ônibus")} title="Ônibus" />
          <Divider />

          <Menu.Item onPress={() => setTransport("Carro")} title="Carro" />
          <Divider />
          <Menu.Item onPress={() => setTransport("Avião")} title="Avião" />
        </Menu>

        <Button
          mode="contained"
          onPress={addDestination}
          icon="plus"
          style={styles.button}
        >
          Adicionar Destino
        </Button>
        {destinations.map((destination, index) => (
          <TextInput
            key={index}
            value={destination}
            onChangeText={setNewDestination}
            mode="outlined"
            editable={false}
            style={styles.input}
          />
        ))}

        <Button mode="contained" style={styles.button}>
          Salvar
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  menuButton: {
    marginBottom: 16,
  },
});
