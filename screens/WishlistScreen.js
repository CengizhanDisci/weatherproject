import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../services/FavoriteContext';

const WishlistScreen = ({ navigation }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const renderProduct = ({ item }) => {
    const discountPercentage = ((item.oldPrice - item.price) / item.oldPrice) * 100;

    return (
      <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <TouchableOpacity style={styles.favoriteButton} onPress={() => removeFromFavorites(item.id)}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={100} color="#ddd" />
      <Text style={styles.emptyText}>Your wishlist is empty</Text>
      <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        renderEmptyWishlist()
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
          numColumns={2} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  product: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },

  discountText: {
    color: 'white',
    fontSize: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  textContainer: {
    padding: 8,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  shopNowButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;
