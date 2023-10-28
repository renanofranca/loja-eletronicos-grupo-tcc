
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert, ScrollView, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProdutoDAO from '../services/database/ProdutoDAO';
import Icon from 'react-native-vector-icons/Ionicons';
import Catalog from '../models/Catalog';
import { getCategoria } from '../services/database/CategoriaDAO';


export default function ListarProdutos({ navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  const [filtro, setFiltro] = useState('todos')
  const [categorias, setCategorias] = useState([]);
  const [catalogKey, setCatalogKey] = useState(0);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const categorias = await getCategoria();
      setCategorias(categorias);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const navigateToCadastroProduto = (produto) => {
    console.log(produto)
    navigation.navigate('CadastroProdutos', { produto })
  };

  useEffect(() => {
    setCatalogKey(catalogKey + 1);
  }, [filtro]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home')
          }}>
          <Icon name="chevron-back-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
  
      </View>
      <View style={styles.nomeLoja}>
        <Text style={styles.nome}>CGS</Text>
      </View>
      <View style={styles.categoria}>
        <TouchableOpacity
          onPress={() => {
            setFiltro("todos")
          }}
        >
          <Text style={styles.txtcategoria}>Todos</Text>
        </TouchableOpacity>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => {
              setFiltro(cat.nome);
            }}>
            <Text style={styles.txtcategoria}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.catalogo} >
        <Catalog key={catalogKey} showBuyButton={false} filtro={filtro} navigateToCadastroProduto={navigateToCadastroProduto} />
      </View>
    </ScrollView>

  );

}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginRight: 10
  },

  nomeLoja: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  nome: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e09f3e'
  },

  txtcategoria: {
    fontSize: 15,
    color: '#e09f3e',
    marginRight: 15,
    marginTop: 5

  },

  categoria: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  icon: {
    color: '#e09f3e'
  },
  catalogo: {
    marginTop: 20
  },

});
