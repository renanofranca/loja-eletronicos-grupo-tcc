import { getVendas } from '../services/database/VendaDAO';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CartItem from '../models/CartItem';

export default function ListarVendas({ navigation }) {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    loadVendas();
  }, []);

  const loadVendas = async () => {
    try {
      const vendasResult = await getVendas();
      setVendas(vendasResult);
      console.log(vendas);
    } catch (error) {
      console.error('Erro ao carregar lista de vendas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
