import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil do Usuário</Text>
      <Button mode="contained">Sair</Button>
    </View>
  );
}