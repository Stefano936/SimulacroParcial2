import fetch from 'node-fetch';

export const fetchPlanets = async () => {
  try {
    console.log('Fetching planets...');
    const response = await fetch('http://10.0.0.29:8000/planets');
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
};

export const deletePlanet = async (id) => {
  try {
    const response = await fetch(`http://10.0.0.29:8000/planets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting planet:', error);
    throw error;
  }
};

export const addPlanet = async (planet) => {
  try {
    const response = await fetch('http://10.0.0.29:8000/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planet),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding planet:', error);
    throw error;
  }
};

export const updatePlanet = async (id, updatedPlanet) => {
  try {
    const response = await fetch(`http://10.0.0.29:8000/planets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlanet),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating planet:', error);
    throw error;
  }
};