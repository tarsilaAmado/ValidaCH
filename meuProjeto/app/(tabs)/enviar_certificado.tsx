// app/enviar-certificado.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Para ícones
import Parse from 'parse/react-native';

export default function EnviarCertificado() {
  const [titulo, setTitulo] = useState('');
  const [horas, setHoras] = useState('');
  const [arquivo, setArquivo] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // Função para abrir o gerenciador de arquivos do celular
  const selecionarArquivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], // Aceita PDF e Imagens
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setArquivo(result.assets[0]);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
    }
  };

  const enviarFormulario = () => {
    if (!titulo || !horas || !arquivo) {
      Alert.alert('Atenção', 'Preencha todos os campos e anexe o certificado.');
      return;
    }

    // AQUI ENTRARIA A LÓGICA DE ENVIO PARA O BACKEND (Firebase, API, etc)
    console.log("Enviando:", { titulo, horas, arquivo });

    Alert.alert('Sucesso', 'Certificado enviado para validação!', [
      { text: 'OK', onPress: () => router.back() } // Volta para a Home
    ]);
  };

  return (
    <>
      {/* Configura o topo da tela */}
      <Stack.Screen options={{ title: 'Novo Certificado', headerTintColor: '#5D4037' }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome do Curso/Evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Workshop de React Native"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Carga Horária (Horas)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10"
          value={horas}
          onChangeText={setHoras}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Anexo (PDF ou Imagem)</Text>
        
        {/* Área de Upload */}
        <TouchableOpacity style={styles.uploadArea} onPress={selecionarArquivo}>
          {arquivo ? (
            <View style={styles.fileInfo}>
              <Ionicons name="document-text" size={32} color="#5D4037" />
              <Text style={styles.fileName} numberOfLines={1}>
                {arquivo.name}
              </Text>
              <Text style={styles.changeFileText}>Trocar arquivo</Text>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color="#8D6E63" />
              <Text style={styles.uploadText}>Toque para selecionar o arquivo</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={enviarFormulario}>
          <Text style={styles.buttonText}>Enviar para Análise</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

// Estilos com a paleta Marrom/Bege (ValidaCH)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Fundo levemente cinza/off-white
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4037', // Marrom escuro
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D7CCC8', // Bege escuro
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  uploadArea: {
    backgroundColor: '#EFEBE9', // Bege bem claro
    borderWidth: 2,
    borderColor: '#8D6E63', // Marrom médio
    borderStyle: 'dashed', // Borda tracejada
    borderRadius: 12,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  uploadText: {
    color: '#8D6E63',
    marginTop: 10,
    fontWeight: '500',
  },
  fileInfo: {
    alignItems: 'center',
    padding: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 5,
  },
  changeFileText: {
    color: '#D84315', // Um tom alaranjado para ação secundária
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#5D4037', // Botão Marrom Principal
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3, // Sombra no Android
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});