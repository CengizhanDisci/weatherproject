import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    name: 'Beauty',
    items: 104,
    image: require('../assets/beauty.png'),
  },
  {
    name: 'Fragrances',
    items: 100,
    image: require('../assets/fragrances.png'),
  },
  {
    name: 'Furniture',
    items: 260,
    image: require('../assets/furniture.png'),
  },
  {
    name: 'Groceries',
    items: 300,
    image: require('../assets/groceries.png'),
  },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={styles.categoryContainer}
          onPress={() => navigation.navigate('CategoryProducts', { category: category.name })}
        >
          <Image source={category.image} style={styles.image} />
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.items}>{category.items} items</Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('CategoryProducts', { category: category.name })}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  items: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  shopNowButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#00f',
    fontSize: 16,
  },
});

export default CategoriesScreen;
