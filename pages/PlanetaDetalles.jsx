import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { updatePlanet } from '../components/api';

const { width } = Dimensions.get('window');

export default function PlanetaDetalles({ route, navigation }) {
  const { planet, updatePlanetInList } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(planet.name);
  const [description, setDescription] = useState(planet.description);
  const [moons, setMoons] = useState(planet.moons.toString());
  const [moonNames, setMoonNames] = useState(planet.moon_names.join(', '));
  const [image, setImage] = useState(planet.image);

  const handleUpdatePlanet = async () => {
    const updatedPlanet = {
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(',').map(name => name.trim()),
      image,
    };
    try {
      const data = await updatePlanet(planet.id, updatedPlanet);
      updatePlanetInList(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating planet:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
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
          <Button title="Guardar" onPress={handleUpdatePlanet} />
          <Button title="Cancelar" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          <Text style={styles.name}>{planet.name}</Text>
          <Image source={{ uri: planet.image }} style={styles.image} />
          <Text style={styles.description}>{planet.description}</Text>
          <Text style={styles.moons}>Lunas: {planet.moons}</Text>
          <Text style={styles.moonNames}>Nombres de las lunas: {planet.moon_names.join(', ')}</Text>
          <Button title="Editar" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    width: width * 0.85,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  moons: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moonNames: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});