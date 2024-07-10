import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useCart } from '../services/CartContext'; 

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart(); 

  const colors = product.colors || ['#000', '#555', '#888', '#bbb'];
  const images = product.images || [product.thumbnail];

  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.thumbnailContainer}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.mainImage} />
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.thumbnailList}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.oldPrice && <Text style={styles.oldPrice}>${product.oldPrice}</Text>}
          <Text style={styles.rating}>{product.rating} ★</Text>
          <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
        </View>
        <View style={styles.sizeContainer}>
          <Text style={styles.label}>Size:</Text>
          {['S', 'M', 'L', 'XL'].map(size => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.label}>Color:</Text>
          {colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorButton, selectedColor === color && styles.selectedColorButton]}
              onPress={() => setSelectedColor(color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: color }]} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    marginBottom: 8,
  },
  thumbnailList: {
    flexDirection: 'row',
  },
  thumbnailContainer: {
    marginRight: 8,
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  textContainer: {
    padding: 8,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 20,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  rating: {
    fontSize: 20,
    color: '#f39c12',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 16,
    color: '#888',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  sizeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  selectedSizeButton: {
    backgroundColor: '#28a745',
  },
  sizeText: {
    fontSize: 16,
    color: '#000',
  },
  selectedSizeText: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  selectedColorButton: {
    borderColor: '#28a745',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetails;
