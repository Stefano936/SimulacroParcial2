import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addPlanet } from '../components/api';

const { width } = Dimensions.get('window');

export default function AgregarPlaneta({ route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const handleAddPlanet = async () => {
    const newPlanet = {
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(',').map(name => name.trim()),
      image,
    };
    try {
      const addedPlanet = await addPlanet(newPlanet);
      route.params.addPlanet(addedPlanet);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding planet:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Planeta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de lunas"
        value={moons}
        onChangeText={setMoons}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de las lunas (separados por comas)"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Agregar Planeta" onPress={handleAddPlanet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: width * 0.85,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});