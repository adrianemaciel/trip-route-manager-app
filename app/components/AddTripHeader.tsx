import React from "react";
import { Appbar } from "react-native-paper";

type Props = {
  title?: string;
  onBack: () => void;
};

export default function AddTripHeader({ title = "Adicionar Viagem", onBack }: Props) {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}