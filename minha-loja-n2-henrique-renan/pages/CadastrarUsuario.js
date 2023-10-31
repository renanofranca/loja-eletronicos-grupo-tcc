import React, { useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function CadastrarUsuario({ navigation }) {
    const [user, setUser] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [senha, setSenha] = useState("");

    const saveUser = async () => {
        const produto = { user, nome, cpf, senha }
        if (user.length == 0 || nome.length == 0 || cpf.length == 0 || senha.length == 0) {
            Alert.alert('Ops', 'Preencha todos os campos')
            return;
          }
        console.log(produto)
        const jsonData = {
          "Nome": produto.nome,
          "Email": produto.user,
          "Cpf": produto.cpf,
          "Senha": produto.senha
      };
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        axios.post('http://192.168.56.1:10101/usuario/', jsonData, config)
          .then(response => {
            console.log(response.data);
            Alert.alert('Show!', 'Usuario Cadatrado Com Sucesso!')
            navigation.navigate('Login')
          })
          .catch(error => {
            Alert.alert('Error', 'Erro ao Cadastrar Usuário')
        });
      };

    return (
        <View style={styles.container}>

            <Text style={styles.legenda}>Lojinha do GCS</Text>
            <Text style={styles.legenda}>Cadastrar Usuário</Text>

            <View>
                <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.caixaTexto}
                editable={true}
                />
                <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCPF}
                style={styles.caixaTexto}
                editable={true}
                />
                <TextInput
                placeholder="Email"
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
                        saveUser()
                    }}
                >
                    <Text style={styles.buttonText}>Cadastrar Usuário</Text>
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