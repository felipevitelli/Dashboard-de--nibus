import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const dadosLinhas = [
  {
    id: "1",
    codigo: "805.7",
    origem: "R. Fundo II",
    destino: "Rec. Emas 600-800 (Areal / Católica)",
    passageiros: 14200,
    atrasos: 18,
    tempoMedio: 50,
    qtdOnibus: 12,
    ocupacao: "82%",
    arrecadacao: 78100,
  },
  {
    id: "2",
    codigo: "102.6",
    origem: "Terminal Asa Sul",
    destino: "Aeroporto",
    passageiros: 8900,
    atrasos: 5,
    tempoMedio: 20,
    qtdOnibus: 7,
    ocupacao: "65%",
    arrecadacao: 48950,
  },
  {
    id: "3",
    codigo: "0.009",
    origem: "Aeroporto ✈",
    destino: "ParkShopping / BRT Park Way",
    passageiros: 11500,
    atrasos: 12,
    tempoMedio: 30,
    qtdOnibus: 9,
    ocupacao: "75%",
    arrecadacao: 63250,
  },
  {
    id: "4",
    codigo: "0.110",
    origem: "Rod.P.Piloto",
    destino: "UnB",
    passageiros: 19500,
    atrasos: 35,
    tempoMedio: 25,
    qtdOnibus: 16,
    ocupacao: "95%",
    arrecadacao: 107250,
  },
  {
    id: "5",
    codigo: "361.2",
    origem: "P Sul P1-P2-P4",
    destino: "V. Madureira / Tag. Centro / Pistão Sul (Estádio)",
    passageiros: 16800,
    atrasos: 40,
    tempoMedio: 60,
    qtdOnibus: 15,
    ocupacao: "89%",
    arrecadacao: 92400,
  },
  {
    id: "6",
    codigo: "0.333",
    origem: "QNQ-QNR",
    destino:
      "P2 Norte / Tag. Centro (Pistão S. / Católica / Tag. Shopping / Estádio)",
    passageiros: 17300,
    atrasos: 28,
    tempoMedio: 70,
    qtdOnibus: 14,
    ocupacao: "91%",
    arrecadacao: 95150,
  },
];

function TelaDashboard() {
  const maisPassageiros = [...dadosLinhas].sort(
    (a, b) => b.passageiros - a.passageiros,
  )[0];
  const maisAtrasos = [...dadosLinhas].sort((a, b) => b.atrasos - a.atrasos)[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Dashboard - Ônibus DF</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Indicadores Gerais</Text>
        <Text style={styles.texto}>Total de Linhas: {dadosLinhas.length}</Text>
        <Text style={styles.texto}>
          Total de Passageiros:{" "}
          {dadosLinhas.reduce((acc, item) => acc + item.passageiros, 0)}
        </Text>
        <Text style={styles.texto}>
          Total de Atrasos:{" "}
          {dadosLinhas.reduce((acc, item) => acc + item.atrasos, 0)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Linha com Maior Número de Passageiros
        </Text>
        <Text style={styles.textoLinha}>Linha: {maisPassageiros.codigo}</Text>
        <Text style={styles.texto}>
          Passageiros: {maisPassageiros.passageiros}
        </Text>
        <Text style={styles.texto}>
          Rota: {maisPassageiros.origem} {"->"} {maisPassageiros.destino}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Linha com Maior Número de Atrasos</Text>
        <Text style={styles.textoLinha}>Linha: {maisAtrasos.codigo}</Text>
        <Text style={styles.texto}>
          Ocorrências de Atraso: {maisAtrasos.atrasos}
        </Text>
        <Text style={styles.texto}>
          Rota: {maisAtrasos.origem} {"->"} {maisAtrasos.destino}
        </Text>
      </View>
    </ScrollView>
  );
}

function TelaListaLinhas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Linhas</Text>
      <FlatList
        data={dadosLinhas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemLista}
            onPress={() => navigation.navigate("Detalhes", { linha: item })}
          >
            <Text style={styles.itemCodigo}>Linha {item.codigo}</Text>
            <Text style={styles.texto}>Origem: {item.origem}</Text>
            <Text style={styles.texto}>Destino: {item.destino}</Text>
            <Text style={styles.texto}>Qtd Ônibus: {item.qtdOnibus}</Text>
            <Text style={styles.texto}>Passageiros: {item.passageiros}</Text>
            <Text style={styles.texto}>Tempo Médio: {item.tempoMedio} min</Text>
            <Text style={styles.botaoTexto}>Clique para ver mais detalhes</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function TelaDetalhesLinha({ route }) {
  const { linha } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Linha {linha.codigo}</Text>
      <View style={styles.card}>
        <Text style={styles.texto}>Código da Linha: {linha.codigo}</Text>
        <Text style={styles.texto}>Origem: {linha.origem}</Text>
        <Text style={styles.texto}>Destino: {linha.destino}</Text>
        <Text style={styles.texto}>
          Quantidade de Ônibus: {linha.qtdOnibus}
        </Text>
        <Text style={styles.texto}>
          Número de Passageiros: {linha.passageiros}
        </Text>
        <Text style={styles.texto}>
          Tempo Médio das Viagens: {linha.tempoMedio} minutos
        </Text>
        <Text style={styles.texto}>
          Total de Atrasos Registrados: {linha.atrasos}
        </Text>
        <Text style={styles.texto}>Ocupação Média: {linha.ocupacao}</Text>
        <Text style={styles.texto}>
          Arrecadação Total: R$ {linha.arrecadacao.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
}

function TelaAnalises() {
  const arrecadacaoTotal = dadosLinhas.reduce(
    (acc, item) => acc + item.arrecadacao,
    0,
  );
  const totalOnibus = dadosLinhas.reduce(
    (acc, item) => acc + item.qtdOnibus,
    0,
  );
  const arrecadacaoPorOnibus = arrecadacaoTotal / totalOnibus;
  const maiorArrecadacao = [...dadosLinhas].sort(
    (a, b) => b.arrecadacao - a.arrecadacao,
  )[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Análises do Sistema</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Análise 1: Arrecadação Global e Média
        </Text>
        <Text style={styles.texto}>
          Arrecadação Total Geral: R$ {arrecadacaoTotal.toFixed(2)}
        </Text>
        <Text style={styles.texto}>
          Média de Arrecadação por Ônibus: R$ {arrecadacaoPorOnibus.toFixed(2)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Análise 2: Linha com Maior Arrecadação
        </Text>
        <Text style={styles.textoLinha}>Linha {maiorArrecadacao.codigo}</Text>
        <Text style={styles.texto}>
          Valor Arrecadado: R$ {maiorArrecadacao.arrecadacao.toFixed(2)}
        </Text>
        <Text style={styles.texto}>
          Origem/Destino: {maiorArrecadacao.origem} - {maiorArrecadacao.destino}
        </Text>
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackLinhas() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#333" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ListaLinhas"
        component={TelaListaLinhas}
        options={{ title: "Linhas de Ônibus" }}
      />
      <Stack.Screen
        name="Detalhes"
        component={TelaDetalhesLinha}
        options={{ title: "Detalhes da Linha" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#333" },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen name="Dashboard" component={TelaDashboard} />
        <Tab.Screen
          name="Linhas"
          component={StackLinhas}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Análises" component={TelaAnalises} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 0,
    padding: 10,
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  itemLista: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 0,
    padding: 10,
    marginBottom: 10,
  },
  itemCodigo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  textoLinha: {
    fontSize: 15,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 14,
    color: "#333",
  },
  botaoTexto: {
    marginTop: 5,
    color: "blue",
    fontWeight: "bold",
  },
});
