import React from 'react';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import CadastroProdutos from './pages/CadastroProdutos';
import ListarProdutos from './pages/ListarProdutos'
import ComprarProdutos from './pages/ComprarProdutos'
import Cart from './pages/Cart'
import CartItem from './models/CartItem'
import Catalog from './models/Catalog';
import ListarVendas from './pages/ListarVendas';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CadastrarUsuario from './pages/CadastrarUsuario';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Home,
    CadastroProdutos,
    ListarProdutos,
    ComprarProdutos,
    Catalog,
    Cart,
    CartItem,
    ListarVendas,
    Dashboard,
    CadastrarUsuario
  })
);

export default function App() {
  return (
    <Routes/>      
    );
}
