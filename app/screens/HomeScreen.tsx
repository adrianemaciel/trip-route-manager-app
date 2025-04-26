import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mockTrips, Trip } from "../services/mockRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  AddTrip: undefined;
  Map: { trip: Trip };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();

  const handleViewRoute = (trip: Trip) => {
    navigation.navigate("Map", { trip });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Minhas Viagens"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => console.log("Buscar viagens")}
          color={theme.colors.primary}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text
          variant="titleMedium"
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Gerencie todas as suas viagens em um só lugar.
        </Text>

        {mockTrips.map((trip) => (
          <Card
            key={trip.id}
            mode="elevated"
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.onSurface }}
              >
                {trip.title}
              </Text>
              <View style={styles.tripDetails}>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.tripDate,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {trip.date}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.tripTransport,
                    { color: theme.colors.primary },
                  ]}
                >
                  • {trip.transport}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="text"
                onPress={() => console.log("Editar viagem")}
                textColor={theme.colors.onSurface}
              >
                Editar
              </Button>
              <Button
                mode="text"
                textColor="#e74c3c"
                onPress={() => console.log("Excluir viagem")}
              >
                Excluir
              </Button>
              <Button
                mode="contained"
                onPress={() => handleViewRoute(trip)}
                style={styles.routeButton}
              >
                Ver Rota
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    marginBottom: 16,
    marginTop: 8,
  },
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
