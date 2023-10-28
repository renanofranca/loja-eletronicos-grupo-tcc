import React from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.legenda}>Lojinha do GCS</Text>
            <View style={styles.botoes}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('CadastroCategoria')
                    }}
                >
                    <Text style={styles.buttonText}>Cadastrar Nova Categoria</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('CadastroProdutos')
                    }}
                >
                    <Text style={styles.buttonText}>Cadastrar Novo Produto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('ListarProdutos')
                    }}
                >
                    <Text style={styles.buttonText}>Listar Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('ComprarProdutos')
                    }}
                >
                    <Text style={styles.buttonText}>Comprar Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('ListarVendas')
                    }}
                >
                    <Text style={styles.buttonText}>Listar Vendas</Text>
                </TouchableOpacity>
            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    botao: {
        fontSize: 18,
        backgroundColor: '#2a9d8f',
        borderRadius: 5,
        marginTop: 30,
        color: 'black',
    },
    botoes: {
        justifyContent: 'space-evenly',
        marginTop: 50
    },
    legenda: {
        fontSize: 32,
        color: '#e76f51',
        marginTop: 32
    },
    button: {
        backgroundColor: '#f4a261',
        margin: 24,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
    },
});
