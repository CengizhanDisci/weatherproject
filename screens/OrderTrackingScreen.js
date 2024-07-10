import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const OrderTrackingScreen = ({ route }) => {
  const { order } = route.params;

  const renderStatusItem = ({ item }) => (
    <View style={styles.statusItem}>
      <View style={styles.statusIndicator} />
      <View>
        <Text style={styles.statusTitle}>{item.title}</Text>
        <Text style={styles.statusDate}>{item.date}</Text>
        {item.description && <Text style={styles.statusDescription}>{item.description}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order #{order.id}</Text>
      <View style={styles.productContainer}>
        <Image source={{ uri: order.productImage }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{order.productTitle}</Text>
          <Text style={styles.productPrice}>{`$${order.productPrice}`}</Text>
        </View>
      </View>
      <FlatList
        data={order.status}
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.statusList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    justifyContent: 'center',
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  statusList: {
    marginTop: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDate: {
    fontSize: 14,
    color: '#666',
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default OrderTrackingScreen;
