import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import Parse from 'parse/react-native';

// Definição de tipo para o arquivo
type DocumentAsset = DocumentPicker.DocumentPickerAsset | null;

export default function EnviarCertificado() {
  const [titulo, setTitulo] = useState('');
  const [horas, setHoras] = useState('');
  const [arquivo, setArquivo] = useState<DocumentAsset>(null);
  // Estado para controlar o feedback visual de carregamento
  const [enviando, setEnviando] = useState(false); 

  // Função para abrir o gerenciador de arquivos do celular
  const selecionarArquivo = async () => {
    if (enviando) return; // Impede seleção enquanto envia
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], // Aceita PDF e Imagens
      });

      if (!result.canceled) {
        setArquivo(result.assets[0]);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
    }
  };

  const enviarFormulario = async () => {
    if (enviando) return;

    if (!titulo || !horas || !arquivo) {
      Alert.alert('Atenção', 'Preencha todos os campos e anexe o certificado.');
      return;
    }

    // CORREÇÃO: Usar Parse.User.currentAsync() para buscar o usuário de forma assíncrona
    // O nome correto da função no SDK do Parse é 'currentAsync', não 'currentUserAsync'.
    const currentUser = await Parse.User.currentAsync();
    
    // É crucial que o usuário esteja logado para associar o certificado
    if (!currentUser) {
      Alert.alert('Erro', 'Você precisa estar logado para enviar certificados. Redirecionando para login.');
      router.replace('/login');
      return;
    }

    setEnviando(true); // Começa o carregamento
    
    try {
      // 1. UPLOAD DO ARQUIVO PARA O BACK4APP (Parse.File)
      const parseFile = new Parse.File(arquivo.name, { uri: arquivo.uri, type: arquivo.mimeType! });
      await parseFile.save();

      // 2. CRIAÇÃO E SALVAMENTO DO OBJETO 'SUBMISSAO' 
      const Submissao = Parse.Object.extend('Submissao');
      const novaSubmissao = new Submissao();

      // Mapeamento dos campos do App para as colunas do BD
      novaSubmissao.set('tituloEvento', titulo); 
      novaSubmissao.set('cargaHoraria', parseInt(horas, 10)); 
      novaSubmissao.set('certificadoBase', parseFile); 
      novaSubmissao.set('aluno', currentUser); // Usa o currentUser obtido de forma assíncrona

      await novaSubmissao.save();

      // Feedback de Sucesso APÓS o salvamento
      Alert.alert('Sucesso', 'Certificado enviado para validação!', [
        { text: 'OK', onPress: () => router.back() } 
      ]);

      // Limpar formulário
      setTitulo('');
      setHoras('');
      setArquivo(null);

    } catch (error: any) {
      console.error('Erro ao enviar certificado:', error);
      // Mantenha a mensagem de erro informativa para o usuário
      Alert.alert('Erro no Envio', `Ocorreu um erro ao salvar: ${error.message}. Verifique o console para mais detalhes.`);
    } finally {
      setEnviando(false); // Termina o carregamento
    }
  };

  return (
    <>
      {/* Configura o título da barra de navegação */}
      <Stack.Screen options={{ title: 'Novo Certificado', headerTintColor: '#5D4037' }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome do Curso/Evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Workshop de React Native"
          value={titulo}
          onChangeText={setTitulo}
          editable={!enviando}
        />

        <Text style={styles.label}>Carga Horária (Horas)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10"
          value={horas}
          onChangeText={setHoras}
          keyboardType="numeric"
          editable={!enviando}
        />

        <Text style={styles.label}>Anexo (PDF ou Imagem)</Text>
        
        {/* Área de Upload */}
        <TouchableOpacity 
          style={styles.uploadArea} 
          onPress={selecionarArquivo} 
          disabled={enviando}
        >
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

        {/* Botão de Envio (COM FEEDBACK VISUAL) */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={enviarFormulario}
          disabled={enviando}
        >
          {enviando ? (
            // Exibe o spinner enquanto 'enviando' for true
            <ActivityIndicator color="#FFF" /> 
          ) : (
            <Text style={styles.buttonText}>Enviar para Análise</Text>
          )}
        </TouchableOpacity>
        
        {/* Mensagem de status para envio mais longo */}
        {enviando && <Text style={styles.statusText}>Enviando arquivo e salvando... (Pode demorar)</Text>}
      </ScrollView>
    </>
  );
}

// Estilos com a paleta Marrom/Bege
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4037',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  uploadArea: {
    backgroundColor: '#EFEBE9',
    borderWidth: 2,
    borderColor: '#8D6E63',
    borderStyle: 'dashed',
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
    color: '#D84315',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#5D4037',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#5D4037',
    fontSize: 14,
  }
});