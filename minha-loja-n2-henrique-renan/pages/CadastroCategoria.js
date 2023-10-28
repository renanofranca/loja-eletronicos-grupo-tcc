import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createTable, addCategoria, getCategoria, deleteCategoria, updateCategoria } from '../services/database/CategoriaDAO';

export default function CadastroProdutos({ navigation }) {
  const [nome, setNome] = useState('');
  const [type, setType] = useState('add');
  const [id, setId] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {

    loadCategorias();
  }, []);

  const loadCategorias = () => {
    getCategoria()
      .then((result) => {
        setCategorias(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveCategoria = async (categoria) => {
    if (type === 'add') {
      try {
        if (nome.length === 0) {
          Alert.alert('Erro', 'Preencha todos os campos');
          return;
        }

        await createTable();

        const categoria = { nome };
        await addCategoria(categoria);

        setNome('');

        loadCategorias();

        Alert.alert('Sucesso', 'Categoria cadastrada com sucesso');
      } catch (error) {
        console.error('Erro ao salvar categoria:', error);
        Alert.alert('Erro', 'Erro ao salvar categoria');
      }
    } else {
      updateCategoria(id, nome);
      loadCategorias();
      Alert.alert('Sucesso', 'Categoria editada com sucesso');
    }
    limparCampos()
  };

  async function limparCampos() {
    setNome('');
  }

  const removerCategoria = async (categoria) => {
    try {
      deleteCategoria(categoria.id);
      loadCategorias();
      Alert.alert('Sucesso', 'Categoria excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      Alert.alert('Erro', 'Erro ao excluir categoria');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonVoltar}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.legenda}>Cadastro de Categoria</Text>
      <TextInput
        placeholder="Nome de Categoria"
        value={nome}
        onChangeText={setNome}
        style={styles.caixaTexto}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          saveCategoria('add');
        }}>
        <Text style={styles.buttonText}>Cadastrar Nova Categoria</Text>
      </TouchableOpacity>
      <Text style={styles.legenda}>Lista de Categorias</Text>
      <View style={styles.categoriasCadastradas}>
        <FlatList 
          data={categorias}
          keyExtractor={(item) => (item.id !== undefined ? item.id.toString() : '')}
          renderItem={({ item }) => (
            <View style={styles.categoriaItem}>
              <View>
              <Text style={styles.editButtonText}>{item.nome}</Text>
              </View>
              <TouchableOpacity
                style={styles.actionbutton}
                onPress={() => { setType('change'); setNome(item.nome); setId(item.id) }}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionbutton}
                onPress={() => removerCategoria(item)}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  categoriaItem: {
    flexDirection: 'row',
    marginTop: 5
  },
  categoriasCadastradas:{
    justifyContent: 'center',
  },
  actionbutton: {
    marginLeft: 10,
    fontSize: 40
  },
  editButtonText: {
    marginLeft: 20,
    fontSize: 20
  },

  deleteButtonText: {
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonVoltar: {
    backgroundColor: '#f4a261',
    margin: 30,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  legenda: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  caixaTexto: {
    fontSize: 25,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    height: 40,
  },
  button: {
    backgroundColor: '#f4a261',
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  // Resto do seu estilo...
});
