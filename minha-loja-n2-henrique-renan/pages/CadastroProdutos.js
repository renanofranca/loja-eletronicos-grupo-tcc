import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createTable, addProduct, editProduct, deleteProduct } from '../services/database/ProdutoDAO';
import { Picker } from '@react-native-picker/picker';
import { addCategoria, getCategoria, deleteCategoria, updateCategoria } from '../services/database/CategoriaDAO';


export default function CadastroProdutos({ navigation }) {

  const produto = navigation.getParam('produto');

  const [nome, setNome] = useState(produto ? produto.nome : '')
  const [preco, setPreco] = useState(produto ? produto.preco.toString() : '')
  const [categoria, setCategoria] = useState(produto ? produto.categoria : '')
  const [categorias, setCategorias] = useState([]);
  const [id, setId] = useState(produto ? produto.id : 0)
  const [isEditing, setIsEditing] = useState(!!produto);
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (itemValue) => {
    setCategoria(itemValue);
  };

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

  const saveProduct = async () => {
    const produto = { nome, preco, categoria }


    try {
      if (nome.length == 0 || categoria.length == 0) {
        Alert.alert('Error', 'Preencha todos os campos')
        return;
      }

      createTable()
      addProduct(produto)
      limparCampos()
      Alert.alert('Show!', 'Produto Cadastrado Com Sucesso!')

    } catch (error) {
      console.error('Erro salvando produto:', error)
      Alert.alert('Error', 'Erro salvando protudo')
    }
  };

  const editProduto = async () => {
    const produto = { nome, preco, categoria, id }

    try {
      if (nome.length == 0 || categoria.length == 0) {
        Alert.alert('Ops', 'Preencha todos os campos')
        return;
      }

      editProduct(produto)
      limparCampos()
      Alert.alert('Show!', 'Produto Editado Com Sucesso!')
      navigation.navigate('Home')

    } catch (error) {
      console.error('Erro editando produto:', error)
      Alert.alert('Error', 'Erro editando protudo')
    }
  };

  const deleteProduto = async () => {
    const produto = { nome, preco, categoria, id }

    try {

      deleteProduct(produto)
      limparCampos()
      Alert.alert('Show!', 'Produto Deletado Com Sucesso')
      navigation.navigate('Home')

    } catch (error) {
      console.error('Erro deletando produto:', error)
      Alert.alert('Error', 'Erro deletando protudo')
    }
  };

  async function limparCampos() {
    setNome("");
    setPreco(0);
    setCategoria("");
  }



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          navigation.navigate('Home')
        }}>
        <Icon name="chevron-back-outline" size={45} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.container}>
        
      {isEditing ? (
          <Text style={styles.legenda}>Edição de Produto</Text>
        ) : (
          <Text style={styles.legenda}>Cadastro de Produto</Text>
        )}
        
        <TextInput
          placeholder="Nome do Produto"
          value={nome}
          onChangeText={setNome}
          style={styles.caixaTexto}
          editable={true}
        />
        <TextInput
          placeholder="Preço Unitário"
          value={preco + ''}
          inputMode='decimal'
          onChangeText={setPreco}
          style={styles.caixaTexto}
          editable={true}
        />
        <View>
          <Text>Selecione uma Categoria:</Text>
          <Picker
            style={styles.picker}
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}>
            <Picker.Item label="Categoria" value="" />
            {categorias.map((cat) => (
              <Picker.Item label={cat.nome} value={cat.nome} key={cat.nome} />
            ))}
          </Picker>
        </View>


        {isEditing ? (
          <TouchableOpacity
            style={styles.button}
            onPress={editProduto}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={saveProduct}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        )}

        {isEditing ? (
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={deleteProduto}
          >
            <Text style={styles.buttonText}>Excluir Produto</Text>
          </TouchableOpacity>
        ) : ("")}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginRight: 0
  },
  scrollContainer: {
    backgroundColor: '#FFFFFF',
    flex: 0,

  },
  container: {
    flex: 0.75,
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  botao: {
    margin: 16
  },
  caixaTexto: {
    fontSize: 25,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    height: 40
  },
  legenda: {
    fontSize: 20,
    margin: 15,
    color: 'black',
    flex: 0.5
  },
  button: {
    backgroundColor: '#f4a261',
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonDelete: {
    backgroundColor: 'red',
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
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
  icon: {
    color: '#e09f3e'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});