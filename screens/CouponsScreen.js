import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

const coupons = [
  {
    code: 'DISCOUNT10',
    description: 'Get 10% off on your order',
   
  },
  {
    code: 'SUMMER20',
    description: 'Get 20% off on summer collection',
    
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping on your next order',
   
  },
];

const CouponsScreen = () => {
  const renderCoupon = ({ item }) => (
    <TouchableOpacity style={styles.couponContainer}>
      <ImageBackground source={item.background} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.code}>{item.code}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={coupons}
        renderItem={renderCoupon}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 26,
  },
  couponContainer: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'green',
    overflow: 'hidden',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CouponsScreen;
