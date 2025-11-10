import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
};

export default function ActionButtons({ onCancel, onSave, isLoading }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="outlined"
        style={[styles.button, styles.cancelButton]}
        onPress={onCancel}
        disabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        mode="contained"
        style={[styles.button, styles.saveButton]}
        onPress={onSave}
        loading={isLoading}
        disabled={isLoading}
      >
        Salvar Viagem
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
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