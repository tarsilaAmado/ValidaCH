import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Parse from 'parse/react-native'; // Importe o Parse
import { router } from 'expo-router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Adicionei um estado de carregando para evitar múltiplos cliques
  const [loading, setLoading] = useState(false); 

  const handleCadastro = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);

    try {
      // Cria um novo usuário do Parse
      const user = new Parse.User();
      user.set('username', email); // Usamos o email como username
      user.set('email', email);
      user.set('password', senha);

      await user.signUp();

      Alert.alert('Sucesso', 'Conta criada! Faça login para continuar.');
      router.back(); // Volta para o login
    } catch (error: any) {
      // Mostra o erro (ex: email já existe)
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput 
        placeholder="E-mail" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      <TextInput 
        placeholder="Senha" 
        style={styles.input} 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Criando..." : "Cadastrar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... Mantenha seus estilos (styles) aqui ...
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});