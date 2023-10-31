import React, { useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import api from "../services/api";

export default function CadastrarUsuario({ navigation }) {
    const [user, setUser] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [senha, setSenha] = useState("");
    const [emailError, setEmailError] = useState("");
    const [cpfError, setcpfError] = useState("");

    const saveUser = async () => {
        setEmailError("");
        setcpfError("");
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
        
        api.post('/usuario/', jsonData, config)
          .then(response => {
            console.log(response.data);
            Alert.alert('Show!', 'Usuario Cadatrado Com Sucesso!')
            navigation.navigate('Login')
          })
          .catch(error => {
            Alert.alert('Error', 'Erro ao Cadastrar Usuário')
            if (error.response.data.errors && error.response.data.errors.Email) {
                setEmailError("Formato de email inválido");
              }
              if (error.response.data.errors && error.response.data.errors.Cpf) {
                setcpfError("Formato de CPF inválido");
              }
        });
      };

    return (
        <View style={styles.container}>

            <Text style={styles.legenda}>Lojinha do GCS</Text>
            <Text style={styles.legendaSub}>Cadastrar Usuário</Text>

            <View>
                <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.caixaTexto}
                editable={true}
                />
                {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}
                <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCPF}
                style={[styles.caixaTexto, cpfError ? styles.caixaErro : null]}
                editable={true}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TextInput
                placeholder="Email"
                value={user}
                onChangeText={setUser}
                style={[styles.caixaTexto, emailError ? styles.caixaErro : null]}
                editable={true}
                />

                <TextInput
                placeholder="Senha"
                type="password"
                secureTextEntry={true}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}s
                >
                    <Text style={styles.buttonText}>Login</Text>
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
        marginTop: 10
    },
    legenda: {
        fontSize: 32,
        color: '#e76f51',
        marginTop: 32,
    },
    legendaSub: {
        fontSize: 32,
        color: '#e76f51',
        marginTop: 5,
        marginBottom: 10
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
