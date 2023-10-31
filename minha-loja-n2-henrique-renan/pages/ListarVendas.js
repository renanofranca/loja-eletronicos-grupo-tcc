import { getVendas } from '../services/database/VendaDAO';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ListarVendas({ navigation }) {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    axios.get('http://192.168.56.1:10101/Venda/', config)
      .then(response => {
        const products = response.data;

        const retorno = products.map((item) => ({
          id: item._id,
          produto: item.idProdutos,
          data: item.dataVenda,
          precoTotal: item.valorTotal,
          quantidade: item.qtdProduto
        }));
        setVendas(retorno)
        console.log(products)
      })
      .catch(error => {
        console.error('Erro na chamada à API:', error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Dashboard', { vendas });
          }}>
          <Icon name="desktop-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="home" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nomeLoja}>
        <Text style={styles.nome}>Lista de Vendas</Text>
      </View>

      <FlatList
        style={styles.scrollContainer}
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.vendaItem}>
            <Text>ID: {item.id}</Text>
            <Text>Produto: {item.produto}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Preco Total: {item.precoTotal}</Text>
          </View>
        )}
        nestedScrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    margin:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  icon: {
    color: '#e09f3e',
  },
  vendaItem: {
    borderWidth: 1,
    backgroundColor: '#FFF0F0',
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  nomeLoja: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  nome: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e09f3e'
  },
});
