import React, { useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");

    const login = async (user, senha) => { 
        const jsonData = {
            "Email": user,
            "Senha": senha,
        };
            
            const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            };
            axios.post('http://192.168.56.1:10101/usuario/login', jsonData, config)
            .then(response => {
                navigation.navigate('Home')
            })
            .catch(error => {
                Alert.alert('Error', 'Usuário ou Senha Invalidos')
            });
      };

    return (
        <View style={styles.container}>

            <Text style={styles.legenda}>Lojinha do GCS</Text>
            <Text style={styles.legenda}>Login</Text>

            <View>
                <TextInput
                placeholder="Usuário"
                value={user}
                onChangeText={setUser}
                style={styles.caixaTexto}
                editable={true}
                />
                <TextInput
                placeholder="Senha"
                type="password"
                value={senha}
                onChangeText={setSenha}
                style={styles.caixaTexto}
                editable={true}
                />
            </View>
            <View style={styles.botoes}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        //navigation.navigate('Home')
                        login(user,senha)
                    }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('CadastrarUsuario')
                    }}s
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
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
        marginTop: 32,
        marginBottom: 25
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
    caixaTexto: {
        fontSize: 25,
        width: 300,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        height: 40
      },
});
