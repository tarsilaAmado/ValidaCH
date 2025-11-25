import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import Parse from '../services/parseConfig'; 

export default function Cadastro() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      const user = new Parse.User();
      user.set('username', email); 
      user.set('email', email);
      user.set('password', password);
      user.set('fullName', name); 

      await user.signUp();
      
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Erro ao criar conta.';
      if (error.code === 202) errorMessage = 'Este email já está em uso.';
      if (error.code === 203) errorMessage = 'Este email já está em uso.';
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados abaixo</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.linkText}>Já tenho conta? Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});