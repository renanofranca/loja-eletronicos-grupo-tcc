import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getProduct } from '../services/database/ProdutoDAO';

const Catalog = ({ showBuyButton, adicionarAoCarrinho, filtro, navigateToCadastroProduto }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct(filtro)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [carrinho, setCarrinho] = useState([]);


  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={require('../assets/ImagemGenerica.jpg')} style={styles.productImage}></Image>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDescription}>{item.categoria}</Text>
      <Text style={styles.productPrice}>${item.preco}</Text>
      {showBuyButton ? (  
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(filtro)
            adicionarAoCarrinho(item)
            console.log(carrinho)
          }}
        >
          <Text style={styles.buttonText}>Add Carrino</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigateToCadastroProduto(item);
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={renderProduct}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f4a261',
    borderRadius: 15,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 16,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#FEF7FC',
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e09f3e'
  },
  productDescription: {
    fontSize: 15,
    color: 'lightgrey'
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e09f3e'
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  }
});

export default Catalog;
