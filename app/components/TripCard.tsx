import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import type { Trip } from "../types";

type Props = {
  trip: Trip;
  onEdit: (t: Trip) => void;
  onDelete: (id: string) => void;
  onView: (t: Trip) => void;
};

export default function TripCard({ trip, onEdit, onDelete, onView }: Props) {
  const theme = useTheme();

  return (
    <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
          {trip.title}
        </Text>
        <View style={styles.tripDetails}>
          <Text variant="bodyMedium" style={[styles.tripDate, { color: theme.colors.onSurfaceVariant }]}>
            {trip.startDate} - {trip.endDate}
          </Text>
          <Text variant="bodyMedium" style={[styles.tripTransport, { color: theme.colors.primary }]}>
            • {trip.transport}
          </Text>
        </View>
        {trip.description ? <Text variant="bodyMedium" style={{ marginTop: 8 }}>{trip.description}</Text> : null}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button mode="text" onPress={() => onEdit(trip)} textColor={theme.colors.onSurface}>
          Editar
        </Button>
        <Button mode="text" textColor="#e74c3c" onPress={() => onDelete(trip.id)}>
          Excluir
        </Button>
        <Button mode="contained" onPress={() => onView(trip)} style={styles.routeButton}>
          Ver Rota
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  tripDate: {
    opacity: 0.8,
  },
  tripTransport: {
    fontWeight: "500",
  },
  routeButton: {
    marginLeft: 8,
    borderRadius: 8,
  },
});