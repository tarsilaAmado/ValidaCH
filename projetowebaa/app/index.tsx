import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import Parse from '../services/parseConfig';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {

      const currentUser = await Parse.User.currentAsync();
      
      if (currentUser) {

        router.replace('/(tabs)');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Verificando sessão...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Você pode substituir este View por um componente <Image /> com sua logo */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
        <Text style={styles.title}>Bem-vindo ao App</Text>
        <Text style={styles.subtitle}>
          A melhor solução para gerenciar seus projetos com facilidade e segurança.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.primaryButtonText}>Acessar minha conta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.secondaryButtonText}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#E1E9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    marginBottom: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});