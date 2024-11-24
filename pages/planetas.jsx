import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPlanets, deletePlanet } from '../components/api';
import PlanetaItem from '../components/PlanetaItem';

const { width } = Dimensions.get('window');

export default function Planetas() {
  const [planets, setPlanets] = useState([]);
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const data = await fetchPlanets();
        setPlanets(data);
        setOriginalPlanets(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPlanets();
  }, []);

  const addPlanet = (newPlanet) => {
    setPlanets([...planets, newPlanet]);
    setOriginalPlanets([...originalPlanets, newPlanet]);
  };

  const removePlanet = async (id) => {
    try {
      await deletePlanet(id);
      setPlanets(planets.filter(planet => planet.id !== id));
      setOriginalPlanets(originalPlanets.filter(planet => planet.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const sortPlanetsByMoons = () => {
    const sortedPlanets = [...planets].sort((a, b) => b.moons - a.moons);
    setPlanets(sortedPlanets);
  };

  const resetPlanetsOrder = () => {
    setPlanets(originalPlanets);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetas</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton}
          onPress={() => navigation.navigate('AgregarPlaneta', { addPlanet })}
        >
          <Text style={Platform.OS === 'android' ? styles.androidButtonText : styles.iosButtonText}>
            {Platform.OS === 'android' ? 'Nuevo Planeta' : 'Crear Planeta'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Ordenar por cantidad de lunas"
          onPress={sortPlanetsByMoons}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Restablecer orden"
          onPress={resetPlanetsOrder}
        />
      </View>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlanetaItem planet={item} onDelete={removePlanet} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  androidButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  iosButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  androidButtonText: {
    color: 'white',
  },
  iosButtonText: {
    color: 'black',
  },
  list: {
    width: width * 0.85,
  },
});