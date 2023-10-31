
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert, ScrollView, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Catalog from '../models/Catalog';


export default function ListarProdutos({ navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  const [filtro, setFiltro] = useState('todos')


  const navigateToCadastroProduto = (produto) => {
    console.log("Produto")
    console.log(produto)
    navigation.navigate('CadastroProdutos', { produto })
  };

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
        <Text style={styles.nome}>GCS</Text>
      </View>
      <View style={styles.categoria}>
        <TouchableOpacity
          onPress={() => {
            setFiltro("todos")
          }}
        >
          <Text style={styles.txtcategoria}>Todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.catalogo} >
        <Catalog showBuyButton={false} filtro={filtro} navigateToCadastroProduto={navigateToCadastroProduto} />
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
