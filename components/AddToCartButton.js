// components/AddToCartButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCart } from '../services/CartContext';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <TouchableOpacity onPress={() => addToCart(product)} style={styles.button}>
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddToCartButton;
