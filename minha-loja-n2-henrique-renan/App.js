import React from 'react';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import CadastroProdutos from './pages/CadastroProdutos';
import ListarProdutos from './pages/ListarProdutos'
import ComprarProdutos from './pages/ComprarProdutos'
import Cart from './pages/Cart'
import CartItem from './models/CartItem'
import Catalog from './models/Catalog';
import CadastroCategoria from './pages/CadastroCategoria';
import ListarVendas from './pages/ListarVendas';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadastroProdutos,
    ListarProdutos,
    ComprarProdutos,
    Catalog,
    Cart,
    CadastroCategoria,
    CartItem,
    ListarVendas
  })
);

export default function App() {
  return (
    <Routes/>      
    );
}
