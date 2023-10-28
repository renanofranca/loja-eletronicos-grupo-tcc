import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCategoria } from '../services/database/CategoriaDAO';
import Catalog from '../models/Catalog';

export default function ComprarProdutos({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [catalogKey, setCatalogKey] = useState(0);

  useEffect(() => {
    setCatalogKey(catalogKey + 1);
  }, [filtro]);

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

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="chevron-back-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Cart', { carrinho });
          }}>
          <Icon name="cart-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nomeLoja}>
        <Text style={styles.nome}>CGS</Text>
      </View>
      <View style={styles.categoria}>
        <TouchableOpacity
          onPress={() => {
            setFiltro('todos');
          }}>
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
      <View style={styles.catalogo}>
        <Catalog key={catalogKey} showBuyButton={true} filtro={filtro} adicionarAoCarrinho={adicionarAoCarrinho} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex para permitir que o conteúdo seja rolado
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  nomeLoja: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e09f3e',
  },
  txtcategoria: {
    fontSize: 15,
    color: '#e09f3e',
    marginRight: 15,
    marginTop: 5,
  },
  categoria: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    color: '#e09f3e',
  },
  catalogo: {
    marginTop: 20,
    marginBottom: 110
  },
});
