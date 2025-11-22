import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

// --- CONFIGURAÇÃO DO BACK4APP ---
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("AcCTzoSYZOrdMwqDjJ0jaV2LVYxGustWNvUc9I05", "TOC7o4iWpdtYaC8vvGNEt99dGxfqi8sBsjGeg8jB");
Parse.serverURL = 'https://parseapi.back4app.com/';
// --------------------------------

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" options={{ headerShown: true, title: 'Criar Conta' }} />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}