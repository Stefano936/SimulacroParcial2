import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PlanetaItem({ planet, onDelete, updatePlanetInList }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PlanetaDetalles', { planet, updatePlanetInList })}>
        <Text style={styles.name}>{planet.name}</Text>
        <Image source={{ uri: planet.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Eliminar" onPress={() => onDelete(planet.id)} />
        <View style={styles.space} />
        <Button title="Editar" onPress={() => navigation.navigate('PlanetaDetalles', { planet, updatePlanetInList })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    width: width * 0.85,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    width: 10, 
  },
});