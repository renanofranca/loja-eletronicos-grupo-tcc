import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroProdutos from './CadastroProdutos';
import Home from './Home';
import Catalog from '../models/Catalog';
import ListarProdutos from './ListarProdutos';
import ComprarProdutos from './ComprarProdutos';
import ListarVendas from './ListarVendas';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />r
        <Stack.Screen name="ListarProdutos" component={ListarProdutos}  />
        <Stack.Screen name="ComprarProdutos" component={ComprarProdutos}  />
        <Stack.Screen name="CadastroProduto" component={CadastroProdutos}/>
        <Stack.Screen name="ListarVendas" component={ListarVendas}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
} 