import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';

export default function Dashboard({ navigation }) {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:10101/Venda/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setVendas(response.data);
      } catch (error) {
        console.error('Erro na chamada à API:', error);
      }
    };

    fetchData();
  }, []);

  const organizeSalesByMonth = (sales) => {
    const monthlySales = {};

    sales.forEach((sale) => {
      const date = sale.dataVenda.split('/'); // Supondo que a data está no formato "dd/mm/yyyy"
      const monthYear = `${date[1]}/${date[2]}`; // Mês/Ano

      if (monthlySales[monthYear]) {
        monthlySales[monthYear] += sale.valorTotal;
      } else {
        monthlySales[monthYear] = sale.valorTotal;
      }
    });

    return monthlySales;
  };

  const monthlySales = organizeSalesByMonth(vendas);

  // Preparando os dados para o gráfico de barras
  const chartData = {
    labels: Object.keys(monthlySales),
    datasets: [
      {
        data: Object.values(monthlySales),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="home" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.chartLabel}>Vendas Mensais</Text>
        <View style={styles.grafico}>
            <BarChart
            data={chartData}
            width={380}
            height={300}
            yAxisLabel="R$"
            fromZero
            chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 0) => `rgba(224, 159, 62, ${opacity})`,
                style: {
                borderRadius: 16,
                },
            }}
            />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  scrollContainer: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  container: {
    margin: 16,
  },
  chartLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e09f3e',
  },
  icon: {
    color: '#e09f3e',
  },
  grafico: {
    flex: 1, // Isso faz com que o gráfico ocupe todo o espaço disponível na tela.
  },
};
