import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import {
  Appbar,
  Button,
  Text,
  TextInput,
  RadioButton,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  transport: string;
  description: string;
};

export default function AddTripScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transport, setTransport] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transports = ["Avião", "Carro", "Ônibus"];

  const validateFields = () => {
    if (!title.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira o título da viagem");
      return false;
    }
    if (!destination.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira o destino");
      return false;
    }
    if (!startDate.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira a data de início");
      return false;
    }
    if (!endDate.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira a data de término");
      return false;
    }
    return true;
  };

  const saveTrip = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

    try {
      const newTrip: Trip = {
        id: Date.now().toString(),
        title,
        destination,
        startDate,
        endDate,
        transport,
        description,
      };

      const existingTrips = await AsyncStorage.getItem("@trips");
      let tripsArray: Trip[] = [];

      if (existingTrips) {
        tripsArray = JSON.parse(existingTrips);
      }

      tripsArray.push(newTrip);

      await AsyncStorage.setItem("@trips", JSON.stringify(tripsArray));

      Alert.alert("Sucesso", "Viagem salva com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar viagem:", error);
      Alert.alert("Erro", "Não foi possível salvar a viagem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar Nova Viagem" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="bodyLarge" style={styles.description}>
            Planeje sua próxima aventura adicionando os detalhes da viagem
            abaixo.
          </Text>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Título da Viagem *
          </Text>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon icon="tag" />}
            placeholder="Ex: Férias de Verão"
            value={title}
            onChangeText={setTitle}
            style={[styles.input, { borderRadius: 20 }]}
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Destino *
          </Text>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon icon="routes" />}
            placeholder="Ex: Rio de Janeiro"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Data de Início *
          </Text>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon icon="calendar" />}
            placeholder="dd/mm/aaaa"
            value={startDate}
            onChangeText={setStartDate}
            style={styles.input}
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Data de Término *
          </Text>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon icon="calendar" />}
            placeholder="dd/mm/aaaa"
            value={endDate}
            onChangeText={setEndDate}
            style={styles.input}
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Meio de Transporte
          </Text>
          <RadioButton.Group onValueChange={setTransport} value={transport}>
            {transports.map((item) => (
              <View key={item} style={styles.radioItem}>
                <RadioButton value={item} />
                <Text variant="bodyMedium">{item}</Text>
              </View>
            ))}
          </RadioButton.Group>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Descrição
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Descreva os detalhes da sua viagem..."
            value={description}
            onChangeText={setDescription}
            style={styles.descriptionInput}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              style={[styles.button, styles.saveButton]}
              onPress={saveTrip}
              loading={isLoading}
              disabled={isLoading}
            >
              Salvar Viagem
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  description: {
    marginBottom: 24,
    color: "#666",
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  descriptionInput: {
    marginBottom: 24,
    backgroundColor: "#fff",
    minHeight: 120,
    textAlignVertical: "top",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: "#666",
  },
  saveButton: {
    backgroundColor: "#3498db",
  },
});
