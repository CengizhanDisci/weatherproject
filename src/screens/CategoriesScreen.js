import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './CategoriesScreen.styles';

const categories = [
  {
    name: 'Beauty',
    items: 104,
    image: require('../../assets/beauty.png'),
  },
  {
    name: 'Fragrances',
    items: 100,
    image: require('../../assets/fragrances.png'),
  },
  {
    name: 'Furniture',
    items: 260,
    image: require('../../assets/furniture.png'),
  },
  {
    name: 'Groceries',
    items: 300,
    image: require('../../assets/groceries.png'),
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

export default CategoriesScreen;
