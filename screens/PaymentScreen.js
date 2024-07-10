// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { useCart } from '../services/CartContext';
import { placeOrder } from '../services/orderAPI';

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'All payment fields are required.');
      return;
    }

    try {
      const orderResponse = await placeOrder(cart);
      clearCart();
      navigation.navigate('OrderTracking', {
        order: {
          id: orderResponse.id,
          productImage: cart[0].thumbnail, 
          productTitle: cart[0].title,
          productPrice: totalPrice.toFixed(2),
          location: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
          status: [
            { id: 1, title: 'Order Created', date: 'Monday June 20th, 2020 12:25 AM' },
            { id: 2, title: 'North Gateway', date: 'Monday June 23th, 2020 13:34 AM', description: 'Your order has been arrived at North Gateway, please wait next info' },
            { id: 3, title: 'On Delivery', date: 'Monday June 26th, 2020 15:25 AM', person: 'Thomas Djono', personId: '02123141' },
          ],
        },
      });
    } catch (error) {
      console.error('Error in handlePayment:', error);
      Alert.alert("Error", "Failed to place the order.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price.toFixed(2)}`}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <Text style={styles.heading}>Payment Details</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Price:</Text>
        <Text style={styles.totalPrice}>{`$${totalPrice.toFixed(2)}`}</Text>
      </View>
      <TextInput
        placeholder="Card Number"
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        style={styles.input}
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        placeholder="CVV"
        style={styles.input}
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
