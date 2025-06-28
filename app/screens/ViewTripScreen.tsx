import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
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

type RootStackParamList = {
  Home: undefined;
  AddTrip: { tripToEdit?: Trip };
  Map: { trip: Trip };
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
  const theme = useTheme();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar viagens ao carregar a tela
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const savedTrips = await AsyncStorage.getItem("@trips");
        if (savedTrips) {
          setTrips(JSON.parse(savedTrips));
        }
      } catch (error) {
        console.error("Erro ao carregar viagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Atualizar lista quando voltar da tela de adição
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchTrips = async () => {
        const savedTrips = await AsyncStorage.getItem("@trips");
        if (savedTrips) {
          setTrips(JSON.parse(savedTrips));
        }
      };
      fetchTrips();
    });

    return unsubscribe;
  }, [navigation]);

  const handleViewRoute = (trip: Trip) => {
    navigation.navigate("Map", { trip });
  };

  const handleDeleteTrip = async (id: string) => {
    try {
      const updatedTrips = trips.filter((trip) => trip.id !== id);
      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
    } catch (error) {
      console.error("Erro ao deletar viagem:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={() => navigation.goBack()} />
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
          {trips.length > 0
            ? "Suas viagens planejadas"
            : "Nenhuma viagem planejada ainda"}
        </Text>

        {trips.map((trip) => (
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
                  {trip.startDate} - {trip.endDate}
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
              {trip.description && (
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  {trip.description}
                </Text>
              )}
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="text"
                onPress={() =>
                  navigation.navigate("AddTrip", { tripToEdit: trip })
                }
                textColor={theme.colors.onSurface}
              >
                Editar
              </Button>
              <Button
                mode="text"
                textColor="#e74c3c"
                onPress={() => handleDeleteTrip(trip.id)}
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
    paddingBottom: 80,
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
