import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CartItem from '../models/CartItem';

export default function Cart({ navigation }) {
  const carrinho = navigation.getParam('carrinho');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('ComprarProdutos');
          }}>
          <Icon name="chevron-back-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="home" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <CartItem carrinho={carrinho} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Usar flex 1 para ocupar toda a tela
  },
  icon: {
    color: '#e09f3e',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
});
