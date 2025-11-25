import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Parse from 'parse/react-native';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Tenta logar no Back4App
      await Parse.User.logIn(email, senha);
      
      // Se der certo, vai para as abas
      router.replace('/(tabs)'); 
    } catch (error: any) {
      Alert.alert('Erro ao entrar', 'Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  const irParaCadastro = () => {
    router.push('/cadastro');
  };

  // Função temporária para ir à tela de teste
  const irParaTesteEmail = () => {
    router.push('/email' as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ValidaCH</Text>

      <TextInput 
        placeholder="Seu E-mail" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Sua Senha" 
        style={styles.input} 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={irParaCadastro} style={styles.linkButton}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      {/* --- BOTÃO DE DESENVOLVEDOR (Remover depois) --- */}
      <TouchableOpacity onPress={irParaTesteEmail} style={styles.devButton}>
        <Text style={styles.devText}>🛠️ [DEV] Testar Envio de Email</Text>
      </TouchableOpacity>
      {/* ----------------------------------------------- */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#5D4037' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 },
  button: { backgroundColor: '#5D4037', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#5D4037' },
  
  // Estilo novo para o botão de dev
  devButton: { marginTop: 40, alignItems: 'center', padding: 10, backgroundColor: '#eee', borderRadius: 5 },
  devText: { color: '#333', fontSize: 12 },
});