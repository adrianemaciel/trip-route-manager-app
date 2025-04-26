import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  AddTrip: undefined;
};

export default function WelcomeScreen() {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text
          variant="displayMedium"
          style={[styles.title, { color: theme.colors.onPrimary }]}
        >
          Planeje suas viagens com facilidade
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.colors.onPrimary }]}
        >
          Crie roteiros, organize destinos e compartilhe suas experiências em
          uma única plataforma. Sua próxima aventura começa aqui.
        </Text>
      </View>
      <Button
        mode="contained"
        icon="compass-outline"
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate("AddTrip")}
      >
        Iniciar Nova Viagem
      </Button>
      <Button
        mode="contained"
        icon="map-search-outline"
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate("Home")}
      >
        Ver Minhas Viagens
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 32,
  },
  content: {
    marginTop: 120,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    marginBottom: 16,
    lineHeight: 24,
  },
  ctaText: {
    fontWeight: "bold",
    marginTop: 8,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 4,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    color: "#3498db",
    fontSize: 18,
  },
});
