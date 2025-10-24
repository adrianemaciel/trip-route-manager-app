import React from "react";
import { Appbar } from "react-native-paper";

type Props = {
  title?: string;
  onBack?: () => void;
  onSearch?: () => void;
};

export default function ViewTripsHeader({ title = "Minhas Viagens", onBack, onSearch }: Props) {
  return (
    <Appbar.Header mode="center-aligned">
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} />
      {onSearch && <Appbar.Action icon="magnify" onPress={onSearch} />}
    </Appbar.Header>
  );
}