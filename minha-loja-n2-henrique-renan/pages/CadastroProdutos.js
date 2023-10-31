import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createTable, addProduct, editProduct, deleteProduct } from '../services/database/ProdutoDAO';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export default function CadastroProdutos({ navigation }) {

  const produto = navigation.getParam('produto');

  const [nome, setNome] = useState(produto ? produto.nome : '')
  const [preco, setPreco] = useState(produto ? produto.preco.toString() : '')
  const [categoria, setCategoria] = useState(produto ? produto.categoria : '');
  const [estoque, setEstoque] = useState(produto ? produto.estoque.toString() : '');
  const [id, setId] = useState(produto ? produto.id.toString() : '');
  const [isEditing, setIsEditing] = useState(!!produto);



  const saveProduct = async () => {
    const produto = { nome, preco, categoria, estoque }
    if (nome.length == 0 || categoria.length == 0 || preco.length == 0 || estoque.length == 0 ) {
      Alert.alert('Ops', 'Preencha todos os campos')
      return;
    }

    const jsonData = {
      "NomeProduto": produto.nome,
      "CategoriaProduto": produto.categoria,
      "QtdEstoque": produto.estoque,
      "Preco": produto.preco
  };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    axios.post('http://192.168.56.1:10101/produto/', jsonData, config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        Alert.alert('Error', 'Erro ao Cadastra Produtos!')
      });
  };

  const editProduto = async () => {
    const produto = { nome, preco, categoria, estoque, id }
    console.log("Edit")
    console.log(produto)
    try {
      if (nome.length == 0 || categoria.length == 0 || preco.length == 0 || estoque.length == 0 ) {
        Alert.alert('Ops', 'Preencha todos os campos')
        return;
      }

      const jsonData = {
        "NomeProduto": produto.nome,
        "CategoriaProduto": produto.categoria,
        "QtdEstoque": produto.estoque,
        "Preco": produto.preco
    };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      axios.put('http://192.168.56.1:10101/produto/'+id, jsonData, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro na chamada à API:', error);
        });

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

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      axios.delete('http://192.168.56.1:10101/produto/'+id, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro na chamada à API:', error);
        });
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
          placeholder="Categoria do Produto"
          value={categoria}
          onChangeText={setCategoria}
          style={styles.caixaTexto}
          editable={true}
        />
        <TextInput
          placeholder="Quantidade em Estoque"
          value={estoque}
          inputMode='decimal'
          onChangeText={setEstoque}
          style={styles.caixaTexto}
          editable={true}
        />
        <TextInput
          placeholder="Preço Unitário"
          value={preco}
          inputMode='decimal'
          onChangeText={setPreco}
          style={styles.caixaTexto}
          editable={true}
        />


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