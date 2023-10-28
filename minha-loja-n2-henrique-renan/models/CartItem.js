import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, } from 'react-native';
import { createTable, addVenda } from '../services/database/VendaDAO';

const CartItem = ({ carrinho}) => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); 
    const ano = dataAtual.getFullYear(); // Ano
    
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const nomesDosProdutos = carrinho.map(carrinho => carrinho.nome);
    const [produto, setNome] = useState(nomesDosProdutos.join(', '));
    const [data, setData] = useState(dataFormatada);
    const [precoTotal, setPrecoTotal] = useState();

    

    const calculateTotalPrice = () => {
        return carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2);
    };

    const saveVenda = async () => {
        const valorFinal = carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2)
        const venda = { produto, data, valorFinal };
        console.log(venda)
        try {
            await createTable();
            addVenda(venda);
            Alert.alert('Sucesso', 'Venda realizada com sucesso');
        } catch (error) {
            Alert.alert('Error', 'Erro na venda');
        }
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
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seu Carrinho</Text>
            <FlatList
                data={carrinho}
                keyExtractor={(item, index) => `${item.nome}-${index}`}
                renderItem={renderItem}
            />
            <Text style={styles.totalCompra}>Total: R$ {calculateTotalPrice()}</Text>
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                    saveVenda()
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
        marginLeft: 50,
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
