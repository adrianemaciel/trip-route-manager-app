import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import TripCard from "./TripCard";
import type { Trip } from "../types";

type Props = {
  trips: Trip[];
  loading: boolean;
  onEdit: (t: Trip) => void;
  onDelete: (id: string) => void;
  onView: (t: Trip) => void;
};

export default function TripsList({ trips, loading, onEdit, onDelete, onView }: Props) {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={[styles.center, { padding: 16 }]}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Text variant="titleMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        {trips.length > 0 ? "Suas viagens planejadas" : "Nenhuma viagem planejada ainda"}
      </Text>

      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  subtitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  center: {
    alignItems: "center",
  },
});