import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useCart } from '../services/CartContext';

const coupons = [
  { code: 'DISCOUNT10', discount: 10 },
  { code: 'SUMMER20', discount: 20 },
  { code: 'FREESHIP', discount: 0 }
];

const CartItem = ({ item, onUpdateQuantity }) => {
  const imageUrl = item.thumbnail || 'https://via.placeholder.com/100';

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUrl }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>{`$${(item.price || 0).toFixed(2)}`}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdateQuantity(item.id, -1)}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityInput}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdateQuantity(item.id, 1)}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const { cart, updateCartQuantity } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    const validCoupon = coupons.find(c => c.code === coupon.toUpperCase());
    if (validCoupon) {
      setDiscount(validCoupon.discount);
    } else {
      alert('Invalid coupon code');
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = totalPrice * ((100 - discount) / 100);

  const handleCheckout = () => {
    navigation.navigate('Address');
  };

  const handleUpdateQuantity = (productId, amount) => {
    const item = cart.find((product) => product.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + amount;
    updateCartQuantity(productId, newQuantity);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.continueShoppingText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => <CartItem item={item} onUpdateQuantity={handleUpdateQuantity} />}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.couponContainer}>
            <TextInput
              placeholder="Enter Your Offer Code"
              style={styles.couponInput}
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceLabel}>Total Price:</Text>
            <Text style={styles.totalPrice}>{`$${discountedPrice.toFixed(2)}`}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  discountedPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#ddd',
    minWidth: 30,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
  },
  quantityInput: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
  },
  totalPriceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CartScreen;
