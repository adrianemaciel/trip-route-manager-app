import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  Appbar,
  Button,
  Text,
  TextInput,
  RadioButton,
} from "react-native-paper";

export default function AddTripScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transport, setTransport] = useState("");
  const [description, setDescription] = useState("");

  const transports = ["Avião", "Carro", "Ônibus"];

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
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              style={[styles.button, styles.saveButton]}
              onPress={() => console.log("Viagem salva!")}
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
