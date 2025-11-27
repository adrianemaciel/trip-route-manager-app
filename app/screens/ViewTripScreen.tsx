import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Trip } from "../types";
import ViewTripsHeader from "../components/ViewTripsHeader";
import TripsList from "../components/TripsList";

type RootStackParamList = {
  Home: undefined;
  AddTrip: { tripToEdit?: Trip };
  Map: { trip: Trip };
};

export default function ViewTripScreen() {
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

  const handleEdit = (trip: Trip) => {
    navigation.navigate("AddTrip", { tripToEdit: trip });
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ViewTripsHeader
        onBack={() => navigation.goBack()}
        onSearch={() => console.log("Buscar viagens")}
      />
      <TripsList
        trips={trips}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteTrip}
        onView={handleViewRoute}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
