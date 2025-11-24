import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import Parse from 'parse/react-native';
import { router } from 'expo-router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleCadastro = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);

    try {
      const user = new Parse.User();
      user.set('username', email);
      user.set('email', email);
      user.set('password', senha);

      await user.signUp();

      Alert.alert('Sucesso', 'Conta criada! Faça login para continuar.');
      router.back(); 
    } catch (error: any) {
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

      <TouchableOpacity style={styles.button_voltar} onPress={() => router.back()}>
      {}
        <Text style= {styles.buttonText}>Voltar</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Criando..." : "Cadastrar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 },
  button: { backgroundColor: '#5D4037', padding: 15, borderRadius: 8, alignItems: 'center' },
  button_voltar: {backgroundColor: '#5D4037', position: 'absolute', top: 50, left: 20, zIndex: 15, padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});