// Arquivo: app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Se estiver href="/(tabs)", mude para "/login"
  return <Redirect href="/login" />;
}