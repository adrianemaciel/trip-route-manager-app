import React from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

type Props = {
  title: string;
  setTitle: (v: string) => void;
  destination: string;
  setDestination: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
};

export default function TripForm({
  title,
  setTitle,
  destination,
  setDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  description,
  setDescription,
}: Props) {
  return (
    <>
      <Text variant="bodyLarge" style={styles.description}>
        Planeje sua próxima aventura adicionando os detalhes da viagem abaixo.
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
        style={styles.input}
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
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 16,
    color: "#666",
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    marginBottom: 16,
    backgroundColor: "#fff",
    minHeight: 120,
    textAlignVertical: "top",
  },
});