// app/teste_email.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Parse from 'parse/react-native';

export default function TesteEmail() {
  const [emailDestino, setEmailDestino] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTesteEnvio = async () => {
    if (!emailDestino) {
      Alert.alert('Erro', 'Digite um e-mail para receber o teste.');
      return;
    }

    setLoading(true);
    try {
      const response = await Parse.Cloud.run('enviarEmailTeste', {
        destinatario: emailDestino
      });

      Alert.alert('Sucesso', 'O servidor respondeu: ' + response);
      
    } catch (error: any) {
      console.error(error);
      Alert.alert('Falha', 'Erro no envio: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Integração SendGrid</Text>
      <Text style={styles.subtitle}>
        Esta tela serve apenas para verificar se o App consegue disparar e-mails.
      </Text>

      <Text style={styles.label}>Enviar para:</Text>
      <TextInput
        style={styles.input}
        placeholder="exemplo@gmail.com"
        value={emailDestino}
        onChangeText={setEmailDestino}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.btnContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#5D4037" />
        ) : (
          <Button 
            title="Enviar E-mail Agora" 
            color="#5D4037" 
            onPress={handleTesteEnvio} 
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E2723',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3E2723',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8D6E63',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 10,
  }
});