import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Trip } from "../types";
import AddTripHeader from "../components/AddTripHeader";
import TripForm from "../components/TripForm";
import TransportSelector from "../components/TransportSelector";
import ActionButtons from "../components/ActionButtons";

type RouteParams = {
  tripToEdit?: Trip;
};

export default function AddTripScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tripToEdit } = (route.params as RouteParams) || {};

  const [id] = useState(tripToEdit?.id || Date.now().toString());
  const [title, setTitle] = useState(tripToEdit?.title || "");
  const [destination, setDestination] = useState(tripToEdit?.destination || "");
  const [startDate, setStartDate] = useState(tripToEdit?.startDate || "");
  const [endDate, setEndDate] = useState(tripToEdit?.endDate || "");
  const [transport, setTransport] = useState(tripToEdit?.transport || "");
  const [description, setDescription] = useState(tripToEdit?.description || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tripToEdit) {
    }
  }, [tripToEdit]);

  const validateFields = () => {
    if (!title.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira o título da viagem");
      return false;
    }
    if (!destination.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira o destino");
      return false;
    }
    if (!startDate.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira a data de início");
      return false;
    }
    if (!endDate.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, insira a data de término");
      return false;
    }
    return true;
  };

  const saveTrip = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

    try {
      const trip: Trip = {
        id,
        title,
        destination,
        startDate,
        endDate,
        transport,
        description,
      };

      const existingTrips = await AsyncStorage.getItem("@trips");
      let tripsArray: Trip[] = existingTrips ? JSON.parse(existingTrips) : [];

      if (tripToEdit) {
        tripsArray = tripsArray.map((t) => (t.id === trip.id ? trip : t));
      } else {
        tripsArray.push(trip);
      }

      await AsyncStorage.setItem("@trips", JSON.stringify(tripsArray));

      Alert.alert(
        "Sucesso",
        tripToEdit
          ? "Viagem atualizada com sucesso!"
          : "Viagem salva com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao salvar viagem:", error);
      Alert.alert("Erro", "Não foi possível salvar a viagem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AddTripHeader
        title={tripToEdit ? "Editar Viagem" : "Adicionar Nova Viagem"}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TripForm
            title={title}
            setTitle={setTitle}
            destination={destination}
            setDestination={setDestination}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            description={description}
            setDescription={setDescription}
          />

          <TransportSelector
            transport={transport}
            setTransport={setTransport}
          />

          <ActionButtons
            onCancel={() => navigation.goBack()}
            onSave={saveTrip}
            isLoading={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
});
