import React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Text } from "react-native-paper";

type Props = {
  transport: string;
  setTransport: (v: string) => void;
  options?: string[];
};

export default function TransportSelector({
  transport,
  setTransport,
  options = ["Avião", "Carro", "Ônibus"],
}: Props) {
  return (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Meio de Transporte
      </Text>
      <RadioButton.Group onValueChange={setTransport} value={transport}>
        {options.map((item) => (
          <View key={item} style={styles.radioItem}>
            <RadioButton value={item} />
            <Text variant="bodyMedium">{item}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});