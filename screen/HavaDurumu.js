import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const API_KEY = '3461cfc885f0ba20a803432ceab8239f';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

const HavaDurumu = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const response = await axios.get(API_URL + city);
          setWeatherData(response.data);
          setError(null);
        } catch (error) {
          setError("Şehir bulunamadı!");
          setWeatherData(null);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchWeather();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  return (
    <ImageBackground 
      source={require('../assets/weather.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          placeholder="Search for places"
          placeholderTextColor="#fff"
          value={city}
          onChangeText={text => setCity(text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weatherData.name.toUpperCase()}</Text>
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` }} 
              style={styles.weatherIcon} 
            />
            <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°</Text>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
            <Text style={styles.details}>D:{Math.round(weatherData.main.temp_min)}° Y:{Math.round(weatherData.main.temp_max)}°</Text>
            <Text style={styles.date}>Today • {new Date().toLocaleDateString()}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 25,
    padding: 10,
    marginTop: 50,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 80,
    color: '#fff',
    marginTop: 10,
  },
  description: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
  },
  details: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  city: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  location: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
});

export default HavaDurumu;
