import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { createTable, addVenda } from '../services/database/VendaDAO';
import axios from 'axios';

const CartItem = ({ carrinho, navigation }) => {
  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const consolidateCartItems = (items) => {
    const consolidatedItems = {};
    items.forEach((item) => {
      const itemId = item.id;
      if (!consolidatedItems[itemId]) {
        consolidatedItems[itemId] = {
          ...item,
          quantidade: 1,
        };
      } else {
        consolidatedItems[itemId].quantidade += 1;
      }
    });
    return Object.values(consolidatedItems);
  };

  const consolidatedCart = consolidateCartItems(carrinho);

  const calculateTotalPrice = () => {
    return consolidatedCart.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  const saveVenda = async () => {
    const valorFinal = calculateTotalPrice();
    const dataVenda = dataFormatada;
  
    const idProdutos = consolidatedCart.map((item) => item.id).join('|');
    const qtdProduto = consolidatedCart.map((item) => item.quantidade).join('|');
  
    const jsonData = {
      idProdutos,
      qtdProduto,
      dataVenda,
      valorTotal: valorFinal,
    };
  
    console.log(jsonData);
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios
      .post('http://192.168.56.1:10101/venda/', jsonData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro na chamada à API:', error);
      });

      Alert.alert('Show!', 'Venda Realizada Com Sucesso!')

  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartImg}>
        <Image source={require('../assets/ImagemGenerica.jpg')} style={styles.productImage} />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.nomeItem}>{item.nome}</Text>
        <View style={styles.txtTotal}>
          <View style={styles.quantidade}>
            <Text style={styles.quantidadeTitulo}>Categoria: {item.categoria}</Text>
          </View>
          <Text style={styles.precoItem}>R$ {item.preco.toFixed(2)}</Text>
        </View>
        <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>
      <FlatList
        data={consolidatedCart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
      />
      <Text style={styles.totalCompra}>Total: R$ {calculateTotalPrice()}</Text>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          saveVenda();
        }}
      >
        <Text style={styles.checkoutText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    quantidadeTitulo: {
        fontSize: 15,
        color: 'grey',
    },
    quantidade: {
        flexDirection: 'row',
    },
    nomeItem: {
        fontSize: 15,
        color: '#e09f3e',
    },
    txtTotal: {
        flexDirection: 'row',
    },
    precoItem: {
        fontSize: 15,
        color: '#e09f3e',
        marginLeft: 15,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#e09f3e',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cartItem: {
        marginBottom: 16,
        padding: 8,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    checkoutButton: {
        backgroundColor: '#e09f3e',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    checkoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    productImage: {
        width: 75,
        height: 75,
        borderRadius: 8,
    },
    cartDescription: {
        marginLeft: 30,
    },
    totalCompra: {
        marginLeft: 'auto',
        fontSize: 25,
        color: '#e09f3e',
    },
});

export default CartItem;
